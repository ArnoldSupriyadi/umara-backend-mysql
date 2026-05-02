<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use LogsActivity;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Post')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->title ?? $this->getKey();
                return "[Post] {$label} was {$eventName}";
            });
    }
    protected $fillable = ['business_unit_id', 'title', 'slug', 'content', 'main_image', 'gallery_images', 'published_at'];

    protected $casts = [
        'gallery_images' => 'array', // Automatically convert JSON to Array
        'published_at' => 'datetime',
    ];

    public function businessUnit(): BelongsTo
    {
        return $this->belongsTo(BusinessUnit::class);
    }

    /**
     * URL-encode only the filename part of a path, preserving slashes.
     */
    private function encodeR2Path(string $path): string
    {
        return implode('/', array_map('rawurlencode', explode('/', $path)));
    }

    public function getMainImageUrlAttribute(): ?string
    {
        if (!$this->main_image) return null;
        if (str_starts_with($this->main_image, 'http')) return $this->main_image;
        $clean = ltrim($this->main_image, '/');
        if (str_starts_with($clean, 'images/')) return asset($clean);
        return Storage::disk('r2')->url($this->encodeR2Path($this->main_image));
    }

    public function getGalleryUrlsAttribute(): array
    {
        if (!is_array($this->gallery_images)) return [];

        return array_map(function ($img) {
            if (!$img) return null;
            if (str_starts_with($img, 'http')) return $img;
            $clean = ltrim($img, '/');
            if (str_starts_with($clean, 'images/')) return asset($clean);
            return Storage::disk('r2')->url($this->encodeR2Path($img));
        }, $this->gallery_images);
    }
}
