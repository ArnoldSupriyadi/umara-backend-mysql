import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

export default function Mealbox({ brand }) {
    
    // Data List Menu Mealbox
    const mealboxMenus = [
        {
            title: "Hidangan Nusantara",
            price: "40,000 IDR",
            image: "/assets/nasi-box/menu nasi box preview-3.pdf.jpg",
            packages: [
                {
                    name: "Hidangan Set-A",
                    items: "Nasi Putih, Ayam Goreng Lengkuas, Sate Lilit Ayam, Telor Balado, Tumis Buncis, Kerupuk"
                },
                {
                    name: "Hidangan Set-B",
                    items: "Nasi Daun Jeruk, Sate Lilit Ayam, Beef Rollade, Telur Pindang, Tumis Kacang Panjang, Kerupuk"
                },
                {
                    name: "Hidangan Set-C",
                    items: "Nasi Putih, Ayam Kremes, Paru Asam Manis, Sate Tempe Bumbu Kecap, Tumis Kacang Panjang, Sambal Bawang, Kerupuk"
                }
            ]
        },
        {
            title: "Hantaran Nusantara",
            price: "50,000 IDR",
            image: "/assets/nasi-box/menu nasi box preview-4.pdf.jpg",
            packages: [
                {
                    name: "Hantaran Set-A & Set-B",
                    items: "Nasi Daun Jeruk, Ayam Goreng, Serundeng, Telor Balado, Sate Tempe, Beef Rollade Kuah Semur, Sambal Goreng Kentang Buncis, Kerupuk"
                },
                {
                    name: "Hantaran Set-C",
                    items: "Nasi Putih, Ayam Bakar Padang, Rendang Daging, Tumis Daun Singkong, Sambal Goreng Udang Kentang, Kerupuk"
                },
                {
                    name: "Peranakan",
                    items: "Nasi Goreng Ikan Asin, Ayam Kungpao Cashew, Pineapple Sweet Sour Fish, Capcay Jamur Merang, Tahu Lada Garam"
                },
                {
                    name: "Western",
                    items: "Wedges Potato BBQ, Tamago (Telur Dadar Gulung), Fried Dory With Mango Salsa, Glaze Vegetable Garlic Sauce, Beef Roulade with Gravy"
                }
            ]
        },
        {
            title: "Nasi Umara",
            price: "65,000 IDR",
            image: "/assets/nasi-box/batch_nasi umara.jpg",
            packages: [
                {
                    name: "Premium Box",
                    items: "Nasi Putih, Ayam Kremes, Paru Asam Manis, Sate Tempe Bumbu Kecap, Tumis Kacang Panjang, Sambal Bawang, Kerupuk"
                }
            ]
        }
    ];

    return (
        <div className="bg-white">
            <Head title={`Mealbox - ${brand?.name || 'Umara Cipta Rasa'}`} />

            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="hero-card">
                    <div className="container-hero-fluid w-full">
                        <div className="hero-media relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                            <img 
                                src="/assets/ucr/UCR-WEB/Mealbox Hero 1920x550.jpg" 
                                alt="Umara Mealbox" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hero-text pt-16 pb-20 text-center max-w-4xl mx-auto">
                            <h1 className="headline text-4xl md:text-5xl lg:text-6xl font-playfair text-[#C5A859] mb-6 tracking-wider">
                                Mealbox
                            </h1>
                            <p className="text-lg text-gray-700 tracking-wide leading-relaxed font-light">
                                Designed to complement every occasion, Umara Meal Box delivers curated menus for business settings, private gatherings, gifting, and special events. From premium snacks and thoughtfully crafted sides to satisfying main course selections, each box is created to elevate comfort and delight the senses.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- MENU LIST SECTION --- */}
                <section id="mealbox-menu" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* Section Title */}
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#C5A859] tracking-wider mb-4">
                                Mealbox Menu
                            </h2>
                            <p className="text-gray-600 text-lg font-light">
                                Elegant selections crafted for meetings, gifting, and private events.
                            </p>
                        </div>
                        
                        {/* Menu Cards */}
                        <div className="space-y-12">
                            {mealboxMenus.map((menu, index) => (
                                <div key={index} className="border border-[#E1D5A6] bg-white p-6 md:p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                                        
                                        {/* Left: Image */}
                                        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden rounded-sm">
                                            <img 
                                                className="absolute inset-0 w-full h-full object-cover" 
                                                src={menu.image} 
                                                alt={menu.title} 
                                            />
                                        </div>
                                        
                                        {/* Right: Content */}
                                        <div className="flex flex-col h-full py-2">
                                            <h3 className="font-playfair text-3xl md:text-4xl text-[#C5A859] font-bold mb-8">
                                                {menu.title}
                                            </h3>
                                            
                                            <div className="space-y-6 flex-grow">
                                                {menu.packages.map((pkg, idx) => (
                                                    <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                        <p className="font-bold text-gray-800 tracking-wide">
                                                            {pkg.name}
                                                        </p>
                                                        <p className="text-gray-600 mt-2 font-light leading-relaxed">
                                                            {pkg.items}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-[#E1D5A6]/50">
                                                <p className="text-[#C5A859] text-xl font-playfair font-bold tracking-wider mb-2">
                                                    Price : {menu.price}
                                                </p>
                                                <small className="text-gray-400 tracking-wider text-xs">
                                                    * Prices Exclude Government Tax 10% & Delivery Service Charge
                                                </small>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section id="cta-action" className="py-24 bg-[#FCFBF7] border-t border-[#E1D5A6]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#C5A859] mb-6 leading-tight">
                            Plan Your Meal Box Experience
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
                            Share your needs, and we’ll curate the ideal menu for your occasion.
                        </p>
                        <a 
                            href="https://wa.me/6281212008700" 
                            target="_blank" rel="noreferrer"
                            className="inline-block px-8 py-4 border-2 border-[#C5A859] bg-[#C5A859] text-white hover:bg-transparent hover:text-[#C5A859] font-medium tracking-widest uppercase transition-colors shadow-lg hover:shadow-none"
                        >
                            Start Your Meal Box Order
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Pasang Layout UCR
Mealbox.layout = page => <UcrLayout children={page} brand={page.props.brand} />;