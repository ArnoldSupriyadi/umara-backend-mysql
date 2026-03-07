import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function FrontendLayout({ children }) {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'News', href: '/posts' },
        { name: 'Career', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (href) => {
        if (href === '/') {
            return url === '/';
        }
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            {/* --- NAVIGATION BAR --- */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Kiri: Logo Perusahaan */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    U
                                </div>
                                <span className="font-bold text-xl tracking-tight text-gray-900">
                                    Umara Group
                                </span>
                            </Link>
                        </div>

                        {/* Kanan: Menu Desktop (Mentok Kanan) */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                                        isActive(item.href)
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Tombol Hamburger Menu (Hanya muncul di HP) */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                        
                    </div>
                </div>

                {/* --- MENU MOBILE (Tampil saat tombol hamburger diklik) --- */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-blue-50 border-blue-600 text-blue-700'
                                            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* --- KONTEN HALAMAN UTAMA --- */}
            {/* flex-grow agar footer selalu ada di bawah jika konten sedikit */}
            <main className="flex-grow">
                {children}
            </main>
            
            {/* --- FOOTER DESAIN BARU --- */}
            <footer className="bg-[#131313] text-white pt-12 pb-4 mt-auto">
                {/* ... (Kode Footer Anda tetap sama, tidak saya ubah agar tidak panjang) ... */}
                <div className="container mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
                    {/* Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div className="title-footer">
                            <picture>
                                {/* Nanti path image bisa Anda sesuaikan sendiri */}
                                <img src="/assets/images/logo-umara.svg" alt="Umara Group Logo" className="max-w-[150px]" />
                            </picture>
                        </div>
                        
                        {/* Quick Links */}
                        <div className="title-footer">
                            <h3 className="text-xl font-bold mb-4 font-['Playfair_Display']">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/posts" className="text-gray-300 hover:text-white transition-colors">News</Link></li>
                                <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        
                        {/* Services */}
                        <div className="title-footer">
                            <h3 className="text-xl font-bold mb-4 font-['Playfair_Display']">Our Services</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Corporate Catering</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Event Catering</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wedding Catering</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Meal Planning</a></li>
                            </ul>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="title-footer">
                            <h3 className="text-xl font-bold mb-4 font-['Playfair_Display']">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 mt-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-gray-300"><a href="https://maps.app.goo.gl/yiPbgXhZpc7P8tfs5" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Tangerang, Indonesia</a></p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <p className="text-gray-300"><a href="tel:02180600900" className="hover:text-white transition-colors">021-80600900</a></p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <p className="text-gray-300"><a href="mailto:info@umaragroup.com" className="hover:text-white transition-colors">info@umaragroup.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Bottom */}
                    <div className="border-t border-gray-800 pt-8 mt-4">
                        <div className="flex flex-col md:flex-row justify-center items-center">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                Copyright © {new Date().getFullYear()} Umara Group. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}