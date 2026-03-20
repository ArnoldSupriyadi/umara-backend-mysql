import React from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

 // Variabel Base URL Cloudflare R2
 const r2Url = "https://assets.bridgeflow.my.id";

export default function Index() {
    return (
        <FrontendLayout>
            <Head title="Contact Us - Umara Group" />

            {/* --- HERO SECTION --- */}
            <section 
                className="relative py-20" 
                style={{
                    backgroundImage: `url('${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                {/* Tambahan layer gelap transparan (opsional) agar teks putih lebih terbaca di atas gambar */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 
                            className="text-white text-4xl md:text-5xl font-bold mb-4 font-['Playfair_Display']" 
                            data-aos="fade-up" 
                            data-aos-duration="1000"
                        >
                            Contact Us
                        </h1>
                        <p 
                            className="text-xl lg:text-2xl text-white leading-relaxed mb-8" 
                            data-aos="fade-up" 
                            data-aos-duration="1000" 
                            data-aos-delay="200"
                        >
                            Get in touch with our dedicated teams across different business units
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CONTACT CARDS SECTION --- */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* UCR - PT Umara Cipta Rasa */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-card-umara-group-brown-light/10 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                                <h3 className="text-2xl font-bold text-card-umara-group-brown-dark mb-3 font-['Playfair_Display']">PT Umara Cipta Rasa</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">Premium catering and culinary solutions for your special events</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">Instagram:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="https://www.instagram.com/umaracatering/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">@umaracatering</a>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">Phone:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="https://wa.me/6281212008700" target="_blank" rel="noopener noreferrer" className="hover:underline">0812‑1200‑8700</a>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* LBI - PT Laukita Bersama Indonesia */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-card-umara-group-brown-light/10 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                                <h3 className="text-2xl font-bold text-card-umara-group-brown-dark mb-3 font-['Playfair_Display']">PT Laukita Bersama Indonesia</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">Retort food solutions and innovation for the future of culinary manufacturing</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">LinkedIn:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="https://www.linkedin.com/company/laukita-bersama-indonesia/" target="_blank" rel="noopener noreferrer" className="hover:underline">Laukita Bersama Indonesia</a>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">Phone:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="tel:085217777177" target="_blank" rel="noopener noreferrer" className="hover:underline">0852-1777-7177</a>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* PT Rasa Nusantara Baru */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-card-umara-group-brown-light/10 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                                <h3 className="text-2xl font-bold text-card-umara-group-brown-dark mb-3 font-['Playfair_Display']">PT Rasa Nusantara Baru</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">Authentic Indonesian flavors and traditional recipes from across the archipelago</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 flex-wrap">
                                        <span className="text-sm text-gray-500 font-medium w-20 mt-1">Instagram:</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://www.instagram.com/lumpang_emas/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">@lumpang_emas</a></span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://www.instagram.com/umarahouse/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">@umarahouse</a></span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://www.instagram.com/rasaumara/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">@rasaumara</a></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">Phone:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="https://wa.me/628122227495" target="_blank" rel="noopener noreferrer" className="hover:underline">0812‑2222‑7495</a>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-medium w-20">Umara House:</span>
                                        <span className="text-card-umara-group-brown-dark font-medium">
                                            <a href="https://wa.me/628122227496" target="_blank" rel="noopener noreferrer" className="hover:underline">0812‑2222‑7496</a>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* UK - Umara Mitra Kulina & LNI */}
                            <div className="space-y-8">
                                {/* UK - Umara Mitra Kulina */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-card-umara-group-brown-light/10 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                                    <h3 className="text-2xl font-bold text-card-umara-group-brown-dark mb-3 font-['Playfair_Display']">PT Umara Mitra Kulina</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">Culinary partnerships and strategic collaborations in the food industry</p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-medium w-20">Instagram:</span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://www.instagram.com/laukitabyumara/" target="_blank" rel="noopener noreferrer" className="hover:underline">@UmaraMitraKulina</a></span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-medium w-20">Phone:</span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://wa.me/6282121200500" target="_blank" rel="noopener noreferrer" className="hover:underline">0821-2120-0500</a></span>
                                        </div>
                                    </div>
                                </div>

                                {/* LNI - Lauk Kita Indonesia */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-card-umara-group-brown-light/10 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
                                    <h3 className="text-2xl font-bold text-card-umara-group-brown-dark mb-3 font-['Playfair_Display']">LauKita Niaga Indonesia</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">We freeze our food at peak freshness and vacuum technology protects and preserves its quality.</p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-medium w-20">Instagram:</span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://www.instagram.com/laukitabyumara/" target="_blank" rel="noopener noreferrer" className="hover:underline">@laukitabyumara</a></span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-medium w-20">Phone:</span>
                                            <span className="text-card-umara-group-brown-dark font-medium"><a href="https://wa.me/6281260601055" target="_blank" rel="noopener noreferrer" className="hover:underline">0812‑6060‑1055</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}