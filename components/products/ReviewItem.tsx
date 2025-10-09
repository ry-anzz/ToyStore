import { StarRating } from "./StarRating";
import { UserCircle, Edit, Trash2 } from "lucide-react";
import { Avaliacao, Usuario } from "@/types";

interface ReviewItemProps {
  review: Avaliacao & { data: string }; // Ajuste para garantir que a data formatada seja aceita
  currentUser: Usuario | null;
  onEdit: () => void;
  onDelete: () => void;
}

export function ReviewItem({ review, currentUser, onEdit, onDelete }: ReviewItemProps) {
  const isOwner = currentUser?.id === review.autorId;

  return (
    <div className="border-t py-6">
      <div className="flex items-start mb-2">
        <UserCircle size={32} className="text-gray-400 mr-3 flex-shrink-0" />
        <div className="flex-grow">
          <p className="font-semibold">{review.autor}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">{review.data}</p>
            {review.editado && <p className="text-xs text-gray-400 italic">(editado)</p>}
          </div>
        </div>
        <div className="flex-shrink-0">
         <StarRating rating={review.nota} />
        </div>
      </div>
      <p className="text-gray-700 pl-11">{review.descricao}</p>

      {isOwner && (
        <div className="flex gap-4 mt-3 pl-11">
          <button onClick={onEdit} className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
            <Edit size={14} /> Editar
          </button>
          <button onClick={onDelete} className="text-xs flex items-center gap-1 text-red-600 hover:underline">
            <Trash2 size={14} /> Excluir
          </button>
        </div>
      )}
    </div>
  );
}