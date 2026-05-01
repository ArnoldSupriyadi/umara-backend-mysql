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

// Variabel Base URL Cloudflare R2
const r2Url = "https://assets.bridgeflow.my.id";

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
            <section className="hero-slider-section">
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
                        {sliders.map((slider) => {
                            // Tentukan class posisi teks berdasarkan text_position
                            const pos = slider.text_position ?? 'left';
                            const containerAlign =
                                pos === 'right'  ? 'items-end'   :
                                pos === 'center' ? 'items-center' :
                                                   'items-start';
                            const textAlign =
                                pos === 'right'  ? 'text-right'  :
                                pos === 'center' ? 'text-center' :
                                                   'text-left';
                            const paddingPos =
                                pos === 'right'  ? 'pr-8 md:pr-16 lg:pr-24' :
                                pos === 'center' ? 'px-6'                   :
                                                   'pl-8 md:pl-16 lg:pl-24';

                            return (
                                <SwiperSlide key={slider.id}>
                                    <div className="relative w-full h-full overflow-hidden">
                                        {/* Gambar pakai <img> dengan object-contain agar tampil full tanpa crop */}
                                        <img
                                            src={slider.image_url}
                                            alt={slider.headline ?? 'Slider'}
                                            className="absolute inset-0 w-full h-full object-cover object-center"
                                        />

                                        {/* Overlay gradient gelap tipis dari kiri/kanan sesuai posisi teks */}
                                        <div
                                            className="absolute inset-0 z-10"
                                            style={{
                                                background:
                                                    pos === 'right'
                                                        ? 'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)'
                                                        : pos === 'center'
                                                        ? 'rgba(0,0,0,0.35)'
                                                        : 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)',
                                            }}
                                        />

                                        {/* Teks konten */}
                                        <div className={`absolute inset-0 z-20 flex flex-col justify-center ${containerAlign} ${paddingPos}`}>
                                            <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${textAlign}`}>
                                                {slider.headline && (
                                                    <h2
                                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg mb-3 capitalize"
                                                        style={{
                                                            fontFamily: "'Merriweather', serif",
                                                            letterSpacing: '2px',
                                                            lineHeight: '1.2',
                                                        }}
                                                    >
                                                        {slider.headline}
                                                    </h2>
                                                )}
                                                {slider.subheadline && (
                                                    <p
                                                        className="text-sm sm:text-base md:text-lg text-white drop-shadow-md capitalize"
                                                        style={{
                                                            fontFamily: "'Merriweather', serif",
                                                            letterSpacing: '2px',
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        {slider.subheadline}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <h2 className="text-white text-2xl font-['Playfair_Display']">Belum ada slider yang aktif.</h2>
                    </div>
                )}
            </section>

            {/* --- 2. SECTION BRANDING OVERVIEW --- */}
           <section id="branding-overview" className="w-full py-20 px-8 md:px-2 lg:px-12 relative" 
                style={{
                    backgroundImage: `url(${r2Url}/background/UG-BACKGROUND-WEB.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <div className="w-full flex justify-center mt-4 relative z-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className="max-w-4xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#CE8131] font-['Playfair_Display']" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="400">
                            BRAND OVERVIEW 
                        </h2>
                        <p className="text-lg md:text-xl text-white leading-relaxed font-medium" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            We are a leading brand in the industry, known for our quality products and exceptional customer service.
                        </p>
                    </div>
                </div>

                 {/* --- 3. 5 COLUMN GRID SECTION --- */}
            <div className="w-full py-20 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* Grid Item 1 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                                <img src={`${r2Url}/logos/pt-nusantara-baru.svg`} alt="PT Nusantara Baru" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-4">RESTAURANT <br />& BAR</h3>
                            <p className="text-sm text-white flex-grow mb-6">Lightning fast performance and optimization</p>
                            <Link href="/rasa-nusantara-baru" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 2 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                                <img src={`${r2Url}/logos/ucr-logo-white.png`} alt="UCR" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-4">PREMIUM <br />CATERING</h3>
                            <p className="text-sm text-white flex-grow mb-6">Trusted by thousands of customers worldwide</p>
                            <Link href="/umara-cipta-rasa" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 3 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                                <img src={`${r2Url}/logos/pt-umara-mitra-kulina.svg`} alt="Umara Mitra Kulina" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-4">INDUSTRY<br />CATERING</h3>
                            <p className="text-sm text-white flex-grow mb-6">Customizable solutions for your needs</p>
                            <Link href="/umara-mitra-kulina" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 4 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                                <img src={`${r2Url}/logos/pt-lauk-kita-bersama.svg`} alt="Laukita Bersama" className="w-20 h-auto object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-4">FOOD<br /> MANUFACTURING</h3>
                            <p className="text-sm text-white flex-grow mb-6">Highly rated by our community</p>
                            <Link href="/laukita-bersama-indonesia" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>

                        {/* Grid Item 5 */}
                        <div className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-2xl shadow-lg p-6 text-center flex flex-col h-full transform transition hover:-translate-y-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center p-4">
                                <img src={`${r2Url}/logos/pt-laukita-niaga.svg`} alt="Laukita Niaga" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-4">GROWING & <br />QUALITY</h3>
                            <p className="text-sm text-white flex-grow mb-6">Continuously expanding and improving</p>
                            <Link href="/laukita-niaga-indonesia" className="bg-[#8D4105] hover:bg-[#6b3003] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-auto shadow-md">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            

            {/* --- 4. BAGIAN CLIENTS --- */}
            <section className="py-20" style={{
                    backgroundImage: `url('${r2Url}/background/BACKGROUND-OUR-CLIENT.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <h2 className="text-4xl font-bold text-center text-[#CE8131] font-['Playfair_Display']">
                            OUR CLIENT
                        </h2>
                        <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
                            Trusted by leading organizations and institutions across various industries, we are proud to serve our valued clients with excellence and dedication.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4 sm:gap-6 lg:gap-8 mt-12">
                        
                        {clients && clients.length > 0 ? (
                            clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="bg-white p-2 sm:p-4 rounded-lg shadow-md flex items-center justify-center"
                                    data-aos="fade-right"
                                    data-aos-duration="800"
                                    data-aos-delay="400"
                                    title={client.name}
                                >
                                    {client.logo_url ? (
                                        <img
                                            src={client.logo_url}
                                            alt={client.name}
                                            className="w-full h-auto object-contain max-h-16 sm:max-h-20"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-400 text-center">
                                            {client.name}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                Belum ada data client.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* --- 5. BAGIAN LATEST ARTICLES/POSTS --- */}
            <section className="py-16 text-white relative" style={{ backgroundImage: `url('${r2Url}/background/BACKGROUND-NEWS.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Title */}
                    <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <h2 className="text-4xl font-bold mb-4 text-[#CE8131] font-['Playfair_Display']">LATEST NEWS</h2>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">Stay updated with our latest news, events, and company developments</p>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <Link
                                    href={`/posts/${post.slug}`}
                                    key={post.id}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    data-aos-delay={index * 200}
                                >
                                    <div className="h-48 relative overflow-hidden">
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 font-['Playfair_Display']">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-end">
                                            <div className="p-4">
                                                <span className="bg-gradient-to-r from-[#CE8131] to-[#8D4105] text-white text-xs px-2 py-1 rounded-full">
                                                    {post.unit_name || 'Umara Group'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-300 text-sm mb-2">{post.created_at}</p>
                                        <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-200 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <span className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                                            Read More
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-300">
                                Belum ada artikel yang dipublikasikan.
                            </div>
                        )}
                    </div>

                    {/* View All News Button */}
                    <div className="text-center mt-12 flex justify-center">
                        <Link
                            href="/posts"
                            className="inline-flex items-center bg-gradient-to-r from-[#CE8131] to-[#8D4105] hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                        >
                            View All News
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}