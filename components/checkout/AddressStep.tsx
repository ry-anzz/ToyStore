// src/components/checkout/AddressStep.tsx

"use client";

import { useState } from "react";
import { Endereco } from "@/types";
import { Button } from "../ui/Button";

// Mock de endereços salvos
const mockAddresses: (Endereco & { padrao?: boolean })[] = [
    { id: 1, usuario_id: 1, nome: "Casa", rua: "Rua dos Bobos", numero: "0", bairro: "Vila Sésamo", cidade: "São Paulo", uf: "SP", cep: "01234-567", padrao: true },
    { id: 2, usuario_id: 1, nome: "Trabalho", rua: "Avenida Faria Lima", numero: "1000", bairro: "Itaim Bibi", cidade: "São Paulo", uf: "SP", cep: "05426-100" },
];

interface AddressStepProps {
  onContinue: () => void;
}

export function AddressStep({ onContinue }: AddressStepProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(mockAddresses.find(a => a.padrao)?.id ?? null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">1. Endereço de Entrega</h2>
      <div className="space-y-4">
        {mockAddresses.map(address => (
          <div
            key={address.id}
            onClick={() => setSelectedAddressId(address.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedAddressId === address.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
            }`}
          >
            <p className="font-bold">{address.nome}</p>
            <p className="text-sm text-gray-600">{address.rua}, {address.numero} - {address.bairro}</p>
            <p className="text-sm text-gray-600">{address.cidade}, {address.uf} - {address.cep}</p>
          </div>
        ))}
      </div>
      <Button 
        className="w-full mt-6 text-lg" 
        onClick={onContinue}
        disabled={!selectedAddressId}
      >
        Continuar para Pagamento
      </Button>
    </div>
  );
}