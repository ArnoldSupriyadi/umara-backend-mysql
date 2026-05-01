import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LbiLayout from '@/Layouts/Brands/LbiLayout';

export default function NewsDetail({ brand, post }) {
    const basePath = `/${brand?.slug || 'laukita-bersama-indonesia'}`;

    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            <Head title={`${post.title} - ${brand?.name || 'PT Laukita Bersama Indonesia'}`} />

            <main>
                <article className="pt-24 pb-20">

                    {/* --- HEADER --- */}
                    <div className="container mx-auto px-4 lg:px-8 mb-12 text-center max-w-5xl">
                        <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/posts" className="hover:text-brand-accent transition-colors">News</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-brand-primary font-medium">{brand?.name}</span>
                        </nav>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="px-4 py-1 rounded-full border border-brand-gold/30 bg-brand-light/20 text-brand-primary text-xs font-bold tracking-widest uppercase">
                                {brand?.name}
                            </span>
                            <span className="text-gray-400 text-sm font-medium italic">{post.published_at}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-primary leading-tight mb-8">
                            {post.title}
                        </h1>
                    </div>

                    {/* --- MAIN IMAGE --- */}
                    {post.main_image_url && (
                        <div className="container mx-auto px-4 lg:px-8 mb-16 md:mb-24">
                            <div className="relative w-full aspect-[21/9] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={post.main_image_url}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* --- CONTENT --- */}
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="prose prose-lg md:prose-xl prose-headings:font-playfair prose-headings:text-brand-primary prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-strong:text-brand-primary max-w-none"
                                style={{ lineHeight: '1.95', letterSpacing: '0.3px' }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* --- GALLERY --- */}
                            {post.gallery_urls && post.gallery_urls.length > 0 && (
                                <div className="mt-16 grid md:grid-cols-2 gap-8">
                                    {post.gallery_urls.map((url, idx) => (
                                        <figure key={idx} className="group cursor-pointer">
                                            <div className="overflow-hidden rounded-xl shadow-lg mb-4 relative aspect-[4/3]">
                                                <img
                                                    src={url}
                                                    alt={`Foto ${idx + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        </figure>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- BACK BUTTON --- */}
                    <div className="container mx-auto px-4 lg:px-8 mt-16 text-center">
                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-3 text-brand-primary hover:text-brand-accent transition-colors group"
                        >
                            <span className="w-10 h-10 rounded-full border border-brand-primary/20 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7M8 12h13" />
                                </svg>
                            </span>
                            <span className="font-playfair font-bold text-lg tracking-wide">Back to News</span>
                        </Link>
                    </div>

                </article>
            </main>
        </div>
    );
}

NewsDetail.layout = page => <LbiLayout children={page} brand={page.props.brand} />;
