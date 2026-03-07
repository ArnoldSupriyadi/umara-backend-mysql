import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function UmaraHouseLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Inisialisasi AOS & Smooth Scroll
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false); // Tutup menu mobile jika sedang terbuka
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="umara-house bg-[#131313] min-h-screen text-white tracking-wide font-sans overflow-x-hidden">
            {/* --- LINK EKSTERNAL & CSS KHUSUS --- */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{__html: `
                * { letter-spacing: 1px; }
                .hero-bg::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(251, 191, 36, 0.1); pointer-events: none;
                }
                .text-shadow { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
                .glassmorphism {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .floating-card { transform: translateY(0); transition: transform 0.3s ease; }
                .floating-card:hover { transform: translateY(-10px); }
                .gradient-text { color: #f59e0b; }
                .asymmetric-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; }
                @media (max-width: 768px) { .asymmetric-grid { grid-template-columns: 1fr; } }
                
                /* Hide scrollbar for menu carousel */
                #menuCarousel { scrollbar-width: none; -ms-overflow-style: none; }
                #menuCarousel::-webkit-scrollbar { display: none; }
                
                .le-media { position: relative; width: 100%; height: 320px; }
                @media (min-width: 768px) { .le-media { height: 420px; } }
                @media (min-width: 1024px) { .le-media { height: 520px; } }
                .le-img-fit { width: 100%; height: 100%; object-fit: cover; }
            `}} />

            {/* --- NAVIGATION --- */}
            <nav className="bg-[#131313] fixed w-full z-50 text-white border-b border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <Link href="/rasa-nusantara-baru">
                                <img src="/assets/vector/logo-rnb.png" alt="PT Nusantara Baru" className="w-20 h-auto" />
                            </Link>
                        </div>
                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:opacity-80 transition-colors">Home</a>
                            <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:opacity-80 transition-colors">About</a>
                            <a href="#spaces" onClick={(e) => handleScroll(e, '#spaces')} className="hover:opacity-80 transition-colors">Dining Spaces</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:opacity-80 transition-colors">Contact</a>
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            <div className="flex flex-col space-y-4">
                                <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:opacity-80 transition-colors py-2">Home</a>
                                <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:opacity-80 transition-colors py-2">About</a>
                                <a href="#spaces" onClick={(e) => handleScroll(e, '#spaces')} className="hover:opacity-80 transition-colors py-2">Dining Spaces</a>
                                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:opacity-80 transition-colors py-2">Contact</a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="bg-[#131313] min-h-screen pt-20">
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#131313] text-white pt-10 pb-5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src="/assets/vector/-_umarahouse putih.png" alt="Umara House" className="h-8 w-auto" />
                            </div>
                            <p className="text-white">
                                Experience sophisticated dining in our elegantly designed spaces where contemporary aesthetics meet culinary excellence.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-[#E5D7C4]">Quick Links</h4>
                            <ul className="space-y-2 text-[#CFBB99]">
                                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-[#E5D7C4] transition-colors">Home</a></li>
                                <li><a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-[#E5D7C4] transition-colors">About</a></li>
                                <li><a href="#spaces" onClick={(e) => handleScroll(e, '#spaces')} className="hover:text-[#E5D7C4] transition-colors">Dining Spaces</a></li>
                                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:text-[#E5D7C4] transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-[#E5D7C4]">Follow Us</h4>
                            <div className="flex space-x-4 text-[#CFBB99]">
                                <a href="#" className="hover:text-[#E5D7C4] transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="https://wa.me/6281222227495" target="_blank" rel="noreferrer" className="hover:text-[#E5D7C4] transition-colors">
                                    <i className="fab fa-whatsapp text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 text-center border-t border-[#889063]/30">
                        <p>© 2026 Umara House. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}