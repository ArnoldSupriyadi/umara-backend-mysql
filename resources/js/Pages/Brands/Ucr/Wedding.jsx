import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Wedding({ brand }) {
    
    // Data gambar untuk Carousel Highlight Moments
    const highlightImages = [
        "/assets/ucr/UCR-WEB/wedding/highlight-moments1.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding3.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding4.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding5.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding6.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding7.jpg",
        "/assets/ucr/UCR-WEB/wedding/wedding8.jpeg",
        "/assets/ucr/UCR-WEB/wedding/wedding9.jpeg",
        "/assets/ucr/UCR-WEB/wedding/wedding10.jpeg"
    ];

    return (
        <div className="bg-white">
            <Head title={`Wedding - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="hero-card">
                    <div className="container-hero-fluid w-full">
                        <div className="hero-media relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                            <img 
                                src="/assets/ucr/UCR-WEB/wedding-hero-img.jpg" 
                                alt="Umara Wedding" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hero-text pt-16 pb-20 text-center max-w-4xl mx-auto">
                            <h1 className="headline text-4xl md:text-5xl lg:text-6xl font-playfair text-[#C5A859] mb-6 tracking-wider">
                                Wedding
                            </h1>
                            <p className="text-lg text-gray-700 tracking-wide leading-relaxed font-light">
                                With a selection of impressive wedding venues, expert planning services, and comprehensive wedding packages, the hotel ensures that your special occasion is as unique as your personality.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- INTRO SECTION --- */}
                <section id="wedding" className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex items-center gap-12">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] leading-tight">
                                    Where Weddings Become Unforgettable Moments
                                </h2>
                            </div>
                            <div className="md:w-1/2">
                                <p className="text-gray-600 leading-relaxed font-light text-lg">
                                    Discover thoughtfully curated spaces that embrace celebrations of every scale — from grand gatherings with hundreds of guests to intimate ceremonies shared with those who matter most. Each venue is shaped to elevate the journey, with private access points, generous foyer areas, and elegant layouts that allow couples to design a seamless flow from arrival to farewell.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- HIGHLIGHT MOMENTS (SWIPER CAROUSEL) --- */}
                <section id="wedding-highlight" className="py-20 overflow-hidden bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] tracking-wider">
                            Highlight Moments
                        </h2>
                    </div>
                    
                    <div className="relative max-w-[100vw] mx-auto px-4">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                1024: { slidesPerView: 2.5 },
                            }}
                            navigation={{
                                prevEl: '.venue-prev',
                                nextEl: '.venue-next',
                            }}
                            className="w-full pb-16"
                        >
                            {highlightImages.map((src, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
                                        <img 
                                            src={src} 
                                            alt={`Wedding Highlight ${index + 1}`} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm border border-[#E1D5A6] rounded-full px-4 py-2 z-10 shadow-lg">
                            <button className="venue-prev w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Previous">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="venue-next w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Next">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION 1 --- */}
                <section id="cta-action" className="py-24 border-y border-[#E1D5A6] bg-[#FAFAFA]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                            Weddings
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6">
                            Start Planning Your Wedding Here
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light">
                            Tell us about your wedding, then we'll contact you and plan it together.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] text-[#C5A859] hover:bg-[#C5A859] hover:text-white font-medium tracking-widest uppercase transition-colors"
                        >
                            Start Your Wedding Plan Here
                        </a>
                    </div>
                </section>

                {/* --- VENUES & ADVISOR (ZIG-ZAG) --- */}
                <section id="wedding-venues" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                        
                        {/* Venues */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <img 
                                    src="/assets/ucr-wedding-catering/2.jpg" 
                                    alt="Wedding Venues" 
                                    className="w-full h-auto rounded-sm shadow-xl object-cover"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] mb-6">
                                    Wedding Venues
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light text-lg">
                                    Umara collaborates with esteemed venues and private locations across Jakarta to bring unforgettable wedding moments to life. Whether set within elegant halls, outdoor gardens, or intimate private estates, each celebration is crafted with tailored styling, curated menus, and seamless execution — reflecting your story with beauty and precision.
                                </p>
                            </div>
                        </div>

                        {/* Advisor */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] mb-6">
                                    Wedding Advisor
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light text-lg">
                                    The Umara Wedding Advisor guides couples through every stage of their celebration — from menu curation and aesthetic direction to timing, flow, and guest experience. With attentive insight and dedicated planning support, we ensure your wedding unfolds with sentiment, clarity, and effortless elegance.
                                </p>
                            </div>
                            <div>
                                <img 
                                    src="/assets/ucr/UCR-WEB/wedding/wedding-advisor.png" 
                                    alt="Wedding Advisor" 
                                    className="w-full h-auto rounded-sm shadow-xl object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- CTA SECTION 2 --- */}
                <section id="wedding-packages" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                            Wedding Packages
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6">
                            Choose the Package That Fits Your Needs
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light">
                            Umara offers a range of wedding packages to suit your budget and preferences. Whether you're looking for a traditional wedding or a modern event, we have the perfect package for you.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Start Your Wedding Plan Here
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Wedding.layout = page => <UcrLayout children={page} brand={page.props.brand} />;