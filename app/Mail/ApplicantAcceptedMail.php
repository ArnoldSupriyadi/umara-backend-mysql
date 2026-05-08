<?php

namespace App\Mail;

use App\Models\Applicant;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

/**
 * Email dikirim ke applicant ketika HR klik Accept di Filament.
 * Berisi link Google Form untuk applicant melengkapi biodata lebih detail.
 *
 * Template menampilkan:
 * - Logo sub-brand (business unit) yang dilamar applicant
 * - Nama applicant + role yang di-apply
 * - Tombol CTA ke form biodata
 * - Notice "jangan reply email ini"
 *
 * Source MJML: resources/views/emails/applicant-accepted.mjml
 * Compiled HTML: resources/views/emails/applicant-accepted.blade.php
 */
class ApplicantAcceptedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Applicant $applicant,
        public string $biodataFormUrl,
    ) {
        // ============================================================
        // Force load relasi career → businessUnit
        // Penting karena $applicant yang di-pass dari Filament action
        // tidak eager-load relasi ini, sehingga businessUnit->name
        // bisa NULL kalau diakses tanpa load eksplisit.
        // loadMissing() hanya load kalau belum loaded (no extra query
        // jika sudah eager-loaded sebelumnya).
        // ============================================================
        $this->applicant->loadMissing(['career.businessUnit']);
    }

    public function envelope(): Envelope
    {
        // Subject pakai nama parent group static — tidak tergantung sub-brand
        // supaya konsisten meski businessUnit di DB belum lengkap
        $jobTitle = $this->applicant->career->job_title ?? 'posisi yang Anda lamar';

        return new Envelope(
            subject: "Selamat! Lamaran Anda Diterima sebagai {$jobTitle} — Umara Group",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.applicant-accepted',
            with: [
                'applicantName'   => $this->applicant->name,
                'jobTitle'        => $this->applicant->career->job_title ?? '-',
                'brandName'       => $this->applicant->career->businessUnit->name ?? '-',
                'brandLogoUrl'    => $this->resolveBrandLogoUrl(),
                'parentLogoUrl'   => config('services.applicants.parent_logo_url'),
                'biodataFormUrl'  => $this->biodataFormUrl,
            ],
        );
    }

    /**
     * Generate public URL untuk logo sub-brand dari R2.
     * Return null jika tidak ada logo atau gagal generate URL.
     */
    private function resolveBrandLogoUrl(): ?string
    {
        $logoPath = $this->applicant->career->businessUnit->logo ?? null;

        if (! $logoPath) {
            return null;
        }

        try {
            return Storage::disk('r2')->url($logoPath);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
