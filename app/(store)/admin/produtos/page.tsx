// src/app/(store)/admin/produtos/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Produto } from "@/types";
import { Button } from "@/components/ui/Button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { Popup } from "@/components/ui/Popup";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const API_URL = 'http://localhost:8080/api/produtos';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Produto | null>(null);
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Falha ao carregar produtos.");
      setProducts(await response.json());
    } catch (error: any) {
      setPopup({ show: true, type: 'error', message: error.message });
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = () => { setEditingProduct(null); setIsFormOpen(true); };
  const handleEdit = (product: Produto) => { setEditingProduct(product); setIsFormOpen(true); };
  
  const handleDelete = async () => {
    if (!deletingProduct) return;
    try {
      const response = await fetch(`${API_URL}/${deletingProduct.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Falha ao excluir produto.");
      fetchProducts();
      setPopup({ show: true, type: 'success', message: 'Produto excluído com sucesso!' });
    } catch (error: any) {
      setPopup({ show: true, type: 'error', message: error.message });
    } finally {
      setDeletingProduct(null);
    }
  };

  const onFormSave = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
    setPopup({ show: true, type: 'success', message: `Produto ${editingProduct ? 'atualizado' : 'criado'} com sucesso!` });
  };

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <ConfirmationModal isOpen={!!deletingProduct} onClose={() => setDeletingProduct(null)} onConfirm={handleDelete} title="Confirmar Exclusão" message={`Tem certeza que deseja excluir o produto "${deletingProduct?.nome}"?`} />
      
      {isFormOpen ? (
        <AdminProductForm initialData={editingProduct} onSave={onFormSave} onCancel={() => setIsFormOpen(false)} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
            <Button onClick={handleAdd}>
              <PlusCircle size={20} className="mr-2" />
              Adicionar Novo Brinquedo
            </Button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.quantidadeEstoque}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900"><Edit size={18}/></button>
                      <button onClick={() => setDeletingProduct(product)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}