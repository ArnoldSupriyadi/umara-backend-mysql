<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientImageDir = public_path('images/client');
        $patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.svg'];
        $files = [];
        foreach ($patterns as $pattern) {
            $files = array_merge($files, glob($clientImageDir . '/' . $pattern));
        }

        if (empty($files)) {
            $this->command?->warn('No client images found in public/images/client. Skipping client seeding.');
            return;
        }

        // Clear existing clients to ensure only "Umara Nikmat Boga" clients exist
        DB::table('clients')->delete();

        $unit = DB::table('business_units')->where('slug', 'umara-nikmat-boga')->first();

        if (!$unit) {
            $unitId = DB::table('business_units')->insertGetId([
                'name' => 'Umara Nikmat Boga',
                'slug' => 'umara-nikmat-boga',
                'logo-path' => null,
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
            $clientName = Str::of($base)
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('clients')->updateOrInsert(
                [
                    'name' => $clientName,
                    'business_unit_id' => $unitId,
                ],
                [
                    'logo' => $relative,
                    'updated_at' => Carbon::now(),
                ]
            );
            $count++;
        }

        $this->command?->info("Seeded {$count} client records for Umara Nikmat Boga.");
    }
}
