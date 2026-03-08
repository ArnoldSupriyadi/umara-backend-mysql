import React from 'react';
import { Link } from '@inertiajs/react';

export default function LniLayout({ children, brand }) {
    // Helper untuk base path URL LNI
    const basePath = `/${brand?.slug || 'lauk-kita-niaga'}`;

    return (
        <div className="lni-theme min-h-screen bg-white font-sans text-gray-800">
            
            {/* --- HEADER NAVBAR --- */}
            {/* Saya tambahkan sticky & z-50 agar navbar tetap di atas saat di-scroll */}
            <header className="bg-[#FCF0CE] sticky top-0 z-50 shadow-sm transition-all duration-300">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href={basePath} className="flex items-center gap-3">
                        <img 
                            src="/assets/lauk-kita-niaga/laukkita-logo.png" 
                            alt="PT Lauk Kita Niaga" 
                            className="h-20 w-auto hover:scale-105 transition-transform duration-300" 
                        />
                        <span className="sr-only">PT Lauk Kita Niaga</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <li>
                            <Link href="/" className="hover:text-amber-700 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            {/* UBAH: Gunakan Link dan tambahkan basePath sebelum # */}
                            <Link href={`${basePath}#products`} className="hover:text-amber-700 transition-colors">
                                Produk
                            </Link>
                        </li>
                        <li>
                            <Link href={`${basePath}/news`} className="hover:text-amber-700 transition-colors">
                                News
                            </Link>
                        </li>
                        <li>
                            {/* UBAH: Gunakan Link dan tambahkan basePath sebelum # */}
                            <Link href={`${basePath}#contact`} className="hover:text-amber-700 transition-colors">
                                Kontak
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile CTA Button (Menggantikan Hamburger Menu) */}
                    {/* UBAH: Gunakan Link dan tambahkan basePath sebelum # */}
                    <Link 
                        href={`${basePath}#contact`} 
                        className="md:hidden inline-flex items-center px-4 py-2 rounded-md border border-amber-600/30 text-sm font-medium text-amber-800 bg-white/50 hover:bg-white transition-colors shadow-sm"
                    >
                        Hubungi Kami
                    </Link>
                </nav>
            </header>

            {/* --- MAIN CONTENT AREA --- */}
            <main> 
                {children}
            </main>

            {/* --- FOOTER KHUSUS LNI --- */}
            <footer className="bg-gray-900 text-white py-10 border-t-4 border-[#FCF0CE]">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} PT Lauk Kita Niaga. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}