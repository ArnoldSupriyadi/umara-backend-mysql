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
