import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

// Import Swiper untuk Carousel Banner
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index({ brand }) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    // Data Banner RNB (Agar kodenya lebih rapi tidak menumpuk)
    const heroSlides = [
        {
            image: "/assets/rnb/carousel/main/3.jpg",
            title: "Premium Dining Experience",
            desc: "Indulge in our carefully crafted menu featuring the finest local ingredients."
        },
        {
            image: "/assets/rnb/carousel/main/4.jpeg",
            title: "Elegant Atmosphere",
            desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements."
        },
        {
            image: "/assets/rnb/carousel/main/5.jpeg",
            title: "Elegant Area",
            desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements."
        },
        {
            image: "/assets/rnb/carousel/main/6.jpg",
            title: "Food and Drinks",
            desc: "Savor our diverse menu of delectable foods and refreshing drinks."
        },
        {
            image: "/assets/rnb/carousel/main/14.jpg",
            title: "Memorable Moments",
            desc: "Create lasting memories with family and friends in our welcoming environment."
        }
    ];

    return (
        <FrontendLayout>
            {/* Meta Title */}
            <Head title={`${brand?.name || 'Rasa Nusantara Baru'} - Umara Group`} />

            <div className="bg-gray-50 tracking-wide">
                
                {/* --- 1. HERO SECTION DENGAN SWIPER --- */}
                <section id="home" className="relative h-screen overflow-hidden">
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
                        {heroSlides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div 
                                    className="w-full h-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
                                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.image}')` }}
                                >
                                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-down" data-aos-duration="1200">
                                            {slide.title}
                                        </h1>
                                        <p className="text-xl md:text-2xl mb-8 leading-relaxed" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                            {slide.desc}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

                {/* --- 2. SERVICES SECTION --- */}
                <section id="services" className="py-20" style={{ backgroundImage: "url('/assets/rnb/BG-PAGE-RESTAURANT-RNB.jpg')", backgroundSize: 'cover' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
                            <h2 className="text-3xl md:text-4xl font-bold text-palette2-e mb-4" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200">Our Restaurant</h2>
                            <p className="text-xl text-white max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">We provide comprehensive business solutions tailored to your needs</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            
                            {/* Lumpang Emas Signature */}
                            <div className="bg-amber-50 border-2 border-palette2-a p-8 rounded-lg hover:shadow-lg transition-shadow flex flex-col h-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                <div className="w-28 h-28 bg-palette2-a rounded-full flex items-center justify-center mb-6 mx-auto" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="400">
                                    <img src="/assets/vector/-_lumpang prapanca putih.png" alt="Lumpang Emas Signature" className="w-20 h-20 max-w-full object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-palette2-e mb-4 text-center uppercase tracking-wide">Lumpang Emas<br/>Signature</h3>
                                <p className="text-gray-600 text-center"><a href="https://maps.app.goo.gl/JYcjpy8KrVdiS5KY7" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Restaurant at Prapnca,<br/>Jl. Prapanca Raya No.40A</a></p>
                                <div className="text-center mt-auto pt-4">
                                    <Link href="#" className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-[#d7b35c] via-[#bb9040] to-[#9c6d29] hover:opacity-90 transition">Learn More</Link>
                                </div>
                            </div>

                            {/* Lumpang Emas By Umara */}
                            <div className="bg-amber-50 border-2 border-palette2-a p-8 rounded-lg hover:shadow-lg transition-shadow flex flex-col h-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <div className="w-28 h-28 bg-palette2-a rounded-full flex items-center justify-center mb-6 mx-auto" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="600">
                                    <img src="/assets/vector/-_lumpang bintaro putih.png" alt="Lumpang Emas Bintaro" className="w-20 h-20 max-w-full object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-palette2-e mb-4 text-center uppercase tracking-wide">Lumpang Emas<br/>By Umara</h3>
                                <p className="text-gray-600 text-center"><a href="https://maps.app.goo.gl/vCF4k3tXeyZ61tvp7" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Nusantara Modern Restaurant at Bintaro,<br/>Bintaro Jaya CBD</a></p>
                                <div className="text-center mt-auto pt-4">
                                    <Link href="#" className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-[#d7b35c] via-[#bb9040] to-[#9c6d29] hover:opacity-90 transition">Learn Here</Link>
                                </div>
                            </div>

                            {/* Umara House */}
                            <div className="bg-amber-50 border-2 border-palette2-a p-8 rounded-lg hover:shadow-lg transition-shadow flex flex-col h-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <div className="w-28 h-28 bg-palette2-a rounded-full flex items-center justify-center mb-6 mx-auto" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="800">
                                    <img src="/assets/vector/-_umarahouse putih.png" alt="Umara House" className="w-20 h-20 max-w-full object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-palette2-e mb-4 text-center uppercase tracking-wide">Umara<br/>House</h3>
                                <p className="text-gray-600 text-center"><a href="https://maps.app.goo.gl/JAnRuS4TpKTF9RSw6" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Modern Resto & Bar at Bendungan Hilir,<br/>Jl. Bendungan Hilir No.134</a></p>
                                <div className="text-center mt-auto pt-4">
                                    <Link href="#" className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-[#d7b35c] via-[#bb9040] to-[#9c6d29] hover:opacity-90 transition">Learn Here</Link>
                                </div>
                            </div>

                            {/* Rasa Umara */}
                            <div className="bg-amber-50 border-2 border-palette2-a p-8 rounded-lg hover:shadow-lg transition-shadow flex flex-col h-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                                <div className="w-28 h-28 bg-palette2-a rounded-full flex items-center justify-center mb-6 mx-auto" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1000">
                                    <img src="/assets/vector/-_rasa umara putih.png" alt="Rasa Umara" className="w-20 h-20 max-w-full object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-palette2-e mb-4 text-center uppercase tracking-wide">Rasa <br/>Umara</h3>
                                <p className="text-gray-600 text-center"><a href="https://maps.app.goo.gl/xA9sincfvQoAAt348" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Nusantra Prasmanan Restaurant at Cikarang<br/>Jl. MH. Thamrin</a></p>
                                <div className="text-center mt-auto pt-4">
                                    <Link href="#" className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-[#d7b35c] via-[#bb9040] to-[#9c6d29] hover:opacity-90 transition">Learn Here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. ABOUT SECTION --- */}
                <section id="about" className="py-20 bg-gray-50" style={{ backgroundImage: "url('/assets/rnb/BG-RNB-PAGE-ABOUT.jpg')", backgroundSize: 'cover' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="mb-12 lg:mb-0" data-aos="fade-right" data-aos-duration="1000">
                                <h2 className="text-3xl md:text-4xl font-bold text-palette2-e mb-6" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200">About PT Rasa Nusantara Baru</h2>
                                <p className="text-lg text-gray-600 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                    RNB is the business unit that delivers Umara's best food through restaurants in a few different concepts under Umara House and Lumpang Emas brands.
                                </p>
                                <p className="text-lg text-gray-600 mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                    Restaurant business serves as the "display" of Umara Group in general directly to existing and potential customers. Few planned expansions in Jakarta in high end malls & international airports, we imagine even Bali and some international expansions in the longer future.
                                </p>
                                <div className="grid grid-cols-2 gap-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                                    <div className="text-center p-6 rounded-lg bg-cover" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1000" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                        <div className="text-4xl font-bold text-palette2-e mb-2">1000+</div>
                                        <div className="text-white font-medium">Happy Customers</div>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-cover" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1100" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                        <div className="text-4xl font-bold text-palette2-e mb-2">7+</div>
                                        <div className="text-white font-medium">Years Excellence</div>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-cover" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1200" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                        <div className="text-4xl font-bold text-palette2-e mb-2">15+</div>
                                        <div className="text-white font-medium">Menu Varieties</div>
                                    </div>
                                    <div className="text-center p-6 rounded-lg bg-cover" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="1300" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                        <div className="text-4xl font-bold text-palette2-e mb-2">3+</div>
                                        <div className="text-white font-medium">Restaurant Locations</div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                                <div className="rounded-lg p-8 bg-cover" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                    <h3 className="text-2xl font-bold mb-4 text-palette2-e" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="400">Our Mission</h3>
                                    <p className="text-lg mb-6 text-white" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                        To be the leading business solutions provider in Indonesia, empowering companies to achieve their full potential through innovative strategies and exceptional service.
                                    </p>
                                    <div className="flex items-center" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="800">
                                        <div className="w-12 h-12 bg-palette2-d rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-palette2-e" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-lg font-semibold text-white">Committed to Excellence</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. NEWS SECTION (Statis untuk saat ini) --- */}
                <section id="news" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
                            <h2 className="text-3xl md:text-4xl font-bold text-palette2-e mb-4" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200">Latest News</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Updates and stories from Rasa Nusantara Baru</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Article 1 */}
                            <article className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                <div className="relative overflow-hidden">
                                    <img src="/assets/news/yoga-at-prapanca/IMG_7978.jpg" alt="Yoga Session" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="text-gray-500 text-sm mb-3">4 January 2026</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Wellness Meets Culinary: A Morning of Yoga and Connection</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">There is no better way to set the tone for the new year than with mindfulness, movement, and a hearty meal shared with friends.</p>
                                    <Link href={`/${brand?.slug || 'rasa-nusantara-baru'}/news/yoga`} className="mt-auto inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold">
                                        Read More
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </article>

                            {/* Article 2 */}
                            <article className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <div className="relative overflow-hidden">
                                    <img src="/assets/news/santa-umara/IMG_7935.jpg" alt="Santa" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="text-gray-500 text-sm mb-3">25 Desember 2025</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">A Magical Christmas: Santa Surprises Guests at Umara House</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">Christmas is a season of giving, sharing, and creating beautiful memories with loved ones.</p>
                                    <Link href={`/${brand?.slug || 'rasa-nusantara-baru'}/news/santa`} className="mt-auto inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold">
                                        Read More
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </article>

                            {/* Article 3 */}
                            <article className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                <div className="relative overflow-hidden">
                                    <img src="/assets/news/hayomoto/1.jpeg" alt="HayoMoto" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6 flex flex-col h-full">
                                    <div className="text-gray-500 text-sm mb-3">8 November 2025</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Lumpang Emas Bintaro Hosts the Vibrant 8th Anniversary of HayoMoto</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">Lumpang Emas Bintaro is honored to be part of the vibrant celebration of HayoMoto’s 8th Anniversary</p>
                                    <Link href={`/${brand?.slug || 'rasa-nusantara-baru'}/news/hayomoto`} className="mt-auto inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold">
                                        Read More
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* --- 5. CONTACT SECTION --- */}
                <section id="contact" className="py-20 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
                            <h2 className="text-3xl md:text-4xl font-bold text-palette2-e mb-4" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="200">Get In Touch</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Ready to take your business to the next level? Contact us today for a consultation.</p>
                        </div>
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                            <div className="mb-12 lg:mb-0" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                                <div className="space-y-8">
                                    <div className="flex items-start" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-cover" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-palette2-e mb-2">Address Outlets</h3>
                                            <div className="text-gray-600 space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-800">Umara House</h4>
                                                    <p><a href="https://maps.app.goo.gl/7BPoGrzhHTkwifBk9" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">Jl. Bendungan Hilir No.134,<br/>Tanah Abang, Jakarta Pusat</a></p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800">Lumpang Emas</h4>
                                                    <p><a href="https://maps.app.goo.gl/As9as3W5zFVv5Bng6" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">Lumpang Emas Bintaro Avenue<br/>Jl. MH Thamrin Blok A2 No. 1<br/>Bintaro Sektor 7, Bintaro Jaya</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-cover" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-palette2-e">Phone</h3>
                                            <p className="text-gray-600"><a href="https://wa.me/6281222227496" className="hover:text-amber-600 transition">+62-812‑2222‑7496</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="fade-left">
                                <form className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-colors" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <input type="text" id="subject" name="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-colors" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea id="message" name="message" rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition-colors resize-y"></textarea>
                                    </div>
                                    <button type="submit" className="w-full text-white px-6 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')", backgroundSize: 'cover' }}>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </FrontendLayout>
    );
}