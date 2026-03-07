import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Event({ brand }) {
    
    // Data gambar untuk Event Gallery Carousel
    const eventImages = [
        { src: "/assets/ucr/UCR-WEB/event/EVENT3.jpg", alt: "Private Event" },
        { src: "/assets/ucr-coorporate-event/3.jpg", alt: "Corporate Event" },
        { src: "/assets/ucr/UCR-WEB/event/EVENT.jpg", alt: "Gymnastic Olympics" },
        { src: "/assets/ucr/UCR-WEB/event/EVENT2.jpg", alt: "Private Event" },
        { src: "/assets/ucr/UCR-WEB/event/EVENT4.jpg", alt: "Private Event" },
        { src: "/assets/ucr/UCR-WEB/event/EVENT5.jpg", alt: "Private Event" }
    ];

    return (
        <div className="bg-white">
            <Head title={`Event Services - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="hero-card">
                    <div className="container-hero-fluid w-full">
                        <div className="hero-media relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                            <img 
                                src="/assets/ucr/UCR-WEB/event-hero-img.jpeg" 
                                alt="Umara Events" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hero-text pt-16 pb-20 text-center max-w-4xl mx-auto">
                            <h1 className="headline text-4xl md:text-5xl lg:text-6xl font-playfair text-[#C5A859] mb-6 tracking-wider">
                                Event
                            </h1>
                            <p className="text-lg text-gray-700 tracking-wide leading-relaxed font-light">
                                Designed to elevate every occasion, Umara brings refined food experiences to a wide spectrum of events from brand launches and corporate celebrations to social gatherings and private showcases. Beyond serving menus, our team collaborates with you to shape concepts, presentation styles, and service flow — offering insight, creativity, and thoughtful execution. Each event is approached with intention, ensuring impactful moments, elevated taste, and a memorable experience for every guest.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- EVENT GALLERY (SWIPER CAROUSEL) --- */}
                <section id="event-gallery" className="py-20 overflow-hidden bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] tracking-wider mb-4">
                            Event Gallery
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            Curated moments from corporate gatherings, launches, and private events.
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
                                prevEl: '.event-prev',
                                nextEl: '.event-next',
                            }}
                            className="w-full pb-16"
                        >
                            {eventImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md group">
                                        <img 
                                            src={image.src} 
                                            alt={image.alt} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Overlay teks judul foto saat dihover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <p className="text-white p-6 font-medium tracking-wide">
                                                {image.alt}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm border border-[#E1D5A6] rounded-full px-4 py-2 z-10 shadow-lg">
                            <button className="event-prev w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Previous">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="event-next w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Next">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section id="cta-action" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6 leading-tight">
                            Turning Moments into Signature Experiences
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
                            We collaborate with you to elevate celebrations, launches, and executive functions with inspiring ideas, curated menus, and polished delivery.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Start Your Event Plan
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Event.layout = page => <UcrLayout children={page} brand={page.props.brand} />;