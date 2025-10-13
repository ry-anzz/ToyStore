"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Popup } from "../ui/Popup";
import { Avaliacao } from "@/types";

interface ReviewFormProps {
  produtoId: number;
  onReviewSubmit: () => void;
  initialData?: Avaliacao | null;
  onCancel?: () => void;
}

const API_URL = 'http://localhost:8080/api';

export function ReviewForm({ produtoId, onReviewSubmit, initialData, onCancel }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing && initialData) {
      setRating(initialData.nota);
      setComment(initialData.descricao);
    }
  }, [isEditing, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setPopup({ show: true, message: 'Você precisa estar logado para avaliar.', type: 'error' });
      return;
    }
    if (rating === 0) {
      setPopup({ show: true, message: 'Por favor, selecione uma nota (estrelas).', type: 'error' });
      return;
    }

    const url = isEditing ? `${API_URL}/avaliacoes/${initialData?.id}` : `${API_URL}/avaliacoes`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: user.id,
          produtoId: produtoId,
          nota: rating,
          descricao: comment,
        }),
      });

      if (!response.ok) throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'enviar'} avaliação.`);
      
      setPopup({ show: true, message: `Avaliação ${isEditing ? 'atualizada' : 'enviada'} com sucesso!`, type: 'success' });
      
      if (!isEditing) {
        setRating(0);
        setComment("");
      }
      onReviewSubmit();

    } catch (error: any) {
      setPopup({ show: true, message: error.message, type: 'error' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h3 className="text-xl font-bold text-slate-700 mb-4">{initialData ? "Editar sua Avaliação" : "Deixe sua Avaliação"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="font-semibold text-slate-600 mb-2">Sua nota:</p>
          {/* --- CÓDIGO DAS ESTRELAS RESTAURADO AQUI --- */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer"
                >
                  <Star
                    size={24}
                    className={`transition-colors ${
                      starValue <= (hoverRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-semibold text-slate-600 mb-2">Seu comentário:</label>
          <textarea
            id="comment"
            rows={4}
            value={comment} // Adicionado para controlar o valor
            onChange={(e) => setComment(e.target.value)} // Adicionado para atualizar o estado
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Conte o que você achou do brinquedo..."
          ></textarea>
        </div>
        <div className="flex justify-end gap-2">
          {onCancel && <Button type="button" onClick={onCancel} className="bg-slate-200 hover:bg-slate-300 text-slate-700">Cancelar</Button>}
          <Button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-800 font-bold">Enviar Avaliação</Button>
        </div>
      </form>
    </div>
  );
}