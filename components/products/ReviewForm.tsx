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
  // Novas props para o modo de edição
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

  const isEditing = !!initialData; // Verifica se estamos no modo de edição

  // Preenche o formulário com os dados da avaliação ao entrar no modo de edição
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
    <>
     {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Editar sua Avaliação' : 'Deixe sua Avaliação'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="font-medium mb-2">Sua nota:</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button" key={star} onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer"
                >
                  <Star size={24} className={`transition-colors ${(hoverRating || rating) >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block font-medium mb-2">Seu comentário:</label>
            <textarea
              id="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Conte o que você achou do brinquedo..."
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            {isEditing && onCancel && (
              <Button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
            )}
            <Button type="submit">{isEditing ? 'Salvar Alterações' : 'Enviar Avaliação'}</Button>
          </div>
        </form>
      </div>
    </>
  );
}