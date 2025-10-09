// src/components/home/Carousel.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- IMPORTANTE: ADICIONE AS URLS DAS SUAS IMAGENS AQUI ---
const images = [
  'https://via.placeholder.com/1200x400/fbbf24/000000?text=Imagem+Promocional+1',
  'https://via.placeholder.com/1200x400/ef4444/ffffff?text=Imagem+Promocional+2',
  'https://via.placeholder.com/1200x400/3b82f6/ffffff?text=Imagem+Promocional+3',
];
// ---------------------------------------------------------

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl group">
      {/* Container dos Slides */}
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>

      {/* Botão Anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Botão Próximo */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicadores de Posição */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}