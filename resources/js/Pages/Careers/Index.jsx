import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({careers}) {
    console.log("Data Karir diterima", careers); // cek di console

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800'>
            <Head title="Career at Umara Group" />

            {/* Bagian Header Teks */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Bergabung Bersama Kami
                </h1>
                <p className="text-lg text-gray-600">
                    Temukan peluang karir terbaik di berbagi unit bisnis Umara Group.
                </p>
            </div>

            {/* Bagian Looping Data */}
            <div className="max-w-6xl mx-auto">
                {careers.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow border border-gray-200">
                        <p className="text-gray-500 text-lg">Saat ini belum ada lowongan pekerjaan yang tersedia.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 👇 PERBAIKAN 1: Tambah tanda panah => di sini */}
                        {careers.map((job) => 
                            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
                                {/* Bagian Gambar Lowongan */}
                                {job.image_url ? (
                                    <img src={job.image_url} alt={job.job_title} className="w-full h-40 object-contain rounded-md" />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">Tidak ada gambar</span>
                                    </div>
                                )}

                                {/* 👇 PERBAIKAN 2: Typo flex-grow diperbaiki */}
                                {/* Bagian Konten yang dibungkus padding */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-3">
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded">{job.unit_name}</span>
                                    </div>
                                </div>

                                {/* Judul, Deskripsi, dan Tombol dimasukkan ke DALAM div padding ini */}
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.job_title}</h2>

                                <p className="mt-2 text-gray-600 text-sm flex-grow mb-6">{job.description}</p>
                                <div className="mt-auto">
                                    <Link
                                        href={`/careers/${job.slug}`}
                                        className="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>{/* 👇 PERBAIKAN 3: Penutup div p-6 dipindah ke paling bawah sini */}
                            </div>
                        )}
                    </div>
                )} 
            </div>
        </div>
    );
}