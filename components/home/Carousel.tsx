"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "@/types"; // Importar o tipo Banner

const API_URL = 'http://localhost:8080/api/banners';

export function Carousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) return;
        setBanners(await response.json());
      } catch (error) {
        console.error("Falha ao carregar banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    if (banners.length > 1) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [currentIndex, banners.length]);
  
  if (banners.length === 0) {
    // Retorna um placeholder ou nada enquanto carrega ou se não houver banners
    return <div className="relative w-full h-80 rounded-2xl bg-gray-200 animate-pulse"></div>;
  }

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl group">
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <img key={banner.id} src={banner.imagemUrl} alt={banner.titulo} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"><ChevronLeft size={28} /></button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"><ChevronRight size={28} /></button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div key={index} onClick={() => setCurrentIndex(index)} className={`h-3 w-3 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}