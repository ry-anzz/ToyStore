// src/app/(store)/conta/enderecos/page.tsx

"use client"; // ESSENCIAL para usar o useState

import { useState } from "react";
import { AddressCard } from "@/components/user/AddressCard";
import { AddressForm } from "@/components/user/AddressForm";
import { Button } from "@/components/ui/Button";
import { Endereco } from "@/types";
import { PlusCircle } from "lucide-react";

// Dados mockados
const mockAddresses: (Endereco & { padrao?: boolean })[] = [
  { id: 1, usuario_id: 1, nome: "Casa", rua: "Rua dos Bobos", numero: "0", bairro: "Vila Sésamo", cidade: "São Paulo", uf: "SP", cep: "01234-567", padrao: true },
  { id: 2, usuario_id: 1, nome: "Trabalho", rua: "Avenida Faria Lima", numero: "1000", bairro: "Itaim Bibi", cidade: "São Paulo", uf: "SP", cep: "05426-100" },
];

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meus Endereços</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle size={18} className="mr-2" />
            Adicionar Novo Endereço
          </Button>
        )}
      </div>

      {/* Mostra o formulário se showForm for true */}
      {showForm && <AddressForm onCancel={() => setShowForm(false)} />}
      
      {/* Mostra a lista de endereços se o formulário NÃO estiver visível */}
      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {mockAddresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}
    </div>
  );
}