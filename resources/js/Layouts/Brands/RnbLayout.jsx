// resources/js/Layouts/Brands/RnbLayout.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function RnbLayout({ children, brand }) {
    // State untuk mengontrol buka-tutup menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper untuk base path URL agar rapi
    const basePath = `/${brand?.slug || 'rasa-nusantara-baru'}`;

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="rnb-theme min-h-screen bg-gray-50 tracking-wide">
            
            {/* Header / Navbar */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href={basePath}>
                                <img src={`${r2Url}/logos/logo-rnb.png`} alt="Rasa Nusantara Baru" className="w-20 h-auto" />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Home
                                </Link>
                                <a href="#about" className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    About
                                </a>
                                <Link href={`${basePath}/news`} className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    News
                                </Link>
                                {/* UBAH: Tag <a> menjadi <Link>, lalu tambahkan basePath sebelum # */}
                                <Link href={`${basePath}#services`} className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Restaurant
                                </Link>
                                {/* UBAH: Tag <a> menjadi <Link>, lalu tambahkan basePath sebelum # */}
                                <Link href={`${basePath}#contact`} className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <div className="md:hidden">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-700 hover:text-amber-600 focus:outline-none transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-inner">
                            <Link 
                                href="/" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <a 
                                href="#about" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                About
                            </a>
                            <Link 
                                href={`${basePath}/news`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                News
                            </Link>
                            {/* UBAH JUGA DI SINI */}
                            <Link 
                                href={`${basePath}#services`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                Restaurant
                            </Link>
                            {/* UBAH JUGA DI SINI */}
                            <Link 
                                href={`${basePath}#contact`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Area Konten Utama Halaman RNB */}
            <main>
                {children}
            </main>

            {/* Footer Khusus RNB */}
            <footer className="bg-[#131313] text-white py-12 border-t-4 border-amber-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">© 2026 PT Rasa Nusantara Baru. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}