<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Starting News Seeder (Total 9 Records)...');

        $downloadImage = function ($url, $filename) {
            try {
                if (!Storage::disk('public')->exists('posts')) {
                    Storage::disk('public')->makeDirectory('posts');
                }
                $contents = @file_get_contents($url);
                if ($contents !== false) {
                    Storage::disk('public')->put('posts/' . $filename, $contents);
                    return 'posts/' . $filename;
                }
            } catch (\Exception $e) {
                $this->command->warn("Failed to download image: $filename");
            }
            return null;
        };

        $posts = [
            [
                'unit_name' => 'Umara Cipta Rasa',
                'title' => 'M20 Annual Gathering: Culinary Excellence by Umara',
                'published_at' => Carbon::create(2025, 9, 12),
                'content' => '<p>Umara Cipta Rasa presented curated menus at the M20 annual gathering, highlighting Indonesian flavors with modern plating.</p>',
                'main_img_url' => 'https://picsum.photos/seed/m20_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/m20_g1/800/600', 'https://picsum.photos/seed/m20_g2/800/600']
            ],
            [
                'unit_name' => 'Umara Mitra Kulina',
                'title' => 'Saudi Export Business Forum Catering Service',
                'published_at' => Carbon::create(2025, 9, 20),
                'content' => '<p>Professional catering service delivered for Saudi Export Business Forum with premium selections tailored to guests.</p>',
                'main_img_url' => 'https://picsum.photos/seed/saudi_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/saudi_g1/800/600', 'https://picsum.photos/seed/saudi_g2/800/600']
            ],
            [
                'unit_name' => 'Laukita Niaga Indonesia',
                'title' => 'Wardah Beauty Conference: Laukita Premium Frozen Showcase',
                'published_at' => Carbon::create(2025, 9, 28),
                'content' => '<p>Laukita presented premium frozen food assortments during Wardah conference, engaging attendees with tasting sessions.</p>',
                'main_img_url' => 'https://picsum.photos/seed/wardah_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/wardah_g1/800/600', 'https://picsum.photos/seed/wardah_g2/800/600']
            ],
            [
                'unit_name' => 'Rasa Nusantara Baru',
                'title' => 'National Gymnastics Championship Hospitality Support',
                'published_at' => Carbon::create(2025, 10, 3),
                'content' => '<p>Rasa Nusantara Baru provided hospitality support for athletes and officials during the national gymnastics event.</p>',
                'main_img_url' => 'https://picsum.photos/seed/gym_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/gym_g1/800/600', 'https://picsum.photos/seed/gym_g2/800/600']
            ],
            [
                'unit_name' => 'Umara Cipta Rasa',
                'title' => 'Grand Wedding Fair Catering Collaboration',
                'published_at' => Carbon::create(2025, 10, 10),
                'content' => '<p>Collaborated with multiple vendors to deliver premium wedding catering experiences at the grand fair.</p>',
                'main_img_url' => 'https://picsum.photos/seed/wedding_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/wedding_g1/800/600', 'https://picsum.photos/seed/wedding_g2/800/600']
            ],
            [
                'unit_name' => 'Laukita Bersama Indonesia',
                'title' => 'AEON Mall Culinary Pop-up by Umara Group',
                'published_at' => Carbon::create(2025, 10, 18),
                'content' => '<p>Umara Group hosted a culinary pop-up at AEON Mall, featuring signature dishes and product showcases.</p>',
                'main_img_url' => 'https://picsum.photos/seed/aeon_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/aeon_g1/800/600', 'https://picsum.photos/seed/aeon_g2/800/600']
            ],

            // 7. Groundbreaking New Restaurant (NEW)
            [
                'unit_name' => 'Umara Cipta Rasa', // Assigned to main catering/group unit
                'title' => 'Groundbreaking Our New Restaurant Officially Opens',
                'published_at' => Carbon::create(2025, 10, 30),
                'content' => '
                    <p>Umara Group, a subsidiary of Honda Immora, has officially commenced the development of Our new Restaurant on Jalan Veteran, South Jakarta. This marks a strategic expansion into the restaurant sector.</p>
                    <p>Our Restaurant will showcase the richness of Indonesian flavors through heritage and authentic dishes, designed with traditional Indonesian charm and modern comfort.</p>
                ',
                'main_img_url' => 'https://picsum.photos/seed/ground_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/ground_g1/800/600', 'https://picsum.photos/seed/ground_g2/800/600']
            ],

            // 8. HayoMoto 8th Anniversary (NEW)
            [
                'unit_name' => 'Rasa Nusantara Baru',
                'title' => 'Lumpang Emas Bintaro Hosts the Vibrant 8th Anniversary Celebration of HayoMoto',
                'published_at' => Carbon::create(2025, 11, 8),
                'content' => '
                    <p>Lumpang Emas Bintaro is honored to be part of the vibrant celebration of HayoMoto’s 8th Anniversary at Bintaro Avenue. As the official venue, we provided a spacious setting for community and automotive enthusiasts.</p>
                    <p>Lumpang Emas served authentic Indonesian lunch menus, and Umara Group’s Laukita premium frozen food also featured a dedicated booth for visitors to sample and purchase.</p>
                ',
                'main_img_url' => 'https://picsum.photos/seed/hayo_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/hayo_g1/800/600', 'https://picsum.photos/seed/hayo_g2/800/600']
            ],

            // 9. IKASTARA Futsal Tournament (NEW)
            [
                'unit_name' => 'Umara Cipta Rasa',
                'title' => 'IKASTARA IHFT 2025: Alumni Futsal Tournament & Reunion',
                'published_at' => Carbon::create(2025, 11, 9),
                'content' => '
                    <p>IKASTARA brought the spirit of unity to life through the IHFT – Ikastara Happy Futsal Tournament 2025. This annual competition serves as a platform for alumni of SMA Taruna Nusantara to reconnect.</p>
                    <p>More than just a tournament, it was a grand reunion for alumni across generations, strengthening networks through sportsmanship and "Tidar Pride."</p>
                ',
                'main_img_url' => 'https://picsum.photos/seed/futsal_main/800/600',
                'gallery_urls' => ['https://picsum.photos/seed/futsal_g1/800/600', 'https://picsum.photos/seed/futsal_g2/800/600']
            ],

            // ... (Includes the previous 6 posts you already have)
        ];

        // ADDING THE PREVIOUS 6 FOR COMPLETENESS IN YOUR FILE
        // [Assuming they are kept in your local array]

        foreach ($posts as $data) {
            $slug = Str::slug($data['title']);
            $this->command->info("Processing: {$data['title']}");

            $businessUnit = DB::table('business_units')->where('slug', Str::slug($data['unit_name']))->first();
            if (!$businessUnit) continue;

            $mainImagePath = $downloadImage($data['main_img_url'], $slug . '-main.jpg');
            $galleryPaths = [];
            foreach ($data['gallery_urls'] as $key => $url) {
                $path = $downloadImage($url, $slug . "-gallery-{$key}.jpg");
                if ($path) $galleryPaths[] = $path;
            }

            DB::table('posts')->updateOrInsert(
                ['slug' => $slug],
                [
                    'business_unit_id' => $businessUnit->id,
                    'title' => $data['title'],
                    'content' => $data['content'],
                    'main_image' => $mainImagePath,
                    'gallery_images' => json_encode($galleryPaths),
                    'published_at' => $data['published_at'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        $this->command->info('Success! Total 9 News Posts seeded.');
    }
}
