<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing sliders
        DB::table('sliders')->truncate();

        $sliderDir = public_path('images/slider');

        if (!is_dir($sliderDir)) {
            $this->command?->warn("Slider directory not found: {$sliderDir}");
            return;
        }

        $patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'];
        $files = [];
        foreach ($patterns as $pattern) {
            $files = array_merge($files, glob($sliderDir . '/' . $pattern));
        }

        // Deduplicate file list defensively
        $files = array_values(array_unique($files));

        if (empty($files)) {
            $this->command?->warn('No slider images found in public/images/slider.');
            return;
        }

        // Fetch Business Units
        $units = DB::table('business_units')->select('id', 'slug')->get()->pluck('id', 'slug');

        $orderByUnit = [];

        $count = 0;
        foreach ($files as $absPath) {
            $filename = basename($absPath);
            $lowerName = strtolower($filename);

            $relative = str_replace(public_path(), '', $absPath);
            if (!str_starts_with($relative, '/')) {
                $relative = '/' . ltrim($relative, '/');
            }

            // Determine Business Unit
            $buId = null;
            if (str_contains($lowerName, 'rnb') && isset($units['rasa-nusantara-baru'])) {
                $buId = $units['rasa-nusantara-baru'];
            } elseif (str_contains($lowerName, 'ucr') && isset($units['umara-cipta-rasa'])) {
                $buId = $units['umara-cipta-rasa'];
            } elseif (str_contains($lowerName, 'ug') && isset($units['umara-nikmat-boga'])) {
                $buId = $units['umara-nikmat-boga'];
            }

            if (!$buId) {
                $this->command?->warn("Could not match business unit for file: {$filename}. Skipping.");
                continue;
            }

            if (! isset($orderByUnit[$buId])) {
                $orderByUnit[$buId] = 1;
            }

            $sortOrder = $orderByUnit[$buId];

            if ($sortOrder > 30) {
                continue;
            }

            $headline = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('sliders')->updateOrInsert(
                [
                    'business_unit_id' => $buId,
                    'image' => $relative,
                ],
                [
                    'headline' => $headline,
                    'subheadline' => 'headline On Progress',
                    'sort_order' => $sortOrder,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );

            $orderByUnit[$buId]++;

            $count++;
        }

        $this->command?->info("Seeded {$count} sliders.");
    }
}
