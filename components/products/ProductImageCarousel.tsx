// src/components/products/ProductImageCarousel.tsx
"use client";

import { useState } from 'react';

interface ProductImageCarouselProps {
  images: string[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal com novo estilo */}
      <div className="group w-full aspect-square flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-xl  cursor-pointer">
        <img
          src={mainImage}
          alt="Imagem principal do produto"
          className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Fileira de Miniaturas (Thumbnails) com novas cores */}
      <div className={`grid grid-cols-5 gap-3 ${images.length < 5 ? 'justify-center' : ''}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`
              w-full aspect-square bg-slate-100 rounded-lg overflow-hidden border-4
              transition-all duration-200 transform hover:scale-105
              ${mainImage === image ? 'border-amber-400 shadow-lg' : 'border-transparent hover:border-sky-300'}
            `}
          >
            <img
              src={image}
              alt={`Miniatura do produto ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}