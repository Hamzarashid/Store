<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VariantController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Redirect::to('login');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('api/categories', [ApiController::class, 'getCategores']);
Route::get('api/products', [ApiController::class, 'getProducts']);
Route::get('api/product/{id}', [ApiController::class, 'getProduct']);
Route::get('api/order/{id}', [ApiController::class, 'orderItems']);
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::post('api/cart', [ApiController::class, 'checkout']);
Route::post('api/review', [ApiController::class, 'review']);
Route::put('api/status/{id}', [ApiController::class, 'updateCustomerStatus']);
Route::get('api/orderList/{id}', [ApiController::class, 'getOrderList']);
require __DIR__ . '/auth.php';

Route::resource('/category', CategoryController::class);
Route::get('/category', [CategoryController::class, 'index'])->middleware(['auth'])->name('category');

Route::resource('/product', ProductController::class);
Route::get('/product', [ProductController::class, 'index'])->middleware(['auth'])->name('product');
Route::get('/product/search', [ProductController::class, 'search'])->name('product.search');

Route::resource('/order', CustomerController::class);
Route::get('/order', [CustomerController::class, 'index'])->middleware(['auth'])->name('order');

Route::delete('product/{product_id}/image/{id}', [ImageController::class, 'destroy'])->name('image.destroy');
Route::delete('product/{product_id}/variant/{id}', [VariantController::class, 'destroy'])->name('variant.destroy');
