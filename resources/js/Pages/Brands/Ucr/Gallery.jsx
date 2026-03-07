import React from 'react';
import { Head } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function Gallery({ brand }) {
    
    // Data gambar untuk Masonry Gallery
    const signatureDishes = [
        { src: "/assets/ucr/signature-dish/Canape.JPG", alt: "Canape" },
        { src: "/assets/ucr/signature-dish/Cheese wheel pasta.jpg", alt: "Cheese wheel pasta" },
        { src: "/assets/ucr/signature-dish/Chicken Teriyaki Rice Bowl.jpg", alt: "Chicken Teriyaki Rice Bowl" },
        { src: "/assets/ucr/signature-dish/Creps de Suzet.jpg", alt: "Creps de Suzet" },
        { src: "/assets/ucr/signature-dish/Empal Gentong.jpg", alt: "Empal Gentong" },
        { src: "/assets/ucr/signature-dish/Es Oyen.jpg", alt: "Es Oyen" },
        { src: "/assets/ucr/signature-dish/Nasi Liwet Keprabon.jpg", alt: "Nasi Liwet Keprabon" },
        { src: "/assets/ucr/signature-dish/Nasi Umara.jpg", alt: "Nasi Umara" },
        { src: "/assets/ucr/signature-dish/Osakayaki.jpg", alt: "Osakayaki" },
        { src: "/assets/ucr/signature-dish/Pandan Telaga Aren.jpg", alt: "Pandan Telaga Aren" },
        { src: "/assets/ucr/signature-dish/Roasted Duck Noodle.jpg", alt: "Roasted Duck Noodle" },
        { src: "/assets/ucr/signature-dish/Salmon Mayoyaki.jpg", alt: "Salmon Mayoyaki" },
        { src: "/assets/ucr/signature-dish/Zuppa Soup.jpg", alt: "Zuppa Soup" },
        { src: "/assets/ucr/signature-dish/Es-pisang-ijo.png", alt: "Es Pisang Ijo" },
        { src: "/assets/ucr/signature-dish/Mix Bbq.png", alt: "Mix Bbq" }
    ];

    return (
        <div className="bg-white">
            <Head title={`Gallery - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HEADER SECTION --- */}
                <section id="gallery" className="pt-32 pb-16 bg-[#FCFBF7] border-b border-[#E1D5A6]/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#C5A859] mb-8">
                            Gallery
                        </h1>
                        <p className="font-light text-gray-600 text-lg md:text-xl leading-relaxed">
                            Discover a curated collection of our culinary creations — thoughtfully plated, beautifully presented, and designed to elevate every occasion.
                        </p>
                    </div>
                </section>

                {/* --- MASONRY PHOTO GALLERY --- */}
                <section id="photo-gallery" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 border-l-4 border-[#C5A859] pl-4">
                            Signature Dish
                        </h2>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Menggunakan Tailwind Columns untuk efek Masonry (Pinterest style).
                            Di HP 1 kolom, Tablet 2 kolom, Laptop 3 kolom.
                        */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {signatureDishes.map((dish, index) => (
                                <div 
                                    key={index} 
                                    className="break-inside-avoid relative overflow-hidden rounded-sm shadow-sm group cursor-pointer"
                                >
                                    <img 
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={dish.src} 
                                        alt={dish.alt} 
                                    />
                                    {/* Overlay nama hidangan saat dihover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <span className="text-white font-playfair text-lg tracking-wider font-medium text-center px-4">
                                            {dish.alt}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section id="cta-overview" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6 leading-tight">
                            Your next remarkable event begins here.
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light tracking-wide">
                            Contact our team to start your consultation.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Let's Discuss Your Event Needs
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Gallery.layout = page => <UcrLayout children={page} brand={page.props.brand} />;