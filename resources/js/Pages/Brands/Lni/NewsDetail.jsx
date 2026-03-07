import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LniLayout from '@/Layouts/Brands/LniLayout';

const NewsDetail = ({ brand, post }) => {

    // Helper untuk base path URL LNI
    const basePath = `/${brand?.slug || 'lauk-kita-niaga'}`;

    // --- FALLBACK DATA ---
    // Jika props 'post' dari database belum ada, pakai data dummy dari desain Anda
    const article = post || {
        title: "Laukita Brings Authentic Flavor to Kiddies Day Out at AEON Mall Tanjung Barat",
        published_at: "28 October 2025",
        main_image: "/assets/news/kiddies-day-out/laukita-aeon.png",
        // Konten dinamis biasanya akan dirender menggunakan dangerouslySetInnerHTML
        // Tapi untuk contoh ini, kita render struktur HTML Anda di bawah.
    };

    return (
        <>
            <Head title={`${article.title} - ${brand?.name || 'PT Lauk Kita Niaga'}`} />

            <main className="bg-[#FCF0CE] min-h-screen">
                <section id="news-detail" className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* --- HEADER ARTIKEL --- */}
                        <div className="max-w-3xl mx-auto text-center">
                            <Link 
                                href={`${basePath}/news`}
                                className="inline-flex items-center text-amber-900 hover:text-amber-700 font-semibold transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to News
                            </Link>
                            
                            <h1 className="mt-4 text-3xl md:text-5xl font-['Playfair_Display'] font-bold leading-tight text-amber-950">
                                {article.title}
                            </h1>
                            
                            <div className="mt-4 inline-flex items-center gap-2">
                                <span className="text-sm font-medium text-amber-800 tracking-wide uppercase">
                                    {article.published_at}
                                </span>
                            </div>
                        </div>

                        {/* --- GAMBAR UTAMA --- */}
                        <div className="mt-10 max-w-5xl mx-auto" data-aos="fade-up">
                            <img 
                                src={article.main_image} 
                                alt={article.title}
                                className="w-full h-[240px] md:h-[480px] object-cover rounded-2xl shadow-xl"
                            />
                        </div>

                        {/* --- ISI ARTIKEL --- */}
                        <div className="mt-12 grid grid-cols-1 gap-8 max-w-5xl mx-auto justify-items-center">
                            <article className="w-full md:max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-amber-100/50">
                                
                                {/* Catatan Developer: 
                                  Jika isi artikel ('content') berasal dari database berupa string HTML, 
                                  Anda bisa menggunakan kode ini:
                                  <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-amber max-w-none" />
                                  
                                  Untuk sementara, kita gunakan struktur *hardcode* sesuai desain Anda:
                                */}
                                
                                <div className="space-y-6 text-gray-700 text-lg">
                                    <p className="leading-relaxed">
                                        From <strong>October 22 to 26</strong>, Laukita proudly participated in the vibrant <strong>"Kiddies Day Out"</strong> event held at AEON Mall Tanjung Barat. It was an exciting opportunity for us to connect directly with families and introduce our premium frozen food solutions designed for modern lifestyles.
                                    </p>
                                    
                                    <p className="leading-relaxed">
                                        Our main goal was to showcase that serving a nutritious and delicious meal doesn't have to be complicated. We introduced visitors to our <strong>"Ready to Eat"</strong> concept—authentic Indonesian dishes that are frozen to lock in freshness and can be served simply by heating them up. It is the perfect solution for busy parents who want to provide the best for their children without the hassle of cooking from scratch.
                                    </p>

                                    <figure className="rounded-xl overflow-hidden my-10">
                                        <img 
                                            src="/assets/news/kiddies-day-out/laukita-aeon2.png" 
                                            alt="Laukita Signature Product" 
                                            className="w-full h-[220px] md:h-[400px] object-cover rounded-xl"
                                        />
                                        <figcaption className="text-sm text-center text-amber-800 mt-3 font-medium italic">
                                            One of our favorite menus introduced to families at the event.
                                        </figcaption>
                                    </figure>

                                    <h2 className="text-2xl md:text-3xl font-bold text-amber-950 mt-10 mb-4 font-['Playfair_Display']">
                                        Authentic Taste, Zero Hassle
                                    </h2>
                                    
                                    <p className="leading-relaxed">
                                        During the exhibition, we engaged with customers through product branding and direct sales. The positive response proved that Laukita is more than just frozen food; it is a culinary partner for every household. We are committed to continuing our innovation in providing practical, hygienic, and tasty food options for everyone.
                                    </p>
                                </div>

                                {/* --- FOOTER ARTIKEL (Back Button Bawah) --- */}
                                <div className="mt-12 pt-8 border-t border-gray-100">
                                    <Link 
                                        href={`${basePath}/news`}
                                        className="inline-flex items-center text-amber-900 hover:text-amber-700 font-semibold transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to News List
                                    </Link>
                                </div>

                            </article>
                        </div>

                    </div>
                </section>
            </main>
        </>
    );
};

// Pasang Layout LNI
NewsDetail.layout = page => <LniLayout children={page} brand={page.props.brand} />;

export default NewsDetail;