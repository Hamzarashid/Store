<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = ['product_id', 'attribute_name', 'attribute_value'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
