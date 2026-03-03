import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Head } from "@inertiajs/react";

export default function Index() {
  return (
    <FrontendLayout>
        <Head title="AboAbout Us - Umara Grouput"></Head>

        {/* --- HERO SECTION --- */}
        <div className="relative bg-[#131313] py-24 sm:py-32 overflow-hidden">
            {/* Background Pattern/Image (Opsional) */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Playfair_Display'] mb-6">About Us</h1>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 mx-auto">
                Menyajikan pengalaman kuliner dan layanan hospitality terbaik dengan sentuhan keanggunan serta profesionalisme tinggi sejak hari pertama kami berdiri.
            </p>

            {/* --- KONTEN UTAMA --- */}
            <div className="py-16 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Teks Sejarah/Visi */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Playfair_Display']">
                                Dedikasi pada Kualitas & Rasa
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Umara Group bermula dari sebuah visi sederhana: menghadirkan standar baru dalam industri katering dan layanan acara (event services) di Indonesia. Kami percaya bahwa setiap acara, baik itu kumpul keluarga kecil maupun perayaan korporat berskala besar, layak mendapatkan sajian makanan yang tidak hanya lezat di lidah, tetapi juga indah dipandang.
                                </p>
                                <p className="mt-4">
                                    Dengan tim koki profesional dan staf pelayanan yang berpengalaman, kami berkomitmen untuk menggunakan bahan-bahan segar berkualitas tinggi. Misi kami adalah menciptakan memori tak terlupakan melalui setiap hidangan yang kami sajikan.
                                </p>
                            </div>

                            {/* Visi Misi Highlight */}
                            <div className="mt-8 border-l-4 border-blue-600 pl-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Visi Kami</h3>
                                <p className="text-gray-600">Menjadi penyedia layanan food & beverage dan hospitality terkemuka yang diakui atas inovasi, kualitas, dan pelayanan sepenuh hati.</p>
                            </div>
                        </div>

                        {/* Gambar Representasi (Nanti bisa diganti dengan foto asli Umara) */}
                        <div className="relative">
                            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Umara Group Chef Team" className="object-cover w-full h-full"
                                />
                            </div>
                            {/* Kotak Aksen Desain */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 border border-blue-100 rounded-2xl -z-10"></div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gray-50 border border-gray-100 rounded-2xl -z-10"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </FrontendLayout>
  );
}