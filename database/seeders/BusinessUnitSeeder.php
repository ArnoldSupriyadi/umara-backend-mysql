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
        $units = [
            [
                'name' => 'Rasa Nusantara Baru',
                'slug' => 'rasa-nusantara-baru',
                'logo' => 'images/logo/logo-rnb.png',
            ],
            [
                'name' => 'Umara Cipta Rasa',
                'slug' => 'umara-cipta-rasa',
                'logo' => 'images/logo/ucr-logo.png',
            ],
            [
                'name' => 'Umara Mitra Kulina',
                'slug' => 'umara-mitra-kulina',
                'logo' => 'images/logo/logo-umk.png',
            ],
            [
                'name' => 'Laukita Bersama Indonesia',
                'slug' => 'laukita-bersama-indonesia',
                'logo' => 'images/logo/LBI-Logo.png',
            ],
            [
                'name' => 'Laukita Niaga Indonesia',
                'slug' => 'laukita-niaga-indonesia',
                'logo' => 'images/logo/laukkita-logo.png',
            ],
            [
                'name' => 'Umara Nikmat Boga',
                'slug' => 'umara-nikmat-boga',
                'logo' => 'images/logo/umara-group.png',
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
