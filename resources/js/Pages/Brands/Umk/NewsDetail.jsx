import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UmkLayout from '@/Layouts/Brands/UmkLayout';
import GalleryLightbox from '@/Components/GalleryLightbox';

export default function NewsDetail({ brand, post }) {
    const basePath = `/${brand?.slug || 'umara-mitra-kulina'}`;

    return (
        <div className="bg-[#F9F7F2] min-h-screen pt-32 pb-20">
            <Head title={`${post.title} - ${brand?.name || 'Umara Mitra Kulina'}`} />

            <article>
                {/* --- HEADER --- */}
                <div className="container mx-auto px-4 lg:px-8 mb-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6 font-medium uppercase tracking-wide">
                            <Link href="/" className="hover:text-palette1-a transition-colors">Home</Link>
                            <span className="text-gray-300">/</span>
                            <Link href="/posts" className="hover:text-palette1-a transition-colors">News</Link>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-palette1-a mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t border-b border-gray-200 py-4 max-w-lg mx-auto">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-palette1-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {post.published_at}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span className="text-palette1-a font-semibold">{brand?.name}</span>
                        </div>
                    </div>
                </div>

                {/* --- GAMBAR UTAMA --- */}
                {post.main_image_url && (
                    <div className="container mx-auto px-4 lg:px-8 mb-16">
                        <div className="max-w-5xl mx-auto rounded-sm overflow-hidden shadow-2xl">
                            <img
                                src={post.main_image_url}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* --- KONTEN ARTIKEL --- */}
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="prose prose-lg prose-stone max-w-none text-gray-600 mb-12"
                            style={{ lineHeight: '1.95', letterSpacing: '0.3px' }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* --- GALLERY --- */}
                        <GalleryLightbox images={post.gallery_urls || []} />

                        {/* --- FOOTER --- */}
                        <div className="border-t border-b border-gray-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Link
                                href="/posts"
                                className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-palette1-a hover:text-palette1-c transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to News
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

NewsDetail.layout = page => <UmkLayout children={page} brand={page.props.brand} />;
