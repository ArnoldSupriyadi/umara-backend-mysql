import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function UmkLayout({ children, brand }) {
    // State untuk kontrol menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper untuk link UMK
    const basePath = `/${brand?.slug || 'umara-mitra-kulina'}`;

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="umk-theme min-h-screen bg-gray-50 font-sans">
            
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 transition-all duration-300">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link href={basePath} className="flex items-center justify-center">
                                <img 
                                    src={`${r2Url}/logos/logo-umk.png`} 
                                    alt="Umara Mitra Kulina"
                                    className="w-28 h-auto transition-transform hover:scale-105 duration-300" 
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className="text-gray-600 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors">
                                Home
                            </Link>
                            {/* UBAH: Tag <a> menjadi <Link>, tambahkan basePath */}
                            <Link href={`${basePath}#kitchen`} className="text-gray-600 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors">
                                Services
                            </Link>
                            <Link href={`${basePath}/news`} className="text-gray-600 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors">
                                News
                            </Link>
                            {/* UBAH: Tag <a> menjadi <Link>, tambahkan basePath */}
                            <Link href={`${basePath}#contact`} className="text-gray-600 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors">
                                Contact
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="md:hidden text-gray-600 hover:text-[#CBB88A] focus:outline-none"
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

                {/* Mobile Nav Dropdown */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col items-center gap-1 py-3">
                        <li className="w-full">
                            <Link 
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center text-gray-600 hover:bg-gray-50 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="w-full">
                            {/* UBAH JUGA DI SINI */}
                            <Link 
                                href={`${basePath}#kitchen`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center text-gray-600 hover:bg-gray-50 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors"
                            >
                                Services
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link 
                                href={`${basePath}/news`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center text-gray-600 hover:bg-gray-50 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors"
                            >
                                News
                            </Link>
                        </li>
                        <li className="w-full">
                            {/* UBAH JUGA DI SINI */}
                            <Link 
                                href={`${basePath}#contact`} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-center text-gray-600 hover:bg-gray-50 hover:text-[#CBB88A] font-medium text-sm uppercase tracking-wider transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content Area */}
            {/* Tambahkan padding-top agar konten tidak tertutup fixed navbar */}
            <main className="pt-20"> 
                {children}
            </main>

            {/* Footer Khusus UMK */}
            <footer className="bg-gray-900 text-white py-12 border-t-4 border-[#CBB88A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} PT Umara Mitra Kulina. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}