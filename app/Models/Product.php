<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_fresh' => 'boolean',
        'is_new' => 'boolean',
        'limited_stock' => 'boolean',
        'images' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    // Helper untuk mendapatkan gambar pertama
    public function getFirstImageAttribute()
    {
        $images = $this->images;
        if(is_array($images) && count($images) > 0) {
            return $images[0];
        }
        return 'https://via.placeholder.com/400x400?text=No+Image';
    }
}
