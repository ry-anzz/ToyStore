// src/components/products/StarRating.tsx

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // Não vamos usar, mas fica a ideia
  const emptyStars = 5 - fullStars;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-current" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  );
}