import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function UcrLayout({ children, brand }) {
    // State untuk mengontrol menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper untuk base path URL UCR agar dinamis
    const basePath = `/${brand?.slug || 'umara-cipta-rasa'}`;

    // Mengambil URL saat ini untuk mengecek menu mana yang sedang aktif
    const { url } = usePage();

    // Daftar menu untuk mempermudah mapping (agar kode tidak terlalu panjang)
    const navItems = [
        { name: 'Home', path: '/', isRoot: true },
        { name: 'Wedding', path: '/wedding' },
        { name: 'Ballroom', path: '/ballroom' },
        { name: 'Event', path: '/event' },
        { name: 'Mealbox', path: '/mealbox' },
        { name: 'Meeting', path: '/meeting' },
        { name: 'Mining', path: '/mining' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'News', path: '/news' },
    ];

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="ucr-theme min-h-screen bg-white text-gray-800">
            
            {/* --- HEADER UCR --- */}
            <header className="sticky top-0 z-50 bg-white border-b border-[#E1D5A6] shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Baris Navigasi Utama */}
                    <div className="flex h-20 items-center justify-between">
                        
                        {/* Logo */}
                        <Link href={basePath} className="flex-shrink-0">
                            <img 
                                src={`${r2Url}/logos/ucr-logo.png`}
                                alt="Umara Catering" 
                                className="h-12 w-auto hover:scale-105 transition-transform duration-300" 
                            />
                        </Link>
                        
                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navItems.map((item, index) => {
                                // 1. Buat URL lengkapnya
                                const fullPath = `${basePath}${item.path}`;
                                // 2. Cek apakah URL saat ini cocok dengan fullPath
                                // (url.startsWith digunakan agar sub-menu dari path tersebut tetap terhitung aktif)
                                const isActive = url === fullPath || (item.path !== '/' && url.startsWith(fullPath));

                                return (
                                    <Link 
                                        key={index} 
                                        href={item.isRoot ? item.path : `${basePath}${item.path}`} 
                                        className={`font-medium transition-colors ${
                                            isActive 
                                                ? 'text-[#C5A859]' // Warna saat menu sedang aktif
                                                : 'text-gray-700 hover:text-[#C5A859]' // Warna normal
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        
                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="lg:hidden p-2 text-gray-600 hover:text-[#C5A859] focus:outline-none"
                            aria-label="Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Nav Dropdown */}
                    <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-3">
                            {navItems.map((item, index) => {
                            const fullPath = `${basePath}${item.path}`;
                            const isActive = url === fullPath || (item.path !== '/' && url.startsWith(fullPath));

                            return (
                                <Link 
                                    key={index} 
                                    href={item.isRoot ? item.path : `${basePath}${item.path}`} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                                        isActive
                                            ? 'text-[#C5A859] bg-[#C5A859]/10' // Aktif (teks emas & background tipis)
                                            : 'text-gray-700 hover:text-[#C5A859] hover:bg-gray-50' // Normal
                                    }`}
                                >
                                    {item.name}
                                </Link>
                     );
                 })}
                        </div>
                    </div>

                    {/* Baris Informasi Kontak (Lokasi & WA) */}
                    <div className="flex items-center justify-between w-full border-t border-[#E1D5A6] py-3">
                        <div className="text-sm text-gray-700 hover:text-[#C5A859] transition-colors">
                            <a href="https://maps.app.goo.gl/YC4n6zPsfpeXsECR8" target="_blank" rel="noreferrer">
                                📍 Jakarta, Indonesia
                            </a>
                        </div>
                        <div className="text-sm text-gray-700 hover:text-[#C5A859] transition-colors">
                            <a href="https://wa.me/6281212008700" target="_blank" rel="noreferrer">
                                📞 0812‑1200‑8700
                            </a>
                        </div>
                    </div>

                </div>
            </header>

            {/* --- KONTEN UTAMA --- */}
            <main>
                {children}
            </main>

            {/* --- FOOTER UCR --- */}
            <footer className="bg-white border-t border-[#E1D5A6] py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Anda bisa menambahkan konten footer lain di sini nantinya */}
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} PT Umara Cipta Rasa. All rights reserved.</p>
                </div>
            </footer>
            
        </div>
    );
}