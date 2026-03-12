import React, { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Apply({ career }) {
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        career_id:           career.id,
        name:                '',
        place_of_birth:      '',
        date_of_birth:       '',
        email:               '',
        phone:               '',
        address:             '',
        willing_to_relocate: '',
        cv:                  null,
        photo:               null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        const MAX_SIZE = 2 * 1024 * 1024;
        let hasError = false;

        if (data.cv && data.cv.size > MAX_SIZE) {
            setError('cv', 'Ukuran file CV maksimal 2MB!');
            hasError = true;
        }
        if (data.photo && data.photo.size > MAX_SIZE) {
            setError('photo', 'Ukuran foto maksimal 2MB!');
            hasError = true;
        }
        if (hasError) return;

        post('/careers/apply', {
            forceFormData: true,
            onSuccess: () => {
                setIsSuccess(true);
                setTimeout(() => router.get(`/careers/${career.slug}`), 3000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-800">
            <Head title={`Apply for ${career.job_title}`} />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href={`/careers/${career.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        &larr; Batal dan Kembali
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Application Form</h2>
                    <p className="text-gray-500 text-sm mb-6">* Indicates required fields</p>

                    {isSuccess && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                            <span className="mr-2">✅</span>
                            Lamaran berhasil dikirim! Mengalihkan halaman dalam 3 detik...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Posisi yang dilamar */}
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                            <label className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                                Position Applied *
                            </label>
                            <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                💼 {career.job_title}
                                <span className="text-sm font-normal text-gray-600">({career.unit_name})</span>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Place of Birth + Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                                <input
                                    type="text"
                                    value={data.place_of_birth}
                                    onChange={e => setData('place_of_birth', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={e => setData('date_of_birth', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>}
                            </div>
                        </div>

                        {/* Email + Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                rows="3"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Willing to Relocate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Willing to be placed anywhere? *
                            </label>
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio" name="relocate" value="yes"
                                        checked={data.willing_to_relocate === 'yes'}
                                        onChange={e => setData('willing_to_relocate', e.target.value)}
                                        required
                                        className="h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio" name="relocate" value="no"
                                        checked={data.willing_to_relocate === 'no'}
                                        onChange={e => setData('willing_to_relocate', e.target.value)}
                                        className="h-4 w-4 text-blue-600 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.willing_to_relocate && (
                                <p className="text-red-500 text-xs mt-1">{errors.willing_to_relocate}</p>
                            )}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Upload CV */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Upload CV *</label>
                            <p className="text-xs text-gray-500 mb-2">Format: PDF, DOC, DOCX. Maks 2MB.</p>
                            <input
                                type="file" accept=".pdf,.doc,.docx"
                                onChange={e => setData('cv', e.target.files[0])}
                                required
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                            {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
                        </div>

                        {/* Upload Foto */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Foto Selfie *</label>
                            <p className="text-xs text-gray-500 mb-2">Foto wajah jelas untuk verifikasi identitas. Maks 2MB.</p>
                            <input
                                type="file" accept="image/*"
                                onChange={e => setData('photo', e.target.files[0])}
                                required
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : 'Submit Application'}
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-lg transition"
                            >
                                Reset
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
