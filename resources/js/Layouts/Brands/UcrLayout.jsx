// resources/js/Layouts/Brands/UcrLayout.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function UcrLayout({ children, brand }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="ucr-theme min-h-screen bg-white">
            {/* Header Khusus UCR */}
            <header className="nav-wrap sticky top-0 z-50 bg-white border-b border-[#E1D5A6]">
                <div className="container-full">
                    <div className="flex h-20 items-center justify-between">
                        <Link href="/" className="brand">
                            <img src="/assets/vector/logo-ucr.png" alt="Umara Catering" className="h-12 w-auto" />
                        </Link>
                        
                        {/* Desktop Nav - Link-nya berbeda tiap Brand! */}
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/umara-catering" className="nav-link font-medium">Home</Link>
                            <Link href="/umara-catering/wedding" className="nav-link font-medium">Wedding</Link>
                            <Link href="/umara-catering/meeting" className="nav-link font-medium">Meeting</Link>
                            <Link href="/umara-catering/gallery" className="nav-link font-medium">Gallery</Link>
                            <Link href="/umara-catering/news" className="nav-link font-medium">News</Link>
                        </nav>
                        
                        {/* Mobile Toggle */}
                        <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="lg:hidden p-2">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main>{children}</main>

            {/* Footer Khusus UCR */}
            <footer className="footer bg-white border-t border-[#E1D5A6] py-12">
                {/* ... Isi Footer UCR Anda di sini ... */}
                <div className="text-center text-gray-500 text-sm">© 2026 PT Umara Cipta Rasa.</div>
            </footer>
        </div>
    );
}