import React, { useState, useEffect, useCallback } from 'react';

export default function GalleryLightbox({ images = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const isOpen = activeIndex !== null;

    const close = () => setActiveIndex(null);
    const prev = useCallback(() => setActiveIndex(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setActiveIndex(i => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, prev, next]);

    if (images.length === 0) return null;

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
                {images.map((url, idx) => (
                    <figure key={idx} className="group relative overflow-hidden rounded-sm shadow-md cursor-zoom-in">
                        <img
                            src={url}
                            alt={`Foto ${idx + 1}`}
                            loading="lazy"
                            onClick={() => setActiveIndex(idx)}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* hover overlay */}
                        <div
                            onClick={() => setActiveIndex(idx)}
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
                        >
                            <svg
                                className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </figure>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={close}
                >
                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
                        aria-label="Close"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Prev button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full"
                            aria-label="Previous"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="max-w-5xl max-h-[90vh] mx-4 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[activeIndex]}
                            alt={`Foto ${activeIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                        />
                    </div>

                    {/* Next button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full"
                            aria-label="Next"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-4 py-1.5 rounded-full">
                            {activeIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
