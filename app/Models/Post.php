<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = ['business_unit_id', 'title', 'slug', 'content', 'main_image', 'gallery_images', 'published_at'];

    protected $casts = [
        'gallery_images' => 'array', // Automatically convert JSON to Array
        'published_at' => 'datetime',
    ];

    public function businessUnit(): BelongsTo
    {
        return $this->belongsTo(BusinessUnit::class);
    }
}
