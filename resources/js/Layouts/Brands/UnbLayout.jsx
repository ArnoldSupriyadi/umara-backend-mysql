import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function UnbLayout({ children, brand }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const basePath = '/umara-nikmat-boga';
    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Navigation */}
            <header className="bg-gradient-to-r from-[#A0522D] to-[#6B2F0E] text-white fixed w-full z-50 shadow-md">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src={`${r2Url}/logos/logo-umara.svg`}
                                alt="Umara Group"
                                className="h-10 w-auto"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center justify-end flex-1">
                            <ul className="flex items-center gap-5">
                                <li>
                                    <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`${basePath}#about`} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`${basePath}/news`} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
                                        News
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`${basePath}#contact`} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Nav */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 bg-[#7a3b18] border-t border-white/10 z-50 shadow-lg">
                            <ul className="flex flex-col items-center gap-1 py-3">
                                {[
                                    { label: 'Home', href: '/' },
                                    { label: 'About', href: `${basePath}#about` },
                                    { label: 'News', href: `${basePath}/news` },
                                    { label: 'Contact', href: `${basePath}#contact` },
                                ].map((item) => (
                                    <li key={item.label} className="w-full max-w-sm">
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10 text-center transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#131313] text-white pt-12 pb-4">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <img src={`${r2Url}/logos/logo-umara.svg`} alt="Umara Group" className="h-10 w-auto mb-4"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {['Home', 'About Us', 'Services', 'News', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Our Services</h3>
                            <ul className="space-y-2">
                                {['Corporate Catering', 'Event Catering', 'Wedding Catering', 'Meal Planning'].map((s) => (
                                    <li key={s}><span className="text-gray-300">{s}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 mt-1 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-gray-300">Jakarta, Indonesia</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <p className="text-gray-300"><a href="tel:02180600900">021-80600900</a></p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <p className="text-gray-300">info@umaragroup.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-8">
                        <p className="text-gray-300 text-center">
                            Copyright © {new Date().getFullYear()} Umara Group. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
