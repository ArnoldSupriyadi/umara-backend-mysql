<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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

    public function getMainImageUrlAttribute(): ?string
    {
        if (!$this->main_image) return null;
        if (str_starts_with($this->main_image, 'http')) return $this->main_image;
        $clean = ltrim($this->main_image, '/');
        if (str_starts_with($clean, 'images/')) return asset($clean);
        return Storage::disk('r2')->url($this->main_image);
    }

    public function getGalleryUrlsAttribute(): array
    {
        if (!is_array($this->gallery_images)) return [];

        return array_map(function ($img) {
            if (!$img) return null;
            if (str_starts_with($img, 'http')) return $img;
            $clean = ltrim($img, '/');
            if (str_starts_with($clean, 'images/')) return asset($clean);
            return Storage::disk('r2')->url($img);
        }, $this->gallery_images);
    }
}
