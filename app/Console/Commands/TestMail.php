<?php

namespace App\Console\Commands;

use App\Mail\ApplicantAcceptedMail;
use App\Models\Applicant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

/**
 * Command untuk test SMTP & template email.
 *
 * Usage:
 *   php artisan mail:test                          → kirim email test sederhana
 *   php artisan mail:test --to=user@email.com      → kirim ke email custom
 *   php artisan mail:test --template               → kirim email applicant accepted (full template)
 *   php artisan mail:test --to=user@email.com --template
 */
class TestMail extends Command
{
    protected $signature = 'mail:test
                            {--to= : Email tujuan (default: MAIL_FROM_ADDRESS)}
                            {--template : Kirim full template ApplicantAcceptedMail}';

    protected $description = 'Test SMTP & email template untuk verifikasi konfigurasi mail';

    public function handle(): int
    {
        $to = $this->option('to') ?? config('mail.from.address');

        if (! $to) {
            $this->error('❌ Tidak ada alamat tujuan. Pakai --to=email atau set MAIL_FROM_ADDRESS di .env');
            return self::FAILURE;
        }

        $this->info('=== SMTP Test ===');
        $this->line('Driver        : ' . config('mail.default'));
        $this->line('Host          : ' . config('mail.mailers.smtp.host'));
        $this->line('Port          : ' . config('mail.mailers.smtp.port'));
        $this->line('Username      : ' . config('mail.mailers.smtp.username'));
        $this->line('Encryption    : ' . (config('mail.mailers.smtp.encryption') ?? 'none'));
        $this->line('From          : ' . config('mail.from.address') . ' (' . config('mail.from.name') . ')');
        $this->line('To            : ' . $to);
        $this->line('Mode          : ' . ($this->option('template') ? 'Full Template' : 'Simple Test'));
        $this->newLine();

        if (! $this->confirm('Lanjut kirim test email?', true)) {
            $this->warn('Dibatalkan.');
            return self::SUCCESS;
        }

        try {
            if ($this->option('template')) {
                // Mode full template — pakai data applicant pertama atau dummy
                $applicant = Applicant::with('career.businessUnit')->latest()->first();

                if (! $applicant) {
                    $this->warn('⚠ Tidak ada data applicant di DB. Membuat object dummy untuk preview template.');
                    $applicant = new Applicant([
                        'name'  => 'John Doe (TEST)',
                        'email' => $to,
                    ]);
                    $applicant->setRelation('career', new \App\Models\Career([
                        'job_title' => 'Chef de Partie',
                    ]));
                }

                $biodataFormUrl = config('services.applicants.biodata_form_url');
                $this->line('Template URL  : ' . $biodataFormUrl);
                $this->newLine();

                Mail::to($to)->send(new ApplicantAcceptedMail($applicant, $biodataFormUrl));
            } else {
                // Mode simple — kirim raw email
                Mail::raw(
                    "Ini adalah email test dari Umara CMS.\n\n"
                    . "Waktu kirim: " . now()->format('Y-m-d H:i:s') . "\n"
                    . "SMTP Host  : " . config('mail.mailers.smtp.host') . "\n\n"
                    . "Jika kamu menerima email ini, berarti konfigurasi SMTP sudah berjalan dengan baik. ✅",
                    function ($msg) use ($to) {
                        $msg->to($to)
                            ->subject('[TEST] Umara CMS - SMTP Test - ' . now()->format('H:i:s'));
                    }
                );
            }

            $this->newLine();
            $this->info('✅ Email berhasil dikirim ke ' . $to);
            $this->line('   Cek inbox (atau folder spam) untuk verifikasi.');
            $this->line('   Cek juga dashboard Brevo → Statistics untuk delivery report.');

            return self::SUCCESS;
        } catch (\Throwable $e) {
            $this->newLine();
            $this->error('❌ Gagal kirim email!');
            $this->error('   Error: ' . $e->getMessage());
            $this->newLine();
            $this->warn('Common issues:');
            $this->line('  1. Cek MAIL_PASSWORD di .env (Brevo SMTP key, bukan password akun)');
            $this->line('  2. Cek MAIL_HOST = smtp-relay.brevo.com');
            $this->line('  3. Cek MAIL_PORT = 587 dan MAIL_ENCRYPTION = tls');
            $this->line('  4. Cek MAIL_FROM_ADDRESS sudah verified di Brevo (Settings → Senders)');
            $this->line('  5. Jalankan: php artisan config:clear');

            return self::FAILURE;
        }
    }
}
