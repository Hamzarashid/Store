<?php

namespace App\Http\Controllers;
use App\Models\Review;
use Illuminate\Support\Facades\Mail;
use App\Models\Category;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Order;
use App\Mail\CustomerOrderMail;
use App\Mail\AdminOrderMail;
use App\Mail\CustomerOrderInProgressMail;
use App\Mail\CustomerOrderDeliveredMail;
use Illuminate\Http\Request;
use DB, Response;

class ApiController extends Controller
{
    public function getCategores(Request $request)
    {
        $categories = Category::all();

        return Response::json($categories);
    }

    public function getProducts(Request $request)
    {
        $products = Product::all();
        $response = $products->map(function ($product) {

            $images = DB::table('images')
                ->select('images.url')
                ->where('images.product_id', '=', $product->id)->get();

            $variants = DB::table('variants')
                ->select('variants.attribute_name as size', 'variants.attribute_value as quantity')
                ->where('variants.product_id', '=', $product->id)->get();
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'actual_price' => $product->actual_price,
                'discount_price' => $product->discount_price,
                'category' => $product->category,
                'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
                'images' => $images,
                'variants' => $variants
            ];
        });

        return Response::json($response);
    }

    public function getProduct($id)
    {
        $totalQuantity = 0;
        $product = Product::findOrFail($id);
        $images = DB::table('images')
            ->select('images.url')
            ->where('images.product_id', '=', $product->id)->get();

        $variants = DB::table('variants')
            ->select('variants.attribute_name as size', 'variants.attribute_value as quantity')
            ->where('variants.product_id', '=', $product->id)->get();

        $reviews = DB::table('reviews')
            ->select('*')
            ->where('reviews.product_id', '=', $id)->get();
        foreach ($variants as $key => $variant) {
            $totalQuantity += $variant->quantity;
        }

        $response = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'actual_price' => $product->actual_price,
            'discount_price' => $product->discount_price,
            'category' => $product->category,
            'created_at' => $product->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
            'total_quantity' => $totalQuantity,
            'images' => $images,
            'variants' => $variants,
            'reviews' =>  $reviews
        ];

        return Response::json($response);
    }

    public function removeQuantity($data)
    {

        foreach ($data as $key => $value) {
            if (!isset($value['id']) || !isset($value['size']) || !isset($value['quantity'])) {
                return response()->json(['error' => 'Invalid data format'], 400);
            }
            $variant = DB::table('variants')
                ->where('product_id', '=', $value['id'])
                ->where('attribute_name', '=', $value['size'])
                ->first();

            if ($variant) {
                $newQuantity = $variant->attribute_value - $value['quantity'];

                DB::table('variants')
                    ->where('id', '=', $variant->id)
                    ->update(['attribute_value' => $newQuantity]);
            }

        }

        return Response::json(["success" => "product updated"]);
    }

    public function checkout(Request $request)
{
    $data = json_decode($request->getContent(), true);
    if (!isset($data["customer"]) || !isset($data["cart"])) {
        return response()->json(['success' => false, 'error' => 'Invalid data format'], 400);
    }

    try {
        DB::beginTransaction();

         $orderNumber = strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8)); // Random 8-character alphanumeric string
         $data['order_number'] = $orderNumber; 
 
        $customer = new Customer([
            'name' => $data["customer"]['name'],
            'email' => $data["customer"]['email'],
            'phone_no' => $data["customer"]['phone'],
            'address' => $data["customer"]['address'],
            'city' => $data["customer"]['city'],
            'postal_code' => isset($data["customer"]['postalCode']) ? $data["customer"]['postalCode'] : null,
            'status' => 'Pending',
        ]);
        $customer->save();
        $customerId = $customer->id;

        // Save orders
        foreach ($data["cart"] as $key => $value) {
            $order = new Order([
                'customer_id' => $customerId,
                'product_id' => $value['id'],
                'product_name' => $value['name'],
                'price' => $value['price'],
                'size' => $value['size'],
                'quantity' => $value['quantity'],
                'order_number' => $orderNumber,
            ]);
            $order->save();
        }

        $this->removeQuantity($data["cart"]);

        DB::commit();

        Mail::to($data["customer"]['email'])->send(new CustomerOrderMail(order: $data));
        Mail::to('hamzarashid.elites@gmail.com')->send(new AdminOrderMail($data));

        return response()->json(['success' => true, 'message' => 'Order is ready']);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}



    public function orderItems($id)
    {
        $orders = DB::table('orders')
            ->select('orders.*')
            ->where('orders.customer_id', '=', $id)->get();

        return Response::json($orders);
    }

    public function updateCustomerStatus(Request $request, $id)
{
    $status = $request->status;

    DB::table('customers')
        ->where('id', '=', $id)
        ->update(['status' => $status]);

    $customer = DB::table('customers')->where('id', $id)->first();
    $orderCollection = DB::table('orders')
    ->select('orders.*')
    ->where('orders.customer_id', '=', $id)->get();
    $order = $orderCollection->first(); 
    $totalAmount = $orderCollection->sum('price');
    if ($customer && $order && $customer->email) {
        $email = $customer->email;

        $data = (object)[
            'customer' => $customer,
            'cart' => $orderCollection,
            'order_number' => $order->order_number,
            'total' => $totalAmount,
        ];
        $jsonData = json_decode(json_encode($data), true);
        if ($status === 'In-Progress') {
            Mail::to($email)->send(new CustomerOrderInProgressMail(order: $jsonData));
        } elseif ($status === 'Delivered') {
            Mail::to($email)->send(new CustomerOrderDeliveredMail(order: $jsonData));
        }
    }

    return Response::json(["success" => "Customer info updated"]);
}
public function getOrderList($id)
{
    $orders = DB::table('orders')
        ->join('customers', 'orders.customer_id', '=', 'customers.id')
        ->select('orders.*', 'customers.name as customer_name')
        ->where('orders.order_number', '=', $id)
        ->get()
        ->map(function ($order) {
            $order->review_completed = $order->review_completed ? true : false; 
            return $order;
        });

    return Response::json($orders);
}


public function review(Request $request)
{
    $data = json_decode($request->getContent(), true);
    if (!isset($data["product_id"])) {
        return response()->json(['success' => false, 'error' => 'Invalid data format'], 400);
    }

    try {
        DB::beginTransaction();
 
        $review = new Review([
            'product_id' => $data["product_id"],
            'customer_name' => $data["customer_name"],
            'rating' => $data["rating"],
            'message' => $data["message"],
        ]);
        $review->save();

        DB::table('orders')
        ->where('id', '=', $data['order_id'])
        ->update(['review_completed' => 1]);
    
        DB::commit();

        return response()->json(['success' => true, 'message' => 'reivew has been submitted']);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
}

public function getReviews()
{
    $reviews = Review::all();
    return Response::json($reviews);
}

}


