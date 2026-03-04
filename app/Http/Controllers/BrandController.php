<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BusinessUnit; // 👈 Pastikan model ini di-import
use Illuminate\Support\Str as SupportStr;
use Psy\Util\Str;

class BrandController extends Controller
{
    public function show($brand_slug)
    {
        // 1. Polisi Database mencari brand yang slug-nya cocok dengan URL
        // Jika tidak ketemu (misal user ngetik asal), otomatis tampil halaman 404
        $brand = BusinessUnit::where('slug', $brand_slug)->firstOrFail();

        // 2. Tentukan File React mana yang mau dipakai berdasarkan slug
        // (Pastikan teks slug di kiri ini SAMA PERSIS dengan di database Anda ya)
        $reactComponent = match ($brand->slug) {
            'umara-cipta-rasa'          => 'Brands/Ucr/Index',
            'rasa-nusantara-baru'       => 'Brands/Rnb/Index',
            'laukita-bersama-indonesia' => 'Brands/Lbi/Index',
            'laukita-niaga-indonesia'   => 'Brands/Lni/Index',
            'umara-mitra-kulina'        => 'Brands/Umk/Index',
            default                     => 'Brands/DefaultShow',
        };
        // 3. Kirim data brand tersebut ke React
        return Inertia::render($reactComponent, [
            'brand' => $brand
        ]);
    }

    public function page($brand_slug, $page_slug)
    {
        // 👇 TAMBAHKAN KODE INI SEMENTARA DI BARIS PALING ATAS
        // dd("HALO! Rute sukses ditangkap. Brand: " . $brand_slug . " | Halaman: " . $page_slug);

        // 1. Cari brand-nya
        $brand = BusinessUnit::where('slug', $brand_slug)->firstOrFail();

        // 2. Tentukan Folder React berdasarkan brand
        $folder = match ($brand->slug) {
            'umara-cipta-rasa'  => 'Ucr',
            'rasa-nusantara-baru' => 'Rnb',
            'laukita-bersama-indonesia' => 'Lbi',
            'laukita-niaga-indonesia' => 'Lni',
            'umara-mitra-kulina' => 'Umk',
            default => 'Default',
        };

        // 3. Ubah page_slug dari URL jadi nama file React
        // Contoh: 'wedding' jadi 'Wedding', 'meal-box' jadi 'MealBox'
        $fileName = ucfirst(SupportStr::camel($page_slug));

        // 4. Panggil file React-nya! (Contoh output: "Brands/Ucr/Wedding")
        // Jika file tidak ada, Laravel akan otomatis memunculkan error agar kita tahu.
        return Inertia::render("Brands/{$folder}/{$fileName}", [
            'brand' => $brand
        ]);
    }
}
