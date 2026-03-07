import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LniLayout from '@/Layouts/Brands/LniLayout';

const News = ({ brand, posts }) => {

    // --- FALLBACK DATA ---
    // Jika props 'posts' dari database masih kosong/belum ada, kita pakai data dummy ini
    // agar layout tetap terlihat rapi saat proses development.
    const displayPosts = posts && posts.length > 0 ? posts : [
        {
            id: 1,
            title: 'Quality Milestone: Shelf-Life and Freshness',
            excerpt: 'Technology-backed freshness ensures long shelf-life while preserving authentic flavors for every meal served.',
            image: '/assets/news/kiddies-day-out/lni-aeon3.jpg',
            published_at: '30 October 2025',
            category: null,
            slug: 'quality-milestone-shelf-life'
        },
        {
            id: 2,
            title: 'Fueling the Drive: Laukita Niaga Indonesia Serves Exclusive Dining at IIMS 2026',
            excerpt: 'Laukita Niaga Indonesia was honored to be the chosen food supply partner for Bank Danamon, ensuring their distinguished guests enjoyed a culinary experience.',
            image: '/assets/news/iims2026/lni-iims.jpeg',
            published_at: '15 November 2025',
            category: 'Expansion',
            slug: 'fueling-the-drive-iims-2026'
        },
        {
            id: 3,
            title: 'New Menu Launch: Signature Indonesian Flavors',
            excerpt: 'Introducing authentic Indonesian dishes crafted for convenience without compromising on the traditional taste.',
            image: '/assets/lauk-kita-niaga/product/Cumi-Asin-Pedas-Jontor.jpg',
            published_at: '9 November 2025',
            category: 'Product',
            slug: 'new-menu-launch'
        }
    ];

    // Helper untuk base path URL LNI (Untuk routing Link internal)
    const basePath = `/${brand?.slug || 'lauk-kita-niaga'}`;

    return (
        <>
            <Head title={`News & Updates - ${brand?.name || 'PT Lauk Kita Niaga'}`} />

            <main className="bg-[#FCF0CE]">
                {/* --- 1. NEWS SECTION --- */}
                <section id="news" className="py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* Section Header */}
                        <div className="text-center mb-16 md:mb-20">
                            <span className="inline-block py-1 px-3 rounded-full bg-[#E8DCC0] text-[#234E33] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                                Latest Updates
                            </span>
                            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-amber-900 mb-6">
                                News
                            </h2>
                            <div className="w-24 h-1 bg-[#234E33] mx-auto rounded-full"></div>
                            <p className="mt-6 text-amber-800 max-w-2xl mx-auto text-lg md:text-xl font-light">
                                Discover the stories, innovations, and culinary journeys that define Lauk Kita Niaga.
                            </p>
                        </div>
                        
                        {/* Articles Grid (Di-looping dari database/dummy) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {displayPosts.map((post) => (
                                <article key={post.id} className="group flex flex-col h-full bg-white rounded-t-2xl rounded-b-md shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
                                    
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden h-72 rounded-t-2xl">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Tampilkan Badge Kategori jika ada di database */}
                                        {post.category && (
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-white/95 backdrop-blur-sm text-[#234E33] text-xs font-bold px-4 py-2 uppercase tracking-wider shadow-sm rounded-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Container */}
                                    <div className="flex flex-col flex-grow p-8 border-x border-b border-[#E8DCC0]/30 rounded-b-md relative">
                                        
                                        {/* Meta Data (Tanggal & Kategori) */}
                                        <div className="mb-4 flex items-center gap-3 text-xs font-medium text-[#8B7E66] uppercase tracking-wide">
                                            <span>{post.published_at}</span>
                                            {post.category && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-[#234E33]"></span>
                                                    <span>{post.category}</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-amber-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                                            {post.title}
                                        </h3>
                                        
                                        {/* Excerpt */}
                                        <p className="text-gray-600 mb-8 line-clamp-3 font-light leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        
                                        {/* Read More Link */}
                                        <div className="mt-auto pt-6 border-t border-[#E8DCC0]/50 flex items-center justify-between">
                                            <Link href={`${basePath}/news/${post.slug}`} className="inline-flex items-center text-[#234E33] font-bold tracking-wide uppercase text-sm group/link">
                                                Read Story
                                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </section>

                {/* --- 2. CONTACT US --- */}
                <section id="contact" className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-6 md:gap-8 text-center md:text-left max-w-5xl mx-auto">
                            <img 
                                src="/assets/lauk-kita-niaga/laukkita-logo.png" 
                                alt="Laukita Niaga Indonesia"
                                className="w-48 md:w-64 h-auto drop-shadow-md hover:scale-105 transition-transform" 
                            />
                            <div className="w-full">
                                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">CONTACT US</h2>
                                <div className="space-y-2 text-gray-700">
                                    <p className="font-semibold text-amber-900">Office Address</p>
                                    <p>Bintaro Avenue Lt.2 Jl. MH Thamrin Blok A2 No. 1 Bintaro Sektor 7, Bintaro Jaya, Tangerang Selatan</p>
                                    <p className="pt-2">
                                        <span className="font-semibold text-amber-900">WA : </span> 
                                        <a href="https://wa.me/6281260601055" className="hover:text-amber-600 transition-colors">0812-6060-1055</a>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-amber-900">Email : </span> 
                                        <a href="mailto:info@laukitaniaga.com" className="text-amber-700 hover:text-amber-500 hover:underline transition-colors">info@laukitaniaga.com</a>
                                    </p>
                                    <p className="mt-4 text-amber-900 font-bold tracking-wide">PT. LAUKITA NIAGA INDONESIA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

// Pasang Layout LNI
News.layout = page => <LniLayout children={page} brand={page.props.brand} />;

export default News;