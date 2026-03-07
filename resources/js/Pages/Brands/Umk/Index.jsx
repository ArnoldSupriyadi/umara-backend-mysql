import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import UmkLayout from '@/Layouts/Brands/UmkLayout';

// Import Swiper untuk Carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = ({ brand }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }, []);

    // --- SETUP FORM INERTIA (Dengan Sihir JSON) ---
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        business_unit_id: brand?.id,
        name: '',
        email: '',
        message: '',
        subject: 'UMK Website Inquiry', // Default subject karena di form UI tidak ada
        // 👇 Field Dinamis (Akan otomatis masuk ke JSON)
        phone_number: '', 
        service_type: '', 
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route('contact-messages.store'), {
            onSuccess: () => reset('name', 'email', 'message', 'phone_number', 'service_type'),
        });
    };

    // Data Gambar Carousel Services
    const serviceImages = [
        "/assets/umara-mitra-kulina/1.jpg",
        "/assets/umara-mitra-kulina/2.jpg",
        "/assets/umara-mitra-kulina/UMK9.jpg",
        "/assets/umara-mitra-kulina/4.jpg",
        "/assets/umara-mitra-kulina/5.jpg",
        "/assets/umara-mitra-kulina/kantin.png"
    ];

    return (
        <>
            <Head title={`Catering Solutions - ${brand?.name || 'Umara Mitra Kulina'}`} />

            {/* --- 1. HERO SECTION --- */}
            <section id="home" className="py-32 relative overflow-hidden" style={{ backgroundImage: "url('/assets/umara-mitra-kulina/BG-WEB-UMK-PAGE.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay tambahan agar teks mudah dibaca */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="lg:col-span-1" data-aos="fade-up">
                            <h1 className="text-5xl font-bold mb-6 leading-tight text-white">Professional Catering Solutions for Every Industry</h1>
                            <p className="text-xl mb-6 leading-relaxed text-white/90">
                                Delivering exceptional food services across industries with uncompromising quality and reliability. From manufacturing facilities to healthcare institutions, we provide nutritious, delicious meals that fuel productivity and satisfaction.
                            </p>
                            
                            <div className="mb-8 space-y-3">
                                {[
                                    "ISO 22000 Certified Kitchen Facilities",
                                    "24/7 Service Availability",
                                    "Customized Menu Solutions",
                                    "Experienced in Remote Location Catering"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                            <img src="/assets/umara-mitra-kulina/Ceklis-UMK.png" alt="Check" className="w-8 h-auto" />
                                        </div>
                                        <span className="text-white font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-[#B8946B] to-[#E8DDC9] p-4 rounded-xl">
                                    <div className="text-[#67281F] text-2xl font-bold">9,000+</div>
                                    <div className="text-[#67281F] text-sm">Meals Daily</div>
                                </div>
                                <div className="bg-gradient-to-r from-[#B8946B] to-[#E8DDC9] p-4 rounded-xl">
                                    <div className="text-[#67281F] text-2xl font-bold">3+</div>
                                    <div className="text-[#67281F] text-sm">Years Experience</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <a href="#services" className="bg-gradient-to-r from-[#B8946B] to-[#E8DDC9] text-[#67281F] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg text-center">
                                    Explore Our Services
                                </a>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-1 relative" data-aos="fade-left">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <img src="/assets/umara-mitra-kulina/Gedung-umk-2.jpeg" alt="Professional Kitchen" className="w-full h-[360px] sm:h-[450px] md:h-[540px] lg:h-[630px] xl:h-[720px] object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. INDUSTRY SERVICES SECTION --- */}
            <section id="services" className="py-20" style={{ backgroundImage: "url('/assets/umara-mitra-kulina/BG-UMK.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-white lg:text-[#67281F] mb-4 drop-shadow-md lg:drop-shadow-none">Industry-Specific Solutions</h2>
                        <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">Tailored catering services designed to meet the unique needs of different industries</p>
                    </div>
                    
                    <div className="mb-20">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" data-aos="fade-up">
                            <div className="text-center mb-4 p-8 pt-10">
                                <div className="inline-block bg-gradient-to-r from-[#67281F] to-[#8B3A1F] text-white px-8 py-3 rounded-full text-lg font-semibold mb-4">
                                    MANUFACTURING & INSTITUTIONAL
                                </div>
                                <h3 className="text-3xl font-bold text-[#67281F] mb-4">Professional Catering Solutions</h3>
                                <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive food service solutions designed specifically for manufacturing facilities and institutional environments</p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Image Carousel menggunakan Swiper */}
                                <div className="relative overflow-hidden p-6">
                                    <div className="relative w-full rounded-lg overflow-hidden shadow-lg h-80 lg:h-full">
                                        <Swiper
                                            modules={[Autoplay, EffectFade, Pagination]}
                                            effect="fade"
                                            spaceBetween={0} slidesPerView={1} loop={true}
                                            autoplay={{ delay: 3000 }}
                                            pagination={{ clickable: true }}
                                            className="w-full h-full min-h-[300px]"
                                        >
                                            {serviceImages.map((img, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <img src={img} alt={`Catering ${idx+1}`} className="w-full h-full object-cover" />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="space-y-8">
                                        <div className="flex items-start space-x-4 group">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shadow-md">
                                                <svg className="w-6 h-6 text-[#67281F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#67281F] mb-2">Regular Employee Meals</h4>
                                                <p className="text-gray-700">Daily nutritious meals for your workforce with flexible scheduling</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4 group">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shadow-md">
                                                <svg className="w-6 h-6 text-[#67281F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#67281F] mb-2">Corporate Event Catering</h4>
                                                <p className="text-gray-700">Professional catering for meetings, conferences, and corporate events</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4 group">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shadow-md">
                                                <svg className="w-6 h-6 text-[#67281F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#67281F] mb-2">Ala Carte Canteen Services</h4>
                                                <p className="text-gray-700">Flexible dining options with diverse menu selections</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. OUR KITCHEN SECTION --- */}
            <section id="kitchen" className="py-20" style={{ backgroundImage: "url('/assets/umara-mitra-kulina/BG-STATEOFTHEART-UMK.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            <span className="text-[#67281F] bg-white/80 px-4 py-1 rounded-lg">Culinary Facilities</span>
                        </h2>
                        <p className="text-lg text-gray-800 bg-white/70 p-4 rounded-xl max-w-2xl mx-auto leading-relaxed">
                            Experience excellence through our modern kitchen facilities equipped with advanced technology, ensuring the highest standards of food safety and quality.
                        </p>
                    </div>
                    
                    <div className="max-w-7xl mx-auto">
                        <div className="relative mb-20" data-aos="fade-up">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img src="/assets/umara-mitra-kulina/Team-umk.jpg" alt="Kitchen Operations" className="w-full h-auto object-cover" />
                                
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-[#67281F] to-[#8B4513] rounded-xl flex items-center justify-center">
                                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-bold text-gray-900">9,000+</div>
                                                    <div className="text-sm text-gray-600 font-medium">Meals Daily Capacity</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-[#67281F] to-[#8B4513] rounded-xl flex items-center justify-center">
                                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-bold text-gray-900">HACCP</div>
                                                    <div className="text-sm text-gray-600 font-medium">Certified Standards</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { img: "Food-Process.jpg", title: "Food Preparation", desc: "Fresh ingredients prepared with precision" },
                                { img: "UMK3.jpg", title: "Quality Control", desc: "Rigorous testing ensures standards" },
                                { img: "Food-preparation.jpg", title: "Packaging Process", desc: "Safe packaging & timely delivery" },
                                { img: "LOADING-UMK.jpg", title: "Loading Delivery", desc: "Carefully loaded & delivered on time" }
                            ].map((item, idx) => (
                                <div key={idx} className="group" data-aos="fade-up" data-aos-delay={idx * 200}>
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                        <img src={`/assets/umara-mitra-kulina/${item.img}`} alt={item.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/90 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. OUR CLIENTS --- */}
            <section className="bg-gray-50 py-20 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-5xl font-bold text-[#67281F] mb-4 leading-tight">Our Clients</h2>
                        <p className="text-gray-600">Trusted by leading companies across industries</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* Contoh beberapa logo client, sisanya bisa Anda tambahkan sesuai HTML asli */}
                        {[
                            "Alva-1536x667.png", "Bintang_Toedjoe.png", "Daikin.png", "Hoyu_logo.png", "Mahle.png",
                            "Monokem-Surya.png", "Motherson.png", "PT-ASAMA-INDONESIA-MANUFACTURING.png", "PT-Mitrametal-Perkasa.png", "shin-etsu.png"
                        ].map((logo, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={(idx % 5) * 100}>
                                <img src={`/assets/umara-mitra-kulina/clients/${logo}`} alt={`Client ${idx}`} className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. CONTACT SECTION --- */}
            <section id="contact" className="py-20" style={{ backgroundImage: "url('/assets/umara-mitra-kulina/BG-GETITTOUCH-UMK.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl text-white font-bold mb-4">Get In Touch</h2>
                        <p className="text-white/90 text-lg">Ready to discuss your catering needs? Contact us today!</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        <div className="space-y-8" data-aos="fade-right">
                            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl text-white">
                                <h4 className="text-xl font-bold text-[#E8DDC9] mb-2">Kitchen Karawang</h4>
                                <p className="mb-6"><a href="https://maps.app.goo.gl/TXghacYWdL5FdpPQA" target="_blank" rel="noreferrer" className="hover:underline">Jl. Menati 1 Kel. Puseurjaya Kec. Telukjambe Timur, Karawang</a></p>
                                
                                <h4 className="text-xl font-bold text-[#E8DDC9] mb-2">Kitchen Cikarang</h4>
                                <p><a href="https://maps.app.goo.gl/yScM633o9ujxerLi7" target="_blank" rel="noreferrer" className="hover:underline">Delta Silicon 3, Jl. Rotan II No.38 L, Cicau, Cikarang Pusat</a></p>
                            </div>
                            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl text-white flex gap-8">
                                <div>
                                    <h4 className="text-xl font-bold text-[#E8DDC9] mb-1">Phone</h4>
                                    <a href="https://wa.me/6282121200500" target="_blank" rel="noreferrer" className="hover:underline">+62-821-2120-0500</a>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#E8DDC9] mb-1">Email</h4>
                                    <a href="mailto:info@umarakulina.co.id" className="hover:underline">info@umarakulina.co.id</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-xl" data-aos="fade-left">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Request Quote</h3>
                            
                            {recentlySuccessful && (
                                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                                    Permintaan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.
                                </div>
                            )}

                            <form onSubmit={submitContact} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8946B]" placeholder="Your Name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input type="tel" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8946B]" placeholder="Using 62" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8946B]" placeholder="your@email.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                                    <select value={data.service_type} onChange={e => setData('service_type', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8946B] bg-white" required>
                                        <option value="">Select Service Type</option>
                                        <option value="Manufacturing & Institutional">Manufacturing & Institutional</option>
                                        <option value="Event Catering">Event Catering</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows="4" value={data.message} onChange={e => setData('message', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8946B] resize-y" placeholder="Tell us about your catering needs..." required></textarea>
                                </div>
                                <button type="submit" disabled={processing} className="w-full bg-gradient-to-r from-[#B8946B] to-[#E8DDC9] text-[#67281F] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50">
                                    {processing ? 'Sending...' : 'Send Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Pasang Layout UMK
Index.layout = page => <UmkLayout children={page} brand={page.props.brand} />;

export default Index;