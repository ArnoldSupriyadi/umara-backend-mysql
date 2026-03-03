import React from 'react';
import { Head, Link } from '@inertiajs/react';

import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Index({ posts }) {
    return (
        <FrontendLayout>
            <Head title="Latest News & Articles" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Latest Updates</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ikuti berita terbaru, artikel, dan pembaruan dari Umara Group.
                    </p>
                </div>

                {/* Grid Artikel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.data && posts.data.length > 0 ? (
                        posts.data.map((post) => (
                            <Link 
                                href={`/posts/${post.slug}`} 
                                key={post.id} 
                                className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                                    {post.image_url ? (
                                        <img 
                                            src={post.image_url} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                        {post.unit_name}
                                    </div>
                                </div>

                                {/* Konten */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-xs text-gray-500 mb-2">{post.created_at}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto text-blue-600 font-medium text-sm flex items-center">
                                        Read Article &rarr;
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-2xl shadow-sm">
                            Belum ada artikel yang dipublikasikan saat ini.
                        </div>
                    )}
                </div>

                {/* Pagination (Opsional, jika halamannya lebih dari 1) */}
                {posts.links && posts.links.length > 3 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {posts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 border rounded-lg ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </FrontendLayout>
    );
}