// src/app/(store)/conta/dados/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { Popup } from "@/components/ui/Popup";

const API_URL = 'http://localhost:8080/api';

export default function UserDataPage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });
  
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', ddd: '', telefone: '',
  });

  // Efeito para preencher o formulário quando os dados do usuário estiverem disponíveis
  useEffect(() => {
    if (user) {
      // Separa o DDD do restante do telefone
      const ddd = user.telefone?.substring(0, 2) || '';
      const telefone = user.telefone?.substring(2) || '';
      
      setFormData({
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        ddd: ddd,
        telefone: telefone,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Nova função para salvar as alterações
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`${API_URL}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        updateUser(updatedUserData); // Atualiza o contexto global
        setIsEditing(false);
        setPopup({ show: true, type: 'success', message: 'Dados atualizados com sucesso!' });
      } else {
        throw new Error('Falha ao atualizar os dados.');
      }
    } catch (error) {
      setPopup({ show: true, type: 'error', message: 'Não foi possível salvar as alterações.' });
    }
  };
  
  if (!user) {
    return <div>Carregando seus dados...</div>;
  }

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Meus Dados Pessoais</h2>

        <form onSubmit={handleSaveChanges} className="space-y-6">
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

          {/* LAYOUT CORRIGIDO PARA DDD E TELEFONE */}
          <div className="flex gap-4">
            <div className="w-1/4">
              <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">DDD</label>
              <Input id="ddd" type="text" value={formData.ddd} onChange={handleInputChange} disabled={!isEditing} className="mt-1 w-full" maxLength={2} />
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
                <Button type="submit">Salvar Alterações</Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>Editar Dados</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}