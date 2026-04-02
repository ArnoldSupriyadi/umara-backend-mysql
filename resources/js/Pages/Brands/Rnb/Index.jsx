import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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

    // --- SETUP FORM INERTIA (Terhubung ke Controller JSON kita) ---
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        business_unit_id: brand?.id,
        name: '',
        email: '',
        subject: '',
        message: '',
        restaurant_preference: '', // Field dinamis khusus RNB
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route('contact-messages.store'), {
            onSuccess: () => reset('name', 'email', 'subject', 'message', 'restaurant_preference'),
        });
    };

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    // Logic data post
    // Memastikan data post tidak kosong
    const hasPosts = posts && posts.data && posts.data.length > 0;
    // Memisahkan 1 berita pertama (Featured) dan sisa beritanya (Grid)
    const featuredPost = hasPosts ? posts.data[0] : null;
    const remainingPosts = hasPosts ? posts.data.slice(1) : [];

    // Data Banner RNB
    const heroSlides = [
        { image: `${r2Url}/sliders/3.jpg`, title: "Premium Dining Experience", desc: "Indulge in our carefully crafted menu featuring the finest local ingredients." },
        { image: `${r2Url}/sliders/4.jpeg`, title: "Elegant Atmosphere", desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements." },
        { image: `${r2Url}/sliders/5.jpeg`, title: "Elegant Area", desc: "Enjoy your meal in our beautifully decorated restaurant with floral arrangements." },
        { image: `${r2Url}/sliders/6.jpg`, title: "Food and Drinks", desc: "Savor our diverse menu of delectable foods and refreshing drinks." },
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
        {
            name: "Lumpang Emas By Umara",
            logo: `${r2Url}/logos/lumpang-bintaro-putih.png`,
            desc: "Nusantara Modern Restaurant, Bintaro Jaya CBD",
            mapUrl: "https://maps.app.goo.gl/vCF4k3tXeyZ61tvp7",
            slug: "lumpang-emas-bintaro"
        },
        {
            name: "Umara House",
            logo: `${r2Url}/logos/umarahouse-putih.png`,
            desc: "Modern Resto & Bar, Jl. Bendungan Hilir No.134",
            mapUrl: "https://maps.app.goo.gl/JAnRuS4TpKTF9RSw6",
            slug: "umara-house"
        },
        // {
            // name: "Rasa Umara",
            // logo: `${r2Url}/logos/rasa-umara-putih.png`,
            // desc: "Nusantara Prasmanan, Jl. MH. Thamrin Cikarang",
            // mapUrl: "https://maps.app.goo.gl/xA9sincfvQoAAt348",
            // slug: "rasa-umara"
        // }  
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <section id="news" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
                        <div className="w-16 h-1 bg-palette2-c mx-auto mb-4 rounded-full"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Updates and stories from Rasa Nusantara Baru</p>
                    </div>

                    {!hasPosts ? (
                        <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Belum ada berita yang dipublikasikan saat ini.
                        </div>
                    ) : (
                        <div className="space-y-10">

                            {/* Featured Article */}
                            {featuredPost && (
                                <Link href={`/posts/${featuredPost.slug}`} className="group block rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300" data-aos="fade-up">
                                    <div className="md:flex">
                                        <div className="md:w-1/2 relative overflow-hidden bg-gray-100 min-h-[280px]">
                                            {featuredPost.image_url ? (
                                                <img src={featuredPost.image_url} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-white">
                                            <span className="text-sm text-palette2-c font-medium mb-2">{featuredPost.created_at}</span>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-palette2-a transition-colors line-clamp-2">{featuredPost.title}</h3>
                                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{featuredPost.excerpt}</p>
                                            <span className="inline-flex items-center text-palette2-a font-semibold mt-auto">
                                                Read More
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Remaining Posts Grid */}
                            {remainingPosts.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {remainingPosts.map((post, index) => (
                                        <Link key={post.id} href={`/posts/${post.slug}`} className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white" data-aos="fade-up" data-aos-delay={index * 100}>
                                            <div className="relative h-52 overflow-hidden bg-gray-100">
                                                {post.image_url ? (
                                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <span className="text-sm text-palette2-c font-medium mb-2">{post.created_at}</span>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-palette2-a transition-colors line-clamp-2">{post.title}</h3>
                                                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                                <span className="mt-auto inline-flex items-center text-palette2-a font-semibold text-sm">
                                                    Read More
                                                    <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </section>

            {/* --- 5. CONTACT SECTION --- */}
            <section id="contact" className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to take your business to the next level? Contact us today for a consultation.</p>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                        
                        {/* Kiri: Info Alamat */}
                        <div className="mb-12 lg:mb-0" data-aos="fade-right">
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address Outlets</h3>
                                        <div className="text-gray-600 space-y-4">
                                            <div>
                                                <h4 className="font-medium text-gray-800">Umara House</h4>
                                                <p>Jl. Bendungan Hilir No.134,<br />Tanah Abang, Jakarta Pusat</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Lumpang Emas Bintaro</h4>
                                                <p>Bintaro Avenue, Jl. MH Thamrin Blok A2 No. 1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-cover" style={{ backgroundImage: `url('${r2Url}/background/bg-buttom-RNB.jpg')` }}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                                        <p className="text-gray-600"><a href="https://wa.me/6281222227496" className="hover:text-amber-600">+62-812‑2222‑7496</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Form Inertia Dinamis */}
                        <div data-aos="fade-left">
                            <form onSubmit={submitContact} className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                                {recentlySuccessful && (
                                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                                        Pesan berhasil dikirim!
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input type="text" id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" id="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600" required />
                                    </div>
                                </div>

                                {/* FIELD JSON DINAMIS */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilihan Restoran (Opsional)</label>
                                    <select value={data.restaurant_preference} onChange={e => setData('restaurant_preference', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 bg-white">
                                        <option value="">Pilih Restoran</option>
                                        <option value="Lumpang Emas Prapanca">Lumpang Emas Prapanca</option>
                                        <option value="Lumpang Emas Bintaro">Lumpang Emas Bintaro</option>
                                        <option value="Umara House Benhil">Umara House Benhil</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <input type="text" id="subject" value={data.subject} onChange={e => setData('subject', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 resize-y" required></textarea>
                                </div>
                                <button type="submit" disabled={processing} className="w-full text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity bg-cover disabled:opacity-50" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}>
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
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