// src/app/(store)/conta/dados/page.tsx

"use client"; // Essencial para gerenciar o estado de edição

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Usuario } from "@/types";

// Dados mockados do usuário logado
const mockUser: Usuario = {
  id: 1,
  nome: "Peter Parker",
  email: "peter.parker@email.com",
  cpf: "123.456.789-00",
  telefone: "98765-4321",
  ddd: "11",
  administrador: false,
};

export default function UserDataPage() {
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estados para os valores do formulário (inicializados com dados mockados)
  const [formData, setFormData] = useState({
    nome: mockUser.nome,
    email: mockUser.email,
    cpf: mockUser.cpf,
    ddd: mockUser.ddd,
    telefone: mockUser.telefone,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Meus Dados Pessoais</h2>

      {/* Formulário */}
      <form className="space-y-6">
        {/* Campo Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <Input id="nome" type="text" value={formData.nome} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" />
        </div>

        {/* Campo CPF */}
        <div>
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <Input id="cpf" type="text" value={formData.cpf} disabled className="mt-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" />
          <p className="text-xs text-gray-500 mt-1">O CPF não pode ser alterado.</p>
        </div>

        {/* Campo Telefone */}
        <div className="flex gap-4">
          <div className="w-1/4">
            <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">DDD</label>
            <Input id="ddd" type="text" value={formData.ddd} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>
          <div className="w-3/4">
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <Input id="telefone" type="text" value={formData.telefone} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {isEditing ? (
            <>
              <Button type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
              <Button type="submit" onClick={() => setIsEditing(false)}>Salvar Alterações</Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Editar Dados</Button>
          )}
        </div>
      </form>
    </div>
  );
}