<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Models\Category;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Order;
use App\Mail\CustomerOrderMail;
use App\Mail\AdminOrderMail;
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
            'variants' => $variants
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
            return response()->json(['error' => 'Invalid data format'], 400);
        }
        $customer = new Customer([
            'name' => $data["customer"]['name'],
            'email' => $data["customer"]['email'],
            'phone_no' => $data["customer"]['phone'],
            'address' => $data["customer"]['address'],
            'city' => $data["customer"]['city'],
            'postal_code' => $data["customer"]['postalCode'],
            'status' => 'Pending',
        ]);

        $customer->save();
        $customerId = $customer->id;
        foreach ($data["cart"] as $key => $value) {
            $order = new Order([
                'customer_id' => $customerId,
                'product_name' => $value['name'],
                'price' => $value['price'],
                'size' => $value['size'],
                'quantity' => $value['quantity'],
            ]);
            $order->save();
        }
        $this->removeQuantity($data["cart"]);
        // Send emails
        Mail::to($data["customer"]['email'])->send(new CustomerOrderMail($data));
        Mail::to('hamzarashid.elites@gmail.com')->send(new AdminOrderMail($data));

        return Response::json(["success" => "Order is ready"]);
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
        DB::table('customers')
            ->where('id', '=', $id)
            ->update(['status' => $request->status]);

        return Response::json(["success" => "Customer info updated"]);
    }
}
