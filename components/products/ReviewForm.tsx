// src/components/products/ReviewForm.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Star } from "lucide-react";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Avaliação enviada com nota ${rating}! (Simulação)`);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Deixe sua Avaliação</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="font-medium mb-2">Sua nota:</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer"
              >
                <Star
                  size={24}
                  className={`transition-colors ${(hoverRating || rating) >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-medium mb-2">Seu comentário:</label>
          <textarea
            id="comment"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Conte o que você achou do brinquedo..."
          ></textarea>
        </div>
        <Button type="submit">Enviar Avaliação</Button>
      </form>
    </div>
  );
}   