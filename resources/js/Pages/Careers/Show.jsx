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
                            <img src={career.image_url} alt="{career.job_title}" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-8 md:p-12">
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <span className="">
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}