<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Career extends Model
{
    use LogsActivity;

    use SoftDeletes;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Career')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->job_title ?? $this->getKey();
                return "[Career] {$label} was {$eventName}";
            });
    }
    protected $fillable = [
        'business_unit_id',
        'job_title',
        'slug',
        'description',
        'image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

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
