<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BusinessUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $r2Url = "https://assets.bridgeflow.my.id";
        
        $units = [
            [
                'name' => 'Rasa Nusantara Baru',
                'slug' => 'rasa-nusantara-baru',
                'logo' => $r2Url . '/logos/logo-rnb.png',
            ],
            [
                'name' => 'Umara Cipta Rasa',
                'slug' => 'umara-cipta-rasa',
                'logo' => $r2Url . '/logos/ucr-logo.png',
            ],
            [
                'name' => 'Umara Mitra Kulina',
                'slug' => 'umara-mitra-kulina',
                'logo' => $r2Url . '/logos/logo-umk.png',
            ],
            [
                'name' => 'Laukita Bersama Indonesia',
                'slug' => 'laukita-bersama-indonesia',
                'logo' => $r2Url . '/logos/LBI-Logo.png',
            ],
            [
                'name' => 'Laukita Niaga Indonesia',
                'slug' => 'laukita-niaga-indonesia',
                'logo' => $r2Url . '/logos/laukkita-logo.png',
            ],
            [
                'name' => 'Umara Nikmat Boga',
                'slug' => 'umara-nikmat-boga',
                'logo' => $r2Url . '/logos/umara-group.png',
            ],
        ];

        foreach ($units as $unit) {
            DB::table('business_units')->updateOrInsert(
                ['slug' => $unit['slug']],
                [
                    'name' => $unit['name'],
                    'logo-path' => $unit['logo'],
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
        }
    }
}
