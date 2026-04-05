<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allFiles   = Storage::disk('r2')->files('promos');
        $extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
        $files      = array_filter($allFiles, fn($file) => in_array(
            strtolower(pathinfo($file, PATHINFO_EXTENSION)),
            $extensions
        ));

        if (empty($files)) {
            $this->command?->warn('No promo images found in R2 promos/ folder. Skipping promo seeding.');
            return;
        }

        DB::table('promos')->delete();

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

        foreach ($files as $key) {
            $filename  = basename($key);
            $publicUrl = $r2Url . '/' . $key;

            $base  = pathinfo($filename, PATHINFO_FILENAME);
            $title = Str::of($base)
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('promos')->updateOrInsert(
                [
                    'business_unit_id' => $unitId,
                    'title'            => $title,
                ],
                [
                    'image'      => $publicUrl,
                    'location'   => 'jakarta',
                    'status'     => 'active',
                    'updated_at' => Carbon::now(),
                    'created_at' => Carbon::now(),
                ]
            );
            $count++;
        }

        $this->command?->info("Seeded {$count} promos for Rasa Nusantara Baru.");
    }
}
