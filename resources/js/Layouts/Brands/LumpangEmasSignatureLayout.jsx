import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LumpangEmasSignatureLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Inisialisasi AOS & Smooth Scroll
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        AOS.init({
            duration: isMobile ? 600 : 1000,
            once: true,
            offset: isMobile ? 50 : 100,
            disable: isMobile ? 'mobile' : false
        });
    }, []);

    // Smooth scroll handler
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false); // Tutup menu mobile jika terbuka
        }
    };

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="lumpang-emas-signature bg-white min-h-screen text-gray-800 overflow-x-hidden font-sans tracking-wide">
            {/* --- CSS KHUSUS --- */}
            <style dangerouslySetInnerHTML={{__html: `
                #menuCarousel, #promoCarousel {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                #menuCarousel::-webkit-scrollbar, #promoCarousel::-webkit-scrollbar {
                    display: none;
                }
                .le-media {
                    position: relative;
                    width: 100%;
                    height: 320px;
                }
                @media (min-width: 768px) { .le-media { height: 420px; } }
                @media (min-width: 1024px) { .le-media { height: 520px; } }
                .le-img-fit {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}} />

            {/* --- HEADER --- */}
            <header className="sticky top-0 z-50 bg-[#4f290e] shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link href="/rasa-nusantara-baru">
                                <img src={`${r2Url}/logos/logo-rnb.png`} alt="PT Nusantara Baru" className="w-20 h-auto" />
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Home</a>
                            <a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Menu</a>
                            <a href="#rooms" onClick={(e) => handleScroll(e, '#rooms')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">VIP Rooms</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Contact</a>
                        </nav>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-[#3d1f0a] transition-colors"
                        >
                            {!isMobileMenuOpen ? (
                                <svg className="w-6 h-6 text-[#C9A53D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-[#C9A53D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    
                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 border-t border-gray-600/50">
                            <div className="flex flex-col space-y-4 pt-4">
                                <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-[#C9A53D] hover:text-amber-500 font-medium py-2">Home</a>
                                <a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="text-[#C9A53D] hover:text-amber-500 font-medium py-2">Menu</a>
                                <a href="#rooms" onClick={(e) => handleScroll(e, '#rooms')} className="text-[#C9A53D] hover:text-amber-500 font-medium py-2">VIP Rooms</a>
                                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-[#C9A53D] hover:text-amber-500 font-medium py-2">Contact</a>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main>
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#131313] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <img src={`${r2Url}/logos/logo-signature.png`} alt="Lumpang Emas" className="w-20 h-auto" />
                            </div>
                            <p className="text-gray-300">Premium dining experience with exclusive VIP rooms for your special occasions.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-[#C9A53D]">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-gray-300 hover:text-amber-400 transition-colors">Home</a></li>
                                <li><a href="#rooms" onClick={(e) => handleScroll(e, '#rooms')} className="text-gray-300 hover:text-amber-400 transition-colors">VIP Rooms</a></li>
                                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-[#C9A53D]">Contact Info</h4>
                            <div className="space-y-2">
                                <p className="text-gray-300"><a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer">📞 0812‑2222‑7496</a></p>
                                <p className="text-gray-300"><a href="https://maps.app.goo.gl/oBvv8ds1g6uvDd2AA" target="_blank" rel="noreferrer">📍 Prapanca Raya St. No.40A, Kebayoran Baru, South Jakarta</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">© 2026 Lumpang Emas Signature. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}