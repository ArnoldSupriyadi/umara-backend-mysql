import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function NewsDetail({ brand, post }) {
    return (
        <div className="bg-white min-h-screen">
            <Head title={`${post.title} - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                <article className="pt-24 pb-20">

                    {/* --- HEADER --- */}
                    <div className="container mx-auto px-4 lg:px-8 mb-12 text-center max-w-5xl">
                        <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/posts" className="hover:text-brand-primary transition-colors">News</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-brand-primary font-medium">{brand?.name}</span>
                        </nav>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="text-gray-400 text-sm italic">{post.published_at}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-brand-primary font-semibold text-sm">{brand?.name}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-primary leading-tight mb-8">
                            {post.title}
                        </h1>
                    </div>

                    {/* --- MAIN IMAGE --- */}
                    {post.main_image_url && (
                        <div className="container mx-auto px-4 lg:px-8 mb-16">
                            <div className="relative w-full md:h-[520px] overflow-hidden shadow-2xl rounded-2xl">
                                <img
                                    src={post.main_image_url}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* --- CONTENT --- */}
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="prose prose-lg prose-headings:font-playfair prose-headings:text-brand-primary prose-p:text-gray-600 prose-strong:text-brand-primary max-w-none"
                                style={{ lineHeight: '1.95', letterSpacing: '0.3px' }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* --- GALLERY --- */}
                            {post.gallery_urls && post.gallery_urls.length > 0 && (
                                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {post.gallery_urls.map((url, idx) => (
                                        <div key={idx} className="overflow-hidden rounded-xl shadow-md aspect-[4/3]">
                                            <img
                                                src={url}
                                                alt={`Foto ${idx + 1}`}
                                                loading="lazy"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* --- BACK --- */}
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <Link
                                    href="/posts"
                                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-semibold transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to News
                                </Link>
                            </div>
                        </div>
                    </div>

                </article>
            </main>
        </div>
    );
}

NewsDetail.layout = page => <UcrLayout children={page} brand={page.props.brand} />;
