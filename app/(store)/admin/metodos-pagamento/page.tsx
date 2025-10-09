"use client";
import { useState, useEffect } from "react";
import { MetodoPagamento } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Popup } from "@/components/ui/Popup";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const API_URL = 'http://localhost:8080/api/metodos-pagamento';

export default function AdminMetodosPagamentoPage() {
    const [items, setItems] = useState<MetodoPagamento[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MetodoPagamento | null>(null);
    const [deletingItem, setDeletingItem] = useState<MetodoPagamento | null>(null);
    const [itemName, setItemName] = useState('');
    const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Falha ao carregar dados.");
            setItems(await res.json());
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingItem ? 'PUT' : 'POST';
        const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;
        
        try {
            const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: itemName }) });
            if (!response.ok) throw new Error("Falha ao salvar.");
            
            setPopup({ show: true, type: 'success', message: `Item ${editingItem ? 'atualizado' : 'criado'} com sucesso!` });
            resetForm();
            fetchData();
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };
    
    const handleDelete = async () => {
        if (!deletingItem) return;
        try {
            const response = await fetch(`${API_URL}/${deletingItem.id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Falha ao excluir.");
            
            setPopup({ show: true, type: 'success', message: 'Item excluído com sucesso!' });
            setDeletingItem(null);
            fetchData();
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
            setDeletingItem(null);
        }
    };

    const resetForm = () => { setIsFormOpen(false); setEditingItem(null); setItemName(''); };
    const openEditForm = (item: MetodoPagamento) => { setEditingItem(item); setItemName(item.nome); setIsFormOpen(true); };

    return (
        <>
            {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
            <ConfirmationModal isOpen={!!deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleDelete} title="Confirmar Exclusão" message={`Tem certeza que deseja excluir "${deletingItem?.nome}"?`} />

            <div>
                <h1 className="text-3xl font-bold mb-6">Gerenciar Métodos de Pagamento</h1>
                {!isFormOpen && <Button onClick={() => setIsFormOpen(true)}><PlusCircle size={20} className="mr-2"/> Adicionar Método</Button>}

                {isFormOpen && (
                    <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md my-6">
                        <h2 className="text-xl font-bold mb-4">{editingItem ? 'Editar Método' : 'Novo Método'}</h2>
                        <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Ex: Cartão de Crédito" required className="w-full"/>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                )}

                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Nome</th><th className="px-6 py-3 text-right">Ações</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map(item => (
                                <tr key={item.id}><td className="px-6 py-4">{item.nome}</td><td className="px-6 py-4 text-right space-x-4"><button onClick={() => openEditForm(item)} className="text-blue-600 hover:text-blue-900"><Edit size={18}/></button><button onClick={() => setDeletingItem(item)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}