<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Intervention\Image\Laravel\Facades\Image;

class PostSeeder extends Seeder
{
    private string $baseUrl = 'https://umaragroup.com/';

    /**
     * Business unit name → slug mapping.
     * "Umara Group" on the old website maps to Umara Nikmat Boga (confirmed by user).
     */
    private array $buMap = [
        'Umara Mitra Kulina'        => 'umara-mitra-kulina',
        'Laukita Bersama Indonesia' => 'laukita-bersama-indonesia',
        'Laukita Niaga Indonesia'   => 'laukita-niaga-indonesia',
        'Rasa Nusantara Baru'       => 'rasa-nusantara-baru',
        'Umara Cipta Rasa'          => 'umara-cipta-rasa',
        'Umara Group'               => 'umara-nikmat-boga',
        'Umara Nikmat Boga'         => 'umara-nikmat-boga',
    ];

    public function run(): void
    {
        $this->command->info('Starting PostSeeder — 22 news from umaragroup.com...');

        // Wipe existing posts first (re-seed from scratch)
        DB::table('posts')->truncate();
        $this->command->info('Existing posts cleared.');

        $posts = $this->getPostData();
        $total = count($posts);

        foreach ($posts as $index => $data) {
            $num  = $index + 1;
            $slug = Str::slug($data['title']);

            $this->command->info("[{$num}/{$total}] {$data['title']}");

            // Resolve business unit by slug
            $buSlug       = $this->buMap[$data['company']] ?? 'umara-nikmat-boga';
            $businessUnit = DB::table('business_units')->where('slug', $buSlug)->first();

            if (! $businessUnit) {
                $businessUnit = DB::table('business_units')->first();
                $this->command->warn("  BU '{$buSlug}' not found — using fallback.");
            }

            // Download & upload main image (skip if already an R2 path, not a full URL)
            $mainImagePath = $this->resolveImage($data['main_image'], 'posts/main');
            if ($mainImagePath) {
                $this->command->info("  main_image: {$mainImagePath}");
            } else {
                $this->command->warn("  main_image failed: {$data['main_image']}");
            }

            // Download & upload gallery images
            $galleryPaths = [];
            foreach ($data['gallery_images'] as $galleryUrl) {
                $path = $this->resolveImage($galleryUrl, 'posts/gallery');
                if ($path) {
                    $galleryPaths[] = $path;
                    $this->command->info("  gallery: {$path}");
                } else {
                    $this->command->warn("  gallery failed: {$galleryUrl}");
                }
            }

            DB::table('posts')->insert([
                'business_unit_id' => $businessUnit->id,
                'title'            => $data['title'],
                'slug'             => $slug,
                'content'          => $data['content'],
                'main_image'       => $mainImagePath,
                'gallery_images'   => json_encode($galleryPaths),
                'published_at'     => $data['published_at'],
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);
        }

        $this->command->info("Done! Total posts: " . DB::table('posts')->count());
    }

    /**
     * Resolve an image source to an R2 path.
     * - If already an R2 path (does NOT start with http), store as-is.
     * - If a full URL, download and upload to R2 as WebP.
     */
    private function resolveImage(string $src, string $folder): ?string
    {
        if (! str_starts_with($src, 'http')) {
            // Already an R2 path — use it directly
            $this->command->info("  [R2 direct] {$src}");
            return $src;
        }
        return $this->downloadAndUploadToR2($src, $folder);
    }

    /**
     * Download image from remote URL and upload to Cloudflare R2 as WebP.
     */
    private function downloadAndUploadToR2(string $srcUrl, string $folder): ?string
    {
        try {
            $url = str_replace(' ', '%20', $srcUrl);

            $context = stream_context_create([
                'http' => [
                    'timeout'       => 30,
                    'user_agent'    => 'Mozilla/5.0 (compatible; UmaraSeeder/1.0)',
                    'ignore_errors' => true,
                ],
            ]);

            $contents = @file_get_contents($url, false, $context);
            if ($contents === false || strlen($contents) < 1000) {
                return null;
            }

            $image = Image::read($contents);

            if ($image->width() > 1600) {
                $image->scale(width: 1600);
            }

            $webpContent = $image->toWebp(quality: 82)->toString();
            $filename    = Str::uuid() . '.webp';
            $r2Path      = $folder . '/' . $filename;

            Storage::disk('r2')->put($r2Path, $webpContent, 'public');

            return $r2Path;
        } catch (\Throwable $e) {
            $this->command->warn('  Image error: ' . $e->getMessage());
            return null;
        }
    }

    private function img(string $path): string
    {
        // Remove leading ../ and normalize
        $clean = ltrim(preg_replace('#^(\.\.\/)+#', '', $path), '/');
        return $this->baseUrl . $clean;
    }

    /**
     * Upload a local file from public/ directory to Cloudflare R2 as WebP.
     * Returns the R2 path, or null on failure.
     */
    private function localImg(string $relativePath): ?string
    {
        try {
            $fullPath = public_path($relativePath);

            if (! file_exists($fullPath)) {
                $this->command->warn("  Local file not found: {$fullPath}");
                return null;
            }

            $contents = file_get_contents($fullPath);
            if ($contents === false || strlen($contents) < 1000) {
                $this->command->warn("  Local file empty/unreadable: {$fullPath}");
                return null;
            }

            $image = Image::read($contents);

            if ($image->width() > 1600) {
                $image->scale(width: 1600);
            }

            $webpContent = $image->toWebp(quality: 82)->toString();
            $filename    = Str::uuid() . '.webp';
            $r2Path      = 'posts/main/' . $filename;

            Storage::disk('r2')->put($r2Path, $webpContent, 'public');

            $this->command->info("  local→R2: {$r2Path}");
            return $r2Path;
        } catch (\Throwable $e) {
            $this->command->warn('  Local image error: ' . $e->getMessage());
            return null;
        }
    }

    private function getPostData(): array
    {
        return [
            // ─────────────────────────────────────────────
            // 0. Alva Motor Ramadan Iftar (Umara Mitra Kulina) — 9 March 2026
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Mitra Kulina',
                'title'          => 'Energizing the Innovators: UMK Cikarang Hosts Ramadan Iftar for PT Electra Mobilitas Indonesia (Alva Motor)',
                'published_at'   => Carbon::create(2026, 3, 9),
                'main_image'     => $this->img('public/assets/umara-mitra-kulina/news/alva-motor/alva-motor1.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/umara-mitra-kulina/news/alva-motor/alva-motor2.jpeg'),
                    $this->img('public/assets/umara-mitra-kulina/news/alva-motor/alva-motor3.jpeg'),
                ],
                'content' => '<p>Ramadan is a month of spiritual recharge and community. For the pioneers driving Indonesia\'s electric vehicle industry forward, it is also a vital time to pause and break bread together. On March 9, 2026, <strong>Umara Mitra Kulina (UMK)</strong> proudly hosted a vibrant Buka Bersama event for the dedicated team at <strong>PT Electra Mobilitas Indonesia (Alva Motor)</strong>.</p><p>Leveraging the agility and prime location of our Satellite Kitchen in Cikarang, we ensured that every meal was delivered with impeccable timing. In the fast-paced world of EV manufacturing, precision is everything — and our culinary team applied that exact same precision to serve piping hot, freshly prepared dishes to every guest.</p><p>The evening featured a thoughtfully crafted menu that blended comforting traditional Indonesian flavors with the nutritional balance needed to replenish energy after a long day of fasting. From refreshing sweet takjil to savory main courses, every bite was designed to spark joy and foster camaraderie.</p><p>Serving a forward-thinking company like PT Electra Mobilitas Indonesia is a true privilege. UMK remains committed to providing top-tier catering solutions that fuel the workforce behind Indonesia\'s green energy transition. We wish the entire Alva family a blessed Ramadan filled with peace and continued success.</p>',
            ],

            // ─────────────────────────────────────────────
            // 1. PT Bintang Toedjoe Ramadan Iftar (Umara Mitra Kulina)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Mitra Kulina',
                'title'          => 'Fostering Togetherness: UMK Cikarang Hosts Ramadan Iftar for PT Bintang Toedjoe',
                'published_at'   => Carbon::create(2026, 3, 9),
                'main_image'     => 'posts/UMK-1.jpeg',
                'gallery_images' => [
                    'posts/UMK-1.jpeg',
                    'posts/UMK-1.jpeg',
                ],
                'content' => '<p>The holy month of Ramadan is a time for reflection, gratitude, and strengthening bonds. Embracing this spirit of togetherness, <strong>Umara Mitra Kulina (UMK)</strong> had the distinct honor of hosting a special Iftar event directly at our state-of-the-art <strong>Satellite Kitchen in Cikarang</strong>.</p><p>This event was a beautiful demonstration of our commitment to not just nourishing our partners, but truly connecting with them on a deeper level. We believe that the best meals are shared with great company, and this Iftar gathering perfectly embodied that belief.</p><p>Our dedicated team prepared a sumptuous spread of traditional Ramadan dishes, ensuring every guest experienced the warmth and hospitality that defines Umara Mitra Kulina. It was an evening filled with gratitude, meaningful conversations, and the shared joy of breaking fast together.</p>',
            ],

