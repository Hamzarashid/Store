<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'product_id','product_name', 'price', 'size', 'quantity','order_number'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
