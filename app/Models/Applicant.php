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
     * Format prefix data URI mengikuti konvensi HRIS Program (hardcoded
     * "image/png" untuk SEMUA file, terlepas dari mime aslinya).
     *
     * Contoh isi DB:
     *   cv_path    : "data:image/png;base64,JVBERi0xLjcK..."  (isi PDF, prefix bohong)
     *   photo_path : "data:image/png;base64,UklGRl..."        (isi WebP, prefix bohong)
     *
     * Browser modern lenient terhadap mismatch prefix di <img>, jadi tetap
     * render dengan benar berdasarkan magic bytes konten aktual.
     */
    public const HRIS_DATA_URI_PREFIX = 'data:image/png;base64,';

    /**
     * cv_path        : longText - base64 encoded PDF (DENGAN prefix HRIS)
     * photo_path     : longText - base64 encoded WebP image (DENGAN prefix HRIS)
     * cv_filename    : string   - nama file original CV upload user
     * photo_filename : string   - nama file original foto upload user
     * status         : string   - pending|accepted|rejected (default: pending)
     */
    protected $guarded = [];

    /**
     * Cast otomatis untuk date_of_birth ke Carbon — supaya bisa pakai
     * ->format() di blade, export Excel, atau Filament tanpa error.
     */
    protected $casts = [
        'date_of_birth'       => 'date',
        'email_sent_at'       => 'datetime',
        'willing_to_relocate' => 'boolean',
    ];

    // ============================================================
    // ACCESSORS — strip prefix data URI lalu decode ke binary
    // Pakai: $applicant->cv_binary, $applicant->photo_binary
    // ============================================================

    /**
     * Decode cv_path ke binary PDF content (siap untuk download/output).
     */
    public function getCvBinaryAttribute(): string
    {
        return base64_decode(self::stripDataUriPrefix($this->cv_path ?? ''));
    }

    /**
     * Decode photo_path ke binary image content (siap untuk download/output).
     */
    public function getPhotoBinaryAttribute(): string
    {
        return base64_decode(self::stripDataUriPrefix($this->photo_path ?? ''));
    }

    // ============================================================
    // STATIC HELPERS — encode/decode prefix data URI HRIS-style
    // ============================================================

    /**
     * Tambah prefix HRIS ke base64 string.
     * Contoh:
     *   Applicant::addHrisPrefix('JVBERi0xLjcK...')
     *   → "data:image/png;base64,JVBERi0xLjcK..."
     */
    public static function addHrisPrefix(string $base64): string
    {
        return self::HRIS_DATA_URI_PREFIX . $base64;
    }

    /**
     * Strip prefix data URI dari string (apapun mime-nya).
     * Pakai regex agar safe terhadap variasi prefix (image/png, image/webp,
     * application/pdf, dll) — kalau suatu saat data lama belum migrasi.
     */
    public static function stripDataUriPrefix(string $dataUri): string
    {
        return preg_replace('/^data:[^;]+;base64,/', '', $dataUri);
    }

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
