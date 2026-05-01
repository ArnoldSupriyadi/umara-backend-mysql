import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function News({ brand, posts }) {
    
    // Helper untuk base path URL UCR
    // posts is a Laravel paginator object: { data: [...], links: [...], ... }
    const displayPosts = posts?.data ?? [];

    return (
        <div className="bg-[#FCFBF7] min-h-screen">
            <Head title={`News & Updates - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HEADER TITLE --- */}
                <section id="cta-action" className="pt-32 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="py-5 text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#0F1210]">
                            Stay Updated
                        </h1>
                        <p className="font-playfair mb-8 text-[#374151] max-w-2xl mx-auto text-lg md:text-xl">
                            Follow our journey and discover the latest stories from Umara Catering.
                        </p>
                    </div>
                </section>

                {/* --- NEWS GRID --- */}
                <section id="news" className="pb-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {displayPosts.map((post) => (
                                <article 
                                    key={post.id} 
                                    className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E1D5A6]/40 flex flex-col h-full overflow-hidden"
                                >
                                    {/* Card Image */}
                                    <div className="relative overflow-hidden h-64 border-b border-[#E1D5A6]/20">
                                        <img 
                                            src={post.image_url} 
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        
                                        {/* Date */}
                                        <div className="text-[#6B6F65] text-xs font-semibold uppercase tracking-widest mb-4">
                                            {post.published_at}
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#0F1210] mb-4 group-hover:text-[#C5A859] transition-colors leading-snug">
                                            <Link href={`/posts/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        
                                        {/* Excerpt with HTML tags support */}
                                        <div 
                                            className="text-[#374151] mb-8 line-clamp-3 text-sm leading-relaxed font-light flex-grow prose-strong:text-[#0F1210] prose-strong:font-semibold"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                        />
                                        
                                        {/* Read More Button */}
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <Link 
                                                href={`/posts/${post.slug}`}
                                                className="inline-flex items-center text-[#C5A859] hover:text-[#0F1210] font-bold text-xs uppercase tracking-widest transition-colors group/link"
                                            >
                                                Read More
                                                <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>
                                </article>
                            ))}

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Pasang Layout UCR
News.layout = page => <UcrLayout children={page} brand={page.props.brand} />;