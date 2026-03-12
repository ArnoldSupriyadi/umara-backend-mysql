<?php

namespace App\Console\Commands;

use App\Services\ImageService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ConvertImagesToWebp extends Command
{
    protected $signature   = 'r2:webp {--dry-run : Preview saja tanpa benar-benar convert}';
    protected $description = 'Convert semua gambar di R2 (JPG/PNG) ke format WebP';

    // Daftar tabel dan kolom gambar yang akan diconvert
    private array $targets = [
        ['table' => 'sliders',        'column' => 'image'],
        ['table' => 'clients',        'column' => 'logo'],
        ['table' => 'careers',        'column' => 'image'],
        ['table' => 'menus',          'column' => 'image'],
        ['table' => 'promos',         'column' => 'image'],
        ['table' => 'business_units', 'column' => 'logo-path'],
    ];

    public function handle(): void
    {
        $isDryRun = $this->option('dry-run');

        $isDryRun
            ? $this->warn('🔍 DRY RUN — tidak ada yang diconvert, hanya preview')
            : $this->info('🚀 Mulai convert gambar ke WebP...');

        $this->newLine();

        $converted = 0;
        $skipped   = 0;
        $errors    = 0;

        // Convert kolom tunggal
        foreach ($this->targets as $target) {
            $this->processColumn(
                $target['table'], $target['column'],
                $isDryRun, $converted, $skipped, $errors
            );
        }

        // Convert main_image posts
        $this->processColumn('posts', 'main_image', $isDryRun, $converted, $skipped, $errors);

        // Convert gallery_images posts (JSON array)
        $this->processPostGallery($isDryRun, $converted, $skipped, $errors);

        $this->newLine();
        $this->info('════════════════════════════════════');
        $this->info("✅ Selesai!");
        $this->info("   Converted : {$converted}");
        $this->info("   Skipped   : {$skipped} (sudah WebP / null)");
        $this->info("   Error     : {$errors}");

        if ($isDryRun) {
            $this->newLine();
            $this->warn('Jalankan tanpa --dry-run untuk convert sesungguhnya:');
            $this->warn('  php artisan r2:webp');
        }
    }

    private function processColumn(
        string $table, string $column, bool $isDryRun,
        int &$converted, int &$skipped, int &$errors
    ): void {
        $this->line("📁 <info>{$table}</info> → <info>{$column}</info>");

        $rows = DB::table($table)
            ->whereNotNull($column)
            ->where($column, '!=', '')
            ->select('id', $column)
            ->get();

        foreach ($rows as $row) {
            $path = $row->{$column};

            // Skip URL eksternal
            if (str_starts_with($path, 'http')) {
                $skipped++;
                continue;
            }

            // Skip yang sudah WebP
            if (str_ends_with(strtolower($path), '.webp')) {
                $this->line("   ⏭  (sudah WebP) {$path}");
                $skipped++;
                continue;
            }

            if ($isDryRun) {
                $newPath = preg_replace('/\.(jpg|jpeg|png|gif)$/i', '.webp', $path);
                $this->line("   → [DRY] {$path}  ➜  {$newPath}");
                $converted++;
                continue;
            }

            $newPath = ImageService::convertExistingR2ToWebp($path);

            if ($newPath) {
                DB::table($table)->where('id', $row->id)->update([$column => $newPath]);
                $this->line("   ✓  {$path}  ➜  {$newPath}");
                $converted++;
            } else {
                $this->error("   ✗  Gagal convert: {$path}");
                $errors++;
            }
        }

        $this->newLine();
    }

    private function processPostGallery(bool $isDryRun, int &$converted, int &$skipped, int &$errors): void
    {
        $this->line("📁 <info>posts</info> → <info>gallery_images</info> (JSON)");

        $posts = DB::table('posts')->whereNotNull('gallery_images')->select('id', 'gallery_images')->get();

        foreach ($posts as $post) {
            $images = json_decode($post->gallery_images, true);
            if (!is_array($images) || empty($images)) continue;

            $newImages = [];
            $changed   = false;

            foreach ($images as $path) {
                if (str_starts_with($path, 'http') || str_ends_with(strtolower($path), '.webp')) {
                    $newImages[] = $path;
                    $skipped++;
                    continue;
                }

                if ($isDryRun) {
                    $newPath     = preg_replace('/\.(jpg|jpeg|png|gif)$/i', '.webp', $path);
                    $newImages[] = $newPath;
                    $this->line("   → [DRY] {$path}  ➜  {$newPath}");
                    $converted++;
                    continue;
                }

                $newPath = ImageService::convertExistingR2ToWebp($path);

                if ($newPath) {
                    $newImages[] = $newPath;
                    $changed     = true;
                    $this->line("   ✓  {$path}  ➜  {$newPath}");
                    $converted++;
                } else {
                    $newImages[] = $path;
                    $this->error("   ✗  Gagal: {$path}");
                    $errors++;
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
