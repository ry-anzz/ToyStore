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

  // Função para popular o formulário com os dados originais do usuário
  const populateForm = () => {
    if (user) {
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
  };

  useEffect(() => {
    populateForm();
  }, [user]);

  // Função para aplicar máscaras e limites enquanto o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let maskedValue = value;

    if (id === 'ddd') {
      maskedValue = value.replace(/\D/g, '').substring(0, 2);
    } else if (id === 'telefone') {
      let v = value.replace(/\D/g, '').substring(0, 9);
      if (v.length > 5) v = v.replace(/(\d{5})(\d{4})/, '$1-$2');
      else if (v.length > 4) v = v.replace(/(\d{4})(\d{0,4})/, '$1-$2');
      if (v.endsWith('-')) v = v.slice(0, -1);
      maskedValue = v;
    }

    setFormData((prevData) => ({ ...prevData, [id]: maskedValue }));
  };

  // Função para o botão "Cancelar"
  const handleCancel = () => {
    populateForm(); // Repopula o formulário com os dados originais
    setIsEditing(false); // Sai do modo de edição
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Prepara os dados para enviar (sem máscaras)
    const dataToSave = {
      ...formData,
      telefone: formData.telefone.replace(/\D/g, '') // Remove o hífen do telefone
    };

    try {
      const response = await fetch(`${API_URL}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        updateUser(updatedUserData);
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
          <Input id="nome" type="text" value={formData.nome} disabled className="w-full bg-gray-100 cursor-not-allowed" />
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="w-full" />
          <Input id="cpf" type="text" value={formData.cpf} disabled className="w-full bg-gray-100 cursor-not-allowed" />
          <div className="flex gap-4">
            <div className="w-1/4">
              <label htmlFor="ddd">DDD</label>
              <Input id="ddd" type="text" value={formData.ddd} onChange={handleInputChange} disabled={!isEditing} className="w-full" />
            </div>
            <div className="w-3/4">
              <label htmlFor="telefone">Telefone</label>
              <Input id="telefone" type="text" value={formData.telefone} onChange={handleInputChange} disabled={!isEditing} className="w-full" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button type="button" onClick={handleCancel} className="bg-gray-600 hover:bg-red-700">Cancelar</Button>
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