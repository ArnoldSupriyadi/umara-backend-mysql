import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function LbiLayout({ children, brand }) {
    // State untuk mengontrol buka-tutup menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper untuk base path URL
    const basePath = `/${brand?.slug || 'laukita-bersama-indonesia'}`;

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="lbi-theme min-h-screen bg-white font-sans text-gray-800">
            
            {/* --- HEADER NAVBAR --- */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link href={basePath} className="block">
                                <img 
                                    src={`${r2Url}/logos/LBI-Logo.png`} 
                                    alt="PT Laukita Bersama Indonesia" 
                                    className="w-24 h-auto lg:w-28 transition-transform hover:scale-105 duration-300" 
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Home
                            </Link>
                            <Link href={`${basePath}/catalog`} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Our Catalog
                            </Link>
                            <Link href={`${basePath}/news`} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                News
                            </Link>
                            <a href="tel:085217777177" className="font-medium text-gray-700 px-6 py-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors decoration-2">
                                Contact
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown Menu */}
                <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg z-40 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                    <nav className="flex flex-col space-y-1 p-4 mx-4">
                        <Link 
                            href="/" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium block px-4 py-3 rounded-lg transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href={`${basePath}/catalog`} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium block px-4 py-3 rounded-lg transition-colors"
                        >
                            Our Catalog
                        </Link>
                        <Link 
                            href={`${basePath}/news`} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium block px-4 py-3 rounded-lg transition-colors"
                        >
                            News
                        </Link>
                        <a 
                            href="tel:085217777177" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-medium text-gray-700 block px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        > Contact
                        </a>
                    </nav>
                </div>
            </header>

            {/* Mobile Overlay (Menutup menu jika area luar diklik) */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
                ></div>
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <main className="pt-16 lg:pt-20"> 
                {children}
            </main>

            {/* --- FOOTER KHUSUS LBI --- */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <p className="text-gray-400">© 2026 PT Laukita Bersama Indonesia. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}