import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import LumpangEmasBintaroLayout from '@/Layouts/Brands/LumpangEmasBintaroLayout';

export default function LumpangEmasBintaro() {
    // --- STATE & REF UNTUK CAROUSEL & MODAL ---
    const [modal, setModal] = useState({ isOpen: false, src: '', title: '' });
    const [heroSlide, setHeroSlide] = useState(0);
    const menuScrollRef = useRef(null);

    // Array Gambar Hero
    const heroImages = [
        "main-dining.jpeg",
        "main-dining2.jpeg",
        "outdoor-1.jpeg",
        "tampak-depan-outlet.jpeg"
    ];

    // Array Menu Makanan (Menggantikan script panjang di HTML asli)
    const menuFiles = [
        "NASI_BOX_1.jpg", "NASI_BOX_2.jpg", "Menu LE BA -10_page_1.jpg", "Menu LE BA -11_page_1.jpg",
        "Menu LE BA -12_page_1.jpg", "Menu LE BA -13_page_1.jpg", "Menu LE BA -14_page_1.jpg", "Menu LE BA -15_page_1.jpg",
        "Menu LE BA -16_page_1.jpg", "Menu LE BA -17_page_1.jpg", "Menu LE BA -18_page_1.jpg", "Menu LE BA -19_page_1.jpg",
        "Menu LE BA -20_page_1.jpg", "Menu LE BA -21_page_1.jpg", "Menu LE BA -22_page_1.jpg", "Menu LE BA -23_page_1.jpg",
        "Menu LE BA -2_page_1.jpg", "Menu LE BA -3_page_1.jpg", "Menu LE BA -4_page_1.jpg", "Menu LE BA -5_page_1.jpg",
        "Menu LE BA -6_page_1.jpg", "Menu LE BA -7_page_1.jpg", "Menu LE BA -8_page_1.jpg", "Menu LE BA -9_page_1.jpg"
    ];

    // Format nama file menjadi judul
    const formatTitle = (name) => name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\.[^/.]+$/, '');

    // --- LOGIKA HERO CAROUSEL ---
    useEffect(() => {
        const autoSlide = setInterval(() => {
            setHeroSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(autoSlide);
    }, [heroImages.length]);

    const handleHeroNext = () => setHeroSlide((prev) => (prev + 1) % heroImages.length);
    const handleHeroPrev = () => setHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

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

    // --- MODAL HANDLER ---
    const openModal = (src, title) => {
        setModal({ isOpen: true, src, title });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModal({ isOpen: false, src: '', title: '' });
        document.body.style.overflow = 'auto';
    };

    // Form Submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Reservation request sent! We will contact you shortly.');
    };

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <>
            <Head title="Lumpang Emas Bintaro - Premium Dining Experience" />

            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-screen flex items-center relative pt-20" 
            style={{ backgroundImage: `url(${r2Url}/rnb-assets/BG-LUMPANG-BINTARO1.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                {/* Overlay tipis agar teks tetap terbaca */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Content */}
                        <div className="max-w-xl flex flex-col items-center" data-aos="fade-right">
                            <img src={`${r2Url}/logos/logo-lumpang-ba.png`} alt="Lumpang Emas Bintaro" className="w-sm h-auto max-w-full object-contain mb-10" data-aos="zoom-in" data-aos-delay="200" />
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
                                <a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer" className="bg-gradient-to-b from-[#efd266] to-[#b9932f] text-[#562E12] px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-colors text-center">
                                    Reserve Table
                                </a>
                                <a href="#menu" className="border-2 border-[#efd266] text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-colors text-center cursor-pointer">
                                    View Menu
                                </a>
                            </div>
                        </div>
                        
                        {/* Right Side - Image Carousel */}
                        <div className="relative" data-aos="fade-left" data-aos-delay="200">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 md:p-8">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <div className="relative w-full h-64 md:h-96">
                                        {heroImages.map((img, idx) => (
                                            <img 
                                                key={idx}
                                                src={`/assets/lumpang-emas-bintaro/${img}`} 
                                                alt={`Interior ${idx + 1}`} 
                                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${heroSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
                                            />
                                        ))}
                                    </div>
                                    
                                    <button onClick={handleHeroPrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-20">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    </button>
                                    <button onClick={handleHeroNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-20">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                    
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                        {heroImages.map((_, idx) => (
                                            <button 
                                                key={idx} 
                                                onClick={() => setHeroSlide(idx)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${heroSlide === idx ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MENU SECTION --- */}
            <section id="menu" className="py-20 relative bg-white">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 lg:mb-20" data-aos="fade-up">
                        <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-[#C9A53D] rounded-2xl mb-4 shadow-lg">
                            <svg className="w-6 h-6 lg:w-8 lg:h-8 text-[#131313]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#c8a53e] mb-4 tracking-tight">Our Menu</h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto font-light">
                            Discover our exquisite collection of authentic Indonesian cuisine, carefully crafted with premium ingredients and modern presentation.
                        </p>
                    </div>

                    <div className="relative w-full" data-aos="fade-up">
                        {/* Carousel Scroll Container */}
                        <div id="menuCarousel" ref={menuScrollRef} className="relative overflow-x-auto flex gap-4 lg:gap-6 w-full p-4 lg:p-8 bg-[#1a0f0a]/5 backdrop-blur-md border border-[#c8a53e]/20 rounded-3xl shadow-lg">
                            {menuFiles.map((file, idx) => (
                                <div key={idx} className="group relative w-[220px] sm:w-[240px] lg:w-[280px] shrink-0 cursor-pointer" onClick={() => openModal(`/assets/lumpang-emas-bintaro/MENU-BINTARO-AVENUE/${file}`, formatTitle(file))}>
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/10 border border-[#c8a53e]/30 shadow-md">
                                        <img src={`/assets/lumpang-emas-bintaro/MENU-BINTARO-AVENUE/${file}`} alt={formatTitle(file)} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Controls */}
                        <div className="flex items-center justify-between mt-8">
                            <div className="flex items-center gap-4">
                                <button onClick={scrollMenuPrev} className="w-14 h-14 bg-white border border-[#c8a53e] rounded-2xl hover:bg-[#c8a53e] text-[#c8a53e] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <button onClick={scrollMenuNext} className="w-14 h-14 bg-white border border-[#c8a53e] rounded-2xl hover:bg-[#c8a53e] text-[#c8a53e] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ROOMS SECTION --- */}
            <section id="rooms" className="py-16 lg:py-24 relative overflow-hidden" style={{ backgroundImage: `${r2Url}/rnb-assets/BG-LUMPANG-BINTARO3.jpg`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-[#C9A53D] font-medium tracking-widest uppercase text-sm border-b-2 border-[#C9A53D] pb-2">Exclusive Dining</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-6">Our Dining Spaces</h2>
                        <p className="text-gray-300 mt-4">Choose from our variety of beautifully designed dining areas, each offering a unique ambiance.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Room 1 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up">
                            <div className="h-64 lg:h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-bintaro/main-dining.jpeg" alt="Main Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Main Dining</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Spacious main dining area accommodating large groups and families.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">50+ Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Availability</p><p className="text-white font-semibold">Open Daily</p></div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors font-semibold uppercase text-sm">Reserve Table</a>
                            </div>
                        </div>

                        {/* Room 2 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-64 lg:h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-bintaro/main-dining2.jpeg" alt="Private Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Private Room</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Intimate private dining perfect for business meetings or family celebrations.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">8-12 Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Booking</p><p className="text-white font-semibold">RSVP Only</p></div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors font-semibold uppercase text-sm">Reserve Room</a>
                            </div>
                        </div>

                        {/* Room 3 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up" data-aos-delay="400">
                            <div className="h-64 lg:h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-bintaro/outdoor-1.jpeg" alt="Outdoor Terrace" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Outdoor Terrace</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Enjoy your meal in our beautiful outdoor terrace with fresh air ambiance.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div><p className="text-xs text-[#C9A53D] uppercase">Capacity</p><p className="text-white font-semibold">20+ Guests</p></div>
                                    <div className="text-right"><p className="text-xs text-[#C9A53D] uppercase">Atmosphere</p><p className="text-white font-semibold">Relaxed</p></div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors font-semibold uppercase text-sm">Reserve Spot</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-[#C9A53D] mb-4">Why Choose Lumpang Emas Bintaro?</h2>
                        <p className="text-xl text-gray-600">Premium facilities and exceptional service for your dining experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-utensils text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Authentic Cuisine</h3>
                            <p className="text-gray-600">Traditional Indonesian dishes prepared with the finest ingredients and modern techniques.</p>
                        </div>
                        <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-car text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ample Parking</h3>
                            <p className="text-gray-600">Spacious parking area with security for your peace of mind during your visit.</p>
                        </div>
                        <div className="text-center" data-aos="zoom-in" data-aos-delay="600">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-concierge-bell text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
                            <p className="text-gray-600">Our trained staff provides attentive and professional service to ensure your satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-[#C9A53D] mb-4">Contact & Reservation</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div data-aos="fade-right">
                            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center shrink-0">
                                        <i className="fas fa-map-marker-alt text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Address</h4>
                                        <p className="text-gray-600">Bintaro Avenue, South Tangerang, Banten</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center shrink-0">
                                        <i className="fas fa-phone text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Phone</h4>
                                        <p className="text-gray-600">+62 812 2222 7496</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-b from-[#efd266] to-[#b9932f] rounded-full flex items-center justify-center shrink-0">
                                        <i className="fas fa-clock text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                                        <p className="text-gray-600">Daily: 10:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-left">
                            <h3 className="text-2xl font-bold mb-6">Make a Reservation</h3>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A53D] outline-none" required />
                                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A53D] outline-none" required />
                                </div>
                                <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A53D] outline-none" required />
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A53D] outline-none">
                                    <option>Number of Guests</option>
                                    <option>1-2 People</option>
                                    <option>3-5 People</option>
                                    <option>6-10 People</option>
                                    <option>10+ People</option>
                                </select>
                                <textarea placeholder="Special Requests" rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A53D] outline-none"></textarea>
                                <button type="submit" className="w-full bg-gradient-to-b from-[#efd266] to-[#b9932f] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                    Submit Reservation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMAGE MODAL --- */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full">
                        <button onClick={closeModal} className="absolute -top-12 right-0 text-white hover:text-amber-400 text-4xl leading-none">
                            &times;
                        </button>
                        <div className="w-full flex flex-col items-center justify-center">
                            <img src={modal.src} alt={modal.title} className="max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                            {modal.title && (
                                <div className="mt-4 text-white text-center">
                                    <h3 className="text-xl font-bold tracking-wider bg-black/50 px-4 py-2 rounded-lg">{modal.title}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Pemasangan Layout
LumpangEmasBintaro.layout = page => <LumpangEmasBintaroLayout children={page} />;