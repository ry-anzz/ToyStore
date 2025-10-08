// src/app/(store)/conta/dados/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext"; // 1. Importar o hook de autenticação

// 2. O 'mockUser' foi removido daqui.

export default function UserDataPage() {
  const { user } = useAuth(); // 3. Buscar os dados do usuário real do contexto
  const [isEditing, setIsEditing] = useState(false);

  // Inicializa o formulário com dados vazios ou os do usuário, se já disponíveis
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    cpf: user?.cpf || "",
    ddd: user?.ddd || "",
    telefone: user?.telefone || "",
  });

  // 4. Efeito para preencher o formulário assim que os dados do usuário estiverem disponíveis
  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        ddd: user.ddd || "", // Garante que o valor não seja nulo
        telefone: user.telefone,
      });
    }
  }, [user]); // Este efeito roda sempre que o 'user' for carregado/alterado

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  
  // Exibe uma mensagem de carregamento enquanto os dados do usuário não chegam
  if (!user) {
    return <div>Carregando seus dados...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Meus Dados Pessoais</h2>

      <form className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <Input id="nome" type="text" value={formData.nome} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full" />
        </div>

        <div>
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <Input id="cpf" type="text" value={formData.cpf} disabled className="mt-1 w-full bg-gray-100 cursor-not-allowed" />
          <p className="text-xs text-gray-500 mt-1">O CPF não pode ser alterado.</p>
        </div>

        <div className="flex gap-4">
          <div className="w-1/4">
            <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">DDD</label>
            <Input id="ddd" type="text" value={formData.ddd} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full" />
          </div>
          <div className="w-3/4">
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <Input id="telefone" type="text" value={formData.telefone} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full" />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          {isEditing ? (
            <>
              <Button type="button" onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
              <Button type="submit" onClick={(e) => { e.preventDefault(); setIsEditing(false); /* Lógica de salvar aqui */ }}>Salvar Alterações</Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>Editar Dados</Button>
          )}
        </div>
      </form>
    </div>
  );
}