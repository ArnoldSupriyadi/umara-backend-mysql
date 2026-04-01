<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $allFiles   = Storage::disk('r2')->files('clients');
        $extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
        $files      = array_filter($allFiles, fn($file) => in_array(
            strtolower(pathinfo($file, PATHINFO_EXTENSION)),
            $extensions
        ));

        if (empty($files)) {
            $this->command?->warn('No client images found in R2 clients/ folder. Skipping client seeding.');
            return;
        }

        DB::table('clients')->delete();

        $unit = DB::table('business_units')->where('slug', 'umara-nikmat-boga')->first();

        if (!$unit) {
            $unitId = DB::table('business_units')->insertGetId([
                'name'       => 'Umara Nikmat Boga',
                'slug'       => 'umara-nikmat-boga',
                'logo_path'  => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        } else {
            $unitId = $unit->id;
        }

        $r2Url = env('CLOUDFLARE_R2_PUBLIC_URL');
        $count = 0;

        foreach ($files as $key) {
            $filename   = basename($key);
            $publicUrl  = $r2Url . '/' . $key;

            $base       = pathinfo($filename, PATHINFO_FILENAME);
            $clientName = Str::of($base)
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\s+/', ' ')
                ->title()
                ->toString();

            DB::table('clients')->updateOrInsert(
                [
                    'name'             => $clientName,
                    'business_unit_id' => $unitId,
                ],
                [
                    'logo'       => $publicUrl,
                    'updated_at' => Carbon::now(),
                ]
            );
            $count++;
        }

        $this->command?->info("Seeded {$count} client records for Umara Nikmat Boga.");
    }
}