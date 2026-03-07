import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import RasaUmaraLayout from '@/Layouts/Brands/RasaUmaraLayout';

export default function RasaUmara() {
    // --- STATE & REF ---
    const [modal, setModal] = useState({ isOpen: false, src: '', title: '' });
    const [promoSlide, setPromoSlide] = useState(0);
    const [isMenuAutoPlaying, setIsMenuAutoPlaying] = useState(true);
    const menuScrollRef = useRef(null);
    let menuIntervalRef = useRef(null);
    let promoIntervalRef = useRef(null);

    // --- DATA ARRAY ---
    const promoImages = [
        "holiday-special-drinks.jpeg",
        "joy-cookies.jpeg",
        "snack-jar.jpeg",
        "juicy-whole-chicken.jpeg",
        "salom-en-croute.jpeg"
    ];

    const menuFiles = [
        'MENU RASA UMARA CIKARANG 2025-6.jpg',
        'MENU RASA UMARA CIKARANG 2025-7.jpg',
        'MENU RASA UMARA CIKARANG 2025-1.jpg',
        'MENU RASA UMARA CIKARANG 2025-2.jpg',
        'MENU RASA UMARA CIKARANG 2025-3.jpg',
        'MENU RASA UMARA CIKARANG 2025-4.jpg',
        'MENU RASA UMARA CIKARANG 2025-5.jpg'
    ];

    const formatTitle = (name) => name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();

    // --- LOGIKA PROMO CAROUSEL ---
    const handlePromoNext = () => setPromoSlide((prev) => (prev + 1) % promoImages.length);
    const handlePromoPrev = () => setPromoSlide((prev) => (prev - 1 + promoImages.length) % promoImages.length);

    useEffect(() => {
        startPromoAutoplay();
        return () => stopPromoAutoplay();
    }, [promoImages.length]);

    const startPromoAutoplay = () => {
        stopPromoAutoplay();
        promoIntervalRef.current = setInterval(handlePromoNext, 5000);
    };

    const stopPromoAutoplay = () => {
        if (promoIntervalRef.current) clearInterval(promoIntervalRef.current);
    };

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
            menuIntervalRef.current = setInterval(scrollMenuNext, 4000);
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
            <Head title="Rasa Umara - Authentic Indonesian Culinary Experience" />

            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16" style={{ backgroundImage: "url('/assets/rasa-umara/BF-PAGE-AWAL-RASA-UMARA.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-7 space-y-8" data-aos="fade-right">
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white leading-tight">
                                    Authentic
                                    <span className="text-[#889063] block">Indonesian</span>
                                    <span className="text-[#CFBB99]">Flavors</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed font-light">
                                    Experience the rich culinary heritage of Indonesia in our modern, sophisticated dining space where tradition meets innovation.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#contact" className="bg-[#CFBB99] text-[#354024] text-center px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:bg-[#889063] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                                    Reserve Table
                                </a>
                            </div>
                        </div>
                        
                        {/* Right Images */}
                        <div className="lg:col-span-5 relative hidden md:block" data-aos="fade-left">
                            <div className="relative bg-[#E5D7C4]/90 rounded-3xl p-6 border border-[#CFBB99] shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img src="/assets/rasa-umara/1.jpeg" alt="Rasa Umara Interior" className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-[#4C3D19]/20"></div>
                                    <div className="absolute top-4 left-4 bg-[#889063] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Modern Indonesian Dining
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#CFBB99] rounded-2xl transform rotate-12 hover:rotate-45 transition-transform duration-500 shadow-xl opacity-90 flex items-center justify-center text-white text-3xl font-bold">
                                🍽️
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/30 transform hover:scale-110 transition-all duration-300">
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                    <span className="text-sm font-bold text-gray-800">4.9/5</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 font-medium">1,200+ Reviews</p>
                            </div>

                            <div className="absolute top-8 -right-12 space-y-3">
                                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg transform hover:scale-110 transition-all duration-300 border-2 border-white/50">
                                    <img src="/assets/rasa-umara/2.jpeg" alt="Dining" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg transform hover:scale-110 transition-all duration-300 border-2 border-white/50">
                                    <img src="/assets/rasa-umara/3.jpeg" alt="Ambiance" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROMO SECTION --- */}
            <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#354024]">Promo Highlights</h2>
                        <p className="py-4 text-gray-600 max-w-2xl mx-auto">Jangan lewatkan kesempatan menikmati penawaran dan menu terbaik kami bulan ini.</p>
                        <div className="w-20 h-1 bg-[#889063] mx-auto mt-2 rounded-full"></div>
                    </div>
                    
                    <div className="relative max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="200" onMouseEnter={stopPromoAutoplay} onMouseLeave={startPromoAutoplay}>
                        <div className="overflow-hidden rounded-3xl shadow-xl relative group bg-white">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out h-[300px] md:h-[400px] lg:h-[500px]"
                                style={{ transform: `translateX(-${promoSlide * 100}%)` }}
                            >
                                {promoImages.map((src, idx) => (
                                    <div key={idx} className="min-w-full h-full flex items-center justify-center p-4 md:p-10 relative">
                                        <img 
                                            src={`/assets/promo/${src}`} 
                                            alt={`Promo ${idx + 1}`} 
                                            onClick={() => openModal(`/assets/promo/${src}`, `Promo ${idx + 1}`)}
                                            className="h-full w-full object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            <button onClick={handlePromoPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#354024] w-12 h-12 rounded-full transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 transform hover:scale-110 z-20 flex items-center justify-center">
                                <i className="fas fa-chevron-left text-lg"></i>
                            </button>
                            <button onClick={handlePromoNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#354024] w-12 h-12 rounded-full transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 transform hover:scale-110 z-20 flex items-center justify-center">
                                <i className="fas fa-chevron-right text-lg"></i>
                            </button>
                            
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
                                {promoImages.map((_, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setPromoSlide(idx)}
                                        className={`rounded-full transition-all duration-300 ${promoSlide === idx ? 'w-8 h-2.5 bg-[#354024]' : 'w-2.5 h-2.5 bg-[#354024]/40 hover:bg-[#354024]/70'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MENU SECTION --- */}
            <section id="menu" className="bg-[#393F23] py-24 relative overflow-hidden border-y border-white/10">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 lg:mb-20" data-aos="fade-up">
                        <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#CFBB99] rounded-2xl mb-6 shadow-lg">
                            <i className="fas fa-book-open text-[#393F23] text-xl lg:text-3xl"></i>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                            <span className="text-white">Our</span><span className="text-[#889063]"> Menu</span> 
                        </h2>
                        <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                            Discover our exquisite collection of authentic Indonesian cuisine, carefully crafted with premium ingredients and modern presentation.
                        </p>
                    </div>
            
                    <div className="relative w-full max-w-7xl mx-auto" data-aos="fade-up">
                        <div 
                            id="menuCarousel" 
                            ref={menuScrollRef} 
                            className="relative overflow-x-auto flex gap-4 lg:gap-6 w-full p-6 lg:p-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl"
                            onMouseEnter={() => setIsMenuAutoPlaying(false)}
                            onMouseLeave={() => setIsMenuAutoPlaying(true)}
                        >
                            {menuFiles.map((file, idx) => (
                                <div key={idx} className="group flex-none w-[260px] lg:w-[320px] shrink-0 cursor-pointer" onClick={() => openModal(`/assets/rasa-umara-cikarang/menu_ruc/${file}`, formatTitle(file))}>
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                                        <img src={`/assets/rasa-umara-cikarang/menu_ruc/${file}`} alt={formatTitle(file)} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <div className="flex items-center gap-4">
                                <button onClick={scrollMenuPrev} className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl hover:bg-[#889063] hover:border-[#889063] text-white transition-all flex items-center justify-center">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button onClick={scrollMenuNext} className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl hover:bg-[#889063] hover:border-[#889063] text-white transition-all flex items-center justify-center">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            
                            <button onClick={() => setIsMenuAutoPlaying(!isMenuAutoPlaying)} className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 text-white transition-all">
                                <i className={`fas ${isMenuAutoPlaying ? 'fa-pause' : 'fa-play'} text-[#CFBB99] text-sm`}></i>
                                <span className="text-sm font-medium tracking-widest uppercase">{isMenuAutoPlaying ? 'Pause' : 'Play'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DINING SPACES SECTION --- */}
            <section id="dining" className="py-24 relative overflow-hidden" style={{ backgroundImage: "url('/assets/rasa-umara/BF-PAGE-AWAL-RASA-UMARA.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <div className="absolute inset-0 bg-[#354024]/80 backdrop-blur-sm"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
                            Dining <span className="text-[#CFBB99]">Spaces</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                            Discover our thoughtfully designed spaces, each offering a unique ambiance for every occasion.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 h-auto lg:h-[600px]">
                        <div className="lg:col-span-2 h-[400px] lg:h-full" data-aos="fade-up" data-aos-delay="200">
                            <div className="group relative rounded-3xl overflow-hidden shadow-2xl h-full border border-white/10">
                                <img src="/assets/rasa-umara/1.jpeg" alt="Main Dining Hall" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="inline-block text-xl font-playfair font-bold text-[#354024] bg-[#CFBB99] px-4 py-1.5 rounded-lg mb-3 shadow-lg">Main Dining Hall</h3>
                                    <p className="text-gray-200 hidden md:block max-w-lg">Our spacious main dining area features modern design with warm lighting, perfect for family gatherings.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-6 lg:gap-8 h-[500px] lg:h-full">
                            <div className="group relative flex-1 rounded-3xl overflow-hidden shadow-2xl border border-white/10" data-aos="fade-up" data-aos-delay="400">
                                <img src="/assets/rasa-umara/2.jpeg" alt="Private Dining" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="inline-block text-lg font-playfair font-bold text-[#354024] bg-[#CFBB99] px-3 py-1 rounded-lg shadow-md">Private Dining</h3>
                                </div>
                            </div>
                            
                            <div className="group relative flex-1 rounded-3xl overflow-hidden shadow-2xl border border-white/10" data-aos="fade-up" data-aos-delay="600">
                                <img src="/assets/rasa-umara/3.jpeg" alt="Rooftop Terrace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="inline-block text-lg font-playfair font-bold text-[#354024] bg-[#CFBB99] px-3 py-1 rounded-lg shadow-md">Rooftop Terrace</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACT & RESERVATION SECTION --- */}
            <section id="contact" className="bg-gray-50 py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-[#354024]">
                            Reserve Your <span className="text-[#889063]">Experience</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Book your table and embark on an unforgettable culinary journey through authentic Indonesian flavors.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
                            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 transition-transform hover:-translate-y-2 duration-300">
                                <h3 className="text-2xl font-playfair font-bold mb-8 text-[#354024]">Get in Touch</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-[#CFBB99]/20 rounded-full flex items-center justify-center shrink-0">
                                            <i className="fas fa-map-marker-alt text-[#889063] text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#354024] mb-1">Location</h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">Jl. MH. Thamrin No.156, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-[#CFBB99]/20 rounded-full flex items-center justify-center shrink-0">
                                            <i className="fas fa-phone text-[#889063] text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#354024] mb-1">Phone</h4>
                                            <p className="text-gray-600 text-sm">+62-812‑2222‑7496</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-[#CFBB99]/20 rounded-full flex items-center justify-center shrink-0">
                                            <i className="fas fa-clock text-[#889063] text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#354024] mb-1">Hours</h4>
                                            <p className="text-gray-600 text-sm">Daily: 10:00 AM - 10:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Form */}
                        <div className="lg:col-span-3" data-aos="fade-left">
                            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
                                <h3 className="text-2xl font-playfair font-bold mb-8 text-[#354024]">Make a Reservation</h3>
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#889063] focus:border-transparent transition-all" placeholder="John Doe" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#889063] focus:border-transparent transition-all" placeholder="+62..." required />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                            <input type="date" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#889063] focus:border-transparent transition-all" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Party Size</label>
                                            <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#889063] focus:border-transparent transition-all" required>
                                                <option value="">Select guests</option>
                                                <option value="1">1 Person</option>
                                                <option value="2">2 People</option>
                                                <option value="3">3 People</option>
                                                <option value="4">4 People</option>
                                                <option value="5+">5+ People</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Special Requests (Optional)</label>
                                        <textarea rows="3" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#889063] focus:border-transparent transition-all resize-none" placeholder="Allergies, anniversaries, etc."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-[#354024] text-[#CFBB99] py-4 rounded-xl font-bold text-lg hover:bg-[#889063] hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                                        Confirm Reservation
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMAGE MODAL --- */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="relative flex flex-col items-center max-w-5xl w-full">
                        <button onClick={closeModal} className="absolute -top-12 right-0 md:right-4 text-white hover:text-[#CFBB99] text-5xl leading-none transition-colors">&times;</button>
                        <img src={modal.src} alt={modal.title} className="block mx-auto max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
                        {modal.title && (
                            <h3 className="mt-5 text-white bg-black/50 px-6 py-2 rounded-full text-center text-lg md:text-xl font-bold tracking-wider">{modal.title}</h3>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

// Pasang Layout
RasaUmara.layout = page => <RasaUmaraLayout children={page} />;