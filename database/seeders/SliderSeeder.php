<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        // Kosongkan tabel slider sebelum seeding
        DB::table('sliders')->truncate();

        // 1. Ambil daftar file langsung dari folder 'sliders' di R2
        // Ini akan mengembalikan array path seperti ["sliders/ug-slider1.jpg", ...]
        $files = Storage::disk('r2')->files('sliders');

        if (empty($files)) {
            $this->command->warn('Tidak ada file ditemukan di folder "sliders" pada disk R2.');
            return;
        }

        $units = DB::table('business_units')->select('id', 'slug')->get()->pluck('id', 'slug');
        $orderByUnit = [];
        $count = 0;

        foreach ($files as $r2Path) {
            $filename = basename($r2Path);
            $lowerName = strtolower($filename);

            if (!str_ends_with($lowerName, '.webp')) {
                continue;
            }

            // 2. Logika pencocokan Business Unit (tetap sama)
            $buId = null;
            if (str_contains($lowerName, 'rnb') && isset($units['rasa-nusantara-baru'])) {
                $buId = $units['rasa-nusantara-baru'];
            } elseif (str_contains($lowerName, 'ucr') && isset($units['umara-cipta-rasa'])) {
                $buId = $units['umara-cipta-rasa'];
            } elseif (str_contains($lowerName, 'ug') && isset($units['umara-nikmat-boga'])) {
                $buId = $units['umara-nikmat-boga'];
            } elseif (str_contains($lowerName, 'lbi') && isset($units['laukita-bersama-indonesia'])) {
                $buId = $units['laukita-bersama-indonesia'];
            } elseif (str_contains($lowerName, 'lni') && isset($units['laukita-niaga-indonesia'])) {
                $buId = $units['laukita-niaga-indonesia'];
            } elseif (str_contains($lowerName, 'umk') && isset($units['umara-mitra-kulina'])) {
                $buId = $units['umara-mitra-kulina'];
            }

            if (!$buId) {
                $this->command->warn("Tidak bisa cocokkan unit untuk file R2: {$filename}. Skip.");
                continue;
            }

            $orderByUnit[$buId] = $orderByUnit[$buId] ?? 1;
            $sortOrder = $orderByUnit[$buId];

            // 3. Generate Headline dari nama file
            $headline = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            // 4. Masukkan ke database
            DB::table('sliders')->updateOrInsert(
                ['business_unit_id' => $buId, 'image' => $r2Path],
                [
                    'headline'    => $headline,
                    'subheadline' => 'Slider dari R2',
                    'sort_order'  => $sortOrder,
                    'created_at'  => Carbon::now(),
                    'updated_at'  => Carbon::now(),
                ]
            );

            $this->command->info("  ✓ Terdaftar: {$filename} (Path: {$r2Path})");
            $orderByUnit[$buId]++;
            $count++;
        }

        $this->command->info("Selesai! {$count} data slider dari R2 telah didaftarkan ke database.");
    }
}
