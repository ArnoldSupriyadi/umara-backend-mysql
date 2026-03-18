import React, { useEffect } from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { Head } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
    // Variabel Base URL Cloudflare R2 yang sudah kita setup
    const r2Url = "https://pub-1d5667a6f7d64367bcaa9f2aafd81844.r2.dev";

    // Inisialisasi animasi saat halaman pertama kali dimuat
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, // Animasi hanya berjalan sekali saat di-scroll
            offset: 50,
        });
    }, []);

    return (
        <FrontendLayout>
            <Head title="About Us - Umara Group" />

            {/* --- HERO SECTION --- */}
            <section 
                className="relative bg-gradient-to-br from-card-umara-group-brown-light/10 via-white to-card-umara-group-brown-dark/5 py-32 overflow-hidden" 
                style={{ 
                    backgroundImage: `url(${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg)`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center center' 
                }}
            >
                {/* Overlay gelap opsional jika teks putih kurang terbaca di atas background */}
                <div className="absolute inset-0 bg-black/40"></div> 

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mt-10">
                        <h1 
                            className="text-white text-5xl md:text-6xl font-bold mb-6 font-['Playfair_Display']" 
                            data-aos="fade-up"
                        >
                            About Umara Group
                        </h1>
                        <p 
                            className="text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8" 
                            data-aos="fade-up" 
                            data-aos-delay="200"
                        >
                            Building excellence through innovation, tradition, and unwavering commitment to quality since our inception.
                        </p>
                        <div 
                            className="w-24 h-1 bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark mx-auto rounded-full" 
                            data-aos="fade-up" 
                            data-aos-delay="400"
                        ></div>
                    </div>
                </div>
            </section>

            {/* --- COMPANY OVERVIEW --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div data-aos="fade-right">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#CE8131] mb-8 font-['Playfair_Display']">
                                Our Story
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="leading-relaxed mb-6">
                                    The Umara Group is a leading force in the food industry, known for delivering great taste and excellent customer experiences across many sectors. Over time, we've grown from a catering service into a full-scale food business. Today, we offer services including food production through our central kitchen and manufacturing facility, premium and industrial catering, FMCG, and restaurant chains.
                                </p>
                                <p className="leading-relaxed">
                                    We also provide facility services such as catering, housekeeping, and laundry for remote sites in industries like mining, oil, and gas. Our operations include food distribution and logistics to ensure smooth delivery. As part of this growing ecosystem, LBI (Layanan Boga Indonesia) and LNI (Logistik Niaga Indonesia) operate under the umbrella of the Umara Group.
                                </p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-delay="200">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl p-4 bg-gray-50 border border-gray-100">
                                {/* Memanggil gambar dari R2 */}
                                <img 
                                    src="https://pub-1d5667a6f7d64367bcaa9f2aafd81844.r2.dev/about-ug/structure-bu.png"
                                    alt="Umara Group Structure" 
                                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VISION & MISSION --- */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#CE8131] mb-6 font-['Playfair_Display']" data-aos="fade-up">
                            Vision & Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                            Our guiding principles that drive every decision and shape our future
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Vision Card */}
                        <div 
                            className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" 
                            data-aos="fade-up" 
                            data-aos-delay="300"
                        >
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-inner">
                                <img 
                                    src={`${r2Url}/about-ug/ICON-VISION-MISION-12.png`} 
                                    alt="Vision Icon" 
                                    className="w-16 h-16 object-contain" 
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-3xl font-bold mb-6 text-center font-['Playfair_Display'] text-white">Vision</h3>
                            <p className="text-lg text-white/90 leading-relaxed text-center font-light">
                                Our vision is to create an excellent food solution service with a global impact, elevating Indonesian cuisine to be one of the most favored and sought-after in the world.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div 
                            className="bg-gradient-to-r from-card-umara-group-brown-light to-card-umara-group-brown-dark rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" 
                            data-aos="fade-up" 
                            data-aos-delay="500"
                        >
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-inner">
                                <img 
                                    // src={`${r2Url}/about-ug/ICON-VISION-MISION-11.png`}
                                    src={`${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg`} 
                                    alt="Mission Icon" 
                                    className="w-16 h-16 object-contain" 
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-3xl font-bold mb-6 text-center font-['Playfair_Display'] text-white">Mission</h3>
                            <p className="text-lg text-white/90 leading-relaxed text-center font-light">
                                To inspiring the top of mind, the most aspiring and inspiring one stop food solution business by delivering happiness and satisfaction through excellent quality and delicious food.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ORGANIZATION STRUCTURE --- */}
            <section 
                className="py-24 bg-cover bg-center relative" 
                style={{ 
                    backgroundImage: `url(${r2Url}/background/UG-BACKGROUND-WEB-ABOUT.jpg)`,
                    backgroundAttachment: 'fixed' // Efek parallax ringan
                }}
            >
                {/* Overlay transparan agar teks terbaca jelas */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#CE8131] mb-6 font-['Playfair_Display']" data-aos="fade-up">
                            Organization Structure
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                            Our comprehensive organizational framework that drives success across all business units
                        </p>
                    </div>
                    
                    <div className="flex justify-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-100" data-aos="zoom-in" data-aos-delay="400">
                        <img 
                            src={`${r2Url}/images/Organization-Structure.png`} 
                            alt="Organization Structure Diagram" 
                            className="w-full max-w-5xl h-auto" 
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

        </FrontendLayout>
    );
}