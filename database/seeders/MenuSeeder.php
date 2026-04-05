<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allowedLocations = [
            'menu-bintaro-avenue',
            'menu-prapanca',
            'menu-umara-house',
        ];
        $extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

        DB::table('menus')->delete();

        $unit = DB::table('business_units')->where('slug', 'rasa-nusantara-baru')->first();

        if (!$unit) {
            $unitId = DB::table('business_units')->insertGetId([
                'name'       => 'Rasa Nusantara Baru',
                'slug'       => 'rasa-nusantara-baru',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        } else {
            $unitId = $unit->id;
        }

        $r2Url = env('CLOUDFLARE_R2_PUBLIC_URL');
        $count = 0;

        foreach ($allowedLocations as $location) {
            $r2Path = 'rnb-assets/menus/' . $location;
            $allFiles = Storage::disk('r2')->files($r2Path);

            $files = array_filter($allFiles, fn($file) => in_array(
                strtolower(pathinfo($file, PATHINFO_EXTENSION)),
                $extensions
            ));

            if (empty($files)) {
                $this->command?->warn("No menu images found in R2 {$r2Path}/ folder.");
                continue;
            }

            foreach ($files as $key) {
                $filename  = basename($key);
                $publicUrl = $r2Url . '/' . $key;

                $title = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                    ->replace(['-', '_'], ' ')
                    ->replaceMatches('/\s+/', ' ')
                    ->title()
                    ->toString();

                DB::table('menus')->updateOrInsert(
                    [
                        'business_unit_id' => $unitId,
                        'title'            => $title,
                        'location'         => $location,
                    ],
                    [
                        'image'      => $publicUrl,
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
