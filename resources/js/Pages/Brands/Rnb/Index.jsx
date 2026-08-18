import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import RnbLayout from '@/Layouts/Brands/RnbLayout';

// Import Swiper untuk Carousel Banner
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = ({ brand, posts }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    // Helper untuk link RNB
    const basePath = `/${brand?.slug || 'rasa-nusantara-baru'}`;

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    // Logic data post
    const hasPosts = posts && posts.data && posts.data.length > 0;

    // Data Banner RNB
    const heroSlides = [
        { image: `${r2Url}/sliders/3.jpg`, title: "Premium Dining Experience", desc: "Indulge in our carefully crafted menu featuring the finest local ingredients." },
        { image: `${r2Url}/sliders/4.jpeg`, title: "Elegant Atmosphere", desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements." },
        { image: `${r2Url}/sliders/5.jpeg`, title: "Elegant Area", desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements." },
        { image: `${r2Url}/sliders/14.jpg`, title: "Memorable Moments", desc: "Create lasting memories with family and friends in our welcoming environment." }
    ];

    const restaurants = [
        {
            name: "Lumpang Emas Signature",
            logo: `${r2Url}/logos/lumpang prapanca putih.png`,
            desc: "Restaurant at Prapanca, Jl. Prapanca Raya No.40A",
            mapUrl: "https://maps.app.goo.gl/JYcjpy8KrVdiS5KY7",
            // Nanti slug ini dipakai untuk Link halaman detail
            slug: "lumpang-emas-signature"
        },
        // {
        //     name: "Lumpang Emas By Umara",
        //     logo: `${r2Url}/logos/lumpang-bintaro-putih.png`,
        //     desc: "Nusantara Modern Restaurant, Bintaro Jaya CBD",
        //     mapUrl: "https://maps.app.goo.gl/vCF4k3tXeyZ61tvp7",
        //     slug: "lumpang-emas-bintaro"
        // },
        {
            name: "Umara House",
            logo: `${r2Url}/logos/umarahouse-putih.png`,
            desc: "Modern Resto & Bar, Jl. Bendungan Hilir No.134",
            mapUrl: "https://maps.app.goo.gl/JAnRuS4TpKTF9RSw6",
            slug: "umara-house"
        },
    ]

    return (
        <>
            <Head title={`${brand?.name || 'Rasa Nusantara Baru'} - Umara Group`} />

            {/* --- 1. HERO SECTION DENGAN SWIPER --- */}
            <section id="home" className="relative h-screen overflow-hidden bg-gray-900">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0} slidesPerView={1} loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }} navigation={true}
                    className="w-full h-full"
                >
                    {heroSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.image}')` }}>
                                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{slide.title}</h1>
                                    <p className="text-xl md:text-2xl mb-8 leading-relaxed">{slide.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* --- 2. SERVICES SECTION --- */}
            <section id="services" className="py-20" style={{ backgroundImage: `url('${r2Url}/background/BG-PAGE-RESTAURANT-RNB.jpg')`, backgroundSize: 'cover' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-palette2-e mb-4">Our Restaurant</h2>
                        <p className="text-xl text-white max-w-2xl mx-auto">We provide comprehensive business solutions tailored to your needs</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {restaurants.map((resto, index) => (
                             <div key={index} className="bg-amber-50 border-2 border-[#d7b35c] p-8 rounded-lg hover:shadow-lg transition-shadow flex flex-col h-full" data-aos="fade-up" data-aos-delay={200 * index + 1}>
                                    <div className="w-28 h-28 bg-palette2-a rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <img src={resto.logo} alt={resto.name} className="w-20 h-20 max-w-full object-contain" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#131313] mb-4 text-center uppercase tracking-wide">{resto.name.replace(' ', '\n').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</h3>
                                    <p className="text-gray-600 text-center"><a href={resto.mapUrl} target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">{resto.desc}</a></p>
                                <Link className="text-center mt-auto pt-4">
                                        <Link href={`${basePath}/outlets/${resto.slug}`} className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-[#d7b35c] via-[#bb9040] to-[#9c6d29]">Learn More</Link>
                                    </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* --- 3. ABOUT SECTION --- */}
            <section id="about" className="py-20 bg-gray-50" style={{ backgroundImage: `url('${r2Url}/background/BG-RNB-PAGE-ABOUT.jpg')`, backgroundSize: 'cover' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-12 lg:mb-0" data-aos="fade-right">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About PT Rasa Nusantara Baru</h2>
                            <p className="text-lg text-gray-600 mb-6">RNB is the business unit that delivers Umara's best food through restaurants in a few different concepts under Umara House and Lumpang Emas brands.</p>
                            <p className="text-lg text-gray-600 mb-8">Restaurant business serves as the "display" of Umara Group in general directly to existing and potential customers.</p>
                            
                            <div className="grid grid-cols-2 gap-8">
                                <div className="text-center p-6 rounded-lg bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                    <div className="text-4xl font-bold text-white mb-2">1000+</div>
                                    <div className="text-white font-medium">Happy Customers</div>
                                </div>
                                <div className="text-center p-6 rounded-lg bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                    <div className="text-4xl font-bold text-white mb-2">7+</div>
                                    <div className="text-white font-medium">Years Excellence</div>
                                </div>
                                <div className="text-center p-6 rounded-lg bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                    <div className="text-4xl font-bold text-white mb-2">15+</div>
                                    <div className="text-white font-medium">Menu Varieties</div>
                                </div>
                                <div className="text-center p-6 rounded-lg bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                    <div className="text-4xl font-bold text-white mb-2">3+</div>
                                    <div className="text-white font-medium">Locations</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative" data-aos="fade-left">
                            <div className="rounded-lg p-8 bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                                <p className="text-lg mb-6 text-white/90">To be the leading business solutions provider in Indonesia, empowering companies to achieve their full potential through innovative strategies and exceptional service.</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            {/* --- 4. NEWS SECTION (DATA DINAMIS) --- */}
            <section id="news" className="py-20 bg-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-14" data-aos="fade-up">
                        <span className="inline-block text-palette2-a font-semibold text-sm uppercase tracking-widest mb-3">News & Updates</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
                        <div className="w-16 h-1 bg-palette2-c mx-auto mb-4 rounded-full"></div>
                        <p className="text-base text-gray-500 max-w-xl mx-auto">Updates and stories from Rasa Nusantara Baru</p>
                    </div>

                    {!hasPosts ? (
                        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                            <svg className="w-14 h-14 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <p className="text-sm">Belum ada berita yang dipublikasikan saat ini.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {posts.data.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/posts/${post.slug}`}
                                    className="group flex flex-col rounded-2xl overflow-hidden border border-amber-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    {/* Gambar Card */}
                                    <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: '200px' }}>
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-amber-50 text-gray-300">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {/* Konten Card */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-palette2-c font-semibold uppercase tracking-wide mb-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {post.created_at}
                                        </span>
                                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-palette2-a transition-colors leading-snug line-clamp-2 flex-grow">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-1.5 text-palette2-a font-semibold text-sm">
                                            Read More
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* --- 5. CONTACT SECTION --- */}
            <section id="contact" className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                        <div className="w-16 h-1 bg-palette2-c mx-auto mb-4 rounded-full"></div>
                        <p className="text-lg text-gray-600 max-w-xl mx-auto">Visit us at one of our locations or reach out directly — we'd love to hear from you.</p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="100">

                        {/* Card: Address */}
                        <div className="flex items-start gap-4 p-6 rounded-2xl border border-amber-100 bg-amber-50 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-3">Our Outlets</h3>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div>
                                        <p className="font-semibold text-gray-800">Umara House</p>
                                        <p>Jl. Bendungan Hilir No.134,<br />Tanah Abang, Jakarta Pusat</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Lumpang Emas Bintaro</p>
                                        <p>Bintaro Avenue, Jl. MH Thamrin Blok A2 No. 1</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Lumpang Emas Signature</p>
                                        <p>Jl. Prapanca Raya No.40A, Jakarta Selatan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card: Phone & WA */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4 p-6 rounded-2xl border border-amber-100 bg-amber-50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">Phone / WhatsApp</h3>
                                    <a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer" className="text-sm text-gray-600 hover:text-amber-600 transition-colors font-medium">
                                        +62-812-2222-7496
                                    </a>
                                </div>
                            </div>

                            {/* CTA WhatsApp */}
                            <a
                                href="https://wa.me/6281222227496"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-semibold text-base hover:opacity-90 transition-opacity bg-cover"
                                style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Chat via WhatsApp
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

// Pasang Layout RNB secara persisten
Index.layout = page => <RnbLayout children={page} brand={page.props.brand} />;

export default Index;