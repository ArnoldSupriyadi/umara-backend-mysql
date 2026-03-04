import React from 'react';
import { Head } from '@inertiajs/react';
import UcrLayout from '@/Layouts/Brands/UcrLayout';

const Wedding = ({ brand }) => {
    return (
        <>
            <Head title={`Wedding Services - ${brand.name}`} />
            
            <div className="py-20 text-center">
                <h1 className="text-5xl font-['Playfair_Display'] text-[#CBB88A]">Wedding Experiences</h1>
                <p className="mt-4 text-gray-600">Ini adalah halaman Wedding khusus UCR.</p>
                {/* Masukkan desain HTML Wedding Anda di sini */}
            </div>
        </>
    );
};

// Jangan lupa pasang layoutnya!
Wedding.layout = page => <UcrLayout children={page} brand={page.props.brand} />;

export default Wedding;