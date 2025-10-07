// src/components/user/AddressCard.tsx

import { Endereco } from "@/types";
import { Button } from "../ui/Button";
import { Edit, Trash2, Home } from "lucide-react";

interface AddressCardProps {
  address: Endereco & { padrao?: boolean }; // Adicionamos uma prop opcional 'padrao'
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="border rounded-lg p-4 relative transition-all hover:border-blue-500 hover:shadow-md">
      {address.padrao && (
        <span className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full">
          <Home size={12} /> Padrão
        </span>
      )}
      <h3 className="font-bold text-lg mb-2">{address.nome}</h3>
      <p className="text-gray-600">
        {address.rua}, {address.numero}
      </p>
      <p className="text-gray-600">
        {address.bairro}, {address.cidade} - {address.uf}
      </p>
      <p className="text-gray-600">CEP: {address.cep}</p>

      <div className="flex gap-2 mt-4">
        <Button >
          <Edit size={16} className="mr-2" /> Editar
        </Button>
        <Button >
          <Trash2 size={16} className="mr-2" /> Excluir
        </Button>
      </div>
    </div>
  );
}
