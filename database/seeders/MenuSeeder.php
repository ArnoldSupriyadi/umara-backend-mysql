<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $baseDir = public_path('images/menu');
        $allowedLocations = [
            'menu-bintaro-avenue',
            'menu-prapanca',
            'menu-umara-house',
        ];

        // Clear existing menus to prevent stale data
        DB::table('menus')->delete();

        $unit = DB::table('business_units')->where('slug', 'rasa-nusantara-baru')->first();

        if (!$unit) {
            $unitId = DB::table('business_units')->insertGetId([
                'name' => 'Rasa Nusantara Baru',
                'slug' => 'rasa-nusantara-baru',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        } else {
            $unitId = $unit->id;
        }

        $patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'];
        $count = 0;

        foreach ($allowedLocations as $location) {
            $dir = $baseDir . '/' . $location;
            if (!is_dir($dir)) {
                $this->command?->warn("Location folder not found: {$location}");
                continue;
            }

            $files = [];
            foreach ($patterns as $pattern) {
                $files = array_merge($files, glob($dir . '/' . $pattern));
            }
            foreach ($files as $absPath) {
                $filename = basename($absPath);
                $relative = str_replace(public_path(), '', $absPath);
                if (!str_starts_with($relative, '/')) {
                    $relative = '/' . ltrim($relative, '/');
                }
                $title = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                    ->replace(['-', '_'], ' ')
                    ->replaceMatches('/\\s+/', ' ')
                    ->title()
                    ->toString();

                DB::table('menus')->updateOrInsert(
                    [
                        'business_unit_id' => $unitId,
                        'title' => $title,
                        'location' => $location,
                    ],
                    [
                        'image' => $relative,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ]
                );
                $count++;
            }
        }

        $this->command?->info("Seeded {$count} menus for Rasa Nusantara Baru.");
    }
}
