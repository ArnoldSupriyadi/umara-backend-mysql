import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LbiLayout from '@/Layouts/Brands/LbiLayout';

export default function NewsDetail({ brand, post }) {
    
    // Helper untuk routing
    const basePath = `/${brand?.slug || 'laukita-bersama-indonesia'}`;

    // --- DUMMY DATA ---
    // Nantinya akan diganti dengan data dari 'post' props database
    const article = post || {
        title: "Laukita Bersama Indonesia Expands Global Footprint with Ready-to-Cook Exports to Saudi Arabia",
        category: "International Trade",
        published_at: "December 31, 2025",
        breadcrumb: "Global Expansion",
        main_image: "/assets/laukkita-bersama/ekspor/eskpor-to-saudi.jpeg",
        caption: "PT Laukita Bersama Indonesia officially commences the shipment of premium ready-to-cook meals to the Middle East market.",
        tags: ["#SaudiArabiaExpansion", "#ReadyToCook", "#ExportQuality", "#HalalFood"],
        gallery: [
            {
                img: "eskpor-to-saudi.jpeg",
                title: "Export-Ready Packaging",
                desc: "Our products are packaged with advanced retort technology for international durability."
            },
            {
                img: "eskpor-to-saudi3.jpeg",
                title: "Global Distribution",
                desc: "Showcasing the range of products now available for the Middle East market."
            }
        ]
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            <Head title={`${article.title} - ${brand?.name || 'PT Laukita Bersama Indonesia'}`} />

            <main>
                <article className="pt-24 pb-20">
                    
                    {/* --- HEADER ARTIKEL --- */}
                    <div className="container mx-auto px-4 lg:px-8 mb-12 text-center max-w-5xl">
                        {/* Breadcrumb */}
                        <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
                            <Link href={`${basePath}/news`} className="hover:text-brand-accent transition-colors">News</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-brand-primary font-medium">{article.breadcrumb}</span>
                        </nav>
                        
                        {/* Meta Info */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="px-4 py-1 rounded-full border border-brand-gold/30 bg-brand-light/20 text-brand-primary text-xs font-bold tracking-widest uppercase">
                                {article.category}
                            </span>
                            <span className="text-gray-400 text-sm font-medium italic">
                                {article.published_at}
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-primary leading-tight mb-8">
                            {article.title}
                        </h1>
                    </div>

                    {/* --- MAIN IMAGE --- */}
                    <div className="container mx-auto px-4 lg:px-8 mb-16 md:mb-24">
                        <div className="relative w-full aspect-[21/9] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <img 
                                src={article.main_image} 
                                alt="Main Article Image"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                        <figcaption className="text-center mt-4 text-sm text-gray-500 font-inter italic">
                            {article.caption}
                        </figcaption>
                    </div>

                    {/* --- CONTENT AREA --- */}
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            
                            {/* Catatan: Saat dari database, ganti isi div di bawah ini dengan:
                                <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose..." />
                            */}
                            <div className="prose prose-lg md:prose-xl prose-headings:font-playfair prose-headings:text-brand-primary prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-strong:text-brand-primary prose-strong:font-semibold max-w-none">
                                
                                <p className="first-letter:text-7xl first-letter:font-playfair first-letter:font-bold first-letter:text-brand-accent first-letter:mr-3 first-letter:float-left">
                                    PT Laukita Bersama Indonesia (LBI) has marked a significant milestone in its journey of culinary innovation by officially expanding its business operations to the Kingdom of Saudi Arabia. This strategic move involves the export of high-quality "Ready-to-Cook" (RTC) meals, bringing authentic Indonesian flavors to a broader international audience.
                                </p>
                                
                                <p>
                                    The expansion targets the growing demand for convenient, high-quality halal food in the Middle East, catering not only to the Indonesian diaspora but also to the millions of Hajj and Umrah pilgrims who yearn for the taste of home. By utilizing advanced retort and frozen technologies, LBI ensures that every meal retains its nutritional value and authentic taste without the need for preservatives.
                                </p>
                                
                                <blockquote className="border-l-4 border-brand-accent pl-6 my-12 italic text-2xl font-playfair text-brand-primary bg-brand-light/10 py-4 pr-4 rounded-r-lg">
                                    "This expansion into Saudi Arabia is more than just business growth; it is about bridging cultures through food and providing a convenient, taste-of-home solution for pilgrims and residents alike."
                                </blockquote>
                                
                                <h3 className="text-2xl font-bold mt-8 mb-4">Bringing Culinary Excellence to the Holy Land</h3>
                                
                                <p>
                                    The ready-to-cook products exported include a variety of Indonesian staples, meticulously processed to meet the stringent Saudi Food and Drug Authority (SFDA) standards. This achievement underscores LBI's commitment to international food safety and halal compliance.
                                </p>
                                
                                <p>
                                    With this new channel, Laukita Bersama Indonesia aims to simplify meal preparation for catering services, hotels, and households in Saudi Arabia, proving that authentic Indonesian cuisine can be enjoyed anywhere in the world with ease and consistent quality.
                                </p>
                            </div>

                            {/* --- TAGS --- */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm font-medium text-gray-400 mr-2">Tags:</span>
                                    {article.tags.map((tag, index) => (
                                        <Link key={index} href="#" className="text-sm text-brand-accent hover:underline">
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- GALLERY SECTION --- */}
                    <div className="bg-white mt-24 py-20 border-t border-gray-100">
                        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                            
                            <div className="text-center mb-16">
                                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-3 block">
                                    Gallery
                                </span>
                                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-brand-primary">
                                    Export Highlights
                                </h3>
                                <div className="w-20 h-1 bg-brand-gold/30 mx-auto mt-6 rounded-full"></div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                                {article.gallery.map((item, index) => (
                                    <figure key={index} className="group cursor-pointer">
                                        <div className="overflow-hidden rounded-xl shadow-lg mb-4 relative aspect-[4/3]">
                                            <img 
                                                src={`/assets/laukkita-bersama/ekspor/${item.img}`} 
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>
                                        <figcaption className="text-center">
                                            <h4 className="font-playfair text-xl font-bold text-brand-primary mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 font-light">
                                                {item.desc}
                                            </p>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* --- BACK BUTTON --- */}
                    <div className="container mx-auto px-4 lg:px-8 mt-16 text-center">
                        <Link 
                            href={`${basePath}/news`}
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

// Pasang Layout LBI
NewsDetail.layout = page => <LbiLayout children={page} brand={page.props.brand} />;