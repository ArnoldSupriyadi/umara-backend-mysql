import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function Ballroom({ brand }) {
    
    // Helper untuk routing kembali ke halaman utama UCR
    const basePath = `/${brand?.slug || 'umara-cipta-rasa'}`;

    return (
        // Menggunakan min-h-[70vh] dan flex agar konten otomatis berada di tengah layar
        <div className="bg-[#FCFBF7] min-h-[70vh] flex flex-col items-center justify-center">
            <Head title={`Ballroom Experience - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main className="w-full">
                <section id="coming-soon" className="py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        
                        <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                            Ballroom Experience
                        </h3>
                        
                        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-[#C5A859] leading-tight mb-6">
                            Coming Soon
                        </h1>
                        
                        <p className="text-gray-600 text-lg md:text-xl font-light mb-12">
                            We’re crafting a refined dining journey. Stay tuned for launch updates.
                        </p>
                        
                        <div className="inline-flex items-center justify-center">
                            <Link 
                                href={basePath} 
                                className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                            >
                                Back to Umara
                            </Link>
                        </div>
                        
                    </div>
                </section>
            </main>
        </div>
    );
}

// Pasang Layout UCR
Ballroom.layout = page => <UcrLayout children={page} brand={page.props.brand} />;