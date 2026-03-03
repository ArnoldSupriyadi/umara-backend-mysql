import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

// Import SwiperJS untuk Hero Slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import AOS untuk Animasi
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index({ sliders, clients, posts }) {
    
    // Inisialisasi Animasi AOS
    useEffect(() => {
        AOS.init({
            once: true, // Animasi hanya berjalan sekali
            offset: 50, // Jarak scroll sebelum animasi mulai
        });
    }, []);

    return (
        <FrontendLayout>
            <Head title="Home - Umara Group" />

            {/* --- 1. BAGIAN HERO SLIDER --- */}
            <section className="relative w-full h-[70vh] md:h-[85vh] bg-gray-900">
                {sliders && sliders.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        className="w-full h-full"
                    >
                        {sliders.map((slider) => (
                            <SwiperSlide key={slider.id}>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center z-0"
                                        style={{ backgroundImage: `url(${slider.image_url})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                                    <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto mt-12 md:mt-0">
                                        <span className="uppercase tracking-widest text-sm md:text-base font-semibold text-blue-400 mb-4 block drop-shadow-md">
                                            Welcome to Umara Group
                                        </span>
                                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg font-['Playfair_Display']">
                                            {slider.title}
                                        </h2>
                                        {slider.link && (
                                            <a href={slider.link} className="mt-4 inline-block px-8 py-3 bg-[#CE8131] hover:bg-[#8D4105] text-white font-bold rounded-full transition shadow-lg">
                                                Learn More
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <h2 className="text-white text-2xl font-['Playfair_Display']">Belum ada slider yang aktif.</h2>
                    </div>
                )}
            </section>

            {/* --- 2. SECTION BRANDING OVERVIEW --- */}
            <section 
                id="branding-overview" 
                className="w-full py-20 px-8 md:px-2 lg:px-12 relative" 
                style={{
                    backgroundImage: "url('/assets/bg/UG-BACKGROUND-WEB.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <div className="absolute inset-0 bg-white/85 z-0"></div>
                <div className="w-full flex justify-center mt-4 relative z-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="max-w-4xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#CE8131] font-['Playfair_Display']" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="400">
                            BRAND OVERVIEW
                        </h2>
                        <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            We are a leading brand in the industry, known for our quality products and exceptional customer service.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* --- 3. 5 COLUMN GRID SECTION --- */}
            <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* Grid Item 1 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-4 shadow-inner">
                                <img src="/assets/images/pt-nusantara-baru.svg" alt="PT Nusantara Baru" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-4">RESTAURANT <br />& BAR</h3>
                            <p className="text-sm text-gray-700 flex-grow mb-6">Lightning fast performance and optimization</p>
                            <Link href="/rasa-nusantara-baru" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 2 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-4 shadow-inner">
                                <img src="/assets/vector/ucr-logo-white.png" alt="UCR" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-4">PREMIUM <br />CATERING</h3>
                            <p className="text-sm text-gray-700 flex-grow mb-6">Trusted by thousands of customers worldwide</p>
                            <Link href="/umara-cipta-rasa" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 3 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-4 shadow-inner">
                                <img src="/assets/images/pt-umara-mitra-kulina.svg" alt="Umara Mitra Kulina" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-4">INDUSTRY<br />CATERING</h3>
                            <p className="text-sm text-gray-700 flex-grow mb-6">Customizable solutions for your needs</p>
                            <Link href="/umara-mitra-kulina" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 4 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-4 shadow-inner">
                                <img src="/assets/images/pt-lauk-kita-bersama.svg" alt="Laukita Bersama" className="w-20 h-auto object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-4">FOOD<br /> MANUFACTURING</h3>
                            <p className="text-sm text-gray-700 flex-grow mb-6">Highly rated by our community</p>
                            <Link href="/laukita-bersama-indonesia" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 5 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
                            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-4 shadow-inner">
                                <img src="/assets/images/pt-laukita-niaga.svg" alt="Laukita Niaga" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-4">GROWING & <br />QUALITY</h3>
                            <p className="text-sm text-gray-700 flex-grow mb-6">Continuously expanding and improving</p>
                            <Link href="/laukita-niaga-indonesia" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. BAGIAN CLIENTS --- */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Playfair_Display']">Our Trusted Partners</h2>
                        <div className="w-24 h-1 bg-[#CE8131] mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
                        {clients && clients.length > 0 ? (
                            clients.map((client) => (
                                <div 
                                    key={client.id} 
                                    className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all grayscale hover:grayscale-0 cursor-pointer"
                                    title={client.name}
                                >
                                    {client.logo_url ? (
                                        <img src={client.logo_url} alt={client.name} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-400 text-center">{client.name}</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 w-full">Belum ada data client.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* --- 5. BAGIAN LATEST ARTICLES/POSTS --- */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12" data-aos="fade-right" data-aos-duration="800">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Playfair_Display']">Latest Updates</h2>
                            <div className="w-24 h-1 bg-[#CE8131] mt-4 rounded-full"></div>
                        </div>
                        <Link href="/posts" className="hidden md:inline-flex text-[#8D4105] hover:text-[#CE8131] font-bold items-center transition-colors">
                            View All Articles &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <Link 
                                    href={`/posts/${post.slug}`} 
                                    key={post.id} 
                                    className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    data-aos="fade-up" 
                                    data-aos-duration="800" 
                                    data-aos-delay={index * 200} // Memberikan efek berurutan
                                >
                                    <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                                        {post.image_url ? (
                                            <img 
                                                src={post.image_url} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-['Playfair_Display']">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#8D4105] shadow-sm">
                                            {post.unit_name || 'Umara Group'}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs text-gray-500 mb-2">{post.created_at}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#CE8131] transition-colors line-clamp-2 font-['Playfair_Display']">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto text-[#8D4105] font-bold text-sm flex items-center">
                                            Read Article 
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Belum ada artikel yang dipublikasikan.
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-8 text-center md:hidden">
                        <Link href="/posts" className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors">
                            View All Articles
                        </Link>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}