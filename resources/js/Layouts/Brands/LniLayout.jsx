import React from 'react';
import { Link } from '@inertiajs/react';

export default function LniLayout({ children, brand }) {
    // Helper untuk base path URL LNI
    const basePath = `/${brand?.slug || 'lauk-kita-niaga'}`;

    // Variabel Base URL Cloudflare R2
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="lni-theme min-h-screen bg-white font-sans text-gray-800">
            
            {/* --- HEADER NAVBAR --- */}
            {/* Saya tambahkan sticky & z-50 agar navbar tetap di atas saat di-scroll */}
            <header className="bg-[#FCF0CE] sticky top-0 z-50 shadow-sm transition-all duration-300">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    
                    {/* Logo */}
                    <Link href={basePath} className="flex items-center gap-3">
                        <img 
                            src={`${r2Url}/logos/laukkita-logo.png`} 
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
            <main className="bg-[#FCF0CE]"> 
                {children}
            </main>

            {/* --- FOOTER KHUSUS LNI --- */}
            <footer className="bg-[#131313] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                
                {/* Bagian Logo dan Tagline */}
                <div className="flex items-center gap-3">
                    <img 
                    src={`${r2Url}/lni-assets/logos/pt-laukita-niaga.svg`} 
                    alt="Laukita Logo" 
                    className="h-10 w-10" 
                    />
                    <div>
                    <p className="text-white/90 text-sm">
                        Laukita is the home of premium ready-to-eat products.
                    </p>
                    </div>
                </div>

                {/* Bagian Copyright */}
                <div className="flex">
                    <div className="pt-4 text-sm text-white/80">
                    © {new Date().getFullYear()} Laukita. All rights reserved.
                    </div>
                </div>
                
                </div>
            </div>
            </footer>

        </div>
    );
}