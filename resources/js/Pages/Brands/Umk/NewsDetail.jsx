import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UmkLayout from '@/Layouts/Brands/UmkLayout';

export default function NewsDetail({ brand, post }) {
    
    // Helper untuk routing
    const basePath = `/${brand?.slug || 'umara-mitra-kulina'}`;

    // --- DUMMY DATA ---
    // Nantinya akan diganti dengan data dari 'post' props database
    const article = post || {
        title: "Fostering Togetherness: UMK Cikarang Hosts Ramadan Iftar for PT Bintang Toedjoe",
        published_at: "March 5, 2026",
        main_image: "/assets/umara-mitra-kulina/news/pt-bintang-toedjoe/UMK-1.jpeg",
        main_image_caption: "A warm and joyful breaking of the fast (Buka Bersama) atmosphere.",
        // Data gallery/dokumentasi di dalam artikel
        inner_images: [
            {
                src: "/assets/umara-mitra-kulina/news/pt-bintang-toedjoe/UMK-2.jpeg",
                caption: "Fresh and nutritious meals prepared at our Cikarang Satellite Kitchen"
            },
            {
                src: "/assets/umara-mitra-kulina/news/pt-bintang-toedjoe/UMK-1.jpeg",
                caption: "PT Bintang Toedjoe staff enjoying the Buka Bersama moments"
            }
        ]
    };

    return (
        <div className="bg-[#F9F7F2] min-h-screen pt-32 pb-20">
            <Head title={`${article.title} - ${brand?.name || 'Umara Mitra Kulina'}`} />

            <article>
                
                {/* --- HEADER ARTIKEL --- */}
                <div className="container mx-auto px-4 lg:px-8 mb-12">
                    <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
                        
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6 font-medium uppercase tracking-wide">
                            <Link href="/" className="hover:text-palette1-a transition-colors">Home</Link>
                            <span className="text-gray-300">/</span>
                            <Link href={`${basePath}/news`} className="hover:text-palette1-a transition-colors">News</Link>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-palette1-a mb-8 leading-tight">
                            {article.title}
                        </h1>
                        
                        {/* Date Meta */}
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 border-t border-b border-gray-200 py-4 max-w-lg mx-auto">
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-palette1-c" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {article.published_at}
                            </span>
                        </div>
                        
                    </div>
                </div>

                {/* --- GAMBAR UTAMA --- */}
                <div className="container mx-auto px-4 lg:px-8 mb-16" data-aos="fade-up" data-aos-delay="100">
                    <div className="max-w-5xl mx-auto rounded-sm overflow-hidden shadow-2xl relative">
                        <img 
                            src={article.main_image} 
                            alt="Main Article Image"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
                            <p className="text-white/90 text-sm font-light italic text-right">
                                {article.main_image_caption}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- KONTEN ARTIKEL --- */}
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        
                        {/* Paragraf Pembuka dengan Drop Cap */}
                        <p className="text-xl md:text-2xl text-gray-600 font-playfair leading-relaxed mb-10 first-letter:text-7xl first-letter:font-bold first-letter:text-palette1-a first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]" data-aos="fade-up">
                            The holy month of Ramadan is a time for reflection, gratitude, and strengthening bonds. Embracing this spirit of togetherness, <strong>Umara Mitra Kulina (UMK)</strong> had the distinct honor of hosting a special Iftar (Buka Bersama) event for the dedicated staff of <strong>PT Bintang Toedjoe</strong>.
                        </p>
                        
                        <div className="prose prose-lg prose-stone max-w-none text-gray-600 mb-12" data-aos="fade-up">
                            <p className="mb-6 font-light leading-relaxed">
                                What made this event truly special was its location. The gathering was hosted directly at our state-of-the-art <strong>UMK Satellite Kitchen in Cikarang</strong>. Operating a satellite kitchen allows us to bridge the gap between production and serving, ensuring that every meal is served fresh, piping hot, and at peak quality precisely when the call to Maghrib prayer echoes.
                            </p>
                        </div>

                        {/* Foto Dokumentasi di Dalam Artikel */}
                        {article.inner_images && article.inner_images.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-6 my-12" data-aos="fade-up">
                                {article.inner_images.map((img, idx) => (
                                    <figure key={idx}>
                                        <img 
                                            src={img.src} 
                                            alt={`Documentation ${idx + 1}`}
                                            className="w-full h-64 object-cover rounded-sm mb-3 shadow-md"
                                        />
                                        <figcaption className="text-xs text-gray-500 italic text-center px-4">
                                            {img.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}

                        <div className="prose prose-lg prose-stone max-w-none text-gray-600 mb-12" data-aos="fade-up">
                            <h3 className="text-2xl font-playfair font-bold text-palette1-a mt-10 mb-4">
                                A Curated Ramadan Culinary Experience
                            </h3>
                            <p className="mb-6 font-light leading-relaxed">
                                For this auspicious occasion, our culinary experts curated a menu designed to perfectly break the fast. The feast began with a selection of refreshing takjil to restore energy, followed by a hearty spread of authentic Indonesian comfort foods. Every dish was prepared with strict adherence to hygiene standards and tailored to replenish the nutritional needs of the hardworking PT Bintang Toedjoe team.
                            </p>
                            <p className="mb-6 font-light leading-relaxed">
                                Serving PT Bintang Toedjoe during this blessed month is a testament to UMK's commitment to being more than just a catering provider. We strive to be a reliable partner in creating meaningful corporate moments. We extend our deepest gratitude to PT Bintang Toedjoe for their trust, and we wish everyone a blessed and peaceful Ramadan.
                            </p>
                        </div>

                        {/* --- FOOTER ARTIKEL (Share & Back) --- */}
                        <div className="border-t border-b border-gray-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            
                            <Link 
                                href={`${basePath}/news`}
                                className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-palette1-a hover:text-palette1-c transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to News
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Share:</span>
                                {/* Tombol Share X/Twitter (Path sudah diperbaiki) */}
                                <a 
                                    href="#" 
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-palette1-a hover:text-white transition-colors"
                                    aria-label="Share on X (Twitter)"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>  
                            </div>
                        </div>

                    </div>
                </div>

            </article>
        </div>
    );
}

// Layout Wrapper
NewsDetail.layout = page => <UmkLayout children={page} brand={page.props.brand} />;