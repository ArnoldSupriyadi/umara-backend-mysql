<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Slider extends Model
{
    use LogsActivity;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Slider')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->headline ?? $this->getKey();
                return "[Slider] {$label} was {$eventName}";
            });
    }
    protected $guarded = ['id'];

    public function businessUnit(): BelongsTo
    {
        return $this->belongsTo(BusinessUnit::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) return null;
        if (str_starts_with($this->image, 'http')) return $this->image;
        $clean = ltrim($this->image, '/');
        if (str_starts_with($clean, 'images/')) return asset($clean);
        return Storage::disk('r2')->url($this->image);
    }
}
