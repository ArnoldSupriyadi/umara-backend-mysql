import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function News({ brand, posts }) {
    
    // Helper untuk base path URL UCR
    const basePath = `/${brand?.slug || 'umara-cipta-rasa'}`;

    // --- DUMMY DATA ---
    // Akan otomatis diganti jika ada data 'posts' dari database Laravel
    const displayPosts = posts && posts.length > 0 ? posts : [
        {
            id: 1,
            title: "Chosen for Excellence: Umara Catering Serves VVIPs at FIFA World Cup 2026 Event",
            excerpt: "The global spotlight turned to Jakarta on <strong>January 22, 2026</strong>, as the <strong>Jakarta Convention Center (JCC)</strong> hosted a prestigious official event for the <strong>FIFA World Cup 2026</strong>.",
            published_at: "22 January 2026",
            image: "/assets/news/fifa-world-cup-2026/fifa-world-cup1.jpg",
            slug: "fifa-world-cup"
        },
        {
            id: 2,
            title: "Fueling Innovation: Umara Catering Serves 1,000+ Guests at the Geely EX2 Grand Launch",
            excerpt: "<strong>Umara Catering</strong> was honored to be the official catering partner for the grand opening of the <strong>Geely EX2</strong>. Held at the prestigious <strong>Spike Air Dome, PIK 2</strong>, this high-energy event marked a significant milestone",
            published_at: "20 January 2026",
            image: "/assets/news/geely-ex2/geely1.jpg",
            slug: "geely-ex2-pik2"
        },
        {
            id: 3,
            title: "Blooming Love & Exquisite Tastes: Umara Catering at Wedding Market Fair 2026",
            excerpt: "This year, the exhibition carries the enchanting theme <strong>“Whispers in Bloom”</strong>. Inspired by the beauty of blossoming giant flowers, the venue has been transformed into a dreamy,",
            published_at: "16 January 2026",
            image: "/assets/news/wedding-market-fair-2026/wedding-market.jpg",
            slug: "wedding-market-fair-2026"
        },
        {
            id: 4,
            title: "Elevating Your Special Day: Umara Catering at Menara Danareksa Wedding Expo",
            excerpt: "Umara Catering made a grand appearance at the exclusive Wedding Expo held at Menara Danareksa, connecting with future brides and grooms offering them a taste of our Premium Catering Service.",
            published_at: "23 November 2025",
            image: "/assets/news/wedding-expo/wedding-expo.jpg",
            slug: "wedding-expo-danareksa"
        },
        {
            id: 5,
            title: "Umara Catering at Honda Culture Indonesia",
            excerpt: "Adding to the celebration, Umara Catering participated with a special booth serving delicious ready-to-enjoy meals and signature hospitality.",
            published_at: "15 November 2025",
            image: "/assets/news/honda-cibis/4.jpeg",
            slug: "umara-honda-cibis"
        },
        {
            id: 6,
            title: "IKASTARA IHFT 2025: Alumni Futsal Tournament & Reunion",
            excerpt: "IKASTARA once again brought the spirit of unity to life through the IHFT – Ikastara Happy Futsal Tournament 2025, an annual futsal competition...",
            published_at: "9 November 2025",
            image: "/assets/news/ikastara-futsal/IMG_1.jpg",
            slug: "ikastara-futsal-2025"
        },
        {
            id: 7,
            title: "Crafting Dream Weddings: Umara Catering Showcases Excellence at Wedding Market Fair 2025",
            excerpt: "For every couple, a wedding is not just a ceremony, it is a once-in-a-lifetime celebration of love. Understanding the importance of this day, Umara Catering proudly participated in the prestigious Wedding Market Fair.",
            published_at: "24 October 2025",
            image: "/assets/news/wedding-market-fair/wedding-market1.jpeg",
            slug: "wedding-market-fair-2025"
        },
        {
            id: 8,
            title: "Fueling Excellence: Umara Catering at the Gymnastics World Championships",
            excerpt: "In the world of elite sports, precision and performance are everything. Umara Mitra Kulina (Umara Group) is incredibly proud to have been chosen as the official catering partner for the prestigious Gymnastics World Championships",
            published_at: "19 October 2025",
            image: "/assets/news/gymnastic-olympics/IMG_1564.jpg",
            slug: "gymnastic-olympic"
        },
        {
            id: 9,
            title: "Harmonizing Flavors on the Global Stage: Umara Catering at the Music20 Summit",
            excerpt: "The Music20 (M20) Summit is more than just a gathering of global musicians and policymakers; it is a movement that drives social impact through the power of music",
            published_at: "30 October 2022",
            image: "/assets/ucr-goverment/DSC00160.jpg",
            slug: "music-summit-m20"
        }
    ];

    return (
        <div className="bg-[#FCFBF7] min-h-screen">
            <Head title={`News & Updates - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HEADER TITLE --- */}
                <section id="cta-action" className="pt-32 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="py-5 text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#0F1210]">
                            Stay Updated
                        </h1>
                        <p className="font-playfair mb-8 text-[#374151] max-w-2xl mx-auto text-lg md:text-xl">
                            Follow our journey and discover the latest stories from Umara Catering.
                        </p>
                    </div>
                </section>

                {/* --- NEWS GRID --- */}
                <section id="news" className="pb-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {displayPosts.map((post) => (
                                <article 
                                    key={post.id} 
                                    className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E1D5A6]/40 flex flex-col h-full overflow-hidden"
                                >
                                    {/* Card Image */}
                                    <div className="relative overflow-hidden h-64 border-b border-[#E1D5A6]/20">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        
                                        {/* Date */}
                                        <div className="text-[#6B6F65] text-xs font-semibold uppercase tracking-widest mb-4">
                                            {post.published_at}
                                        </div>
                                        
                                        {/* Title */}
                                        <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#0F1210] mb-4 group-hover:text-[#C5A859] transition-colors leading-snug">
                                            <Link href={`${basePath}/news/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        
                                        {/* Excerpt with HTML tags support */}
                                        <div 
                                            className="text-[#374151] mb-8 line-clamp-3 text-sm leading-relaxed font-light flex-grow prose-strong:text-[#0F1210] prose-strong:font-semibold"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                        />
                                        
                                        {/* Read More Button */}
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <Link 
                                                href={`${basePath}/news/${post.slug}`}
                                                className="inline-flex items-center text-[#C5A859] hover:text-[#0F1210] font-bold text-xs uppercase tracking-widest transition-colors group/link"
                                            >
                                                Read More
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
}

// Pasang Layout UCR
News.layout = page => <UcrLayout children={page} brand={page.props.brand} />;