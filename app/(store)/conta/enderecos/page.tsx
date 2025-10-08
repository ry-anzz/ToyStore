// src/app/(store)/conta/enderecos/page.tsx
"use client";

import { useState } from "react";
import { AddressCard } from "@/components/user/AddressCard";
import { AddressForm } from "@/components/user/AddressForm";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Endereco } from "@/types";
import { Popup } from "@/components/ui/Popup";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const API_URL = 'http://localhost:8080/api';

export default function AddressesPage() {
  const { user, updateUserAddresses } = useAuth();
  const [editingAddress, setEditingAddress] = useState<Endereco | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Endereco | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

  const handleSaveAddress = async (addressData: Endereco) => {
    // Se tem um ID, é uma atualização (PUT), senão é uma criação (POST)
    const isEditing = !!addressData.id;
    const url = isEditing ? `${API_URL}/enderecos/${addressData.id}` : `${API_URL}/enderecos`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addressData, usuarioId: user?.id }), // Garante que o ID do usuário está no corpo
      });

      if (!response.ok) throw new Error("Falha ao salvar endereço.");

      // Atualiza a lista de endereços no frontend
      const updatedAddresses = isEditing
        ? user?.enderecos?.map(a => a.id === addressData.id ? addressData : a) || []
        : [...(user?.enderecos || []), await response.json()];

      updateUserAddresses(updatedAddresses);
      setPopup({ show: true, type: 'success', message: 'Endereço salvo com sucesso!' });
      setIsFormOpen(false);
      setEditingAddress(null);
    } catch (error) {
      setPopup({ show: true, type: 'error', message: 'Não foi possível salvar o endereço.' });
    }
  };

  const handleDeleteAddress = async () => {
    if (!deletingAddress) return;

    try {
      const response = await fetch(`${API_URL}/enderecos/${deletingAddress.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Falha ao deletar endereço.");
      
      const updatedAddresses = user?.enderecos?.filter(a => a.id !== deletingAddress.id) || [];
      updateUserAddresses(updatedAddresses);
      
      setPopup({ show: true, type: 'success', message: 'Endereço excluído com sucesso!' });
    } catch (error) {
      setPopup({ show: true, type: 'error', message: 'Não foi possível excluir o endereço.' });
    } finally {
      setDeletingAddress(null); // Fecha o modal de confirmação
    }
  };

  if (!user) return <div>Carregando endereços...</div>;

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <ConfirmationModal
        isOpen={!!deletingAddress}
        onClose={() => setDeletingAddress(null)}
        onConfirm={handleDeleteAddress}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita."
      />

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Meus Endereços</h2>
          {!isFormOpen && (
            <Button onClick={() => { setEditingAddress(null); setIsFormOpen(true); }}>
              <PlusCircle size={18} className="mr-2" />
              Adicionar Novo Endereço
            </Button>
          )}
        </div>

        {isFormOpen ? (
          <AddressForm 
            onCancel={() => { setIsFormOpen(false); setEditingAddress(null); }} 
            onSave={handleSaveAddress}
            initialData={editingAddress}
          />
        ) : (
          user.enderecos && user.enderecos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {user.enderecos.map((address) => (
                <AddressCard 
                  key={address.id} 
                  address={address} 
                  onEdit={() => { setEditingAddress(address); setIsFormOpen(true); }}
                  onDelete={() => setDeletingAddress(address)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-600">Você ainda não tem nenhum endereço cadastrado.</p>
          )
        )}
      </div>
    </>
  );
}