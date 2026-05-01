<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Applicant extends Model
{
    use LogsActivity;

    // Mengizinkan semua kolom diisi

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Applicant')
            ->setDescriptionForEvent(function(string $eventName) {
                $label = $this->name ?? $this->getKey();
                return "[Applicant] {$label} was {$eventName}";
            });
    }
    protected $guarded = [];

    //relasi balik ke model Career
    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
