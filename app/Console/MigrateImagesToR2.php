<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MigrateImagesToR2 extends Command
{
    protected $signature   = 'r2:migrate {--dry-run : Lihat apa yang akan diupload tanpa benar-benar mengupload}';
    protected $description = 'Upload semua gambar lokal (public/images/) ke Cloudflare R2';

    private array $targets = [
        ['table' => 'sliders',        'column' => 'image',      'r2_dir' => 'sliders'],
        ['table' => 'posts',          'column' => 'main_image',  'r2_dir' => 'posts'],
        ['table' => 'clients',        'column' => 'logo',        'r2_dir' => 'clients'],
        ['table' => 'careers',        'column' => 'image',       'r2_dir' => 'careers'],
        ['table' => 'catalogs',       'column' => 'file_path',   'r2_dir' => 'catalogs'],
        ['table' => 'menus',          'column' => 'image',       'r2_dir' => 'menus'],
        ['table' => 'promos',         'column' => 'image',       'r2_dir' => 'promos'],
        ['table' => 'business_units', 'column' => 'logo-path',   'r2_dir' => 'logos'],
    ];

    public function handle(): void
    {
        $isDryRun = $this->option('dry-run');

        $isDryRun
            ? $this->warn('🔍 DRY RUN MODE — tidak ada yang diupload, hanya preview')
            : $this->info('🚀 Mulai migrasi gambar ke Cloudflare R2...');

        $this->newLine();

        $totalUploaded = 0;
        $totalSkipped  = 0;
        $totalError    = 0;

        foreach ($this->targets as $target) {
            $this->migrateTable(
                table:    $target['table'],
                column:   $target['column'],
                r2Dir:    $target['r2_dir'],
                isDryRun: $isDryRun,
                uploaded: $totalUploaded,
                skipped:  $totalSkipped,
                error:    $totalError,
            );
        }

        $this->migratePostGallery($isDryRun, $totalUploaded, $totalSkipped, $totalError);

        $this->newLine();
        $this->info('═══════════════════════════════════════');
        $this->info("✅ Selesai!");
        $this->info("   Upload  : {$totalUploaded}");
        $this->info("   Skip    : {$totalSkipped} (sudah di R2 / tidak ada file)");
        $this->info("   Error   : {$totalError}");

        if ($isDryRun) {
            $this->newLine();
            $this->warn('Jalankan tanpa --dry-run untuk upload sesungguhnya:');
            $this->warn('  php artisan r2:migrate');
        }
    }

    private function migrateTable(
        string $table, string $column, string $r2Dir, bool $isDryRun,
        int &$uploaded, int &$skipped, int &$error,
    ): void {
        $this->line("📁 Tabel: <info>{$table}</info> | Kolom: <info>{$column}</info>");

        $rows = DB::table($table)
            ->whereNotNull($column)->where($column, '!=', '')
            ->select('id', $column)->get();

        if ($rows->isEmpty()) {
            $this->line("   (kosong)");
            $this->newLine();
            return;
        }

        foreach ($rows as $row) {
            $path = $row->{$column};

            if (str_starts_with($path, 'http')) { $skipped++; continue; }

            $clean     = ltrim($path, '/');
            $localPath = public_path($clean);

            if (!file_exists($localPath)) {
                $this->warn("   ⚠  File tidak ditemukan: {$localPath}");
                $error++; continue;
            }

            $r2Path = "{$r2Dir}/" . basename($clean);

            if ($isDryRun) {
                $this->line("   → [DRY] {$path}  ➜  {$r2Path}");
                $uploaded++; continue;
            }

            try {
                Storage::disk('r2')->put($r2Path, file_get_contents($localPath));
                DB::table($table)->where('id', $row->id)->update([$column => $r2Path]);
                $this->line("   ✓  {$path}  ➜  {$r2Path}");
                $uploaded++;
            } catch (\Throwable $e) {
                $this->error("   ✗  Gagal: " . $e->getMessage());
                $error++;
            }
        }

        $this->newLine();
    }

    private function migratePostGallery(bool $isDryRun, int &$uploaded, int &$skipped, int &$error): void
    {
        $this->line("📁 Tabel: <info>posts</info> | Kolom: <info>gallery_images</info> (JSON)");

        $posts = DB::table('posts')->whereNotNull('gallery_images')->select('id', 'gallery_images')->get();

        foreach ($posts as $post) {
            $images = json_decode($post->gallery_images, true);
            if (!is_array($images) || empty($images)) continue;

            $newImages = [];
            $changed   = false;

            foreach ($images as $path) {
                if (str_starts_with($path, 'http')) { $newImages[] = $path; $skipped++; continue; }

                $clean     = ltrim($path, '/');
                $localPath = public_path($clean);

                if (!file_exists($localPath)) {
                    $this->warn("   ⚠  File tidak ditemukan: {$localPath}");
                    $newImages[] = $path; $error++; continue;
                }

                $r2Path = "posts/gallery/" . basename($clean);

                if ($isDryRun) {
                    $this->line("   → [DRY] {$path}  ➜  {$r2Path}");
                    $newImages[] = $r2Path; $uploaded++; continue;
                }

                try {
                    Storage::disk('r2')->put($r2Path, file_get_contents($localPath));
                    $newImages[] = $r2Path;
                    $changed     = true;
                    $this->line("   ✓  {$path}  ➜  {$r2Path}");
                    $uploaded++;
                } catch (\Throwable $e) {
                    $this->error("   ✗  Gagal: " . $e->getMessage());
                    $newImages[] = $path; $error++;
                }
            }

            if ($changed) {
                DB::table('posts')->where('id', $post->id)->update([
                    'gallery_images' => json_encode($newImages),
                ]);
            }
        }

        $this->newLine();
    }
}