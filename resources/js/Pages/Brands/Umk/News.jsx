import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UmkLayout from '@/Layouts/Brands/UmkLayout';

export default function News({ brand, posts }) {
    
    // Helper untuk base path URL UMK
    const basePath = `/${brand?.slug || 'umara-mitra-kulina'}`;

    // --- DUMMY DATA ---
    // Nantinya akan diganti otomatis jika props 'posts' dari database sudah tersedia
    const displayPosts = posts && posts.length > 0 ? posts : [
        {
            id: 1,
            title: "Fostering Togetherness: UMK Cikarang Hosts Ramadan Iftar for PT Bintang Toedjoe",
            excerpt: "The holy month of Ramadan is a time for reflection, gratitude, and strengthening bonds. Embracing this spirit of togetherness, <strong>Umara Mitra Kulina (UMK)</strong> had the distinct honor of hosting a special Iftar (Buka Bersama) event directly at our state-of-the-art <em>Satellite Kitchen in Cikarang</em>.",
            category: "Corporate Event",
            published_at: "March 5, 2026",
            image: "/assets/umara-mitra-kulina/news/pt-bintang-toedjoe/UMK-1.jpeg",
            slug: "news-bintang-toedjoe-ramadan"
        },
        {
            id: 2,
            title: "Fueling Sustainable Growth: Umara Mitra Kulina Partners with HRD Cikarang Community Seminar",
            excerpt: "As part of our commitment to supporting a professional and healthy industrial ecosystem, <strong>Umara Mitra Kulina</strong> proudly served as a strategic partner for the prestigious seminar <em>“Compliance to Sustainable Growth”</em>.",
            category: "Company Gathering",
            published_at: "January 24, 2026",
            image: "/assets/news/Komunitas-HRD-Cikarang/Komunitas HRD Cikarang1.jpeg",
            slug: "news-hrd-cikarang-community"
        },
        {
            id: 3,
            title: "Chemco Funday 2025: Celebrating Unity & Culture",
            excerpt: "Chemco Indonesia unites its Karawang and Cikarang families for a spectacular annual gathering. The event featured live music and a vibrant \"Busana Nusantara\" competition, strengthening bonds across the company.",
            category: "Company Gathering",
            published_at: "December 14, 2025",
            image: "/assets/umara-mitra-kulina/news/chemco-funday-2025.jpeg",
            slug: "news-chemco-funday"
        }
    ];

    return (
        <div className="bg-[#F9F7F2] min-h-screen">
            <Head title={`News & Updates - ${brand?.name || 'Umara Mitra Kulina'}`} />

            {/* --- HERO SECTION --- */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-4xl" data-aos="fade-up" data-aos-duration="1000">
                        <span className="text-palette1-c font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                            Our Latest Updates
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-palette1-a leading-tight mb-6">
                            Our News
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
                            Discover how Umara Mitra Kulina is redefining industrial catering through innovation, quality standards, and sustainable practices.
                        </p>
                    </div>
                </div>
            </header>

            {/* --- FEATURED NEWS LIST --- */}
            <section className="py-16 lg:py-24 -mt-16 relative z-20">
                <div className="container mx-auto px-4 lg:px-8">
                    
                    {displayPosts.map((post) => (
                        <div 
                            key={post.id} 
                            className="bg-white rounded-sm shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-500 group mb-10"
                            data-aos="fade-up"
                        >
                            <div className="grid lg:grid-cols-2 h-full">
                                
                                {/* Image Area */}
                                <div className="relative overflow-hidden h-64 lg:h-auto">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 absolute inset-0" 
                                    />
                                </div>
                                
                                {/* Content Area */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    
                                    {/* Meta Tags */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                                        <span className="text-palette1-c">{post.category}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{post.published_at}</span>
                                    </div>
                                    
                                    {/* Title */}
                                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-palette1-a mb-4 leading-tight group-hover:text-palette1-c transition-colors">
                                        <Link href={`${basePath}/news/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    
                                    {/* Excerpt (Merender tag HTML dari string) */}
                                    <div 
                                        className="text-gray-600 mb-8 leading-relaxed font-light line-clamp-4"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />
                                    
                                    {/* Read More Link */}
                                    <div className="mt-auto">
                                        <Link 
                                            href={`${basePath}/news/${post.slug}`}
                                            className="inline-flex items-center text-palette1-a font-bold uppercase text-sm tracking-wider hover:text-palette1-c transition-colors hover-underline-animation"
                                        >
                                            Read Full Story
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </div>
    );
}

// Layout Wrapper
News.layout = page => <UmkLayout children={page} brand={page.props.brand} />;