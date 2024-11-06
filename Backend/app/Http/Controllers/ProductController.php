<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Image;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $products = Product::when($search, function ($query, $search) {
            return $query->where('name', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        })->paginate(10);
        return view('product.products', compact('products', 'products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return view('product.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'actual_price' => 'required',
            'discount_price' => 'nullable',
            'category' => 'required',
            'variants' => 'required|array',
            'variants.*.options.*.attribute_name' => 'required|string',
            'variants.*.options.*.attribute_value' => 'required|string'
        ]);

        $product = Product::create($request->all());
        $productId = $product->id;

        foreach ($request->variants as $variantData) {
            $product->variants()->create([
                'attribute_name' => $variantData['options'][0]['attribute_name'],
                'attribute_value' => $variantData['options'][0]['attribute_value']
            ]);
        }
        if ($request->hasFile('images')) {
            $uploadPath = 'uploads/items/';
            foreach ($request->file('images') as $image) {
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move($uploadPath, $imageName);
                $finalImagePath = $uploadPath . $imageName;

                $newimage = new Image();
                $newimage->url = $finalImagePath;
                $newimage->product_id = $productId;
                $newimage->save();
            }
        }

        return redirect('/product')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return view('product.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'actual_price' => 'required',
            'discount_price' => 'nullable',
            'category' => 'required',
            'variants' => 'required|array',
            'variants.*.options.*.attribute_name' => 'required|string',
            'variants.*.options.*.attribute_value' => 'required|string'
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());
        foreach ($request->variants as $variantData) {
            if (isset($variantData['id'])) {
                $variant = $product->variants()->find($variantData['id']);
                if ($variant) {
                    $variant->update([
                        'attribute_name' => $variantData['options'][0]['attribute_name'],
                        'attribute_value' => $variantData['options'][0]['attribute_value']
                    ]);
                }
            } else {
                $product->variants()->create([
                    'attribute_name' => $variantData['options'][0]['attribute_name'],
                    'attribute_value' => $variantData['options'][0]['attribute_value']
                ]);
            }
        }
        if ($request->hasFile('images')) {
            $uploadPath = 'uploads/items/';
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move($uploadPath, $filename);
                $finalImagePath = $uploadPath . $filename;

                $newImage = new Image();
                $newImage->url = $finalImagePath;
                $newImage->product_id = $product->id;
                $newImage->save();
            }
        }

        return redirect('/product')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $Images = DB::table('images')
            ->where('product_id', '=', $product->id)->get();
        foreach ($Images as $image) {
            $imagePath = public_path($image->url);

            if (File::exists($imagePath)) {

                File::delete($imagePath);
            }
        }
        $product->delete();
        return redirect('/product')->with('success', 'Product deleted successfully');
    }
}
