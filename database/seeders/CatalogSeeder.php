<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Catalog;
use App\Models\BusinessUnit;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Cari Business Unit "Rasa Nusantara Baru"
        // Pastikan namanya sesuai dengan yang ada di database Anda
        $rnb = BusinessUnit::where('name', 'like', '%Rasa Nusantara Baru%')->first();

        // Cek keamanan jika data tidak ditemukan
        if (!$rnb) {
            $this->command->error('Error: Business Unit "Rasa Nusantara Baru" tidak ditemukan. Pastikan sudah menjalankan BusinessUnitSeeder.');
            return;
        }

        // 2. Data Katalog yang ingin dimasukkan
        $catalogs = [
            [
                'title' => 'Menu Umara House',
                // Saya hilangkan slash awal '/' agar path terbaca rapi oleh helper asset() Laravel
                // Jadi nanti urlnya: domain.com/storage/images/catalog/...
                'file_path' => 'images/catalog/menu-umara-house.pdf',
                'business_unit_id' => $rnb->id,
            ],
            [
                'title' => 'Menu Rasa Umara Cikarang 2025',
                'file_path' => 'images/catalog/MENU-RASA-UMARA-CIKARANG-2025.pdf',
                'business_unit_id' => $rnb->id,
            ],
        ];

        // 3. Masukkan ke Database
        foreach ($catalogs as $data) {
            Catalog::create($data);
        }
    }
}
