<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Catalog extends Model
{
    use LogsActivity;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Catalog')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->title ?? $this->getKey();
                return "[Catalog] {$label} was {$eventName}";
            });
    }
    protected $fillable = [
        'business_unit_id',
        'title',
        'file_path',
    ];

    public function businessUnit(): BelongsTo
    {
        return $this->belongsTo(BusinessUnit::class);
    }

    public function getFileUrlAttribute(): ?string
    {
        if (!$this->file_path) return null;
        if (str_starts_with($this->file_path, 'http')) return $this->file_path;
        $clean = ltrim($this->file_path, '/');
        if (str_starts_with($clean, 'images/')) return asset($clean);
        return Storage::disk('r2')->url($this->file_path);
    }
}
