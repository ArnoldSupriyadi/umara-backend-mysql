import React from "react";
import { Head } from "@inertiajs/react";

//perhatikan props 'catalogs' diterima disini dari controller

export default function Index({catalogs}) {
    console.log("Data Katalog diterima", catalogs);// cek di console

    return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
        <Head title="Daftar Katalog" />

        <div className="max-w-5-xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Katalog & Menu Umara Group</h1>

            {/* LOGIKA LOOPING DATA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Jika Data Kosong */}
                {catalogs.length === 0 && (
                    <div className="col-span-3 text-center text-gray-500">
                        Tidak ada katalog yang tersedia.
                    </div>
                )}

                {/* Mapping Data */}
                {catalogs.map((item => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">

                        {/* Menampilkan Nama Unit */}
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                            {item.unit_name}
                        </span>
                        
                        {/* Menampilkan Judul Katalog */}
                        <h3 className="mt-3 text-xl font-bold text-gray-900">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 mb-4">
                            Format: PDF Document
                        </p>

                        {/* Tombol Download */}
                        <a href={item.file_url} target="_blank" rel="noreferrer"className="block w-full text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"> Download PDF</a>
                    </div>
                )))}
            </div>
        </div>
    </div>
    )
}