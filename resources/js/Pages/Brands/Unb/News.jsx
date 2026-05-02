import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UnbLayout from '@/Layouts/Brands/UnbLayout';

export default function News({ brand, posts }) {
    const displayPosts = posts?.data ?? [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title={`News - ${brand?.name || 'Umara Group'}`} />

            {/* Hero */}
            <section className="bg-gradient-to-r from-[#A0522D] to-[#6B2F0E] text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">
                        News & Events
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                        Latest updates, events, and stories from {brand?.name || 'Umara Group'}
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {displayPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {post.image_url && (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-6">
                                        <span className="text-sm text-[#A0522D] font-medium">{post.created_at}</span>
                                        <h3 className="font-semibold text-gray-900 mt-2 mb-3 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                        <Link
                                            href={`/posts/${post.slug}`}
                                            className="text-[#A0522D] hover:text-[#6B2F0E] font-medium text-sm inline-flex items-center gap-1 transition-colors"
                                        >
                                            Read More
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-lg">No news available yet.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts?.links && posts.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-12 flex-wrap">
                            {posts.links.map((link, index) => {
                                const cls = `px-4 py-2 border rounded-full text-sm font-semibold transition-all ${
                                    link.active
                                        ? 'bg-[#A0522D] text-white border-transparent'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;
                                return link.url ? (
                                    <Link key={index} href={link.url} className={cls} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span key={index} className={cls} dangerouslySetInnerHTML={{ __html: link.label }} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

News.layout = page => <UnbLayout children={page} brand={page.props.brand} />;
