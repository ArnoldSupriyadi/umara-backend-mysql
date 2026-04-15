import React from 'react';
import { Head } from '@inertiajs/react';
import LbiLayout from '@/Layouts/Brands/LbiLayout';

export default function Catalog({ brand }) {
    const r2Url = "https://assets.bridgeflow.my.id";

    // --- DATA 1: RETORT CATALOG ---
    const retortProducts = [
        { name: 'Chinese Sweet & Sour Spice', img: `${r2Url}/lbi-assets/retort/bumbu-asam-manis-chinese.png` },
        { name: 'Indonesian Sweet & Sour Spice', img: `${r2Url}/lbi-assets/retort/bumbu-asam-manis-indonesia.png` },
        { name: 'Fried Chicken Spice', img: `${r2Url}/lbi-assets/retort/bumbu-ayam-goreng.png` },
        { name: 'Beef Steak Spice', img: `${r2Url}/lbi-assets/retort/bumbu-bistik.png` },
        { name: 'Gulai Spice', img: `${r2Url}/lbi-assets/retort/bumbu-gulai.png` },
        { name: 'Curry Spice', img: `${r2Url}/lbi-assets/retort/bumbu-kari.png` },
        { name: 'Yellow Spice', img: `${r2Url}/lbi-assets/retort/bumbu-kuning.png` },
        { name: 'Green Chili Spice', img: `${r2Url}/lbi-assets/retort/bumbu-lado-ijo.png` },
        { name: 'Gepuk Beef Marinade', img: `${r2Url}/lbi-assets/retort/bumbu-marinasi-daging-gepuk.png` },
        { name: 'Traditional Fried Rice Spice', img: `${r2Url}/lbi-assets/retort/bumbu-nasi-goreng-kampung.png` },
        { name: 'Savory Rice Spice', img: `${r2Url}/lbi-assets/retort/bumbu-nasi-gurih.png` },
        { name: 'Yellow Rice Spice', img: `${r2Url}/lbi-assets/retort/bumbu-nasi-kuning.png` },
        { name: 'Opor Spice', img: `${r2Url}/lbi-assets/retort/bumbu-opor.png` },
        { name: 'White Spice', img: `${r2Url}/lbi-assets/retort/bumbu-putih.png` },
        { name: 'Rendang Spice', img: `${r2Url}/lbi-assets/retort/bumbu-rendang.png` },
        { name: 'Rica-Rica Spice', img: `${r2Url}/lbi-assets/retort/bumbu-rica-rica.png` },
        { name: 'Sambalado Spice', img: `${r2Url}/lbi-assets/retort/bumbu-sambalado.png` },
        { name: 'Black Pepper Sauce', img: `${r2Url}/lbi-assets/retort/bumbu-sauce-lada-hitam.png` },
        { name: 'Semur Sauce', img: `${r2Url}/lbi-assets/retort/bumbu-semur.png` },
        { name: 'Tongseng Sauce', img: `${r2Url}/lbi-assets/retort/bumbu-tongseng.png` },
    ];

    // --- DATA 2: WIP CATALOG ---
    const wipCategories = [
        {
            title: 'Fried Rice Spice',
            images: `${r2Url}/lbi-assets/wip/bumbu-nasi-goreng.png`,
            items: [
                'Village-Style Fried Rice Seasoning', 'Skipjack Tuna & Smoked Roa Fish Fried Rice Seasoning',
                'Anchovy Fried Rice Seasoning', 'Squid Ink Fried Rice Seasoning', 'Green Chili Fried Rice Seasoning'
            ]
        },
        {
            title: 'Basic Spice',
            images: [`${r2Url}/lbi-assets/wip/Bumbu dasar-28.png`, `${r2Url}/lbi-assets/wip/Bumbu dasar-29.png`],
            items: [
                'Red Basic Spice', 'White Basic Spice', 'Yellow Basic Spice',
                'Green Basic Spice', 'Orange Basic Spice'
            ]
        },
        {
            title: 'Protein Asian & Nusantara',
            images: [`${r2Url}/lbi-assets/wip/PROTEIN ASIAN & NUSANTARA-22.png`, `${r2Url}/lbi-assets/wip/PROTEIN ASIAN & NUSANTARA-23.png`, `${r2Url}/lbi-assets/wip/PROTEIN ASIAN & NUSANTARA-24.png`],
            items: [
                'Nyangnyeom chicken', 'Beef bulgogi', 'Beef/chicken yakiniku', 'Chicken karage',
                'Lamb Curry', 'Chicken Liver & Gizzard', 'Kalasan Sweet Braised Chicken', 'Chicken Balado',
                'Balinese Spiced Chicken', 'Spicy Coconut Chicken', 'Thai Spiced Chicken', 'Green Chili Chicken',
                'Chicken Gulai', 'Chicken Curry', 'Black Pepper Chicken', 'Indonesian Butter Chicken',
                'Paniki Chicken', 'Pandan Chicken', 'Chicken Rendang'
            ]
        },
        {
            title: 'Spices Giling',
            images: `${r2Url}/lbi-assets/wip/bumbu-giling.png`,
            items: [
                'Ground Shallots', 'Ground Garlic', 'Ground Red Chili or Red Chili Paste',
                'Ground Green Chili or Green Chili Paste', "Ground Bird's Eye Chili"
            ]
        },
        {
            title: 'Indonesian Spices',
            images: [`${r2Url}/lbi-assets/wip/bumbu-nusantara-19.png`, `${r2Url}/lbi-assets/wip/bumbu-nusantara-20.png`, `${r2Url}/lbi-assets/wip/bumbu-nusantara-21.png`],
            items: [
                'Spices Kalio', 'Spices Gulai', 'Spices Singgang', 'Spices Kari', 'Spices Balado',
                'Spices Balado Limau', 'Spices Cabe Ijo', 'Spices Ayam Bakar Padang', 'Spices Bali',
                'Spices Betutu', 'Spices Woku', 'Spices Rica-rica', 'Spices Rica Kemangi',
                'Spices Paniki', 'Spices Taliwang', 'Spices Bacem Kalasan', 'Spices Rujak',
                'Spices Semur', 'Spices Rawon', 'Spices Pesmol', 'Spices Ayam Goreng',
                'Spices Mie Godok', 'Spices Nasi Goreng Kampung', 'Spices Opor'
            ]
        },
        {
            title: 'Chilli sauce',
            images: [`${r2Url}/lbi-assets/wip/sambal-32.png`, `${r2Url}/lbi-assets/wip/sambal-33.png`, `${r2Url}/lbi-assets/wip/sambal-34.png`],
            items: [
                'Chilli sauce Bawang', 'Chilli sauce Ijo', 'Chilli sauce Lado Hijau',
                'Chilli sauce Lado Merah', 'Chilli sauce Lombok', 'Chilli sauce Roa',
                'Chilli sauce Penyet', 'Chilli sauce Seset', 'Chilli sauce Soto', 'Chilli sauce Terasi'
            ]
        },
        {
            title: 'Sauce Western',
            images: [`${r2Url}/lbi-assets/wip/sauce western-25.png`, `${r2Url}/lbi-assets/wip/sauce western-26.png`, `${r2Url}/lbi-assets/wip/sauce western-27.png`],
            items: [
                'Bolognese sauce', 'Alfredo sauce', 'Aglio olio', 'Napolitan',
                'Alfredo with truffle oil sauce', 'Black pepper sauce (western)',
                'Michelin sauce', 'Mushroom sauce white', 'Mushroom sauce brown',
                'Pesto sauce', 'BBQ sauce western'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <Head title={`Catalog - ${brand?.name || 'PT Laukita Bersama Indonesia'}`} />

            {/* --- SECTION 1: RETORT CATALOG --- */}
            <section id="retort-catalog" className="py-20 mt-10">
                <div className="container mx-auto px-4 lg:px-8">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#8B1C3D] mb-6 leading-tight tracking-wider py-10 md:py-20 max-w-5xl mx-auto">
                            We specialize in B2B Product, Export Products, Mining Supply, and Resto & Hotel Supply, ensuring consistency for every client.
                        </h1>
                        <p className="text-[#8B1C3D] text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                            Gramage: 500g/1000g | Packaging: Aluminum Pouch
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
                        {retortProducts.map((product, index) => (
                            <div key={index} className="h-full flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#debe9d] bg-white">
                                <div className="relative overflow-hidden bg-white">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-110 p-5"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B1C3D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-8 bg-[#F7F3EF] flex-1 flex flex-col border-t border-[#debe9d]/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-2xl font-bold text-[#8B1C3D] leading-snug">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <div className="mt-auto text-[#8B1C3D]/80 tracking-wider text-sm font-semibold uppercase">
                                        Spiciness Level Variants
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* --- SECTION 2: WIP PRODUCTS --- */}
            <section id="wip-catalog" className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 lg:px-8">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#8B1C3D] mb-4 leading-tight">
                            WIP Products
                        </h2>
                        <p className="text-[#8B1C3D] text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                            Gramage: 500g/1000g | Packaging: Vacuum Pack
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-16 max-w-7xl mx-auto">
                        {wipCategories.map((category, index) => (
                            <div key={index} className="col-span-full">

                                {/* Category Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-[#8B1C3D] mb-6 border-b-2 border-[#debe9d] pb-3 inline-block">
                                    {category.title}
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                                    {/* Left Column: Images */}
                                    <div className="space-y-6">
                                        {(Array.isArray(category.images) ? category.images : [category.images]).map((imgSrc, imgIdx) => (
                                            <div key={imgIdx} className="rounded-2xl shadow-md border border-[#debe9d] overflow-hidden bg-white hover:shadow-lg transition-shadow">
                                                <img
                                                    src={imgSrc}
                                                    alt={`${category.title} Pack ${imgIdx + 1}`}
                                                    className="w-full h-64 object-contain p-2 hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right Column: List of Items */}
                                    <div className="lg:col-span-2">
                                        <div className="border border-[#debe9d] rounded-2xl p-6 bg-white shadow-sm">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                                {category.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="border-b border-[#debe9d]/50 pb-2 flex items-start">
                                                        <span className="text-[#8B1C3D] text-lg">
                                                            • {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}

Catalog.layout = page => <LbiLayout children={page} brand={page.props.brand} />;