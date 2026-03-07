import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import LumpangEmasSignatureLayout from '@/Layouts/Brands/LumpangEmasSignatureLayout';

export default function LumpangEmasSignature() {
    // --- STATE UNTUK MODAL GAMBAR ---
    const [modal, setModal] = useState({ isOpen: false, src: '', title: '' });

    const openModal = (src, title) => {
        setModal({ isOpen: true, src, title });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModal({ isOpen: false, src: '', title: '' });
        document.body.style.overflow = 'auto';
    };

    // --- DATA ARRAY UNTUK MEMPERSINGKAT KODE KOTOR ---
    const promoImages = [
        "afternoon-tea.jpeg", "es-tape-ijo.jpeg", "free-coffee-nusantara.jpeg", 
        "gourmet-a.jpeg", "gourmet-b.jpeg", "gourmet-c.jpeg", 
        "holiday-special-drinks.jpeg", "snack-jar.jpeg", "juicy-whole-chicken.jpeg", "salom-en-croute.jpeg"
    ];

    // Buat daftar menu secara otomatis (2 file nasi box + 37 halaman)
    const menuItems = [
        { src: '/assets/LUMPANG-EMAS-SIGNATURE-PRAPANCA/menu_nasi_box_35K.jpg', title: 'Menu Nasi Box 35K' },
        { src: '/assets/LUMPANG-EMAS-SIGNATURE-PRAPANCA/menu_nasi_box_42K.jpg', title: 'Menu Nasi Box 42K' },
        ...Array.from({ length: 37 }, (_, i) => ({
            src: `/assets/LUMPANG-EMAS-SIGNATURE-PRAPANCA/page${i + 1}_img1.jpg`,
            title: `Menu Item ${i + 1}`
        }))
    ];

    // --- INISIALISASI CAROUSEL VANILLA JS ---
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;

        // 1. Logic untuk Menu Carousel
        const menuCarousel = document.getElementById('menuCarousel');
        if (menuCarousel) {
            class ModernCarousel {
                constructor() {
                    this.carousel = document.getElementById('menuCarousel');
                    this.track = document.getElementById('carouselTrack');
                    this.prevBtn = document.getElementById('prevBtn');
                    this.nextBtn = document.getElementById('nextBtn');
                    this.autoplayBtn = document.getElementById('autoplayBtn');
                    this.indicatorsContainer = document.getElementById('carouselIndicators');
                    
                    this.currentIndex = 0;
                    this.itemWidth = isMobile ? 256 : 320; 
                    this.visibleItems = this.getVisibleItems();
                    this.totalItems = document.querySelectorAll('.carousel-item').length;
                    this.maxIndex = Math.max(0, this.totalItems - this.visibleItems);
                    this.isAutoplay = !isMobile;
                    this.autoplayInterval = null;
                    this.autoplayDelay = isMobile ? 6000 : 4000;
                    
                    this.init();
                }
                init() {
                    this.bindEvents();
                    this.updateCarousel();
                    this.startAutoplay();
                    this.addTouchSupport();
                    window.addEventListener('resize', () => {
                        this.visibleItems = this.getVisibleItems();
                        this.maxIndex = Math.max(0, this.totalItems - this.visibleItems);
                        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                        this.updateCarousel();
                    });
                }
                getVisibleItems() {
                    const containerWidth = this.carousel.offsetWidth - 64; 
                    return Math.floor(containerWidth / this.itemWidth);
                }
                bindEvents() {
                    if(this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
                    if(this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
                    if(this.autoplayBtn) this.autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
                    
                    this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
                    this.carousel.addEventListener('mouseleave', () => {
                        if (this.isAutoplay) this.startAutoplay();
                    });
                }
                addTouchSupport() {
                    let startX = 0, currentX = 0, isDragging = false;
                    this.track.addEventListener('touchstart', (e) => {
                        startX = e.touches[0].clientX; isDragging = true; this.pauseAutoplay();
                    }, { passive: true });
                    this.track.addEventListener('touchmove', (e) => {
                        if (!isDragging) return;
                        currentX = e.touches[0].clientX;
                        const diff = startX - currentX;
                        if (Math.abs(diff) > 50) {
                            diff > 0 ? this.nextSlide() : this.prevSlide();
                            isDragging = false;
                        }
                    }, { passive: true });
                    this.track.addEventListener('touchend', () => {
                        isDragging = false; if (this.isAutoplay) this.startAutoplay();
                    });
                }
                prevSlide() { if (this.currentIndex > 0) { this.currentIndex--; this.updateCarousel(); } }
                nextSlide() {
                    if (this.currentIndex < this.maxIndex) { this.currentIndex++; this.updateCarousel(); } 
                    else { this.currentIndex = 0; this.updateCarousel(); }
                }
                updateCarousel() {
                    const translateX = -this.currentIndex * this.itemWidth;
                    this.track.style.transform = `translateX(${translateX}px)`;
                    this.track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    if(this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
                    if(this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.maxIndex;
                }
                startAutoplay() {
                    if (!this.isAutoplay) return;
                    this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
                    this.updateAutoplayButton();
                }
                pauseAutoplay() {
                    if (this.autoplayInterval) { clearInterval(this.autoplayInterval); this.autoplayInterval = null; }
                }
                toggleAutoplay() {
                    this.isAutoplay = !this.isAutoplay;
                    this.isAutoplay ? this.startAutoplay() : this.pauseAutoplay();
                    this.updateAutoplayButton();
                }
                updateAutoplayButton() {
                    if(!this.autoplayBtn) return;
                    const playIcon = document.getElementById('playIcon');
                    const autoplayText = this.autoplayBtn.querySelector('span');
                    if (this.isAutoplay) {
                        if(playIcon) playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
                        if(autoplayText) autoplayText.textContent = 'Pause';
                    } else {
                        if(playIcon) playIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"></path>';
                        if(autoplayText) autoplayText.textContent = 'Play';
                    }
                }
            }
            new ModernCarousel();
        }

        // 2. Logic untuk Promo Carousel
        const promoCarousel = document.getElementById('promoCarousel');
        if (promoCarousel) {
            // (Disimplifikasi agar stabil di React, karena Vanilla class-nya berat)
            let index = 0;
            const track = document.getElementById('promoTrack');
            const items = track.querySelectorAll('figure');
            const max = Math.max(0, items.length - 1);
            let itemWidth = items[0]?.offsetWidth || promoCarousel.offsetWidth;

            const updatePromo = () => {
                track.style.transform = `translateX(${-index * itemWidth}px)`;
                track.style.transition = 'transform 0.5s ease';
            };

            document.getElementById('promoNext')?.addEventListener('click', () => {
                index = index < max ? index + 1 : 0; updatePromo();
            });
            document.getElementById('promoPrev')?.addEventListener('click', () => {
                index = index > 0 ? index - 1 : max; updatePromo();
            });

            const autoPlayPromo = setInterval(() => {
                index = index < max ? index + 1 : 0; updatePromo();
            }, 3000);

            return () => clearInterval(autoPlayPromo); // Bersihkan saat pindah halaman
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Reservation request sent! We will contact you shortly.');
    };

    return (
        <>
            <Head title="Lumpang Emas Signature - Rasa Nusantara Baru" />

            {/* --- HERO SECTION --- */}
            <section id="home" className="relative bg-cover" style={{ backgroundImage: "url('/assets/lumpang-emas-prapanca/bg-signature.jpg')" }}>
                <div className="relative container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
                        {/* Left Side Content */}
                        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left" data-aos="fade-right">
                            <div className="mb-8 lg:mb-12">
                                <img src="/assets/lumpang-emas-prapanca/logo-signature.png" alt="Lumpang Emas Logo" className="w-full h-auto max-w-2xl mx-auto lg:mx-0 object-contain" />
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white font-serif">
                                Premium Dining Experience
                            </h1>
                            <p className="text-lg text-white mb-8 leading-relaxed">
                                Discover authentic Indonesian cuisine in our elegant VIP rooms with exceptional service and ambiance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a href="#rooms" className="bg-gradient-to-b from-[#efd266] to-[#b9932f] text-[#562E12] px-6 lg:px-8 py-3 rounded-full text-base font-semibold hover:opacity-90 transition-colors text-center">
                                    Explore VIP Rooms
                                </a>
                                <a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer" className="border-2 border-[#efd266] text-white px-6 lg:px-8 py-3 rounded-full text-base font-semibold hover:bg-[#efd266] hover:text-[#562E12] transition-colors text-center">
                                    Reserved Now
                                </a>
                            </div>
                        </div>

                        {/* Right Side Gallery */}
                        <div className="mt-8 lg:mt-0" data-aos="fade-left">
                            <div className="grid grid-cols-2 grid-rows-3 gap-2 lg:gap-4 h-auto lg:h-[400px]">
                                <div className="row-span-2 cursor-pointer group rounded-2xl overflow-hidden relative" onClick={() => openModal('/assets/rnb/carousel/3.jpg', 'UMA RAJA')}>
                                    <img src="/assets/rnb/carousel/3.jpg" alt="Umaraja" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white"><p className="text-sm font-semibold">UMARAJA</p></div>
                                </div>
                                <div className="cursor-pointer group rounded-2xl overflow-hidden relative h-32 lg:h-full" onClick={() => openModal('/assets/rnb/carousel/13.jpg', 'MAIN DINING 1ST FLOOR')}>
                                    <img src="/assets/rnb/carousel/13.jpg" alt="Sumatra" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white"><p className="text-xs font-semibold">MAIN DINING 1ST FLOOR</p></div>
                                </div>
                                <div className="cursor-pointer group rounded-2xl overflow-hidden relative h-32 lg:h-full" onClick={() => openModal('/assets/rnb/carousel/2.jpg', 'KALIMANTAN')}>
                                    <img src="/assets/rnb/carousel/2.jpg" alt="Kalimantan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white"><p className="text-xs font-semibold">KALIMANTAN</p></div>
                                </div>
                                <div className="col-span-2 cursor-pointer group rounded-2xl overflow-hidden relative aspect-video lg:h-48" onClick={() => openModal('/assets/rnb/MAIN-SECOND-FLOOR.jpg', 'MAIN DINING 2ND FLOOR')}>
                                    <img src="/assets/rnb/MAIN-SECOND-FLOOR.jpg" alt="Main Dining 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white"><p className="text-sm font-semibold">MAIN DINING 2ND FLOOR</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROMO SECTION --- */}
            <section id="promo" className="py-20 bg-[#200901] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div id="promoCarousel" className="relative max-w-6xl mx-auto overflow-hidden rounded-2xl">
                        <div id="promoTrack" className="flex">
                            {promoImages.map((img, idx) => (
                                <figure key={idx} className="min-w-full le-media">
                                    <img src={`/assets/promo/${img}`} alt={`Promo ${idx+1}`} className="le-img-fit" />
                                </figure>
                            ))}
                        </div>
                        {/* Tombol Panah Promo */}
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <button id="promoPrev" className="w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-[#C9A53D]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <button id="promoNext" className="w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-[#C9A53D]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MENU SECTION (MAP) --- */}
            <section id="menu" className="py-24 bg-cover relative" style={{ backgroundImage: "url('/assets/lumpang-emas-prapanca/BG-SIGNATURE-OUR.jpg')" }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 font-serif">Our Menu</h2>
                        <p className="text-lg text-white max-w-3xl mx-auto">Discover our exquisite collection of authentic Indonesian cuisine, carefully crafted with premium ingredients.</p>
                    </div>

                    <div id="menuCarousel" className="relative overflow-x-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                        <div id="carouselTrack" className="flex gap-6 w-max">
                            {/* Looping 39 Item Menu agar kode tidak kotor! */}
                            {menuItems.map((item, index) => (
                                <div key={index} className="carousel-item flex-shrink-0 w-64 lg:w-80 group cursor-pointer" onClick={() => openModal(item.src, item.title)}>
                                    <div className="relative overflow-hidden rounded-2xl bg-white/20 border border-white/30 shadow-xl hover:scale-105 transition-all duration-300">
                                        <div className="aspect-square">
                                            <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigasi Menu */}
                    <div className="flex justify-between items-center mt-8">
                        <div className="flex gap-4">
                            <button id="prevBtn" className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-[#C9A53D] flex items-center justify-center hover:bg-white/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button id="nextBtn" className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-[#C9A53D] flex items-center justify-center hover:bg-white/30">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        <button id="autoplayBtn" className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl border border-white/30 text-[#C9A53D]">
                            <svg id="playIcon" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Pause</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- VIP ROOMS SECTION --- */}
            <section id="rooms" className="py-24 bg-cover relative" style={{ backgroundImage: "url('/assets/lumpang-emas-prapanca/BG-SIGNATURE-VIP.jpg')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="text-[#C9A53D] font-medium tracking-widest uppercase text-sm border-b-2 border-[#C9A53D] pb-2">Exclusive Dining</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-6">Our VIP Rooms</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Room 1 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-prapanca/MAINDINING1STFLOOR/Pro-Capture One 00448.jpg" alt="Main Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Main Dining 1st Floor</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Central dining area with capacity up to 40 guests. Features projector screen and spacious ambiance.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div>
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Capacity</p>
                                        <p className="text-white font-semibold">40 Guests</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Starting From</p>
                                        <p className="text-xl text-white font-bold">12M<span className="text-xs text-gray-400">++</span></p>
                                    </div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors uppercase text-sm font-semibold tracking-wider">Book Now</a>
                            </div>
                        </div>

                        {/* Room 2 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-prapanca/SUMATRA/OE4A0001.jpg" alt="Sumatra" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Sumatra</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Intimate setting ideal for romantic dinners or small private gatherings.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div>
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Capacity</p>
                                        <p className="text-white font-semibold">8-10 Guests</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Starting From</p>
                                        <p className="text-xl text-white font-bold">3M<span className="text-xs text-gray-400">++</span></p>
                                    </div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors uppercase text-sm font-semibold tracking-wider">Book Now</a>
                            </div>
                        </div>

                        {/* Room 3 */}
                        <div className="group rounded-xl overflow-hidden bg-[#1a0f0a] border border-[#C9A53D]/20 hover:border-[#C9A53D]/60 transition-all" data-aos="fade-up" data-aos-delay="400">
                            <div className="h-80 relative overflow-hidden">
                                <img src="/assets/lumpang-emas-prapanca/UMARAAJA/Pro-Capture One 00183.jpg" alt="Umaraja" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#C9A53D] transition-colors">Umaraja</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-400 text-sm mb-6 h-12">Premium ambiance with warm lighting and a private bar for medium groups.</p>
                                <div className="flex justify-between border-t border-white/10 pt-4 mb-6">
                                    <div>
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Capacity</p>
                                        <p className="text-white font-semibold">15-20 Guests</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#C9A53D] uppercase tracking-wider">Starting From</p>
                                        <p className="text-xl text-white font-bold">10M<span className="text-xs text-gray-400">++</span></p>
                                    </div>
                                </div>
                                <a href="https://wa.me/6281222227496" className="block w-full text-center border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-black transition-colors uppercase text-sm font-semibold tracking-wider">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACT & RESERVATION SECTION --- */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#C9A53D] mb-4 font-serif">Contact & Reservation</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                            <p className="font-semibold text-gray-800">Reservation</p>
                            <p className="text-gray-600 mb-4">+62-812‑2222‑7496</p>
                            <p className="font-semibold text-gray-800">Address</p>
                            <p className="text-gray-600">Prapanca Raya St. No.40A, Kebayoran Baru, South Jakarta</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Quick Reservation</h3>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A53D]" required />
                                <input type="tel" placeholder="Phone" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A53D]" required />
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A53D]">
                                    <option>Main Dining (40 Pax)</option>
                                    <option>Sumatra (8-10 Pax)</option>
                                    <option>Umaraja (20-24 Pax)</option>
                                    <option>Bali (4-6 Pax)</option>
                                </select>
                                <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A53D]" required />
                                <button type="submit" className="w-full bg-transparent border border-[#C9A53D] text-[#C9A53D] py-3 rounded-lg hover:bg-[#C9A53D] hover:text-white font-bold uppercase transition-colors">
                                    Send Request
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMAGE MODAL COMPONENT --- */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
                        <button onClick={closeModal} className="absolute -top-12 right-0 text-white hover:text-amber-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <img src={modal.src} alt={modal.title} className="max-h-[85vh] object-contain rounded-lg" />
                        <h3 className="text-white text-xl mt-4 font-semibold tracking-wider">{modal.title}</h3>
                    </div>
                </div>
            )}
        </>
    );
}

// Pemasangan Layout
LumpangEmasSignature.layout = page => <LumpangEmasSignatureLayout children={page} />;