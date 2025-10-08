// src/components/products/ReviewItem.tsx

import { StarRating } from "./StarRating";
import { UserCircle } from "lucide-react";

export interface Review {
  id: number;
  autor: string;
  data: string;
  nota: number;
  descricao: string;
}

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-t py-6">
      <div className="flex items-center mb-2">
        <UserCircle size={32} className="text-gray-400 mr-3" />
        <div>
          <p className="font-semibold">{review.autor}</p>
          <p className="text-xs text-gray-500">{review.data}</p>
        </div>
        <StarRating rating={review.nota} className="ml-auto" />
      </div>
      <p className="text-gray-700">{review.descricao}</p>
    </div>
  );
}