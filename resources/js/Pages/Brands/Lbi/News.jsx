import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LbiLayout from '@/Layouts/Brands/LbiLayout'; // Pastikan Anda menyesuaikan path layout LBI Anda

const News = ({ brand, posts }) => {

    // Helper untuk base path URL LBI
    const basePath = `/${brand?.slug || 'laukita-bersama'}`;

    // --- FALLBACK DATA ---
    // Jika props 'posts' dari database masih kosong, kita pakai data dummy ini
    const displayPosts = posts && posts.length > 0 ? posts : [
        {
            id: 1,
            title: 'Laukita Bersama Indonesia Showcases Food Manufacturing at SIAL InterFood 2025',
            excerpt: 'LBI participated in SIAL InterFood 2025, one of Indonesia’s leading food and beverage exhibitions. This participation serves as an important step for LBI to introduce its advanced frozen and retort food',
            image: '/assets/news/sial-interfood/1.jpg',
            published_at: '12 November 2025',
            slug: 'sial-interfood-2025'
        },
        {
            id: 2,
            title: 'Expanding Horizons: Laukita Bersama Indonesia Exports Ready-to-Cook Meals to Saudi Arabia',
            excerpt: 'PT Laukita Bersama Indonesia has officially expanded its operations to Saudi Arabia, shipping high-quality ready-to-cook meals to serve the Middle Eastern market and Indonesian pilgrims.',
            image: '/assets/laukkita-bersama/ekspor/eskpor-to-saudi.jpeg',
            published_at: '6 Maret 2025',
            slug: 'ekspor-to-jeddah'
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <Head title={`News & Updates - ${brand?.name || 'PT Laukita Bersama Indonesia'}`} />

            <main>
                <section id="news" className="py-20 mt-10">
                    <div className="container mx-auto px-4 lg:px-8">
                        
                        {/* --- HEADER SECTION --- */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-[#F7F3EF] px-6 py-3 rounded-full border border-[#debe9d] mb-6 shadow-sm">
                                <div className="w-2 h-2 bg-[#8B1C3D] rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-[#8B1C3D] tracking-wide uppercase">News</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#8B1C3D] mb-4 leading-tight">
                                News & Updates
                            </h2>
                            <p className="text-[#8B1C3D] max-w-3xl mx-auto leading-relaxed text-lg">
                                Latest stories from Laukita Bersama Indonesia.
                            </p>
                        </div>

                        {/* --- NEWS GRID --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                            {displayPosts.map((post) => (
                                <article 
                                    key={post.id} 
                                    className="group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#debe9d] bg-white flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-[#8B1C3D]/0 group-hover:bg-[#8B1C3D]/10 transition-colors duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 bg-[#F7F3EF] flex flex-col flex-grow border-t border-[#debe9d]/50">
                                        <div className="text-sm font-medium text-[#8B1C3D]/80 mb-3 tracking-wide uppercase">
                                            {post.published_at}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-[#8B1C3D] mb-4 group-hover:text-[#6f162e] transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-[#8B1C3D]/90 mb-6 line-clamp-3 flex-grow leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        
                                        {/* Read More Link (Menggunakan Inertia Link) */}
                                        <Link 
                                            href={`${basePath}/news/${post.slug}`} 
                                            className="inline-flex items-center text-[#8B1C3D] hover:text-[#6f162e] font-bold mt-auto tracking-wide group/link"
                                        >
                                            Read More
                                            <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

// Pasang Layout LBI jika sudah ada
News.layout = page => <LbiLayout children={page} brand={page.props.brand} />;

export default News;