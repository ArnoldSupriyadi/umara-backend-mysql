import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import LbiLayout from '@/Layouts/Brands/LbiLayout';

// Import Swiper untuk Carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = ({ brand }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    // --- STATE MANAGEMENT ---
    const [activeYear, setActiveYear] = useState('2018');
    const [activeQmsTab, setActiveQmsTab] = useState('food-safety');
    const [modalData, setModalData] = useState({ isOpen: false, src: '', caption: '' });

    // Helper untuk buka/tutup modal sertifikat
    const openModal = (src, caption) => setModalData({ isOpen: true, src, caption });
    const closeModal = () => setModalData({ isOpen: false, src: '', caption: '' });

    // --- SETUP FORM INERTIA (Dengan Sihir JSON) ---
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        business_unit_id: brand?.id,
        name: '',             // Menggunakan 'Contact Person'
        email: '',
        message: '',
        subject: 'LBI Manufacturing Inquiry', 
        company_name: '',     // Masuk ke JSON
        phone_number: '',     // Masuk ke JSON
        service_interest: '', // Masuk ke JSON
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route('contact-messages.store'), {
            onSuccess: () => reset('name', 'email', 'message', 'company_name', 'phone_number', 'service_interest'),
        });
    };

    // Data Gambar OEM Carousel
    const oemImages = [
        { src: 'QC-&-RnD-1.jpg', caption: 'QC & RnD' },
        { src: 'Control-2.jpg', caption: 'Control Area' },
        { src: 'Area-Lab.jpg', caption: 'Lab Area' },
        { src: 'Area Sealing 2.jpg', caption: 'Sealing Area' },
        { src: 'Loading.jpg', caption: 'Loading Area' },
        { src: 'Production-room.jpg', caption: 'Production Room' }
    ];

    // Data Gambar Ekspor
    const exportImages = [
        'eskpor-to-saudi.jpeg', 'eskpor-to-saudi2.jpeg', 'eskpor-to-saudi3.jpeg',
        'eskpor-to-saudi4.jpeg', 'eskpor-to-saudi5.jpeg', 'eskpor-to-saudi6.jpeg', 'DSCF0739.jpg'
    ];

    // Data Logo Klien (Diperpendek untuk kerapian file, Anda bisa tambah sisanya)
    const clientLogos = [
        'accha.jpeg', 'Amman.png', 'artotel.png', 'bpkh-limited.png', 'cj-CheilJedang_logo.png',
        'dapur-solo.png', 'fore-coffee.jpg', 'HANGRY!.jpg', 'imip.png', 'Ranch-Market.png', 'the-harvest.jpeg', 'bibigo.png'
    ];

    return (
        <>
            <Head title={`Manufacturing Excellence - ${brand?.name || 'PT LBI'}`} />

            {/* --- MODAL SERTIFIKAT --- */}
            {modalData.isOpen && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
                    <div className="relative max-w-5xl w-full mx-auto" onClick={e => e.stopPropagation()}>
                        <img src={modalData.src} alt={modalData.caption} className="w-full h-[80vh] md:h-[85vh] object-contain bg-white rounded-xl shadow-2xl" />
                        <button onClick={closeModal} className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow transition">
                            ✕
                        </button>
                        <div className="mt-3 text-center text-white/90 text-sm font-semibold">{modalData.caption}</div>
                    </div>
                </div>
            )}

            {/* --- 1. HERO SECTION --- */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
                <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                        <div className="w-full pr-0 lg:pr-8" data-aos="fade-right">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#330F11]">
                                Frozen & Retort Food
                            </h1>
                            <p className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-700">
                                As a leading toll manufacturing and white label partner since 2018, LBI delivers cutting-edge frozen and retort food solutions — combining quality, safety, and innovation for the future of culinary manufacturing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#services" className="inline-block bg-gradient-to-r from-[#8B1C3D] to-[#3D0F14] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-center">
                                    Explore Now
                                </a>
                            </div>
                        </div>
                        <div className="w-full pl-0 lg:pl-8" data-aos="fade-left">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img src="/assets/laukkita-bersama/LBI_Manufacture.jpg" alt="Manufacturing Facility" className="w-full h-[400px] lg:h-[600px] object-cover object-center hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. ABOUT & CERTS --- */}
            <section id="about" className="py-10">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                <strong>PT Laukita Bersama Indonesia</strong>, founded in 2018, provides comprehensive toll manufacturing and white label services designed to enhance manufacturing processes and accelerate business growth.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Our services encompass the entire production lifecycle, utilizing state-of-the-art facilities and cutting-edge technology from conception to completion.
                            </p>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                                {['HALAL', 'BPOM', 'HACCP', 'ISO 14001', 'ISO 22000'].map((cert, i) => (
                                    <div key={i} className="text-center" data-aos="flip-up" data-aos-delay={i * 100}>
                                        <div className="bg-gradient-to-r from-[#8B1C3D] to-[#3D0F14] p-3 rounded-lg mb-2 shadow-md hover:scale-105 transition-transform">
                                            <span className="text-white font-semibold text-xs lg:text-sm whitespace-nowrap">{cert}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group" data-aos="fade-left">
                            <img src="/assets/laukkita-bersama/Thumbnail-Video-LBI.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Video Preview" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. MILESTONE SECTION --- */}
            <section className="py-20" style={{ backgroundImage: "url('/assets/laukkita-bersama/BG-LBI-1.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="bg-[#F7F3EF] p-8 lg:p-12 rounded-2xl shadow-lg border border-[#debe9d]">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            
                            <div data-aos="fade-right">
                                <h3 className="text-3xl font-bold text-[#8B1C3D] mb-8">Our Milestone</h3>
                                
                                {/* Tab Buttons */}
                                <div className="flex flex-wrap gap-2 mb-8 p-2 bg-white rounded-2xl overflow-x-auto shadow-sm">
                                    {['2018', '2019', '2023', '2024', '2025'].map(year => (
                                        <button 
                                            key={year}
                                            onClick={() => setActiveYear(year)}
                                            className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${activeYear === year ? 'bg-[#8B1C3D] text-white shadow-lg' : 'bg-transparent text-gray-600 hover:bg-[#8B1C3D]/10 hover:text-[#8B1C3D]'}`}
                                        >
                                            {year}
                                            {year === '2025' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-sm"></span>}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content Area */}
                                <div className="min-h-[250px] relative">
                                    <div className={`transition-all duration-500 ${activeYear === '2018' ? 'block animate-fade-in' : 'hidden'}`}>
                                        <div className="bg-white p-6 rounded-2xl border border-[#debe9d] shadow-sm">
                                            <h4 className="text-xl font-bold text-[#8B1C3D] mb-1">BPOM Certificate</h4>
                                            <p className="text-gray-500 text-sm mb-3">Food & Drug Administration</p>
                                            <p className="text-gray-700">Official certification ensuring our products meet Indonesian food safety standards and regulations.</p>
                                        </div>
                                    </div>
                                    <div className={`transition-all duration-500 ${activeYear === '2019' ? 'block animate-fade-in' : 'hidden'}`}>
                                        <div className="bg-white p-6 rounded-2xl border border-[#debe9d] shadow-sm">
                                            <h4 className="text-xl font-bold text-[#8B1C3D] mb-1">Halal Certificate</h4>
                                            <p className="text-gray-500 text-sm mb-3">Islamic Food Standards</p>
                                            <p className="text-gray-700">Certified halal products meeting Islamic dietary requirements, expanding our market reach.</p>
                                        </div>
                                    </div>
                                    <div className={`transition-all duration-500 ${activeYear === '2023' ? 'block animate-fade-in' : 'hidden'}`}>
                                        <div className="bg-white p-6 rounded-2xl border border-[#debe9d] shadow-sm mb-4">
                                            <h4 className="text-xl font-bold text-[#8B1C3D] mb-3">ISO Certifications</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#8B1C3D] rounded-full"></div> ISO 45000 - Occupational Health</li>
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#8B1C3D] rounded-full"></div> ISO 14000 - Environmental</li>
                                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#8B1C3D] rounded-full"></div> ISO 22000 - Food Safety</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Anda dapat menambahkan tab 2024 dan 2025 dengan pola yang sama */}
                                </div>
                            </div>

                            <div className="text-center" data-aos="fade-left">
                                <div className="bg-white p-8 rounded-2xl border border-[#debe9d] shadow-sm">
                                    <h4 className="text-2xl font-bold text-[#8B1C3D] mb-6">Integrated Food Solutions</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <img src="/assets/laukkita-bersama/1.jpg" alt="Manufacturing" className="w-full rounded-xl shadow-md hover:scale-105 transition-transform" />
                                        <img src="/assets/laukkita-bersama/2.jpg" alt="Distribution" className="w-full rounded-xl shadow-md hover:scale-105 transition-transform" />
                                    </div>
                                    <p className="text-[#8B1C3D] text-sm md:text-base">From manufacturing to retail, catering to distribution - we provide comprehensive food industry solutions under one unified group.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. PRODUCTS & OEM CAROUSEL --- */}
            <section id="services" className="py-20" style={{ backgroundImage: "url('/assets/laukkita-bersama/BG-LBI-2.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="inline-block bg-[#8B1C3D] text-white px-8 py-2 rounded-full text-sm font-semibold tracking-wider mb-4">PRODUCTS & SERVICES</div>
                        <h2 className="text-4xl font-bold text-white">Our Manufacturing Solutions</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        <div data-aos="fade-right">
                            <h3 className="text-3xl font-bold text-white mb-2">OEM Manufacturing Service</h3>
                            <h4 className="text-xl font-semibold text-[#debe9d] mb-6">For F&B Customers</h4>
                            <p className="text-white/90 leading-relaxed mb-8">
                                LBI provides comprehensive B2B frozen and retort packaged Work-In-Progress & ready-to-eat finished goods for F&B customers including hotels, restaurants, and cafes. We handle large quantity long-term contract OEM orders from major clients including CJ Food Korea.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20 hover:bg-white/20 transition-colors">
                                    <div className="text-white font-semibold">Frozen Products</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center border border-white/20 hover:bg-white/20 transition-colors">
                                    <div className="text-white font-semibold">Retort Packaging</div>
                                </div>
                            </div>
                        </div>

                        {/* OEM Swiper Carousel */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10" data-aos="fade-left">
                            <Swiper
                                modules={[Autoplay, EffectFade, Pagination]}
                                effect="fade"
                                spaceBetween={0} slidesPerView={1} loop={true}
                                autoplay={{ delay: 3500 }}
                                pagination={{ clickable: true }}
                                className="w-full h-80 md:h-96 lg:h-[28rem]"
                            >
                                {oemImages.map((img, idx) => (
                                    <SwiperSlide key={idx} className="relative">
                                        <img src={`/assets/laukkita-bersama/pabrik/${img.src}`} alt={img.caption} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                                            {img.caption}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. QUALITY MANAGEMENT (QMS TABS) --- */}
            <section id="quality" className="py-20" style={{ backgroundImage: "url('/assets/laukkita-bersama/BG-LBI-3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-white mb-2">QUALITY MANAGEMENT</h2>
                        <p className="text-xl text-white/90">LBI QMS (Quality Management System)</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto" data-aos="fade-up">
                        <div className="border-b border-gray-200 bg-gray-50 flex overflow-x-auto custom-scrollbar">
                            {[
                                { id: 'food-safety', label: 'Food Safety & HACCP' },
                                { id: 'internal-audit', label: 'Internal Audit' },
                                { id: 'supplier-control', label: 'Supplier Control' },
                                { id: 'certification', label: 'Certification' }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveQmsTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeQmsTab === tab.id ? 'border-[#8B1C3D] text-[#8B1C3D] bg-white' : 'border-transparent text-gray-500 hover:text-[#8B1C3D] hover:bg-gray-100'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {/* Konten Food Safety */}
                            {activeQmsTab === 'food-safety' && (
                                <div className="grid lg:grid-cols-2 gap-8 items-center animate-fade-in">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#8B1C3D] mb-6">Food Safety & HACCP System</h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-[#8B1C3D] rounded-full mt-2"></div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">CCP Monitoring & Logs</h4>
                                                    <p className="text-gray-600 text-sm">Cooking, chilling, metal detection, traceability</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <img src="/assets/laukkita-bersama/pabrik/QC-&-RnD-2.jpg" alt="QC" className="rounded-xl shadow-md" />
                                    </div>
                                </div>
                            )}

                            {/* Konten Certification dengan Gallery */}
                            {activeQmsTab === 'certification' && (
                                <div className="animate-fade-in">
                                    <h3 className="text-2xl font-bold text-[#8B1C3D] mb-6">Certification & Compliance</h3>
                                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                                        {[
                                            { src: 'HACCP-794604.jpg', label: 'HACCP' },
                                            { src: 'Halal-Status-LBI-KAN.jpg', label: 'Halal KAN' },
                                            { src: 'ISO-22000-2018.jpg', label: 'ISO 22000' }
                                        ].map((cert, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => openModal(`/assets/laukkita-bersama/certified/${cert.src}`, cert.label)}
                                                className="cursor-pointer group flex-none w-64 h-48 rounded-xl overflow-hidden border border-[#debe9d] shadow-sm snap-center"
                                            >
                                                <img src={`/assets/laukkita-bersama/certified/${cert.src}`} alt={cert.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Anda dapat melengkapi tab lainnya di sini sesuai struktur data */}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 6. EXPORT HIGHLIGHTS --- */}
            <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-10" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-[#8B1C3D] mb-2">Export Operations</h2>
                        <p className="text-gray-600">Ceremonial Haji Kargo 2025 to Jeddah</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {exportImages.slice(0, 4).map((img, i) => (
                            <div key={i} onClick={() => openModal(`/assets/laukkita-bersama/ekspor/${img}`, 'Export Shipment')} className="cursor-pointer overflow-hidden rounded-xl shadow-sm border border-gray-200 group">
                                <img src={`/assets/laukkita-bersama/ekspor/${img}`} alt="Export" className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 7. OUR CUSTOMERS --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">OUR CUSTOMERS</h2>
                        <p className="text-gray-500">Trusted partners across various industries</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                        {clientLogos.map((logo, i) => (
                            <img key={i} src={`/assets/laukkita-bersama/lbi-clients/${logo}`} alt="Client Logo" className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100" />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 8. CONTACT FORM (Dengan JSON Integration) --- */}
            <section id="contact" className="py-20 bg-[#8B1C3D]">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-white" data-aos="fade-right">
                            <h2 className="text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
                            <p className="text-white/80 mb-10 text-lg">Let's discuss how our food manufacturing and white label services can help scale your business globally.</p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <span className="text-lg">info@laukita.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <span className="text-lg">0852-1777-7177</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-2xl" data-aos="fade-left">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get a Quote</h3>
                            
                            {recentlySuccessful && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium">
                                    Your inquiry has been sent successfully. Our team will contact you shortly!
                                </div>
                            )}

                            <form onSubmit={submitContact} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input type="text" value={data.company_name} onChange={e => setData('company_name', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all" placeholder="Your Company Name" required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all" placeholder="Your Name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="tel" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all" placeholder="+62 812-..." required />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all" placeholder="email@company.com" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                                        <select value={data.service_interest} onChange={e => setData('service_interest', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all bg-white" required>
                                            <option value="">Select Service Type</option>
                                            <option value="OEM Manufacturing">OEM Manufacturing</option>
                                            <option value="White Label Manufacturing">White Label Manufacturing</option>
                                            <option value="WIP Manufacturing">WIP Manufacturing</option>
                                            <option value="Custom Solution">Custom Solution</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea rows="4" value={data.message} onChange={e => setData('message', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1C3D] outline-none transition-all resize-none" placeholder="Tell us about your manufacturing needs..." required></textarea>
                                </div>
                                <button type="submit" disabled={processing} className="w-full bg-[#8B1C3D] text-white py-4 rounded-xl font-bold hover:bg-[#6A152E] transition-colors shadow-lg disabled:opacity-70">
                                    {processing ? 'Sending Inquiry...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Pasang Layout LBI
Index.layout = page => <LbiLayout children={page} brand={page.props.brand} />;

export default Index;