"use client";

import { useState } from "react";
import { Endereco } from "@/types";
import { Button } from "../ui/Button"; // CAMINHO CORRIGIDO AQUI
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface AddressStepProps {
  onContinue: (selectedAddressId: number) => void;
}

export function AddressStep({ onContinue }: AddressStepProps) {
  const { user } = useAuth();
  const userAddresses = user?.enderecos || [];

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(userAddresses[0]?.id || null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">1. Endereço de Entrega</h2>
      
      {userAddresses.length > 0 ? (
        <div className="space-y-4">
          {userAddresses.map(address => (
            <div
              key={address.id}
              onClick={() => setSelectedAddressId(address.id!)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAddressId === address.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
            >
              <p className="font-bold">{address.apelido || 'Endereço'}</p>
              <p className="text-sm text-gray-600">{address.rua}, {address.numero} - {address.bairro}</p>
              <p className="text-sm text-gray-600">{address.cidade}, {address.uf} - {address.cep}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-gray-600">Você não tem nenhum endereço cadastrado.</p>
            <Button asChild className="mt-4">
                <Link href="/conta/enderecos">Cadastrar Endereço</Link>
            </Button>
        </div>
      )}

      <Button 
        className="w-full mt-6 text-lg" 
        onClick={() => onContinue(selectedAddressId!)}
        disabled={!selectedAddressId || userAddresses.length === 0}
      >
        Continuar para Pagamento
      </Button>
    </div>
  );
}