import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout'

// Import Swiper untuk Carousel Banner
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = ({ brand, heroSlides = [], showcaseSlides = [], experienceImages = [] }) => {

    const r2Url = "https://assets.bridgeflow.my.id";

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    // Helper variable untuk link agar lebih mudah dibaca
    const basePath = `/${brand?.slug || 'umara-cipta-rasa'}`;

    return (
        <>
            {/* Meta Title */}
            <Head title={`${brand?.name || 'Umara Catering'} - Umara Group`} />

            {/* Bungkus seluruh konten dengan class "ucr-theme" agar CSS khusus UCR hanya berlaku di halaman ini */}
            <div className="ucr-theme bg-white">
                
                {/* --- 1. HERO OVERVIEW --- */}
                <section id="hero-overview">
                    <div className="container-hero-fluid">
                        <div className="relative shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 6000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                className="swiper-hero w-full"
                            >
                                {heroSlides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-full">
                                            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover object-center" />
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent"></div>
                                            <div className="absolute left-6 right-6 bottom-6 md:left-14 md:bottom-14 max-w-3xl bg-black/40 p-6 backdrop-blur-sm border-l-4 border-[#CBB88A]">
                                                <h3 className="font-['Playfair_Display'] text-white font-bold tracking-[0.01em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                                                    Premium Culinary Journeys for Every Grand Occasion
                                                </h3>
                                                <p className="text-white opacity-90 mt-4 text-sm sm:text-base md:text-lg">
                                                    Elevating Weddings, Meetings, and Events through Exceptional Dining.
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* --- 2. ABOUT OVERVIEW --- */}
                <section id="about-overview" className="py-20">
                    <div className="container-wide" data-aos="fade-up">
                        <h2 className="title">Welcome to Umara</h2>
                        <small className="text-gray-500 uppercase tracking-widest font-semibold mt-2 block">A destination for elevated wedding, meeting, and event experiences.</small>

                        <div className="mt-8 space-y-6">
                            <p className="lede text-lg">
                                Located in South Jakarta, Umara brings a modern expression of refined Indonesian excellence — thoughtfully crafted for
                                celebrations, corporate engagements, and curated private occasions. Every experience is shaped with intention, combining
                                culinary artistry, meticulous planning, and seamless coordination to create moments that feel both effortless and memorable.
                            </p>
                            <p className="lede text-lg">
                                Guided by seasoned chefs and an experienced event team, Umara presents bespoke menus, elegant setups, and a warm,
                                attentive approach that honors every client’s vision. From intimate gatherings to large-scale events, each moment is
                                designed with precision, comfort, and understated sophistication.
                            </p>
                            <p className="lede text-lg font-medium">
                                Umara is where meaningful celebrations take shape — a place where exceptional service and refined ambiance come together
                                to create experiences that feel personal, polished, and exclusively yours.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- 3. SERVICES OVERVIEW --- */}
                <section id="service-overview" className="py-20 bg-gray-50">
                    <div className="container-wide">
                        <h2 className="title" data-aos="fade-right">Experiences with Umara</h2>
                        
                        <div className="grid-3 mt-12">
                            {/* Wedding */}
                            <div className="card" data-aos="fade-up" data-aos-delay="100">
                                <div className="card-media"><img src={experienceImages[0].image} alt={experienceImages[0].alt} /></div>
                                <div className="card-body">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">Wedding</h3>
                                    <p className="text-gray-600 mt-2 mb-4 leading-relaxed">Elegant wedding experiences with bespoke menus and refined service.</p>
                                    <Link href={`${basePath}/wedding`} className="link">Learn More &rarr;</Link>
                                </div>
                            </div>

                            {/* Meeting */}
                            <div className="card" data-aos="fade-up" data-aos-delay="200">
                                <div className="card-media"><img src={experienceImages[1].image} alt={experienceImages[1].alt} /></div>
                                <div className="card-body">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">Meeting</h3>
                                    <p className="text-gray-600 mt-2 mb-4 leading-relaxed">Professional meeting experiences with curated menus and seamless coordination.</p>
                                    <Link href={`${basePath}/meeting`} className="link">Learn More &rarr;</Link>
                                </div>
                            </div>

                            {/* Event */}
                            <div className="card" data-aos="fade-up" data-aos-delay="300">
                                <div className="card-media"><img src={experienceImages[2].image} alt={experienceImages[2].alt} /></div>
                                <div className="card-body">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">Event</h3>
                                    <p className="text-gray-600 mt-2 mb-4 leading-relaxed">Exceptional experiences for celebrations, product launches, and executive gatherings.</p>
                                    <Link href={`${basePath}/event`} className="link">Learn More &rarr;</Link>
                                </div>
                            </div>

                            {/* Mealbox */}
                            <div className="card" data-aos="fade-up" data-aos-delay="400">
                                <div className="card-media"><img src={experienceImages[3].image} alt={experienceImages[3].alt} /></div>
                                <div className="card-body">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">Mealbox</h3>
                                    <p className="text-gray-600 mt-2 mb-4 leading-relaxed">High-quality meal solutions crafted for corporate needs and daily operations.</p>
                                    <Link href={`${basePath}/mealbox`} className="link">Learn More &rarr;</Link>
                                </div>
                            </div>

                            {/* Dining */}
                            <div className="card" data-aos="fade-up" data-aos-delay="500">
                                <div className="card-media"><img src={experienceImages[4].image} alt={experienceImages[4].alt} /></div>
                                <div className="card-body">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">Dining</h3>
                                    <p className="text-gray-600 mt-2 mb-4 leading-relaxed">A curated dining experience, crafted for refined moments.</p>
                                    <Link href={`${basePath}/dining`} className="link">Learn More &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. FEATURED EXPERIENCE (Showcase Gallery) --- */}
                <section id="featured-experience" className="py-20">
                    <div className="container-wide text-center">
                        <h2 className="title mb-10" data-aos="fade-down">Experience Showcase</h2>
                        
                        <div className="max-w-5xl mx-auto shadow-2xl" data-aos="zoom-in">
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 5000 }}
                                navigation={true}
                                className="w-full aspect-video"
                            >
                                {showcaseSlides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-full group">
                                            <img src={slide.image} alt={`Showcase ${index + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-white text-sm md:text-base font-medium">{slide.caption}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="mt-8" data-aos="fade-up">
                            <Link href={`${basePath}/gallery`} className="inline-block border border-gray-800 text-gray-800 px-8 py-3 hover:bg-gray-800 hover:text-white transition-colors duration-300 font-semibold tracking-wide">
                                View Full Gallery
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- 5. CALL TO ACTION --- */}
                <section id="cta-overview" className="py-20 bg-[#faf9f5]">
                    <div className="container-wide">
                        <div className="cta-block" data-aos="flip-up">
                            <h2 className="title text-[32px]">Your next remarkable event begins here.</h2>
                            <p className="lede mx-auto text-lg mt-4">Contact our team to start your consultation.</p>
                            <div className="cta-links">
                                <a href="https://wa.me/6281212008700" target="_blank" rel="noreferrer" className="cta-link">
                                    Let's Discuss Your Event Needs
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

// 2. Pasang Layout-nya di sini (Inertia akan membaca ini)
Index.layout = page => <UcrLayout children={page} brand={page.props.brand} />;

// 3. BARU EKSPOR DI PALING BAWAH (Hanya ada satu default export)
export default Index;