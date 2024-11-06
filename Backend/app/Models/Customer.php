<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'city', 'email', 'phone_no', 'postal_code', 'status'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
