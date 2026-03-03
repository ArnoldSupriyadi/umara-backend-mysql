import React from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Index({ brand }) {
    return (
        <FrontendLayout>
            <Head title={`Food Manufacturing - ${brand.name}`} />
            
            {/* DESAIN KHUSUS LBI (Bebas total, beda layout dengan UCR!) */}
            <div className="text-blue-900 min-h-screen">
                <h1 className="text-4xl font-bold">{brand.name}</h1>
                <p>Inovasi Retort Food Solutions...</p>
                {/* Komponen lain yang khusus ada di LBI */}
            </div>
        </FrontendLayout>
    );
}