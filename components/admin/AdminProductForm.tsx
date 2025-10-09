// src/components/admin/AdminProductForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { Produto, Marca } from '@/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AdminProductFormProps {
  initialData: Produto | null;
  onSave: () => void;
  onCancel: () => void;
}

const API_URL = 'http://localhost:8080/api';

export function AdminProductForm({ initialData, onSave, onCancel }: AdminProductFormProps) {
  const [brands, setBrands] = useState<Marca[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: 0,
    imagem_url: '',
    quantidadeEstoque: 0,
    marcaId: '', 
  });

  // Efeito para buscar as marcas da API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_URL}/marcas`);
        if (!response.ok) throw new Error("Falha ao carregar marcas.");
        setBrands(await response.json());
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);

  // Preenche o formulário se estiver no modo de edição
  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        descricao: initialData.descricao,
        valor: initialData.valor,
        imagem_url: initialData.imagem_url,
        quantidadeEstoque: initialData.quantidadeEstoque || 0,
        marcaId: (initialData.marca as Marca)?.id?.toString() || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = initialData ? `${API_URL}/produtos/${initialData.id}` : API_URL;
    const method = initialData ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      marca: { id: parseInt(formData.marcaId) }
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Falha ao salvar produto.");
      onSave();
    } catch (error) {
      alert("Erro: " + (error as Error).message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{initialData ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Brinquedo</label>
          <Input name="nome" value={formData.nome} onChange={handleChange} required className="w-full mt-1" />
        </div>

        <div>
          <label htmlFor="marcaId" className="block text-sm font-medium text-gray-700">Marca</label>
          <select name="marcaId" value={formData.marcaId} onChange={handleChange} required
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Selecione uma marca</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={4}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <Input name="valor" type="number" step="0.01" value={formData.valor} onChange={handleChange} required className="w-full mt-1" />
          </div>
          <div className="w-1/2">
            <label htmlFor="quantidadeEstoque" className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <Input name="quantidadeEstoque" type="number" min="0" value={formData.quantidadeEstoque} onChange={handleChange} required className="w-full mt-1" />
          </div>
        </div>
        <div>
          <label htmlFor="imagem_url" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <Input name="imagem_url" value={formData.imagem_url} onChange={handleChange} required className="w-full mt-1" />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </div>
  );
}