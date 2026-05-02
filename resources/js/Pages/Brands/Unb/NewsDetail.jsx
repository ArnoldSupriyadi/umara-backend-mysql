import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UnbLayout from '@/Layouts/Brands/UnbLayout';
import GalleryLightbox from '@/Components/GalleryLightbox';

export default function NewsDetail({ brand, post }) {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Head title={`${post.title} - Umara Group`} />

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <article>
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">

                                {/* Main Image */}
                                {post.main_image_url && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={post.main_image_url}
                                            alt={post.title}
                                            className="w-full h-96 object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="bg-[#A0522D] text-white px-3 py-1 rounded-full">
                                            {brand?.name || 'Umara Group'}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-600 text-sm">{post.published_at}</p>
                                    </div>

                                    {/* Title */}
                                    <h1 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                        {post.title}
                                    </h1>

                                    {/* Breadcrumb */}
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                                        <Link href="/" className="hover:text-[#A0522D] transition-colors">Home</Link>
                                        <span>/</span>
                                        <Link href="/posts" className="hover:text-[#A0522D] transition-colors">News</Link>
                                        <span>/</span>
                                        <span className="text-gray-600 line-clamp-1">{post.title}</span>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />

                                    {/* Gallery */}
                                    {post.gallery_urls && post.gallery_urls.length > 0 && (
                                        <div className="mt-10">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Photo Highlights</h3>
                                            <GalleryLightbox images={post.gallery_urls || []} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>

                        {/* Back Button */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/posts"
                                className="inline-flex items-center bg-[#A0522D] hover:bg-[#6B2F0E] text-white px-6 py-3 rounded-md transition-colors font-medium gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to All News
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

NewsDetail.layout = page => <UnbLayout children={page} brand={page.props.brand} />;
