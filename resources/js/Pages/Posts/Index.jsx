import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Index({ posts }) {
    // Memastikan data post tidak kosong
    const hasPosts = posts && posts.data && posts.data.length > 0;

    // Memisahkan 1 berita pertama (Featured) dan sisa beritanya (Grid)
    const featuredPost = hasPosts ? posts.data[0] : null;
    const remainingPosts = hasPosts ? posts.data.slice(1) : [];

    const r2Url = "https://assets.bridgeflow.my.id";

    return (
        <FrontendLayout>
            <Head title="Latest News & Articles - Umara Group" />

            {/* --- HERO SECTION --- */}
        <section className="relative py-28 text-white overflow-hidden" 
                    style={{ 
                    backgroundImage: `url('${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center center' 
                    }}>
                {/* Overlay gelap transparan agar teks judul tetap kontras dan terbaca jelas */}
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Playfair_Display']">
                        News and Activities
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        Stay updated with the latest news, events, and announcements from Umara Group
                    </p>
                </div>
            </section>

        <main>
                {/* --- FEATURED ARTICLE SECTION --- */}
                {featuredPost && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="max-w-5xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                                    <div className="md:flex">
                                        {/* Image Section */}
                                        <div className="md:w-1/2">
                                            <div className="h-64 md:h-full relative overflow-hidden bg-gray-100">
                                                {featuredPost.image_url ? (
                                                    <img 
                                                        src={featuredPost.image_url} 
                                                        alt={featuredPost.title} 
                                                        className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 absolute inset-0">
                                                        No Image Available
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Content Section */}
                                        <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                                            <div className="flex items-center mb-4">
                                                <span className="bg-gradient-to-r from-[#CE8736] to-[#8C3F0E] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                                    {featuredPost.unit_name || 'Umara Group'}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-3">{featuredPost.created_at}</p>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display'] leading-snug">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                {featuredPost.excerpt}
                                            </p>
                                            <Link 
                                                href={`/posts/${featuredPost.slug}`} 
                                                className="inline-flex items-center text-[#CE8736] hover:text-[#8C3F0E] font-semibold group"
                                            >
                                                Read More
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- NEWS GRID SECTION --- */}
                <section className="py-20 bg-gray-50 border-t border-gray-100">
                    <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                        
                        {remainingPosts.length > 0 ? (
                            <>
                                {/* Grid Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                                    {remainingPosts.map((post) => (
                                        <article 
                                            key={post.id}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
                                        >
                                            {/* Image */}
                                            <div className="relative overflow-hidden h-56 bg-gray-100">
                                                {post.image_url ? (
                                                    <img 
                                                        src={post.image_url} 
                                                        alt={post.title} 
                                                        loading="lazy"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                                
                                                {/* Badge/Kategori */}
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-gradient-to-r from-[#CE8736] to-[#8C3F0E] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                        {post.unit_name || 'Umara Group'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="text-gray-500 text-sm mb-3">{post.created_at}</div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#CE8736] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <Link 
                                                    href={`/posts/${post.slug}`} 
                                                    className="inline-flex items-center text-[#CE8736] hover:text-[#8C3F0E] font-semibold group mt-auto w-max"
                                                >
                                                    Read More
                                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination Bawaan Laravel Inertia */}
                                {posts.links && posts.links.length > 3 && (
                                    <div className="flex justify-center gap-2 mt-12 flex-wrap">
                                        {posts.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all duration-300 ${
                                                    link.active 
                                                        ? 'bg-gradient-to-r from-[#CE8736] to-[#8C3F0E] text-white border-transparent shadow-md' 
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-[#CE8736] border-gray-200'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            // State jika belum ada artikel sama sekali (termasuk featured)
                            !featuredPost && (
                                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Artikel</h3>
                                    <p className="text-gray-500">Berita dan artikel terbaru akan segera hadir di sini.</p>
                                </div>
                            )
                        )}
                        
                    </div>
                </section>
        </main>
    </FrontendLayout>
    );
}