            // ─────────────────────────────────────────────
            // 2. HRD Cikarang Community Seminar (Umara Mitra Kulina)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Mitra Kulina',
                'title'          => 'Fueling Sustainable Growth: Umara Mitra Kulina Partners with HRD Cikarang',
                'published_at'   => Carbon::create(2026, 1, 24),
                'main_image'     => 'posts/Komunitas HRD Cikarang1.jpeg',
                'gallery_images' => [
                    'posts/Komunitas HRD Cikarang2.jpeg',
                    'posts/Komunitas HRD Cikarang3.jpeg',
                ],
                'content' => '<p>As part of our commitment to supporting a professional and healthy industrial ecosystem, Umara Mitra Kulina proudly served as a strategic partner for the prestigious seminar <em>"Compliance to Sustainable Growth"</em>.</p><p>The seminar brought together hundreds of HR professionals from across the Cikarang industrial area, making it one of the most significant HR gatherings of the year. Umara Mitra Kulina played an integral role by providing catering services that fueled the participants throughout this knowledge-intensive day.</p><p>This partnership reflects our mission to be more than just a catering company — we are a catalyst for professional growth and community building within the industrial sector. We are proud to stand alongside HRD Cikarang Community in their mission to elevate HR practices across the region.</p>',
            ],

            // ─────────────────────────────────────────────
            // 3. FIFA World Cup 2026 VVIP (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Chosen for Excellence: Umara Catering Serves VVIPs at FIFA World Cup 2026 Event',
                'published_at'   => Carbon::create(2026, 1, 22),
                'main_image'     => 'posts/fifa-world-cup1.jpg',
                'gallery_images' => [
                    'posts/fifa-world-cup2.jpg',
                    'posts/fifa-world-cup3.jpg',
                ],
                'content' => '<p>A defining moment in our journey — <strong>Umara Catering</strong> was selected as the official catering partner to serve VVIPs at the prestigious <strong>FIFA World Cup 2026</strong> event. This remarkable honor places Umara Catering among the elite culinary services trusted to deliver excellence at one of the world\'s most watched sporting events.</p><p>Our team meticulously prepared a curated selection of premium dishes befitting the distinguished guests in attendance. Every detail — from menu design to presentation — reflected the highest standards of culinary artistry and hospitality.</p><p>Being chosen to serve VVIPs at a FIFA World Cup event is a testament to our team\'s unwavering commitment to quality, precision, and excellence. We are incredibly proud of this achievement and the trust placed in Umara Catering on the global stage.</p>',
            ],

            // ─────────────────────────────────────────────
            // 4. Geely EX2 (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Fueling Innovation: Umara Catering Serves 1,000+ Guests at the Geely EX2 Grand Launch',
                'published_at'   => Carbon::create(2026, 1, 16),
                'main_image'     => $this->img('public/assets/news/geely-ex2/geely1.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/geely-ex2/geely2.jpg'),
                    $this->img('public/assets/news/geely-ex2/geely3.jpg'),
                ],
                'content' => '<p>Umara Catering was honored to be the official catering partner for the grand opening of the <strong>Geely EX2</strong>. Held at the prestigious <strong>Spike Air Dome, PIK2</strong>, this landmark event drew over 1,000 guests including automotive enthusiasts, industry leaders, media professionals, and distinguished VIP guests.</p><p>Our team meticulously crafted a diverse and sophisticated menu that complemented the innovative spirit of the Geely EX2 launch. From elegant appetizers to a grand buffet spread, every culinary element was designed to create a memorable experience that matched the excitement of the occasion.</p><p>Managing catering for 1,000+ guests at a high-profile automotive launch requires precision, creativity, and flawless execution. Our team rose to the challenge, ensuring that every guest enjoyed an exceptional dining experience from start to finish.</p>',
            ],

            // ─────────────────────────────────────────────
            // 5. Wedding Market Fair 2026 (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Blooming Love & Exquisite Tastes: Umara Catering at Wedding Market Fair 2026',
                'published_at'   => Carbon::create(2026, 1, 16),
                'main_image'     => $this->img('public/assets/news/wedding-market-fair-2026/wedding-market.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/wedding-market-fair-2026/wedding-market-2.jpg'),
                    $this->img('public/assets/news/wedding-market-fair-2026/wedding-market-3.jpg'),
                ],
                'content' => '<p>Love is in the air, and it is blooming magnificently at Balai Kartini, Jakarta. From January 16th to 18th, 2026, <strong>Umara Catering</strong> participated in the Wedding Market Fair 2026, one of Jakarta\'s most anticipated wedding exhibitions.</p><p>This vibrant event brought together couples planning their dream weddings with the finest vendors in the industry. Our booth showcased our comprehensive wedding catering packages, from intimate gatherings to grand receptions, demonstrating why Umara Catering is the preferred choice for memorable celebrations.</p><p>Visitors had the opportunity to sample our signature dishes, meet our culinary team, and envision how Umara Catering can transform their special day into an unforgettable culinary journey.</p>',
            ],

            // ─────────────────────────────────────────────
            // 6. Yoga at Prapanca (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Wellness Meets Culinary: A Morning of Yoga and Connection at Lumpang Emas Signature',
                'published_at'   => Carbon::create(2026, 1, 4),
                'main_image'     => $this->img('public/assets/news/yoga-at-prapanca/IMG_7978.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/yoga-at-prapanca/IMG_7984.jpg'),
                    $this->img('public/assets/news/yoga-at-prapanca/IMG_8001.jpg'),
                ],
                'content' => '<p>A serene morning unfolded at <strong>Lumpang Emas Signature</strong> as we hosted a special wellness event that beautifully combined the tranquility of yoga with the pleasures of fine dining. Guests began their morning with a guided yoga session in our outdoor garden, led by an experienced instructor who guided participants through a calming practice.</p><p>Following the session, attendees were treated to a specially curated healthy brunch menu that celebrated wholesome ingredients and balanced nutrition. Every dish was designed to complement the wellness theme while delivering the exceptional flavors that Lumpang Emas Signature is known for.</p><p>This event reflects our belief that true hospitality nourishes both body and soul. We are proud to create spaces where our guests can pause, reconnect with themselves, and enjoy the finest culinary experiences.</p>',
            ],

            // ─────────────────────────────────────────────
            // 7. Santa Visits (Rasa Nusantara Baru)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Rasa Nusantara Baru',
                'title'          => 'A Magical Christmas: Santa Surprises Guests at Umara House & Lumpang Emas Signature',
                'published_at'   => Carbon::create(2026, 1, 4),
                'main_image'     => $this->img('public/assets/news/santa-umara/IMG_7935.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/santa-umara/IMG_7950.jpg'),
                    $this->img('public/assets/news/santa-umara/IMG_7933.jpg'),
                ],
                'content' => '<p>Christmas is a season of giving, sharing, and creating beautiful memories with loved ones. To celebrate this joyous occasion in a truly special way, <strong>Umara House</strong> and <strong>Lumpang Emas Signature</strong> brought the magic of Christmas to life with a surprise visit from Santa Claus himself!</p><p>Guests dining at our restaurants on Christmas Eve were delighted by the unexpected appearance of Santa, who spread joy, distributed gifts, and posed for memorable photographs with families and children. The festive atmosphere, combined with our specially curated Christmas menu, created an enchanting experience that our guests will cherish.</p><p>At Umara Group, we believe that exceptional dining goes beyond the food on the plate — it is about creating moments that touch the heart.</p>',
            ],

            // ─────────────────────────────────────────────
            // 8. Chemco Funday (Umara Mitra Kulina)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Mitra Kulina',
                'title'          => 'The Vibrant Atmosphere of Chemco Funday 2025 at KIM Karawang Factory Grounds',
                'published_at'   => Carbon::create(2025, 12, 14),
                'main_image'     => $this->img('public/assets/umara-mitra-kulina/news/chemco-funday-2025.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/umara-mitra-kulina/news/chemco-funday-2025-2.jpeg'),
                    $this->img('public/assets/umara-mitra-kulina/news/chemco-funday-2025-3.jpeg'),
                ],
                'content' => '<p>The KIM Karawang factory grounds came alive with energy and excitement as <strong>Chemco Funday 2025</strong> brought together employees, families, and community members for a day of celebration, camaraderie, and fun.</p><p>Umara Group was proud to be part of this vibrant community event, providing catering services that kept the energy high throughout the day. Our team served a wide variety of delicious Indonesian dishes and refreshments, ensuring that every participant was well-fueled for the festivities.</p><p>Events like Chemco Funday remind us of the important role food plays in bringing people together. We are grateful for the opportunity to contribute to this wonderful celebration and look forward to continuing our partnership with the Karawang industrial community.</p>',
            ],

            // ─────────────────────────────────────────────
            // 9. Rakernas 2025 (Umara Group → umara-nikmat-boga)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Group',
                'title'          => 'Aligning Vision, Driving Growth: Umara Group National Working Meeting (Rakernas) 2025',
                'published_at'   => Carbon::create(2025, 11, 24),
                'main_image'     => $this->img('public/assets/news/raker/S5A5746.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/raker/S5A5667.jpg'),
                    $this->img('public/assets/news/raker/S5A5789.jpg'),
                ],
                'content' => '<p>To solidify our path toward becoming a market leader in the culinary industry, <strong>Umara Group</strong> successfully convened its Annual National Working Meeting (Rakernas) 2025. This pivotal gathering brought together leadership teams and key personnel from all business units across Indonesia.</p><p>The Rakernas served as a strategic forum where vision, goals, and operational plans were aligned across the entire organization. Key discussions centered around innovation, sustainable growth, market expansion, and strengthening the Umara Group brand across all touchpoints.</p><p>The event reinforced our collective commitment to delivering excellence in every aspect of our business. As we move forward, the strategies and insights from Rakernas 2025 will serve as our roadmap for continued success.</p>',
            ],

            // ─────────────────────────────────────────────
            // 10. Wedding Expo Danareksa (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Elevating Your Special Day: Umara Catering at Menara Danareksa Wedding Expo',
                'published_at'   => Carbon::create(2025, 11, 24),
                'main_image'     => $this->img('public/assets/news/wedding-expo/wedding-expo.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/wedding-expo/wedding-expo-2.jpg'),
                    $this->img('public/assets/news/wedding-expo/wedding-expo-3.jpg'),
                ],
                'content' => '<p>Dreams of a perfect wedding came to life at the <strong>Menara Danareksa Wedding Expo</strong>, where <strong>Umara Catering</strong> showcased its world-class wedding catering services to hundreds of soon-to-be-married couples and their families.</p><p>Our dedicated wedding catering consultants were on hand to guide visitors through our comprehensive packages, from intimate garden ceremonies to grand ballroom receptions. Guests had the pleasure of sampling our signature canapés and desserts, getting a taste of the culinary excellence that awaits them on their big day.</p><p>We understand that a wedding is one of the most important days of your life, and our team is dedicated to ensuring that every detail of your catering experience is perfect.</p>',
            ],

            // ─────────────────────────────────────────────
            // 11. Honda Culture Indonesia (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Umara Catering at Honda Culture Indonesia',
                'published_at'   => Carbon::create(2025, 11, 23),
                'main_image'     => $this->img('public/assets/news/honda-cibis/4.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/news/honda-cibis/3.jpg'),
                    $this->img('public/assets/news/honda-cibis/2.jpeg'),
                    $this->img('public/assets/news/honda-cibis/5.jpg'),
                    $this->img('public/assets/news/honda-cibis/6.jpg'),
                ],
                'content' => '<p>The <strong>Honda Culture Indonesia</strong> event at Cibis Park, Jakarta, was a spectacular celebration of automotive culture, community, and innovation. Umara Catering was delighted to be part of this vibrant gathering, adding a culinary dimension to the festivities.</p><p>Our team set up a dedicated catering booth, serving delicious and satisfying meals to the thousands of Honda enthusiasts, riders, and visitors who attended throughout the event. From signature Indonesian dishes to refreshing beverages, we ensured that every guest was well-nourished and energized.</p><p>Being part of Honda Culture Indonesia aligns perfectly with our brand values of community, quality, and excellence. We are proud to serve the Honda community and look forward to future collaborations that bring people together through great food and shared passions.</p>',
            ],

            // ─────────────────────────────────────────────
            // 12. SIAL InterFood 2025 (Laukita Bersama Indonesia)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Laukita Bersama Indonesia',
                'title'          => 'Laukita Bersama Indonesia Showcases Food Manufacturing at SIAL InterFood 2025',
                'published_at'   => Carbon::create(2025, 11, 15),
                'main_image'     => $this->img('public/assets/news/sial-interfood/1.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/sial-interfood/2.jpg'),
                    $this->img('public/assets/news/sial-interfood/3.jpg'),
                ],
                'content' => '<p><strong>PT Laukita Bersama Indonesia (LBI)</strong> made a significant mark at <strong>SIAL InterFood 2025</strong>, one of Indonesia\'s most prestigious food and beverage industry exhibitions. Our participation at this landmark event served as a powerful platform to showcase our premium ready-to-cook and frozen food products to a national and international audience.</p><p>The exhibition provided an invaluable opportunity to connect with industry leaders, potential partners, and buyers from across the globe. Our product range, which includes premium frozen meals crafted with authentic Indonesian flavors, garnered tremendous interest from both domestic and international visitors.</p><p>Our presence at SIAL InterFood 2025 reaffirms LBI\'s commitment to elevating Indonesian culinary products to global standards.</p>',
            ],

            // ─────────────────────────────────────────────
            // 13. IKASTARA IHFT 2025 (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'IKASTARA IHFT 2025: Alumni Futsal Tournament & Reunion',
                'published_at'   => Carbon::create(2025, 11, 14),
                'main_image'     => $this->img('public/assets/news/ikastara-futsal/IMG_2.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/ikastara-futsal/IMG_3.jpg'),
                    $this->img('public/assets/news/ikastara-futsal/IMG_4.jpg'),
                ],
                'content' => '<p><strong>IKASTARA</strong> once again brought the spirit of unity to life through the IHFT — <em>Ikastara Happy Futsal Tournament 2025</em>, an annual competition that serves as a platform for alumni of SMA Taruna Nusantara to reconnect, compete, and celebrate their shared heritage.</p><p>More than just a futsal tournament, IHFT 2025 was a grand reunion for alumni across generations. The event strengthened bonds forged during school years, with participants flying in from various cities to take part in the celebration.</p><p>Umara Group was honored to support this meaningful gathering with catering services that kept the energy and spirits high throughout the tournament. The event culminated in an awards ceremony and reunion dinner, where memories were shared and new ones were created.</p>',
            ],

            // ─────────────────────────────────────────────
            // 14. Hayomoto 8th Anniversary (Rasa Nusantara Baru)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Rasa Nusantara Baru',
                'title'          => 'Lumpang Emas Bintaro Hosts the Vibrant 8th Anniversary Celebration of HayoMoto',
                'published_at'   => Carbon::create(2025, 11, 8),
                'main_image'     => $this->img('public/assets/news/hayomoto/1.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/news/hayomoto/2.jpeg'),
                    $this->img('public/assets/news/hayomoto/3.jpeg'),
                    $this->img('public/assets/news/hayomoto/4.jpeg'),
                    $this->img('public/assets/news/hayomoto/5.jpeg'),
                ],
                'content' => '<p><strong>Lumpang Emas Bintaro</strong> is honored to have been the chosen venue for the vibrant celebration of <strong>HayoMoto\'s 8th Anniversary</strong> at Bintaro Avenue. As the official venue and catering partner, we provided a spacious and festive setting for this beloved community of automotive enthusiasts.</p><p>The anniversary event brought together hundreds of HayoMoto members, their families, and supporters for a day filled with automotive exhibitions, community activities, and celebratory gatherings. Lumpang Emas served authentic Indonesian lunch menus, and Umara Group\'s Laukita premium frozen food also featured a dedicated booth for visitors to sample and purchase our products.</p><p>This partnership exemplifies our commitment to being more than just a restaurant — we are a community space where memorable moments are created.</p>',
            ],

            // ─────────────────────────────────────────────
            // 15. Groundbreaking Restaurant (Umara Group → umara-nikmat-boga)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Group',
                'title'          => 'Groundbreaking Our New Restaurant Officially Opens',
                'published_at'   => Carbon::create(2025, 10, 30),
                'main_image'     => $this->img('public/assets/news/groundbreaking/img2.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/news/groundbreaking/img1.jpeg'),
                    $this->img('public/assets/news/groundbreaking/img3.jpeg'),
                    $this->img('public/assets/news/groundbreaking/img4.jpeg'),
                    $this->img('public/assets/news/groundbreaking/img5.jpeg'),
                    $this->img('public/assets/news/groundbreaking/img6.jpeg'),
                ],
                'content' => '<p><strong>Umara Group</strong> has officially commenced the development of its newest restaurant concept, marking a strategic and exciting expansion into the restaurant sector. The groundbreaking ceremony, held at Jalan Veteran, South Jakarta, was attended by key members of our leadership team and distinguished guests.</p><p>This new restaurant will showcase the richness of Indonesian flavors through heritage and authentic dishes, all presented in a thoughtfully designed space that blends traditional Indonesian charm with modern comfort. It represents our continued commitment to preserving and celebrating the culinary treasures of the archipelago.</p><p>The launch of this new restaurant is a significant milestone in Umara Group\'s journey. It reflects our belief that Indonesian cuisine deserves to be celebrated, elevated, and shared with the world.</p>',
            ],

            // ─────────────────────────────────────────────
            // 16. Kiddies Day Out AEON Mall (Laukita Niaga Indonesia)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Laukita Niaga Indonesia',
                'title'          => 'Laukita Brings Authentic Flavor to Kiddies Day Out at AEON Mall Tanjung Barat',
                'published_at'   => Carbon::create(2025, 10, 28),
                'main_image'     => $this->img('public/assets/news/kiddies-day-out/laukita-aeon.png'),
                'gallery_images' => [
                    $this->img('public/assets/news/kiddies-day-out/laukita-aeon2.png'),
                ],
                'content' => '<p>For busy families, finding nutritious and delicious meal solutions is always a priority. Understanding this need, <strong>Laukita</strong> participated in the <em>Kiddies Day Out</em> event at <strong>AEON Mall Tanjung Barat</strong>, bringing our premium frozen food products directly to families in a fun and engaging setting.</p><p>Our participation at this family-oriented event allowed us to connect directly with parents and children, demonstrating how Laukita\'s ready-to-cook meals can make mealtimes both convenient and enjoyable. Families were able to sample our products and discover the authentic Indonesian flavors that make Laukita a trusted choice for households across the country.</p><p>Events like Kiddies Day Out remind us of our core mission: to make high-quality, authentic Indonesian food accessible to every family. We are committed to being a part of everyday family moments, one delicious meal at a time.</p>',
            ],

            // ─────────────────────────────────────────────
            // 17. Wedding Market Fair 2025 (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Crafting Dream Weddings: Umara Catering Showcases Excellence at Wedding Market Fair 2025',
                'published_at'   => Carbon::create(2025, 10, 24),
                'main_image'     => $this->img('public/assets/news/wedding-market-fair/wedding-market1.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/news/wedding-market-fair/wedding-market2.jpeg'),
                    $this->img('public/assets/news/wedding-market-fair/wedding-market3.jpeg'),
                ],
                'content' => '<p>For every couple, a wedding is not just a ceremony — it is a once-in-a-lifetime celebration of love. Understanding the importance of this milestone, <strong>Umara Catering</strong> participated in the prestigious <strong>Wedding Market Fair 2025</strong>, Jakarta\'s premier wedding exhibition.</p><p>Our dedicated team engaged with hundreds of couples and their families, presenting our comprehensive range of wedding catering solutions. From intimate garden weddings to grand ballroom receptions, we showcased our ability to tailor every aspect of the dining experience to match each couple\'s unique vision and requirements.</p><p>The Wedding Market Fair provided an invaluable platform to connect with soon-to-be-married couples and reinforce Umara Catering\'s position as the partner of choice for creating unforgettable wedding celebrations in Indonesia.</p>',
            ],

            // ─────────────────────────────────────────────
            // 18. Gymnastics World Championships (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Fueling Excellence: Umara Catering at the Gymnastics World Championships',
                'published_at'   => Carbon::create(2025, 10, 19),
                'main_image'     => $this->img('public/assets/news/gymnastic-olympics/IMG_1564.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/news/gymnastic-olympics/IMG_1569.jpg'),
                    $this->img('public/assets/news/gymnastic-olympics/IMG-20251027.jpg'),
                ],
                'content' => '<p>In the world of elite sports, precision and performance are everything. <strong>Umara Catering</strong> is incredibly proud to have been selected as the official catering partner for the <strong>Gymnastics World Championships</strong> held in Indonesia — a world-class sporting event that brought together the best gymnasts from across the globe.</p><p>Catering for elite athletes requires a deep understanding of nutrition, performance, and dietary requirements. Our team worked closely with sports nutritionists and event organizers to design menus that not only satisfied the palate but also optimized the energy and performance of world-class athletes.</p><p>Being trusted with the nutrition of world-class athletes is one of our greatest honors. This opportunity reflects our team\'s expertise, dedication, and ability to deliver exceptional catering services in the most demanding environments.</p>',
            ],

            // ─────────────────────────────────────────────
            // 19. Rasa Umara x Wardah (Rasa Nusantara Baru)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Rasa Nusantara Baru',
                'title'          => 'Rasa Umara x Wardah: Jelajahi Bazar Fashion & Beauty Experience',
                'published_at'   => Carbon::create(2025, 6, 26),
                'main_image'     => $this->img('public/assets/news/wardah/1.png'),
                'gallery_images' => [
                    $this->img('public/assets/news/wardah/2.png'),
                    $this->img('public/assets/news/wardah/3.png'),
                ],
                'content' => '<p><strong>Rasa Umara</strong> berkolaborasi dengan <strong>Wardah Beauty</strong> untuk menghadirkan event spesial bertajuk <em>"Explore the Rasa Umara Fashion Bazaar"</em> — sebuah perpaduan unik antara kuliner autentik Indonesia dengan dunia fashion dan kecantikan.</p><p>Event ini menjadi wadah kreativitas dan kegembiraan bagi para pengunjung yang ingin menikmati pengalaman berbelanja fashion lokal berkualitas sambil menikmati sajian kuliner terbaik dari Rasa Umara. Kolaborasi ini mencerminkan semangat mendukung produk lokal Indonesia yang berkualitas tinggi di berbagai bidang.</p><p>Kehadiran Wardah sebagai mitra memberikan nilai tambah yang luar biasa, menghadirkan nuansa beauty experience yang memperkaya suasana bazaar. Kami bangga dapat menjadi bagian dari gerakan mendukung kemajuan brand lokal Indonesia.</p>',
            ],

            // ─────────────────────────────────────────────
            // 20. Ekspor to Saudi Arabia (Laukita Bersama Indonesia)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Laukita Bersama Indonesia',
                'title'          => 'Expanding Horizons: Laukita Bersama Indonesia Exports Ready-to-Cook Meals to Saudi Arabia',
                'published_at'   => Carbon::create(2025, 3, 6),
                'main_image'     => $this->img('public/assets/laukkita-bersama/ekspor/eskpor-to-saudi.jpeg'),
                'gallery_images' => [
                    $this->img('public/assets/laukkita-bersama/ekspor/eskpor-to-saudi3.jpeg'),
                ],
                'content' => '<p><strong>PT Laukita Bersama Indonesia</strong> has officially expanded its operations internationally, successfully shipping high-quality ready-to-cook meals to <strong>Saudi Arabia</strong> — marking a historic milestone in our journey to bring authentic Indonesian flavors to the world.</p><p>This export initiative represents years of dedication to quality, food safety standards, and operational excellence. Our products, which meet stringent international quality and halal certifications, are now available to the Indonesian diaspora and food lovers in Saudi Arabia who crave the taste of home.</p><p>The expansion to Saudi Arabia is just the beginning of our international journey. This milestone validates our belief that authentic Indonesian cuisine, when prepared with quality and care, has the potential to capture hearts and palates across the globe.</p>',
            ],

            // ─────────────────────────────────────────────
            // 21. Music20 Summit (Umara Cipta Rasa)
            // ─────────────────────────────────────────────
            [
                'company'        => 'Umara Cipta Rasa',
                'title'          => 'Harmonizing Flavors on the Global Stage: Umara Catering at the Music20 Summit',
                'published_at'   => Carbon::create(2022, 10, 30),
                'main_image'     => $this->img('public/assets/ucr-goverment/DSC00160.jpg'),
                'gallery_images' => [
                    $this->img('public/assets/ucr-goverment/DSC00182.jpg'),
                    $this->img('public/assets/ucr-goverment/9.jpg'),
                ],
                'content' => '<p>The <strong>Music20 (M20) Summit</strong> is more than just a gathering of global musicians and policymakers; it is a movement that drives meaningful change through the universal language of music. <strong>Umara Catering</strong> was honored to be part of this prestigious international event, providing catering services for delegates and dignitaries from around the world.</p><p>Serving an international audience at a summit of this magnitude required exceptional culinary expertise and cultural sensitivity. Our team curated a menu that celebrated Indonesia\'s rich culinary heritage while incorporating international flavors to welcome guests from diverse backgrounds.</p><p>The opportunity to serve at the Music20 Summit was a defining moment for Umara Catering, demonstrating our capacity to deliver world-class catering at international events.</p>',
            ],
        ];
    }
}
