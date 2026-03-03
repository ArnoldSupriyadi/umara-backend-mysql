import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ career }) {

    const [isSuccess, setIsSuccess] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        career_id: career.id,
        name: '',
        place_of_birth: '',
        date_of_birth: '',
        email: '',
        phone: '',
        address: '',
        willing_to_relocate: '',
        cv: null,
        photo: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/careers/apply', {
            onSuccess: () => {
                setIsSuccess(true);
                reset();
                setTimeout(() => setIsSuccess(false), 6000);
            },
        });
    }
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800">
            {/* Judul Tab Browser yang Dinamis */}
            <Head title={`${career.job_title} - Umara Karir`} />

            <div className="max-w-4xl mx-auto">

                <div className="mb-8">
                    <Link 
                        href="/careers" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                        &larr; Kembali ke Daftar Lowongan
                    </Link>
                </div>

                {/* BAGIAN INFO LOWONGAN */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    {career.image_url && (
                        <div className="w-full h-64 m:h-80 bg-gray-200">
                            <img src={career.image_url} alt="{career.job_title}" className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div className="p-8 md:p-12">
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">
                                {career.unit_name}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                {career.job_title}
                            </h1>
                        </div>

                        {/* Deskripsi (Menggunakan dangerouslySetInnerHTML karena biasanya Filament menyimpan format HTML dari Rich Editor) */}
                        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: career.description }} />

                        {/* Tombol Aksi (Bisa diarahkan ke WhatsApp, Email, atau Form) */}
                        <div className="bg-gray-50 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Tertarik dengan posisi ini?</h3>
                                <p className="text-gray-500 text-sm">Kirimkan CV terbaru Anda ke tim rekrutmen kami.</p>
                            </div>

                            <a href={`/careers/${career.slug}/apply`}
                                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-center"> Lamar Sekarang
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}