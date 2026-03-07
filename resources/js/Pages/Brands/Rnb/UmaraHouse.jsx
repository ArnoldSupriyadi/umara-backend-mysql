import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import UmaraHouseLayout from '@/Layouts/Brands/UmaraHouseLayout';

export default function UmaraHouse() {
    // --- STATE & REF ---
    const [modal, setModal] = useState({ isOpen: false, src: '', title: '' });
    const [promoSlide, setPromoSlide] = useState(0);
    const [isMenuAutoPlaying, setIsMenuAutoPlaying] = useState(true);
    const menuScrollRef = useRef(null);
    let menuIntervalRef = useRef(null);

    // --- DATA ARRAY ---
    const promoImages = [
        "holiday-special-drinks-uh.jpeg",
        "snack-jar.jpeg",
        "juicy-whole-chicken.jpeg",
        "salom-en-croute.jpeg"
    ];

    const menuFiles = [
        'NASI_BOX_1.jpg', 'NASI_BOX_2.jpg', 'menu UH preview-2_page_1.jpg', 'menu UH preview-3_page_1.jpg',
        'menu UH preview-4_page_1.jpg', 'menu UH preview-5_page_1.jpg', 'menu UH preview-6_page_1.jpg',
        'menu UH preview-7_page_1.jpg', 'menu UH preview-8_page_1.jpg', 'menu UH preview-9_page_1.jpg',
        'menu UH preview-10_page_1.jpg', 'menu UH preview-11_page_1.jpg', 'menu UH preview-12_page_1.jpg',
        'menu UH preview-13_page_1.jpg', 'menu UH preview-14_page_1.jpg', 'menu UH preview-15_page_1.jpg',
        'menu UH preview-16_page_1.jpg', 'menu UH preview-17_page_1.jpg', 'menu UH preview-18_page_1.jpg',
        'menu UH preview-19_page_1.jpg', 'menu UH preview-20_page_1.jpg', 'menu UH preview-21_page_1.jpg',
        'menu UH preview-22_page_1.jpg', 'menu UH preview-23_page_1.jpg', 'menu UH preview-24_page_1.jpg',
        'menu UH preview-25_page_1.jpg', 'menu UH preview-27_page_1.jpg', 'menu UH preview-28_page_1.jpg',
        'menu UH preview-29_page_1.jpg', 'menu UH preview-30_page_1.jpg'
    ];

    const formatTitle = (name) => name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\.[^/.]+$/, '');

    // --- LOGIKA PROMO CAROUSEL ---
    useEffect(() => {
        const promoAutoSlide = setInterval(() => {
            setPromoSlide((prev) => (prev + 1) % promoImages.length);
        }, 4000);
        return () => clearInterval(promoAutoSlide);
    }, [promoImages.length]);

    const handlePromoNext = () => setPromoSlide((prev) => (prev + 1) % promoImages.length);
    const handlePromoPrev = () => setPromoSlide((prev) => (prev - 1 + promoImages.length) % promoImages.length);

    // --- LOGIKA MENU CAROUSEL ---
    const scrollMenuNext = () => {
        if (menuScrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = menuScrollRef.current;
            if (scrollLeft >= scrollWidth - clientWidth - 5) {
                menuScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                menuScrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
            }
        }
    };

    const scrollMenuPrev = () => {
        if (menuScrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = menuScrollRef.current;
            if (scrollLeft <= 5) {
                menuScrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
            } else {
                menuScrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (isMenuAutoPlaying) {
            menuIntervalRef.current = setInterval(scrollMenuNext, 3000);
        } else {
            clearInterval(menuIntervalRef.current);
        }
        return () => clearInterval(menuIntervalRef.current);
    }, [isMenuAutoPlaying]);

    // --- MODAL HANDLER ---
    const openModal = (src, title) => {
        setModal({ isOpen: true, src, title });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModal({ isOpen: false, src: '', title: '' });
        document.body.style.overflow = 'auto';
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Reservation request sent! We will confirm with you shortly.');
    };

    return (
        <>
            <Head title="Umara House - Premium Dining Experience" />

            {/* --- HERO SECTION --- */}
            <div id="home" className="container mx-auto px-4 relative z-10 pt-10">
                <div className="asymmetric-grid items-center mb-32" data-aos="fade-up">
                    {/* Left Side */}
                    <div className="space-y-8" data-aos="fade-right" data-aos-delay="200">
                        <img src="/assets/vector/-_umarahouse putih.png" alt="Umara House" className="w-64 h-auto object-contain mb-4" />
                        <div>
                            <p className="text-xl text-[#d97706] mb-8 leading-relaxed max-w-lg">
                                Experience sophisticated dining in our elegantly designed spaces. Where contemporary aesthetics meet culinary excellence.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#menu" className="bg-[#f59e0b] text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 text-center">
                                Explore Our Menu
                            </a>
                        </div>
                    </div>
                    
                    {/* Right Side */}
                    <div className="relative lg:pl-10" data-aos="fade-left" data-aos-delay="400">
                        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#C9A53D]/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="relative">
                                <div className="absolute top-4 -right-4 w-full h-full border border-[#C9A53D]/30 rounded-2xl hidden md:block"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                                    <img src="/assets/umara-house/1.jpeg" alt="Umara House Main Dining" className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/80 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 border border-white/10 px-4 py-2 rounded-full">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#C9A53D] animate-pulse"></div>
                                            <span className="text-white text-xs font-medium tracking-widest uppercase">Premium Dining</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-10 -left-6 md:-left-12 w-2/3 md:w-[280px] z-20" data-aos="fade-up" data-aos-delay="600">
                                <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#131313]">
                                    <img src="/assets/umara-house/2.jpeg" alt="Private Experience" className="w-full h-40 md:h-48 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[#C9A53D] text-xs font-serif italic mb-1">Exclusive</p>
                                        <p className="text-white font-medium text-sm">Outdoor Rooms</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 z-30" data-aos="fade-left" data-aos-delay="800">
                                <div className="bg-[#1a0f0a] border border-[#C9A53D]/30 p-4 rounded-xl shadow-xl flex flex-col items-center gap-2 backdrop-blur-sm">
                                    <div className="flex text-[#C9A53D]">
                                        <i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i>
                                        <i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i>
                                    </div>
                                    <p className="text-white text-xs font-medium text-center">5-Star<br/>Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PROMO SECTION --- */}
            <section id="promo" className="bg-[#131313] py-32 relative border-t border-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="p-4 relative overflow-hidden rounded-2xl group">
                            <div className="relative w-full h-[320px] md:h-[500px]">
                                {promoImages.map((img, idx) => (
                                    <img 
                                        key={idx}
                                        src={`/assets/promo/${img}`} 
                                        alt={`Promo ${idx + 1}`} 
                                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${promoSlide === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                                    />
                                ))}
                            </div>
                            
                            {/* Promo Controls */}
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button onClick={handlePromoPrev} className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-[#C9A53D] p-3 rounded-full border border-white/30 transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button onClick={handlePromoNext} className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-[#C9A53D] p-3 rounded-full border border-white/30 transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>

                            {/* Indicators */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                                {promoImages.map((_, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setPromoSlide(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${promoSlide === idx ? 'w-8 bg-[#C9A53D]' : 'w-2.5 bg-white/40 hover:bg-white/60'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MENU SECTION --- */}
            <section id="menu" className="bg-[#131313] py-32 relative border-t border-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 lg:mb-20" data-aos="fade-up">
                        <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#C9A53D] rounded-2xl mb-4 shadow-lg">
                            <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#C9A53D] mb-4 font-serif">Our Menu</h2>
                        <p className="text-base md:text-xl text-white max-w-4xl mx-auto font-light">
                            Discover our exquisite collection of authentic Indonesian cuisine, carefully crafted with premium ingredients and modern presentation.
                        </p>
                    </div>

                    <div className="relative w-full" data-aos="fade-up">
                        <div 
                            id="menuCarousel" 
                            ref={menuScrollRef} 
                            className="relative overflow-x-auto flex gap-4 lg:gap-6 w-full p-4 lg:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl"
                            onMouseEnter={() => setIsMenuAutoPlaying(false)}
                            onMouseLeave={() => setIsMenuAutoPlaying(true)}
                        >
                            {menuFiles.map((file, idx) => (
                                <div key={idx} className="group relative w-64 lg:w-80 shrink-0 cursor-pointer" onClick={() => openModal(`/assets/umara-house/MENU-UMARA-HOUSE/${file}`, formatTitle(file))}>
                                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10 border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                                        <img src={`/assets/umara-house/MENU-UMARA-HOUSE/${file}`} alt={formatTitle(file)} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-8">
                            <div className="flex items-center gap-4">
                                <button onClick={scrollMenuPrev} className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/20 text-[#C9A53D] transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <button onClick={scrollMenuNext} className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/20 text-[#C9A53D] transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsMenuAutoPlaying(!isMenuAutoPlaying)} className="group flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300">
                                    <svg className={`w-4 h-4 text-[#C9A53D]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isMenuAutoPlaying 
                                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                                        }
                                    </svg>
                                    <span className="text-sm font-medium text-[#C9A53D]">{isMenuAutoPlaying ? 'Pause' : 'Play'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="bg-[#131313] py-24 relative overflow-hidden border-t border-white/5">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A53D] rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C9A53D] rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 md:mb-24" data-aos="fade-up">
                        <div className="inline-flex items-center justify-center space-x-3 mb-6">
                            <div className="h-[1px] w-12 bg-[#C9A53D]"></div>
                            <span className="text-[#C9A53D] tracking-[0.3em] uppercase text-xs md:text-sm font-medium">The Experience</span>
                            <div className="h-[1px] w-12 bg-[#C9A53D]"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Excellence in <span className="italic text-[#C9A53D]">Every Detail</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light text-base md:text-lg">
                            Discover a world where culinary artistry meets sophisticated design, creating unforgettable moments for every occasion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        <div className="group p-8 lg:p-10 rounded-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500 hover:-translate-y-2" data-aos="fade-up">
                            <div className="w-16 h-16 rounded-full bg-[#C9A53D]/10 flex items-center justify-center mb-8 group-hover:bg-[#C9A53D] transition-all duration-500">
                                <i className="fas fa-utensils text-[#C9A53D] text-2xl group-hover:text-[#1a0f0a] transition-colors duration-500"></i>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#C9A53D] transition-colors">Culinary Artistry</h3>
                            <p className="text-gray-500 leading-relaxed">Exceptional cuisine crafted with premium ingredients and innovative techniques by our expert culinary team.</p>
                        </div>
                        <div className="group p-8 lg:p-10 rounded-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
                            <div className="w-16 h-16 rounded-full bg-[#C9A53D]/10 flex items-center justify-center mb-8 group-hover:bg-[#C9A53D] transition-all duration-500">
                                <i className="fas fa-crown text-[#C9A53D] text-2xl group-hover:text-[#1a0f0a] transition-colors duration-500"></i>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#C9A53D] transition-colors">Premium Ambiance</h3>
                            <p className="text-gray-500 leading-relaxed">Luxurious interior design with carefully curated atmosphere, perfect for business or leisure.</p>
                        </div>
                        <div className="group p-8 lg:p-10 rounded-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="400">
                            <div className="w-16 h-16 rounded-full bg-[#C9A53D]/10 flex items-center justify-center mb-8 group-hover:bg-[#C9A53D] transition-all duration-500">
                                <i className="fas fa-concierge-bell text-[#C9A53D] text-2xl group-hover:text-[#1a0f0a] transition-colors duration-500"></i>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#C9A53D] transition-colors">Impeccable Service</h3>
                            <p className="text-gray-500 leading-relaxed">Attentive and professional staff dedicated to providing exceptional hospitality and personalized service.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DINING SPACES SECTION --- */}
            <section id="spaces" className="py-16 lg:py-24 relative overflow-hidden bg-[#131313] border-t border-white/5">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 lg:mb-24" data-aos="fade-up">
                        <div className="inline-block border-b-2 border-[#C9A53D] pb-2 mb-4">
                            <span className="text-[#C9A53D] font-medium tracking-widest uppercase text-sm">Exclusive Spaces</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Our Dining Spaces</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                            Discover our beautifully designed dining areas, each offering a unique atmosphere for every occasion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {/* Space 1 */}
                        <div className="group relative rounded-xl overflow-hidden shadow-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500" data-aos="fade-up">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/umara-house/1.jpeg" alt="Main Dining Area" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#C9A53D] transition-colors">Main Dining</h3>
                                    <div className="w-12 h-0.5 bg-[#C9A53D] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">Our signature dining space featuring warm wood furnishings, elegant lighting, and a sophisticated bar area.</p>
                                <div className="flex items-end justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">40+ Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Atmosphere</p><p className="text-white font-semibold">Sophisticated</p></div>
                                </div>
                                <a href="https://wa.me/6281222227495" target="_blank" rel="noreferrer" className="block w-full text-center bg-transparent border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg font-medium hover:bg-[#C9A53D] hover:text-[#1a0f0a] transition-all uppercase text-sm tracking-wider">Reserve Now</a>
                            </div>
                        </div>

                        {/* Space 2 */}
                        <div className="group relative rounded-xl overflow-hidden shadow-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/umara-house/2.jpeg" alt="Private Dining Room" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#C9A53D] transition-colors">Private Dining</h3>
                                    <div className="w-12 h-0.5 bg-[#C9A53D] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">Exclusive private dining room with contemporary design, perfect for business meetings and intimate gatherings.</p>
                                <div className="flex items-end justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">12-16 Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Atmosphere</p><p className="text-white font-semibold">Exclusive</p></div>
                                </div>
                                <a href="https://wa.me/6281222227495" target="_blank" rel="noreferrer" className="block w-full text-center bg-transparent border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg font-medium hover:bg-[#C9A53D] hover:text-[#1a0f0a] transition-all uppercase text-sm tracking-wider">Reserve Now</a>
                            </div>
                        </div>

                        {/* Space 3 */}
                        <div className="group relative rounded-xl overflow-hidden shadow-2xl bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all duration-500" data-aos="fade-up" data-aos-delay="400">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/umara-house/4.jpeg" alt="Garden Terrace" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-[#C9A53D] transition-colors">Garden Terrace</h3>
                                    <div className="w-12 h-0.5 bg-[#C9A53D] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">Beautiful outdoor terrace surrounded by lush greenery, offering a serene dining experience.</p>
                                <div className="flex items-end justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">25+ Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Atmosphere</p><p className="text-white font-semibold">Serene</p></div>
                                </div>
                                <a href="https://wa.me/6281222227495" target="_blank" rel="noreferrer" className="block w-full text-center bg-transparent border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg font-medium hover:bg-[#C9A53D] hover:text-[#1a0f0a] transition-all uppercase text-sm tracking-wider">Reserve Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="bg-[#1a110a] py-32 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <span className="text-[#C9A53D] font-serif">Contact &</span>
                            <span className="block text-[#C9A53D] font-serif">Reservations</span>
                        </h2>
                        <p className="text-xl max-w-2xl mx-auto text-gray-400">Get in touch with us to make a reservation or for any inquiries about our dining experiences</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8" data-aos="fade-right">
                            <div className="rounded-3xl p-6 bg-white/5 border border-[#CFBB99]/30 backdrop-blur-md transition-transform hover:-translate-y-2">
                                <div className="flex items-start space-x-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-[#f59e0b]">
                                        <i className="fas fa-map-marker-alt text-xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 text-[#f59e0b]">Address</h3>
                                        <p className="text-lg leading-relaxed text-gray-300">Jl. Bendungan Hilir No.134, RT.12/RW.6, Bend. Hilir, Jakarta Pusat 10210</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl p-6 bg-white/5 border border-[#CFBB99]/30 backdrop-blur-md transition-transform hover:-translate-y-2">
                                <div className="flex items-start space-x-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-[#fbbf24]">
                                        <i className="fas fa-phone text-xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 text-[#fbbf24]">Phone</h3>
                                        <p className="text-lg leading-relaxed text-gray-300"><a href="https://wa.me/6281222227495">+62-812‑2222‑7495</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl p-6 bg-white/5 border border-[#CFBB99]/30 backdrop-blur-md transition-transform hover:-translate-y-2">
                                <div className="flex items-start space-x-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-[#d97706]">
                                        <i className="fas fa-clock text-xl text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 text-[#d97706]">Operating Hours</h3>
                                        <p className="text-lg leading-relaxed text-gray-300">Everyday: 11:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-3xl p-8 bg-white/5 border border-[#CFBB99]/30 backdrop-blur-md" data-aos="fade-left">
                            <h3 className="text-3xl font-bold mb-8 text-[#C9A53D]">Make a Reservation</h3>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-gray-300">Name</label>
                                        <input type="text" className="w-full px-6 py-4 border border-[#CFBB99]/50 rounded-2xl bg-white/10 text-[#E5D7C4] focus:border-[#889063] outline-none transition-all" placeholder="Your Name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-gray-300">Phone</label>
                                        <input type="tel" className="w-full px-6 py-4 border border-[#CFBB99]/50 rounded-2xl bg-white/10 text-[#E5D7C4] focus:border-[#889063] outline-none transition-all" placeholder="Your Phone" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-gray-300">Date</label>
                                    <input type="date" className="w-full px-6 py-4 border border-[#CFBB99]/50 rounded-2xl bg-white/10 text-[#E5D7C4] focus:border-[#889063] outline-none transition-all [color-scheme:dark]" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-gray-300">Special Requests</label>
                                    <textarea rows="4" className="w-full px-6 py-4 border border-[#CFBB99]/50 rounded-2xl bg-white/10 text-[#E5D7C4] focus:border-[#889063] outline-none transition-all" placeholder="Any special requests..."></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 px-8 rounded-2xl font-bold text-lg bg-[#f59e0b] text-[#92400e] hover:bg-[#d97706] hover:text-white transition-all duration-300 shadow-lg hover:-translate-y-1">
                                    Make Reservation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMAGE MODAL --- */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="relative flex flex-col items-center max-w-5xl w-full">
                        <button onClick={closeModal} className="absolute -top-12 right-0 md:right-4 text-white hover:text-amber-400 text-4xl leading-none">&times;</button>
                        <img src={modal.src} alt={modal.title} className="block mx-auto max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                        {modal.title && (
                            <h3 className="mt-4 text-white text-center text-xl md:text-2xl font-bold tracking-wider">{modal.title}</h3>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

// Pemasangan Layout
UmaraHouse.layout = page => <UmaraHouseLayout children={page} />;