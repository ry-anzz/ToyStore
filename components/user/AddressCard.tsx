// src/components/user/AddressCard.tsx
import { Endereco } from "@/types";
import { Button } from "../ui/Button";
import { Edit, Trash2, Home } from "lucide-react";

interface AddressCardProps {
  address: Endereco;
  onEdit: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="border rounded-lg p-4 relative transition-all hover:border-blue-500 hover:shadow-md">
      <h3 className="font-bold text-lg mb-2">{address.apelido || 'Endereço'}</h3>
      <p className="text-gray-600">{address.rua}, {address.numero}</p>
      <p className="text-gray-600">{address.bairro}, {address.cidade} - {address.uf}</p>
      <p className="text-gray-600">CEP: {address.cep}</p>

      <div className="flex gap-2 mt-4">
        <Button onClick={onEdit}>
          <Edit size={16} className="mr-2" /> Editar
        </Button>
        <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700">
          <Trash2 size={16} className="mr-2" /> Excluir
        </Button>
      </div>
    </div>
  );
}