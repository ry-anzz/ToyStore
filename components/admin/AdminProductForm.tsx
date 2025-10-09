"use client";

import { useState, useEffect } from 'react';
import { Produto, Marca, Categoria, ProdutoImagem } from '@/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Trash2 } from 'lucide-react';

interface AdminProductFormProps {
  initialData: Produto | null;
  onSave: () => void;
  onCancel: () => void;
}

const API_URL = 'http://localhost:8080/api';

export function AdminProductForm({ initialData, onSave, onCancel }: AdminProductFormProps) {
  const [brands, setBrands] = useState<Marca[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: 0,
    quantidadeEstoque: 0,
    marcaId: '',
    categoriaId: '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Busca marcas e categorias
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/marcas`),
          fetch(`${API_URL}/categorias`),
        ]);
        if (!brandsRes.ok || !categoriesRes.ok) throw new Error("Falha ao carregar dados.");
        setBrands(await brandsRes.json());
        setCategories(await categoriesRes.json());
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        descricao: initialData.descricao,
        valor: initialData.valor,
        quantidadeEstoque: initialData.quantidadeEstoque || 0,
        marcaId: initialData.marca?.id.toString() || '',
        categoriaId: initialData.categoria?.id.toString() || '',
      });
      setImageUrls(initialData.imagens.map(img => img.imagemUrl));
    }
  }, [initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST', body: body,
      });
      if (!response.ok) throw new Error('Falha no upload da imagem.');
      const result = await response.json();
      setImageUrls(prev => [...prev, result.data.display_url]);
    } catch (error) {
      alert('Não foi possível enviar a imagem.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const removeImage = (urlToRemove: string) => {
    setImageUrls(prev => prev.filter(url => url !== urlToRemove));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      const numValue = value === '' ? 0 : parseInt(value, 10);
      setFormData(prev => ({ ...prev, [name]: Math.max(0, numValue) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits === '') digits = '0';
    const numericValue = Number(digits) / 100;
    setFormData(prev => ({ ...prev, valor: numericValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
      alert("Por favor, envie pelo menos uma imagem para o produto.");
      return;
    }

    const url = initialData ? `${API_URL}/produtos/${initialData.id}` : `${API_URL}/produtos`;
    const method = initialData ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      valor: formData.valor,
      marca: { id: parseInt(formData.marcaId) },
      categoria: { id: parseInt(formData.categoriaId) },
      imagens: imageUrls.map(url => ({ imagemUrl: url })),
    };

    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Falha ao salvar produto.");
      onSave();
    } catch (error: any) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{initialData ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700">Nome do Brinquedo</label><Input name="nome" value={formData.nome} onChange={handleChange} required className="w-full mt-1" placeholder="Ex: Carrinho de Controle Remoto"/></div>
        <div className="flex gap-4"><div className="w-1/2"><label className="block text-sm font-medium text-gray-700">Marca</label><select name="marcaId" value={formData.marcaId} onChange={handleChange} required className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"><option value="" disabled>Selecione</option>{brands.map(brand => <option key={brand.id} value={brand.id}>{brand.nome}</option>)}</select></div><div className="w-1/2"><label className="block text-sm font-medium text-gray-700">Categoria</label><select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"><option value="" disabled>Selecione</option>{categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nome}</option>)}</select></div></div>
        <div><label className="block text-sm font-medium text-gray-700">Descrição</label><textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={4} className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Descreva as características principais do produto..."/></div>
        <div className="flex gap-4"><div className="w-1/2"><label className="block text-sm font-medium text-gray-700">Preço (R$)</label><Input name="valor" type="text" value={formData.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} onChange={handlePriceChange} required className="w-full mt-1"/></div><div className="w-1/2"><label className="block text-sm font-medium text-gray-700">Estoque</label><Input name="quantidadeEstoque" type="number" min="0" value={formData.quantidadeEstoque} onChange={handleChange} required className="w-full mt-1"/></div></div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagens do Produto</label>
          <Input type="file" onChange={handleImageUpload} accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          {isUploading && <p className="text-sm text-blue-600 mt-2">Enviando imagem, por favor aguarde...</p>}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`Pré-visualização ${index + 1}`} className="rounded-lg border object-cover h-32 w-full" />
                <button type="button" onClick={() => removeImage(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
          <Button type="submit" disabled={isUploading}>{isUploading ? 'Aguarde...' : 'Salvar Produto'}</Button>
        </div>
      </form>
    </div>
  );
}