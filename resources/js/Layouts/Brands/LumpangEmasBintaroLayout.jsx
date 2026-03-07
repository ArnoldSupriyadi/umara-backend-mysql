import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LumpangEmasBintaroLayout({ children }) {
    // Inisialisasi AOS & Smooth Scroll
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }, []);

    // Smooth scroll handler
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="lumpang-emas-bintaro bg-white min-h-screen text-gray-800 tracking-wide font-sans overflow-x-hidden">
            {/* --- LINK EKSTERNAL & CSS KHUSUS --- */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{__html: `
                .hero-bg { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
                * { letter-spacing: 1px; }
                .le-media { position: relative; width: 100%; height: 320px; }
                @media (min-width: 768px) { .le-media { height: 420px; } }
                @media (min-width: 1024px) { .le-media { height: 520px; } }
                .le-img-fit { width: 100%; height: 100%; object-fit: contain; }
                
                /* Hide scrollbar for menu carousel */
                #menuCarousel { scrollbar-width: none; -ms-overflow-style: none; }
                #menuCarousel::-webkit-scrollbar { display: none; }
            `}} />

            {/* --- NAVIGATION --- */}
            <nav className="w-full absolute top-0 z-50 bg-transparent">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <Link href="/rasa-nusantara-baru">
                                <img src="/assets/vector/logo-rnb.png" alt="PT Nusantara Baru" className="w-20 h-auto" />
                            </Link>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Home</a>
                            <a href="#rooms" onClick={(e) => handleScroll(e, '#rooms')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Rooms</a>
                            <a href="#features" onClick={(e) => handleScroll(e, '#features')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Features</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-[#C9A53D] hover:text-amber-600 transition-colors font-medium">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main>
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#131313] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img src="/assets/lumpang-emas-bintaro/logo-lumpang-ba.png" alt="Lumpang Emas" className="h-16 w-auto" />
                            </div>
                            <p className="text-gray-400">
                                Experience authentic Indonesian cuisine in the heart of Bintaro with premium dining atmosphere.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                <li><a href="#rooms" onClick={(e) => handleScroll(e, '#rooms')} className="text-gray-400 hover:text-white transition-colors">Dining Rooms</a></li>
                                <li><a href="#features" onClick={(e) => handleScroll(e, '#features')} className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                                <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">© 2026 Lumpang Emas Bintaro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}