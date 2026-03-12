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
        DB::table('sliders')->truncate();

        $sliderDir = public_path('images/slider');

        if (!is_dir($sliderDir)) {
            $this->command->warn("Folder tidak ditemukan: {$sliderDir}");
            return;
        }

        $files = [];
        foreach (['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'] as $pattern) {
            $files = array_merge($files, glob($sliderDir . '/' . $pattern));
        }
        $files = array_values(array_unique($files));

        if (empty($files)) {
            $this->command->warn('Tidak ada gambar di public/images/slider.');
            return;
        }

        $units       = DB::table('business_units')->select('id', 'slug')->get()->pluck('id', 'slug');
        $orderByUnit = [];
        $count       = 0;

        foreach ($files as $absPath) {
            $filename  = basename($absPath);
            $lowerName = strtolower($filename);

            $buId = null;
            if (str_contains($lowerName, 'rnb') && isset($units['rasa-nusantara-baru'])) {
                $buId = $units['rasa-nusantara-baru'];
            } elseif (str_contains($lowerName, 'ucr') && isset($units['umara-cipta-rasa'])) {
                $buId = $units['umara-cipta-rasa'];
            } elseif (str_contains($lowerName, 'ug') && isset($units['umara-nikmat-boga'])) {
                $buId = $units['umara-nikmat-boga'];
            } elseif (str_contains($lowerName, 'lbi') && isset($units['laukita-bersama-indonesia'])) {  // ← tambah
                $buId = $units['laukita-bersama-indonesia'];
            } elseif (str_contains($lowerName, 'lni') && isset($units['laukita-niaga-indonesia'])) {    // ← tambah
                $buId = $units['laukita-niaga-indonesia'];
            } elseif (str_contains($lowerName, 'umk') && isset($units['umara-mitra-kulina'])) {         // ← tambah
                $buId = $units['umara-mitra-kulina'];
            }

            if (!$buId) {
                $this->command->warn("Tidak bisa cocokkan unit untuk: {$filename}. Skip.");
                continue;
            }

            $orderByUnit[$buId] = $orderByUnit[$buId] ?? 1;
            $sortOrder          = $orderByUnit[$buId];
            if ($sortOrder > 30) continue;

            // Upload ke R2
            $r2Path = 'sliders/' . $filename;
            Storage::disk('r2')->put($r2Path, file_get_contents($absPath));

            $headline = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('sliders')->updateOrInsert(
                ['business_unit_id' => $buId, 'image' => $r2Path],
                [
                    'headline'    => $headline,
                    'subheadline' => 'headline On Progress',
                    'sort_order'  => $sortOrder,
                    'created_at'  => Carbon::now(),
                    'updated_at'  => Carbon::now(),
                ]
            );

            $this->command->info("  ✓ {$filename} → {$r2Path}");
            $orderByUnit[$buId]++;
            $count++;
        }

        $this->command->info("Seeded {$count} sliders ke R2.");
    }
}