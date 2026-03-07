import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RasaUmaraLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Inisialisasi AOS & Efek Scroll
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        const handleScrollEffect = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScrollEffect);
        return () => window.removeEventListener('scroll', handleScrollEffect);
    }, []);

    // Smooth scroll handler
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="rasa-umara font-inter overflow-x-hidden bg-gray-50">
            {/* --- LINK EKSTERNAL & CSS KHUSUS --- */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            
            <style dangerouslySetInnerHTML={{__html: `
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .solid-light { background: #E5D7C4; border: 1px solid #CFBB99; }
                .solid-dark { background: #354024; border: 1px solid #889063; }
                .floating-card { transform: translateY(0); transition: all 0.3s ease; }
                .floating-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
                .gradient-text { color: #889063; }
                
                /* Hide scrollbar for menu carousel */
                #menuCarousel { scrollbar-width: none; -ms-overflow-style: none; }
                #menuCarousel::-webkit-scrollbar { display: none; }
            `}} />

            {/* --- NAVIGATION --- */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#3a4024]/95 backdrop-blur-lg shadow-lg py-2' : 'bg-[#3a4024] py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 md:h-16">
                        <div className="flex items-center">
                            <Link href="/rasa-nusantara-baru">
                                <img src="/assets/vector/logo-rnb.png" alt="PT Nusantara Baru" className="w-20 h-auto" />
                            </Link>
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-white hover:text-[#889063] transition-colors duration-300 font-medium">Home</a>
                                <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="text-white hover:text-[#889063] transition-colors duration-300 font-medium">About</a>
                                <a href="#dining" onClick={(e) => handleScroll(e, '#dining')} className="text-white hover:text-[#889063] transition-colors duration-300 font-medium">Dining</a>
                                <a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="text-white hover:text-[#889063] transition-colors duration-300 font-medium">Menu</a>
                                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-white hover:text-[#889063] transition-colors duration-300 font-medium">Contact</a>
                            </div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-[#889063] transition-colors duration-300 focus:outline-none">
                                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu Content */}
                {isMobileMenuOpen && (
                    <div className="md:hidden solid-dark absolute w-full shadow-2xl">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="block px-3 py-3 text-white hover:text-[#CFBB99] transition-colors duration-300 border-b border-white/10">Home</a>
                            <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="block px-3 py-3 text-white hover:text-[#CFBB99] transition-colors duration-300 border-b border-white/10">About</a>
                            <a href="#dining" onClick={(e) => handleScroll(e, '#dining')} className="block px-3 py-3 text-white hover:text-[#CFBB99] transition-colors duration-300 border-b border-white/10">Dining</a>
                            <a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="block px-3 py-3 text-white hover:text-[#CFBB99] transition-colors duration-300 border-b border-white/10">Menu</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="block px-3 py-3 text-white hover:text-[#CFBB99] transition-colors duration-300">Contact</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main>
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#131313] text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <img src="/assets/vector/-_umarahouse putih.png" alt="Rasa Umara" className="h-12" />
                            <p className="text-gray-400 leading-relaxed mb-6 mt-5 max-w-md">
                                Experience the authentic flavors of Indonesia in a modern, elegant setting. 
                                Where tradition meets innovation in every dish.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-[#889063] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#CFBB99] transition-all duration-300">
                                    <i className="fab fa-instagram text-white text-sm"></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#889063] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#CFBB99] transition-all duration-300">
                                    <i className="fab fa-facebook text-white text-sm"></i>
                                </a>
                                <a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#889063] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#CFBB99] transition-all duration-300">
                                    <i className="fab fa-whatsapp text-white text-sm"></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#889063] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#CFBB99] transition-all duration-300">
                                    <i className="fab fa-tiktok text-white text-sm"></i>
                                </a>
                            </div>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-gray-400 hover:text-[#889063] transition-colors duration-300">Home</a></li>
                                <li><a href="#about" onClick={(e) => handleScroll(e, '#about')} className="text-gray-400 hover:text-[#889063] transition-colors duration-300">About</a></li>
                                <li><a href="#dining" onClick={(e) => handleScroll(e, '#dining')} className="text-gray-400 hover:text-[#889063] transition-colors duration-300">Dining Spaces</a></li>
                                <li><a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="text-gray-400 hover:text-[#889063] transition-colors duration-300">Menu</a></li>
                                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-gray-400 hover:text-[#889063] transition-colors duration-300">Contact</a></li>
                            </ul>
                        </div>
                        
                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
                            <div className="space-y-4">
                                <p className="text-gray-400 flex items-start">
                                    <i className="fas fa-map-marker-alt text-[#889063] mt-1 mr-3"></i>
                                    <a href="https://maps.app.goo.gl/JMr8dwNUKN4CboA1A" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Jl. MH. Thamrin No.156, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530</a>
                                </p>
                                <p className="text-gray-400 flex items-center">
                                    <i className="fas fa-phone text-[#889063] mr-3"></i>
                                    <a href="https://wa.me/6281222227496" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">+62-812‑2222‑7496</a>
                                </p>
                                <p className="text-gray-400 flex items-center">
                                    <i className="fas fa-envelope text-[#889063] mr-3"></i>
                                    info@rasaumara.com
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center flex flex-col items-center">
                        <p className="text-gray-500 text-sm">
                            © 2026 Rasa Umara. All rights reserved. | Crafted with passion for Indonesian cuisine.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}