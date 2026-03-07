import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Meeting({ brand }) {
    
    // Data untuk Carousel Featured Moments
    const featuredMoments = [
        {
            image: "/assets/ucr/UCR-WEB/meeting/meeting1.jpg",
            title: "Executive Meeting service"
        },
        {
            image: "/assets/ucr/UCR-WEB/meeting/meeting4.jpg",
            title: "Table Dining for Partners"
        },
        {
            image: "/assets/ucr/UCR-WEB/meeting/meeting5.jpg",
            title: "Townhall Meeting"
        }
    ];

    return (
        <div className="bg-white">
            <Head title={`Meeting - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="hero-card">
                    <div className="container-hero-fluid w-full">
                        <div className="hero-media relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                            <img 
                                src="/assets/ucr/UCR-WEB/meeting/meeting-cover.png" 
                                alt="Umara Meeting" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hero-text pt-16 pb-20 text-center max-w-4xl mx-auto">
                            <h1 className="headline text-4xl md:text-5xl lg:text-6xl font-playfair text-[#C5A859] mb-6 tracking-wider">
                                Meeting
                            </h1>
                            <p className="text-lg text-gray-700 tracking-wide leading-relaxed font-light">
                                Designed to complement productive environments, Umara supports your meetings with thoughtful food service — from premium snacks and refined side dishes to complete main course selections. Every menu is curated to enhance focus, comfort, and a memorable business experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- INTRO PACKAGE SECTION --- */}
                <section id="meeting-package" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] mb-6">
                                    Meeting Packages
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light text-lg">
                                    The Perfect Combination Where Extraordinary Meets Flawless. Umara collaborates with esteemed venues and private locations across Jakarta to bring unforgettable wedding moments to life. Whether set within elegant halls, outdoor gardens, or intimate private estates, each celebration is crafted with tailored styling, curated menus, and seamless execution — reflecting your story with beauty and precision.
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <img 
                                    src="/assets/ucr/UCR-WEB/meeting/meeting2.jpg" 
                                    alt="Meeting Package" 
                                    className="w-full h-auto rounded-sm shadow-xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURED MOMENTS (SWIPER CAROUSEL) --- */}
                <section id="feature-moment" className="py-20 bg-gray-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] tracking-wider mb-2">
                            Featured Moments
                        </h2>
                    </div>
                    
                    <div className="relative max-w-[100vw] mx-auto px-4">
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{
                                el: '.meeting-pagination',
                                clickable: true,
                                bulletClass: 'swiper-custom-bullet',
                                bulletActiveClass: 'swiper-custom-bullet-active',
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                1024: { slidesPerView: 2.5 },
                            }}
                            navigation={{
                                prevEl: '.meeting-prev',
                                nextEl: '.meeting-next',
                            }}
                            className="w-full pb-16"
                        >
                            {featuredMoments.map((moment, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md mb-4 group">
                                        <img 
                                            src={moment.image} 
                                            alt={moment.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="text-gray-700 font-medium text-center tracking-wide text-lg">
                                        {moment.title}
                                    </p>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation Buttons */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm border border-[#E1D5A6] rounded-full px-4 py-2 z-10 shadow-lg">
                            <button className="meeting-prev w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Previous">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="meeting-next w-10 h-10 flex items-center justify-center text-[#C5A859] hover:bg-[#C5A859] hover:text-white rounded-full transition-colors cursor-pointer" aria-label="Next">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        
                        {/* Pagination Dots Container */}
                        <div className="meeting-pagination flex items-center justify-center gap-2 mt-4 absolute bottom-0 w-full z-10"></div>
                    </div>
                </section>

                {/* --- CTA SECTION 1 --- */}
                <section id="cta-action-1" className="py-24 border-y border-[#E1D5A6] bg-[#FAFAFA]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6">
                            Start Planning Your Meeting Here
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light">
                            Tell us about your meeting, then we'll contact you and plan it together.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] text-[#C5A859] hover:bg-[#C5A859] hover:text-white font-medium tracking-widest uppercase transition-colors"
                        >
                            Start Your Plan Here
                        </a>
                    </div>
                </section>

                {/* --- MEETING SERVICES (GRID) --- */}
                <section id="meeting-packages" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-12 text-center md:text-left">
                            Meeting Services
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Main large image (spans 2 columns on large screens) */}
                            <div className="lg:col-span-2 relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-sm shadow-md">
                                <img 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                    src="/assets/ucr/UCR-WEB/meeting/meeting-services2.jpg" 
                                    alt="Meeting Service Main" 
                                />
                            </div>
                            
                            {/* Smaller images */}
                            <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                                <img 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                    src="/assets/ucr/UCR-WEB/meeting/meeting-services1.jpg" 
                                    alt="Meeting Service Detail 1" 
                                />
                            </div>
                            
                            <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                                <img 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                    src="/assets/ucr/UCR-WEB/meeting/meeting-services3.jpg" 
                                    alt="Meeting Service Detail 2" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION 2 --- */}
                <section id="cta-action-2" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6 leading-tight">
                            The Perfect Combination Where Extraordinary Meets Flawless
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
                            Meeting Services specialists who thrive on creating pitch-perfect events of any scale.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Start Your Plan Here
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Meeting.layout = page => <UcrLayout children={page} brand={page.props.brand} />;