import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Show({ post }) {
    return (
        <FrontendLayout>
            <Head title={post.title} />

            {/* Header / Main Image Area */}
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-900 flex items-end">
                {post.main_image_url && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 opacity-60"
                        style={{ backgroundImage: `url(${post.main_image_url})` }}
                    ></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>
                
                <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <Link href="/posts" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition-colors">
                        &larr; Back to Articles
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {post.unit_name}
                        </span>
                        <span className="text-gray-300 text-sm">
                            Dipublikasikan pada {post.created_at}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Konten Utama */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                
                {/* Render Rich Text Content dengan aman */}
                <div 
                    className="prose prose-lg prose-blue max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>

                {/* Bagian Gallery Images (Jika Ada) */}
                {post.gallery_urls && post.gallery_urls.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {post.gallery_urls.map((imgUrl, index) => (
                                <a 
                                    key={index} 
                                    href={imgUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <img 
                                        src={imgUrl} 
                                        alt={`Gallery image ${index + 1}`} 
                                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </FrontendLayout>
    );
}