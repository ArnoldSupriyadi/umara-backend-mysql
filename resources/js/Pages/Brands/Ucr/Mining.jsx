import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Mining({ brand }) {
    
    // Data gambar untuk Mining Gallery Carousel
    const miningImages = [
        { src: "/assets/ucr-mining-event/6.jpg", alt: "Mining Operation 1" },
        { src: "/assets/ucr-mining-event/8.jpg", alt: "Mining Operation 2" },
        { src: "/assets/ucr-mining-event/3.jpg", alt: "Mining Operation 3" },
        { src: "/assets/ucr-mining-event/4.jpg", alt: "Mining Operation 4" },
        { src: "/assets/ucr-mining-event/5.jpg", alt: "Mining Operation 5" }
    ];

    return (
        <div className="bg-white">
            <Head title={`Mining, Oil and Gas - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="hero-card">
                    <div className="container-hero-fluid w-full">
                        <div className="hero-media relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                            <img 
                                src="/assets/ucr-mining-event/minig-cover.jpg" 
                                alt="Mining Catering" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hero-text pt-16 pb-20 text-center max-w-4xl mx-auto">
                            <h1 className="headline text-4xl md:text-5xl lg:text-6xl font-playfair text-[#C5A859] mb-6 tracking-wider">
                                Mining, Oil and Gas
                            </h1>
                            <p className="text-lg text-gray-700 tracking-wide leading-relaxed font-light mb-12">
                                We deliver field-proven catering services specifically designed for the Mining, Oil, and Gas sectors. With established operations in East Kalimantan, our team provides consistent quality and reliable logistics across remote sites. We prioritize robust food safety standards and efficient batch production to meet the demands of large-volume operations. Our services are tailored to support roster-based shifts, ensuring your workforce receives nutritious, high-quality meals that sustain productivity and morale in the most demanding environments.
                            </p>
                            
                            {/* Regional Operations Hub Information */}
                            <div className="mt-12 max-w-lg mx-auto relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-[#E1D5A6]"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-4 text-sm text-[#C5A859] uppercase tracking-widest font-bold">
                                        Regional Operations Hub
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 text-center bg-[#FCFBF7] p-6 rounded-sm border border-[#E1D5A6]/30 inline-block">
                                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Komplek WIKA</h3>
                                <p className="text-gray-700 font-medium tracking-wide">Jl. BR1 No. 19, Balikpapan</p>
                                <p className="text-gray-500 font-light">Kalimantan Timur, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MINING GALLERY (SWIPER CAROUSEL) --- */}
                <section id="mining-gallery" className="py-20 overflow-hidden bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] tracking-wider mb-4">
                            Gallery
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            Highlights from high-volume production and site operations.
                        </p>
                    </div>
                    
                    <div className="relative max-w-[100vw] mx-auto px-4">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                1024: { slidesPerView: 2.5 },
                            }}
                            navigation={{
                                prevEl: '.mining-prev',
                                nextEl: '.mining-next',
                            }}
                            className="w-full pb-16"
                        >
                            {miningImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md group">
                                        <img 
                                            src={image.src} 
                                            alt={image.alt} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm border border-[#E1D5A6] rounded-full px-4 py-2 z-10 shadow-lg">
                            <button className="mining-prev w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Previous">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="mining-next w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Next">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section id="cta-action" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6 leading-tight">
                            Reliable Catering for Remote Operations
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
                            From roster shifts to mass production, we deliver consistent, safe, and efficient meals for mining sites.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Discuss Your Site Needs
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Mining.layout = page => <UcrLayout children={page} brand={page.props.brand} />;