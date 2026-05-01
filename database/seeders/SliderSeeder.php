<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        // Kosongkan tabel slider sebelum seeding
        DB::table('sliders')->truncate();

        // Ambil semua business unit slug → id
        $units = DB::table('business_units')
            ->select('id', 'slug')
            ->get()
            ->pluck('id', 'slug');

        // Definisi slider secara eksplisit
        // image: path di R2 (tanpa base URL)
        $sliders = [
            [
                'slug'          => 'umara-cipta-rasa',
                'image'         => 'sliders/ucr-slider1.webp',
                'headline'      => 'Building Dreams',
                'subheadline'   => 'Creating Futures',
                'text_position' => 'left',
                'sort_order'    => 1,
            ],
            [
                'slug'          => 'rasa-nusantara-baru',
                'image'         => 'sliders/rnb-slider1.webp',
                'headline'      => 'Contemporary Architecture',
                'subheadline'   => 'Innovative designs that blend functionality with aesthetic excellence',
                'text_position' => 'left',
                'sort_order'    => 1,
            ],
            [
                'slug'          => 'rasa-nusantara-baru',
                'image'         => 'sliders/rnb-slider2.webp',
                'headline'      => 'Golden Dining in Bintaro',
                'subheadline'   => "Premium restaurant experience in the heart of South Jakarta's most sought-after area",
                'text_position' => 'right',
                'sort_order'    => 2,
            ],
            [
                'slug'          => 'rasa-nusantara-baru',
                'image'         => 'sliders/rnb-slider3.webp',
                'headline'      => 'Signature Series',
                'subheadline'   => 'Exclusive luxury developments that define premium living standards',
                'text_position' => 'right',
                'sort_order'    => 3,
            ],
            [
                'slug'          => 'laukita-bersama-indonesia',
                'image'         => 'sliders/lbi-slider2.webp',
                'headline'      => 'Advanced Manufacturing',
                'subheadline'   => 'Cutting-edge equipment and technology for superior food processing solutions',
                'text_position' => 'left',
                'sort_order'    => 1,
            ],
            [
                'slug'          => 'laukita-niaga-indonesia',
                'image'         => 'sliders/lni-slider1.webp',
                'headline'      => 'Advanced Manufacturing',
                'subheadline'   => 'Cutting-edge equipment and technology for superior food processing solutions',
                'text_position' => 'right',
                'sort_order'    => 1,
            ],
            [
                'slug'          => 'umara-mitra-kulina',
                'image'         => 'sliders/umk-slider1.webp',
                'headline'      => 'Catering Industry',
                'subheadline'   => 'High-capacity catering production built on strict food safety protocols',
                'text_position' => 'left',
                'sort_order'    => 1,
            ],
        ];

        $count = 0;

        foreach ($sliders as $data) {
            $buId = $units[$data['slug']] ?? null;

            if (!$buId) {
                $this->command->warn("  ⚠ Business unit '{$data['slug']}' tidak ditemukan di database. Skip.");
                continue;
            }

            DB::table('sliders')->updateOrInsert(
                [
                    'business_unit_id' => $buId,
                    'image'            => $data['image'],
                ],
                [
                    'headline'      => $data['headline'],
                    'subheadline'   => $data['subheadline'],
                    'text_position' => $data['text_position'],
                    'sort_order'    => $data['sort_order'],
                    'created_at'    => Carbon::now(),
                    'updated_at'    => Carbon::now(),
                ]
            );

            $this->command->info("  ✓ Slider: {$data['image']} | {$data['headline']} [{$data['text_position']}]");
            $count++;
        }

        $this->command->info("\nSelesai! {$count} slider berhasil di-seed.");
    }
}
