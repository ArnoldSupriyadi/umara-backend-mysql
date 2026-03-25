<?php

namespace Database\Seeders;

use App\Models\BusinessUnit;
use App\Models\Career;
use Filament\Schemas\Schema;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Matikan pengecekan foreign key
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();

        // 2. Kosongkan tabel
        Career::truncate();

        // 3. Hidupkan kembali pengecekan foreign key
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        $r2Url = "https://assets.bridgeflow.my.id";
        
        $ucr = BusinessUnit::updateOrCreate(
            ['slug' => 'umara-cipta-rasa'],
            [
                'name' => 'Umara Cipta Rasa',
                // Saya hilangkan slash di depan agar kompatibel dengan helper asset() laravel
                'logo' => $r2Url . '/logos/ucr-logo.png'
            ]
        );

        // PT Rasa Nusantara Baru
        $rnb = BusinessUnit::updateOrCreate(
            ['slug' => 'rasa-nusantara-baru'],
            [
                'name' => 'Rasa Nusantara Baru',
                'logo' => $r2Url . '/logos/logo-rnb.png'
            ]
        );

        // ==========================================
        // 2. DATA LOWONGAN KERJA (CAREERS)
        // ==========================================
        $careers = [
            // --- PT UMARA CIPTA RASA ---
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Admin Business',
                'image' => $ucr->logo, // Menggunakan logo UCR
                'description' => '
                    <h3 class="font-bold mb-2">Tanggung Jawab:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pengalaman kerja minimal 3 tahun sebagai admin bisnis, executive assistant, atau posisi sejenis</li>
                        <li>Menguasai Microsoft office (Excel, word, power point)</li>
                        <li>Memiliki kemampuan asistensi manajemen, termasuk pengelolaan agenda, laporan dan komunikasi internal</li>
                        <li>Dapat menjaga kerahasiaan informasi perusahaan dan keputusan manajemen</li>
                        <li>Bersedia penempatan di Cilandak, Jakarta selatan</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal D3 / S1 (Administrasi, Manajemen, Akuntansi, atau setara)</li>
                        <li>Pengalaman minimal 1-2 tahun sebagai admin bisnis / admin sales / admin operasional</li>
                        <li>Mahir Microsoft Excel / Google Sheets (rumus dasar, rekap data)</li>
                        <li>Terbiasa mengelola invoice, quotation, dan laporan</li>
                        <li>Teliti, rapi, dan terbiasa bekerja dengan deadline</li>
                        <li>Komunikatif & mampu berkoordinasi lintas divisi</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Banquet Captain',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Tanggung Jawab:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Memiliki pengalaman di banquet hotel atau banquet catering</li>
                        <li>Memiliki kepemimpinan yang baik</li>
                        <li>Memiliki komunikasi yang baik</li>
                        <li>Bisa bekerja dibawah tekanan</li>
                        <li>Minimal posisi terakhir sebagai captain banquet</li>
                        <li>Bersedia bekerja shifting</li>
                        <li>Bersedia untuk penempatan cilandak jakarta selatan</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal SMA/SMK Perhotelan / Tata Boga (lebih disukai D3/S1 Perhotelan)</li>
                        <li>Pengalaman minimal 2-3 tahun di posisi Banquet Captain / Supervisor Service (hotel, catering, venue)</li>
                        <li>Terbiasa menangani event besar (100-1.000 pax)</li>
                        <li>Memiliki jiwa kepemimpinan, tegas, dan komunikatif</li>
                        <li>Mampu bekerja di bawah tekanan dan deadline ketat</li>
                        <li>Berpenampilan rapi, sopan, dan profesional</li>
                        <li>Memahami alur banquet service, table manner, dan hospitality standard</li>
                        <li>Bersedia bekerja shift, weekend, dan hari libur</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Chef de Partie - Amman',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pengalaman minimal 2-3 tahun sebagai CDP atau posisi setara di catering / hotel</li>
                        <li>Berpengalaman menangani produksi makanan massal</li>
                        <li>Mampu mengatur alur kerja dapur</li>
                        <li>Memahami food safety, hygiene, dan standar kebersihan dapur</li>
                        <li>Terbiasa dengan produksi makanan dalam jumlah besar</li>
                        <li>Mampu bekerja di bawah tekanan dan target waktu</li>
                        <li>Disiplin, bertanggung jawab, dan memiliki leadership yang baik</li>
                        <li>Bersedia ditempatkan di Sumbawa, NTB</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pengalaman min. 2-3 tahun sebagai Chef de Partie (atau Senior Cook yang siap naik level)</li>
                        <li>Pengalaman di catering / hotel / restoran volume besar</li>
                        <li>Menguasai basic kitchen management</li>
                        <li>Paham food safety & hygiene</li>
                        <li>Mampu bekerja cepat, rapi, dan konsisten</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Chef de Partie - Jakarta',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pengalaman minimal 2-3 tahun sebagai CDP atau posisi setara di catering / hotel / restoran</li>
                        <li>Mampu mengatur alur kerja dapur</li>
                        <li>Memahami food safety, hygiene, dan standar kebersihan dapur</li>
                        <li>Terbiasa dengan produksi makanan dalam jumlah besar</li>
                        <li>Mampu bekerja di bawah tekanan dan target waktu</li>
                        <li>Disiplin, bertanggung jawab, dan memiliki leadership yang baik</li>
                        <li>Bersedia untuk penempatan Cilandak - Jakarta Selatan</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pengalaman min. 2-3 tahun sebagai Chef de Partie (atau Senior Cook yang siap naik level)</li>
                        <li>Pengalam di hotel catering/hotel/restoran volume besar</li>
                        <li>Menguasai basic kitchen management</li>
                        <li>Paham food safety & hygiene</li>
                        <li>Mampu bekerja cepat, rapi, dan konsisten</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Commis',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pendidikan minimal SMK Tata Boga / SMA (pengalaman relevan dipertimbangkan)</li>
                        <li>Pengalaman sebagai Commis / Kitchen Staff di catering atau hotel lebih disukai</li>
                        <li>Memahami dasar pengolahan makanan dan standar kebersihan dapur (food safety & hygiene)</li>
                        <li>Mampu bekerja cepat, rapi, dan mengikuti instruksi atasan</li>
                        <li>Terbiasa bekerja dalam tim dan di bawah tekanan</li>
                        <li>Bersedia bekerja dengan sistem shift (event / produksi catering)</li>
                        <li>Bersedia untuk penempatan Cilandak - Jakarta Selatan</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal SMK Tata Boga / Perhotelan (nilai plus)</li>
                        <li>Fresh graduate dipersilakan melamar</li>
                        <li>Memiliki minat besar di bidang kuliner & catering</li>
                        <li>Food preparation, Knife Skill, Basic Cooking Technique</li>
                        <li>Bersedia bekerja shift, lembur, dan hari libur bila dibutuhkan</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'QA Staff',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Min D-3 MIPA, Perikanan, Teknologi Pangan, Gizi atau jurusan lain yang relevan</li>
                        <li>Minimal 1-2 tahun sebagai Admin QA / QA Support / Document Control di industri catering/food manufacturing</li>
                        <li>Berpengalaman menangani dokumen sistem manajemen mutu & keamanan pangan</li>
                        <li>Memahami penerapan ISO 22000, ISO 45001, ISO 9001, ISO 14001</li>
                        <li>Memahami regulasi Halal (Wajib) dan HACCP & ISO 22000 (Wajib)</li>
                        <li>Bersedia untuk penempatan Cilandak - Jakarta Selatan</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal D3/S1 Tata Boga, Teknologi Pangan, Gizi, atau sejenis</li>
                        <li>Memahami HACCP, GMP, SSOP, Food Safety, dan Hygiene Sanitasi</li>
                        <li>Terbiasa membuat checklist, SOP, dan laporan QA</li>
                        <li>Mampu bekerja di lapangan (dapur & lokasi event)</li>
                        <li>Bersedia bekerja dengan jadwal fleksibel, termasuk akhir pekan atau event</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $ucr->id,
                'job_title' => 'Sous Chef - Amman',
                'image' => $ucr->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pendidikan minimal D3 / S1 Tata Boga atau Perhotelan</li>
                        <li>Pengalaman minimal 4-5 tahun sebagai Sous Chef, diutamakan di catering/ hotel</li>
                        <li>Berpengalaman menangani produksi makanan massal</li>
                        <li>Memahami standar food safety, hygiene, sanitation, dan HSE (HACCP lebih disukai)</li>
                        <li>Mampu mengontrol food cost, inventory, dan waste management</li>
                        <li>Terbiasa bekerja dengan SOP ketat, audit internal, dan standar klien tambang</li>
                        <li>Bersedia ditempatkan di Sumbawa - NTB</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pengalaman minimal 3-5 tahun di dapur profesional (Catering / banquet / hotel)</li>
                        <li>Pernah menjabat sebagai Sous Chef / Chef de Partie senior</li>
                        <li>Menguasai Masakan Indonesian, Asian, & Western basic</li>
                        <li>Menguasai Sistem batch cooking & banquet production</li>
                    </ul>',
            ],

            // --- PT RASA NUSANTARA BARU ---
            [
                'business_unit_id' => $rnb->id,
                'job_title' => 'Admin Receiving',
                'image' => $rnb->logo, // Menggunakan logo RNB
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Menerima dan memeriksa bahan baku dari supplier (quantity, kualitas, dan kondisi)</li>
                        <li>Mencocokkan barang datang dengan Purchase Order (PO) dan Delivery Order (DO)</li>
                        <li>Melakukan input data penerimaan barang ke sistem / spreadsheet</li>
                        <li>Berkoordinasi dengan kitchen, gudang, purchasing, dan finance</li>
                        <li>Membuat laporan harian & bulanan penerimaan barang</li>
                        <li>Menangani retur barang jika terjadi ketidaksesuaian</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal SMA/SMK (Administrasi / Akuntansi lebih diutamakan)</li>
                        <li>Pengalaman minimal 1 tahun sebagai admin receiving / admin gudang</li>
                        <li>Menguasai Microsoft Excel / Google Sheets</li>
                        <li>Memahami dasar FIFO, FEFO menjadi nilai tambah</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $rnb->id,
                'job_title' => 'Commis',
                'image' => $rnb->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Membantu Chef de Partie / Cook dalam proses persiapan bahan (prep) dan produksi makanan</li>
                        <li>Menjaga kebersihan area dapur, peralatan, dan bahan makanan</li>
                        <li>Melaksanakan proses memasak sesuai SOP, resep, dan standar kualitas Umara Catering</li>
                        <li>Menjaga food safety & hygiene (FIFO, penyimpanan bahan, sanitasi)</li>
                        <li>Siap bekerja di dapur produksi maupun di lokasi event</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pendidikan minimal SMK Tata Boga / Perhotelan</li>
                        <li>Fresh graduate dipersilakan melamar</li>
                        <li>Memiliki minat besar di bidang kuliner & catering</li>
                        <li>Food preparation, Knife Skill, Basic Cooking Technique</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $rnb->id,
                'job_title' => 'Office Boy',
                'image' => $rnb->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pendidikan minimal SMP/SMA sederajat</li>
                        <li>Pengalaman sebagai OB / Cleaning Service resto lebih diutamakan</li>
                        <li>Bertanggung jawab menjaga kebersihan area restoran (dining, dapur, toilet, gudang)</li>
                        <li>Rajin, jujur, disiplin, dan cekatan</li>
                        <li>Bersedia bekerja dengan sistem shift</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pria/Wanita, usia ideal 18-30 tahun</li>
                        <li>Berpenampilan rapi, bersih, dan menarik</li>
                        <li>Komunikatif & ramah kepada tamu</li>
                        <li>Memiliki service mindset & hospitality attitude</li>
                    </ul>',
            ],
            [
                'business_unit_id' => $rnb->id,
                'job_title' => 'Waiterss',
                'image' => $rnb->logo,
                'description' => '
                    <h3 class="font-bold mb-2">Responsibilities:</h3>
                    <ul class="list-disc pl-5 mb-4">
                        <li>Pendidikan minimal SMA/SMK sederajat</li>
                        <li>Pengalaman sebagai waitress/resto crew lebih diutamakan</li>
                        <li>Berpenampilan rapi, bersih, dan menarik</li>
                        <li>Memiliki komunikasi yang baik, ramah, dan sopan kepada tamu</li>
                        <li>Cepat tanggap, cekatan, dan memiliki inisiatif kerja yang baik</li>
                        <li>Mampu bekerja dengan sistem shift, termasuk akhir pekan & hari libur</li>
                    </ul>
                    <h3 class="font-bold mb-2">Kualifikasi:</h3>
                    <ul class="list-disc pl-5">
                        <li>Pria/Wanita, usia ideal 18-30 tahun</li>
                        <li>Komunikatif & ramah kepada tamu</li>
                        <li>Memiliki service mindset & hospitality attitude</li>
                        <li>Tahan bekerja di bawah tekanan (jam ramai)</li>
                    </ul>',
            ],
        ];

        // 3. Loop dan Insert Data
        foreach ($careers as $data) {
            Career::create([
                'business_unit_id' => $data['business_unit_id'],
                'job_title' => $data['job_title'],
                // Tambah random string agar slug unik
                'slug' => Str::slug($data['job_title'] . '-' . Str::random(5)),
                'description' => $data['description'],
                'is_active' => true,
                'image' => $data['image'], // Menggunakan data image yang sudah diset di atas
            ]);
        }
    }
}
