<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promoImageDir = public_path('images/promo');
        $patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'];
        $files = [];
        foreach ($patterns as $pattern) {
            $files = array_merge($files, glob($promoImageDir . '/' . $pattern));
        }

        if (empty($files)) {
            $this->command?->warn('No promo images found in public/images/promo. Skipping promo seeding.');
            return;
        }

        // Clear existing promos to prevent stale data
        DB::table('promos')->delete();

        // Get or Create "Rasa Nusantara Baru" Business Unit
        $unit = DB::table('business_units')->where('slug', 'rasa-nusantara-baru')->first();
        if (!$unit) {
            $unitId = DB::table('business_units')->insertGetId([
                'name' => 'PT Rasa Nusantara Baru',
                'slug' => 'rasa-nusantara-baru',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        } else {
            $unitId = $unit->id;
        }

        $count = 0;
        foreach ($files as $absPath) {
            $filename = basename($absPath);
            $relative = str_replace(public_path(), '', $absPath);
            if (!str_starts_with($relative, '/')) {
                $relative = '/' . ltrim($relative, '/');
            }

            $base = pathinfo($filename, PATHINFO_FILENAME);
            $title = Str::of($base)
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('promos')->updateOrInsert(
                [
                    'business_unit_id' => $unitId,
                    'title' => $title,
                ],
                [
                    'image' => $relative,
                    'location' => 'jakarta',
                    'status' => 'active',
                    'updated_at' => Carbon::now(),
                    'created_at' => Carbon::now(), // Ensure created_at is set for new records
                ]
            );
            $count++;
        }

        $this->command?->info("Seeded {$count} promos for Rasa Nusantara Baru.");
    }
}
