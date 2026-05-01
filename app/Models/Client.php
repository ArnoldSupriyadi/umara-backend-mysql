<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Client extends Model
{
    use LogsActivity;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Client')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->name ?? $this->getKey();
                return "[Client] {$label} was {$eventName}";
            });
    }
    protected $fillable = [
        'business_unit_id',
        'name',
        'logo',
    ];

    public function businessUnit(): BelongsTo
    {
        return $this->belongsTo(BusinessUnit::class);
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo) return null;
        if (str_starts_with($this->logo, 'http')) return $this->logo;
        $clean = ltrim($this->logo, '/');
        if (str_starts_with($clean, 'images/')) return asset($clean);
        return Storage::disk('r2')->url($this->logo);
    }
}
