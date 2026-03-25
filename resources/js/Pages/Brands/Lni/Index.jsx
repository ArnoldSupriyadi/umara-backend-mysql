import React from 'react';
import { Head } from '@inertiajs/react';
import LniLayout from '@/Layouts/Brands/LniLayout';

const Index = ({ brand }) => {

    const r2Url = "https://assets.bridgeflow.my.id";

    // --- DATA PRODUK (Membuat kode lebih bersih dan tidak berulang) ---
    const gourmetProducts = [
        { name: 'Fettucine Carbonara', img: 'fettucine-carbonara.jpeg' },
        { name: 'Mac & Cheese', img: 'mac-and-cheese.jpeg' },
        { name: 'Spaghetti Bolognese', img: 'spaghetti-bolognese.jpeg' },
        { name: 'Penne Pesto Chicken', img: 'penne-pesto-chicken.jpg', bgGradient: true },
        { name: 'Spaghetti Aglio Olio Chicken', img: 'spaghetti-aglio-olio-chicken.png' },
    ];

    const laukProducts = [
        { name: 'Cumi-Cabe-Ijo', img: 'Cumi-Cabe-Ijo.jpg' },
        { name: 'Cumi Tinta Hitam', img: 'Cumi-Tinta-Hitam.jpg' },
        { name: 'Cumi Asin Pedas Jontor', img: 'Cumi-Asin-Pedas-Jontor.jpg' },
        { name: 'Daging Sapi Balado Limau', img: 'Daging-sapi-balado-limau.jpg', bgGradient: true },
        { name: 'Lidah Sapi Cabe Ijo', img: 'lidah-sapi-cabe-ijo.jpeg' },
        { name: 'Oseng Mercon', img: 'Oseng-Mercon.jpg' },
    ];

    const nasiGorengProducts = [
        { name: 'Nasi Goreng Kampung', img: 'nasi-goreng-kampung.jpeg' },
        { name: 'Nasi Goreng Kebuli', img: 'nasi-goreng-kebuli.png' },
        { name: 'Nasi Goreng Cumi', img: 'Nasi-Goreng-Cumi.jpg' },
    ];

    // --- DATA LOGO KLIEN (Menggantikan Vanilla JS) ---
    const clientLogos = [
        'Aeon.png', 'Hero.png', 'Glael.png', 'Grand-Lucky.png', 'Alfa-Express.png',
        'frestive-supermarket.png', 'Lotte-Mart.png', 'Logo-Ranch-Market.png', 'The-Food-Hall.png',
        'Logo_Hypermart.svg.png', 'Farmer.png', 'All- Fresh.png', 'Top-Buah-Segar.png',
        'Total-Buah.png', 'Yogya.png', 'Superindo.png', 'LOKA_Logo.png', 'Rumah-Buah.png',
        'Logo_Toko_Daging_Nusantara.webp.png', 'Market-City.png',
        'shopee-indonesia-online-shopping-brand-shopee-platform-text-trademark-thumbnail.png',
        'FreshCo Food Center.png', 'Papaya.png', 'Ranch.png', 'Transmart.png',
        'capitacal-fruit.png', 'jakarta-fruit-markets.png', 'isbu.png', 'k3mart.jpg',
        'panen-buah-segar.png', 'pepito.png', 'Hypermart.png'
    ];

    // Helper untuk merender Tile Produk
    const ProductTile = ({ name, img, bgGradient, folder }) => (
        <article className={`group relative aspect-[4/5] overflow-hidden }`}>
            <img 
                src={`${r2Url}/lni-assets/products/${img}`} 
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                loading="lazy" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-amber-900 shadow-sm">
                {name}
            </div>
        </article>
    );

    return (
        <>
            <Head title={`Home - ${brand?.name || 'PT Lauk Kita Niaga'}`} />

            {/* --- 1. WHAT IS LAUKITA --- */}
            <section id="what-is-laukita" className="py-10 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-amber-950">What is Laukita?</h2>
                            <p className="max-w-xl text-base md:text-lg text-gray-700 leading-relaxed">
                                Laukita is a product developed by prioritizing consumer practicality. Laukita uses real ingredients without preservatives; we freeze our food at the peak of its freshness. Sealed with packaging that applies vacuum technology on thermo sealing machines, which covers the product completely, keeping it safe and dry. With the help of our technology, Laukita is able to extend the shelf life of its products up to 1 year.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img src={`${r2Url}/lni-assets/web-laukita-1080x1920.jpg`} alt="Laukita Product" className="rounded-xl shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. INSTAGRAM-STYLE PRODUCTS --- */}
            <div style={{ backgroundImage: `url('${r2Url}/lni-assets/bg/BG0-LNI-PRODUCT.svg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <section id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    
                    {/* Gourmet Section */}
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mt-10 mb-6 text-amber-950">
                        Ready to Eat <span className="text-amber-700">GOURMET</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-2">
                        {gourmetProducts.map((prod, idx) => (
                            <ProductTile key={idx} {...prod} />
                        ))}
                    </div>

                    {/* Lauk Section */}
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mt-16 mb-6 text-amber-950">
                        Ready to Eat <span className="text-amber-700">LAUK</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-2">
                        {laukProducts.map((prod, idx) => (
                            <ProductTile key={idx} {...prod} />
                        ))}
                    </div>

                    {/* Nasi Goreng Section */}
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mt-16 mb-6 text-amber-950">
                        Ready to Eat <span className="text-amber-700">NASI GORENG</span>
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-2">
                        {nasiGorengProducts.map((prod, idx) => (
                            <ProductTile key={idx} {...prod} />
                        ))}
                    </div>

                </section>
                
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                    {/* Ruang kosong dari HTML asli dipertahankan */}
                </section>
            </div>

            {/* --- 3. OUR CLIENTS --- */}
            {/* --- 3. OUR CLIENTS --- */}
<section id="clients" className="py-16 md:py-10 bg-[#FCF0CE]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-amber-900">
                Our Clients
            </h2>
            <p className="mt-3 text-amber-700 text-lg">
                Trusted by leading supermarkets and partners.
            </p>
        </div>
        
        {/* Grid Render Logo Klien */}
        <div id="clientsGrid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clientLogos.map((file, idx) => {
                // Membersihkan nama file untuk alt text
                const altName = file
                    .replace(/\.(png|jpg|jpeg|webp|svg\.png)$/i, '')
                    .replace(/[-_]+/g, ' ')
                    .trim();
                
                return (
                    <figure 
                        key={idx} 
                        className="flex items-center justify-center bg-white rounded-xl border border-amber-200 shadow-sm p-4 hover:shadow-md transition"
                    >
                        <img 
                            src={`${r2Url}/lni-assets/clients/${file}`} 
                            alt={`Client Logo: ${altName}`} 
                            loading="lazy" 
                            /* Di sini class grayscale telah dihapus, warna asli gambar akan muncul */
                            className="max-h-16 w-auto object-contain transition-all duration-300 opacity-90 hover:opacity-100" 
                        />
                    </figure>
                );
            })}
        </div>
        
    </div>
</section>

            {/* --- 4. B2B CLIENTS --- */}
            <section id="b2b" className="py-16 md:py-10 bg-[#FCF0CE]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-amber-900 mb-8 text-center md:text-left">B2B Partners</h2>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-12 p-8 md:p-12">
                        <ul className="space-y-3 text-amber-900 text-base md:text-lg">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Kafe Pause & Play</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 22 OZ Café</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Cafe Alisted</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Horeka Kupang</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Umara Mitra Kulina</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> PT. Umara Cipta Rasa (UCR)</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Lumpang Emas</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Umara Catering</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Astro Technologies Indonesia</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Koperasi Karyawan PT. Imora Motor</li>
                        </ul>
                        <ul className="space-y-3 text-amber-900 text-base md:text-lg">
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> PISA Cafe</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Sayur Box</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> PT. Corak Makanan Wahana</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> IRUUM Market</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Festive Frozen Food Semarang</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Urbanica Group</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Sate Celup Cinere</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moilatte Cafe</li>
                            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Y Cafe Pondok Indah</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- 5. CONTACT US --- */}
            <section id="contact" className="py-16 md:py-10 bg-[#FCF0CE]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:text-left">
                
                {/* Logo Section */}
                <img 
                    src={`${r2Url}/logos/laukkita-logo.png`} 
                    alt="Laukita Niaga Indonesia" 
                    className="w-48 md:w-64 h-auto" // Ukuran disesuaikan agar proporsional
                />

                {/* Info Section */}
                <div className="w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                    CONTACT US
                    </h2>
                    
                    <div className="space-y-2 text-gray-800">
                    <p className="font-semibold text-amber-900">Office Address</p>
                    <p>
                        Bintaro Avenue Lt.2 Jl. MH Thamrin Blok A2 No. 1
                        Bintaro Sektor 7, Bintaro Jaya, Tangerang Selatan
                    </p>
                    
                    <p>
                        <span className="font-semibold text-amber-900">WA : </span>
                        <a href="https://wa.me/6281260601055" className="hover:underline">
                        0812-6060-1055
                        </a>
                    </p>
                    
                    <p>
                        <span className="font-semibold text-amber-900">Email : </span> 
                        <a href="mailto:info@laukitaniaga.com" className="text-amber-900 hover:underline">
                        info@laukitaniaga.com
                        </a>
                    </p>
                    
                    <p className="mt-4 text-amber-900 font-bold uppercase tracking-tight">
                        PT. LAUKITA NIAGA INDONESIA
                    </p>
                    </div>
                </div>

                </div>
            </div>
            </section>
        </>
    );
};

// Menyambungkan ke Layout
Index.layout = page => <LniLayout children={page} brand={page.props.brand} />;

export default Index;