import React from 'react';
import { Head, Link } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Index({ careers }) {
    console.log("Data Karir diterima", careers); // cek di console

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <FrontendLayout>
            <Head title="Career at Umara Group" />

            {/* --- HERO SECTION --- */}
            <section 
                className="relative py-28 text-white overflow-hidden" 
                style={{ 
                    backgroundImage: `url('${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center center' 
                }}
            >
                {/* Tambahan overlay transparan tipis agar teks lebih mudah dibaca di atas gambar */}
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Playfair_Display']">
                        Careers at  
                        Umara Group
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-['Inter'] text-gray-100">
                        Join our passionate team and grow with us. We offer exciting opportunities across our diverse culinary brands.
                    </p>
                </div>
            </section>

            {/* --- BAGIAN LOOPING DATA LOWONGAN --- */}
            <div className="max-w-6xl mx-auto mt-16 px-4 pb-20">
                {careers.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow border border-gray-200">
                        <p className="text-gray-500 text-lg">Saat ini belum ada lowongan pekerjaan yang tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {careers.map((job) =>
                            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
                                
                                {/* Bagian Gambar Lowongan */}
                                {job.image_url ? (
                                    <img src={job.image_url} alt={job.job_title} className="w-full h-40 object-contain rounded-md" />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                                        <span className="text-gray-400">Tidak ada gambar</span>
                                    </div>
                                )}

                                {/* Bagian Konten yang dibungkus padding */}
                                <div className="py-4 flex-grow flex flex-col mt-2">
                                    <div className="mb-3">
                                        <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                                            {job.unit_name}
                                        </span>
                                    </div>

                                    {/* Judul, Deskripsi, dan Tombol */}
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.job_title}</h2>
                                    <p className="mt-2 text-gray-600 text-sm flex-grow mb-6">{job.description}</p>
                                    
                                    <div className="mt-auto">
                                        <Link
                                            href={`/careers/${job.slug}`}
                                            className="w-full block text-center bg-gradient-to-r from-[#CE8131] to-[#8D4105] hover:brightness-110 text-white font-medium py-2 px-4 rounded-lg transition shadow-sm"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </FrontendLayout>
    );
}