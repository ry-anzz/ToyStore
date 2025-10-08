// src/components/products/ProductImageCarousel.tsx
"use client";

import { useState } from 'react';

interface ProductImageCarouselProps {
  images: string[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  // Se não houver imagens, não renderiza nada
  if (!images || images.length === 0) {
    return null;
  }

  // O estado 'mainImage' guarda a URL da imagem principal que está sendo exibida
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={mainImage}
          alt="Imagem principal do produto"
          className="w-full h-full object-contain transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Fileira de Miniaturas (Thumbnails) */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`
              w-full h-20 bg-gray-100 rounded-md overflow-hidden border-2 transition-all
              ${mainImage === image ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-300'}
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