import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx', // Ini penting untuk React/Inertia kamu
    ],

    // Safelist bawa dari project lama supaya class dinamis ini nggak hilang
    safelist: [
        'bg-gradient-to-r', 
        'from-brand-burgundy', 
        'to-brand-darkBurgundy', 
        'bg-brand-burgundy'
    ],

    theme: {
        extend: {
            // Gabungkan semua warna custom kamu di sini
            colors: {
                blue: {
                    100: '#3D717E',
                    200: '#10475E',
                    300: '#0B2839'
                },
                amber: {
                    100: '#D68631',
                    200: '#964405',
                    300: '#5A3211'
                },
                palette1: {
                    a: '#4C3D19',
                    b: '#354024',
                    c: '#889063',
                    d: '#CFBB99',
                    e: '#E5D7C4'
                },
                palette2: {
                    a: '#896F36',
                    b: '#973B00',
                    c: '#CB9123',
                    d: '#FFF4DE',
                    e: '#572E12'
                },
                body: {
                    a: '#F5F4F4',
                },
                umara: {
                    a: '#886F35',
                    b: '#FFF9F9',
                    c: '#D3902A',
                    d: '#1F4F35',
                },
                umk: {
                    a: '#2F2F2F',
                    b: '#F5F4F4',
                    c: '#D3902A',
                    d: '#1F4F35',
                },
                'card-umara-group': {
                    'brown-dark': '#8C3F0E',
                    'brown-light': '#CE8736',
                },
                brand: {
                    burgundy: '#8B1C3D',
                    darkBurgundy: '#3D0F14',
                },
            },

            // Bawa backgroundImage untuk burgundy gradient
            backgroundImage: {
                'brand-burgundy': 'linear-gradient(to right, #8B1C3D, #3D0F14)',
            },

            // Gabungkan font family lama dengan Figtree bawaan Laravel
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'nunito': ['Nunito Sans', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
                'merriweather': ['Merriweather', 'serif'],
                'playfair': ['Playfair Display', 'serif']
            },
        },
    },

    plugins: [forms],
};