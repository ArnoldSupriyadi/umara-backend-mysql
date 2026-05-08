<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Applicant extends Model
{
    use LogsActivity;

    /**
     * Status workflow constants.
     * - PENDING  : default saat submit form, menunggu review HR
     * - ACCEPTED : pelamar diterima
     * - REJECTED : pelamar ditolak
     *
     * Setelah accepted/rejected, status dikunci di UI Filament.
     */
    public const STATUS_PENDING  = 'pending';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';

    public const STATUSES = [
        self::STATUS_PENDING  => 'Pending',
        self::STATUS_ACCEPTED => 'Diterima',
        self::STATUS_REJECTED => 'Ditolak',
    ];

    /**
     * cv_path    : longText - base64 encoded PDF (tanpa prefix data URI)
     * photo_path : longText - base64 encoded WebP image (tanpa prefix data URI)
     * status     : string   - pending|accepted|rejected (default: pending)
     */
    protected $guarded = [];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->useLogName('Applicant')
            ->setDescriptionForEvent(function (string $eventName) {
                $label = $this->name ?? $this->getKey();
                return "[Applicant] {$label} was {$eventName}";
            });
    }

    // relasi balik ke model Career
    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
