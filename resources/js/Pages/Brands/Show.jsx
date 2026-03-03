import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Show({ brand }) {
    return (
        <FrontendLayout>
            {/* Meta Title Dinamis sesuai nama brand */}
            <Head title={`${brand.name} - Umara Group`} />

            {/* HERO SECTION KHUSUS BRAND */}
            <div className="relative bg-gray-900 py-32 text-center text-white flex flex-col items-center justify-center min-h-[60vh]">
                
                {/* Background Pattern Opsional */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    {/* Menampilkan Nama Brand secara Dinamis */}
                    <h1 className="text-5xl md:text-7xl font-bold font-['Playfair_Display'] text-[#CE8131] mb-6 drop-shadow-lg">
                        {brand.name}
                    </h1>
                    
                    <p className="mt-4 text-xl text-gray-200 mb-10 leading-relaxed">
                        Selamat datang di halaman resmi {brand.name}. Kami berkomitmen memberikan kualitas dan pelayanan terbaik untuk Anda.
                    </p>

                    {/* Tombol yang mengarah ke halaman Berita Khusus Brand ini (Nanti kita buat di Tahap 2) */}
                    <Link
                        href={`/${brand.slug}/news`}
                        className="inline-block bg-[#8D4105] hover:bg-[#6b3003] text-white px-8 py-4 rounded-xl font-bold transition shadow-xl transform hover:-translate-y-1"
                    >
                        Liats Berita & Promo {brand.name}
                    </Link>
                </div>
            </div>

            {/* Bagian Konten Lainnya (Tentang Brand, Layanan, dll bisa ditambahkan di sini nanti) */}
            <div className="py-20 bg-white text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Profil {brand.name}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Ini adalah template halaman dinamis. Anda bisa menambahkan deskripsi spesifik, foto galeri, atau katalog layanan khusus untuk brand ini nantinya.
                </p>
            </div>

        </FrontendLayout>
    );
}