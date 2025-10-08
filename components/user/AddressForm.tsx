// src/components/user/AddressForm.tsx
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Endereco } from "@/types";

interface AddressFormProps {
  onCancel: () => void;
  onSave: (addressData: Endereco) => void;
  initialData?: Endereco | null; // Dados para edição
}

export function AddressForm({ onCancel, onSave, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState({
    apelido: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', uf: ''
  });

  // Preenche o formulário se estiver no modo de edição
  useEffect(() => {
    if (initialData) {
      setFormData({
        apelido: initialData.apelido || '',
        cep: initialData.cep,
        rua: initialData.rua,
        numero: initialData.numero,
        bairro: initialData.bairro,
        cidade: initialData.cidade,
        uf: initialData.uf,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...initialData, ...formData });
  };

  return (
    <div className="border rounded-lg p-6 bg-gray-50 mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? 'Editar Endereço' : 'Adicionar Novo Endereço'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-6">
          <label htmlFor="apelido">Apelido do Endereço</label>
          <Input id="apelido" type="text" value={formData.apelido} onChange={handleInputChange} placeholder="Ex: Casa, Trabalho" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cep">CEP</label>
          <Input id="cep" type="text" value={formData.cep} onChange={handleInputChange} placeholder="00000-000" required />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="rua">Rua</label>
          <Input id="rua" type="text" value={formData.rua} onChange={handleInputChange} placeholder="Nome da sua rua" required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="numero">Número</label>
          <Input id="numero" type="text" value={formData.numero} onChange={handleInputChange} placeholder="123" required />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="bairro">Bairro</label>
          <Input id="bairro" type="text" value={formData.bairro} onChange={handleInputChange} placeholder="Seu bairro" required />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="cidade">Cidade</label>
          <Input id="cidade" type="text" value={formData.cidade} onChange={handleInputChange} placeholder="Sua cidade" required />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="uf">UF</label>
          <Input id="uf" type="text" value={formData.uf} onChange={handleInputChange} placeholder="SP" required maxLength={2} />
        </div>
        <div className="sm:col-span-6 flex justify-end gap-2 mt-2">
            <Button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
            <Button type="submit">Salvar Endereço</Button>
        </div>
      </form>
    </div>
  );
}