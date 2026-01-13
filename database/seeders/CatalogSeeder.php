<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing catalogs
        DB::table('catalogs')->delete();

        $baseDir = public_path('images/catalog');
        if (!is_dir($baseDir)) {
            $this->command?->warn("Catalog folder not found: images/catalog");
            return;
        }

        // Fetch Business Units
        $rasaUnit = DB::table('business_units')->where('slug', 'rasa-nusantara-baru')->first();
        $umaraUnit = DB::table('business_units')->where('slug', 'umara-cipta-rasa')->first();

        // Ensure units exist or fallback
        if (!$rasaUnit) {
             $rasaId = DB::table('business_units')->insertGetId([
                 'name' => 'PT Rasa Nusantara Baru',
                 'slug' => 'rasa-nusantara-baru',
                 'created_at' => Carbon::now(),
                 'updated_at' => Carbon::now(),
             ]);
        } else {
            $rasaId = $rasaUnit->id;
        }

        if (!$umaraUnit) {
             $umaraId = DB::table('business_units')->insertGetId([
                 'name' => 'PT Umara Cipta Rasa',
                 'slug' => 'umara-cipta-rasa',
                 'created_at' => Carbon::now(),
                 'updated_at' => Carbon::now(),
             ]);
        } else {
            $umaraId = $umaraUnit->id;
        }

        $files = glob($baseDir . '/*.pdf');
        $count = 0;

        foreach ($files as $absPath) {
            $filename = basename($absPath);
            $relative = str_replace(public_path(), '', $absPath);
            // Ensure relative path starts with /
            if (!str_starts_with($relative, '/')) {
                $relative = '/' . ltrim($relative, '/');
            }

            $upperName = strtoupper($filename);
            
            // Logic to determine Business Unit
            if (str_contains($upperName, 'RASA')) {
                $buId = $rasaId;
            } elseif (str_contains($upperName, 'UMARA')) {
                $buId = $umaraId;
            } else {
                $buId = $rasaId; // Default
            }

            $title = Str::of(pathinfo($filename, PATHINFO_FILENAME))
                ->replace(['-', '_'], ' ')
                ->replaceMatches('/\\s+/', ' ')
                ->title()
                ->toString();

            DB::table('catalogs')->updateOrInsert(
                [
                    'file_path' => $relative,
                ],
                [
                    'business_unit_id' => $buId,
                    'title' => $title,
                    'image' => null, // No cover image available
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
            $count++;
        }

        $this->command?->info("Seeded {$count} catalogs.");
    }
}
