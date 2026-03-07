import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import RnbLayout from '@/Layouts/Brands/RnbLayout';

// Import AOS untuk animasi
import AOS from 'aos';
import 'aos/dist/aos.css';

const News = ({ brand, posts }) => {
    
    // Inisialisasi AOS saat komponen di-mount
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    // Helper untuk base path URL RNB
    const basePath = `/${brand?.slug || 'rasa-nusantara-baru'}`;

    // --- DUMMY DATA ---
    // Akan otomatis diganti jika props 'posts' dari database tersedia
    const displayPosts = posts && posts.length > 0 ? posts : [
        {
            id: 1,
            title: "Rasa Umara x Wardah: Jelajahi Bazar Fashion & Beauty Experience",
            excerpt: "Rasa Umara collaborates with Wardah Beauty to present a special event titled “Explore the Rasa Umara Fashion Bazaar”—a celebration of fashion, beauty, and culinary excellence.",
            published_at: "26 Juni 2025",
            image: "/assets/news/wardah/1.png",
            slug: "rasa-umara-x-wardah-bazar"
        },
        {
            id: 2,
            title: "Lumpang Emas Bintaro Hosts the Vibrant 8th Anniversary Celebration of HayoMoto",
            excerpt: "Lumpang Emas Bintaro is honored to be part of the vibrant celebration of HayoMoto’s 8th Anniversary.",
            published_at: "8 November 2025",
            image: "/assets/news/hayomoto/1.jpeg",
            slug: "hayomoto-8th-anniversary"
        },
        {
            id: 3,
            title: "A Magical Christmas: Santa Surprises Guests at Umara House & Lumpang Emas",
            excerpt: "Christmas is a season of giving, sharing, and creating beautiful memories with loved ones. To celebrate this joyous occasion, Umara brought a special touch of magic to its beloved dining establishments.",
            published_at: "25 Desember 2025",
            image: "/assets/news/santa-umara/IMG_7935.jpg",
            slug: "santa-surprises-guests"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen pt-24 pb-12">
            <Head title={`News & Updates - ${brand?.name || 'Rasa Nusantara Baru'}`} />

            <main>
                <section className="py-20 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* --- HEADER SECTION --- */}
                        <div className="text-center mb-16" data-aos="fade-up">
                            {/* Menggunakan bg-buttom-RNB untuk aksen teks agar senada dengan Index */}
                            <h2 
                                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-cover" 
                                style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}
                            >
                                Latest News
                            </h2>
                            <p className="text-xl text-gray-600">
                                Updates and stories from Rasa Nusantara Baru
                            </p>
                            <div className="w-24 h-1 mt-6 mx-auto rounded-full bg-cover" style={{ backgroundImage: "url('/assets/rnb/bg-buttom-RNB.jpg')" }}></div>
                        </div>

                        {/* --- NEWS GRID --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayPosts.map((post, index) => (
                                <article 
                                    key={post.id} 
                                    className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full rounded-xl border border-gray-200/60"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150} // Animasi bertahap
                                >
                                    {/* Thumbnail */}
                                    <div className="relative overflow-hidden h-64">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        
                                        <div className="text-amber-700 font-medium text-sm mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            {post.published_at}
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors leading-snug">
                                            <Link href={`${basePath}/news/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        
                                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>
                                        
                                        {/* Read More Link */}
                                        <div className="mt-auto pt-6 border-t border-gray-100">
                                            <Link 
                                                href={`${basePath}/news/${post.slug}`} 
                                                className="inline-flex items-center text-amber-600 hover:text-amber-800 font-bold uppercase tracking-wide text-sm transition-colors group/link"
                                            >
                                                Read Story
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
};

// Pasang Layout RNB
News.layout = page => <RnbLayout children={page} brand={page.props.brand} />;

export default News;