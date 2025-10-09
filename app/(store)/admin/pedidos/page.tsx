"use client";

import { useState, useEffect } from "react";
import { Pedido, StatusPedido } from "@/types";
import { Input } from "@/components/ui/Input";
import { Popup } from "@/components/ui/Popup";
import { Search } from "lucide-react";

const API_URL = 'http://localhost:8080/api';

const statusColors: { [key: string]: string } = {
  'Entregue': 'bg-green-100 text-green-800',
  'A caminho': 'bg-blue-100 text-blue-800',
  'Preparando pacote': 'bg-yellow-100 text-yellow-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

export default function AdminPedidosPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [statusList, setStatusList] = useState<StatusPedido[]>([]);
    const [filtro, setFiltro] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [pedidosRes, statusRes] = await Promise.all([
                fetch(`${API_URL}/pedidos`),
                fetch(`${API_URL}/pedidos/status`)
            ]);
            if (!pedidosRes.ok || !statusRes.ok) throw new Error("Falha ao carregar dados.");
            setPedidos(await pedidosRes.json());
            setStatusList(await statusRes.json());
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (pedidoId: number, novoStatusId: string) => {
        try {
            const response = await fetch(`${API_URL}/pedidos/${pedidoId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statusId: Number(novoStatusId) }),
            });

            if (!response.ok) throw new Error("Falha ao atualizar o status.");

            // Atualiza o estado local para refletir a mudança imediatamente
            setPedidos(prevPedidos =>
                prevPedidos.map(p =>
                    p.id === pedidoId
                        ? { ...p, statusPedido: statusList.find(s => s.id === Number(novoStatusId))! }
                        : p
                )
            );
            setPopup({ show: true, type: 'success', message: 'Status do pedido atualizado!' });

        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    const pedidosFiltrados = pedidos.filter(p =>
        p.id.toString().padStart(6, '0').includes(filtro)
    );

    return (
        <>
            {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
            <div>
                <h1 className="text-3xl font-bold mb-6">Gerenciar Pedidos</h1>

                <div className="relative mb-6 max-w-sm">
                    <Input
                        type="text"
                        placeholder="Buscar pelo nº do pedido..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                
                {isLoading ? <p>Carregando pedidos...</p> : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nº Pedido</th>
                                    <th className="px-6 py-3 text-left">Cliente</th>
                                    <th className="px-6 py-3 text-left">Data</th>
                                    <th className="px-6 py-3 text-left">Valor Total</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pedidosFiltrados.map(pedido => (
                                    <tr key={pedido.id}>
                                        <td className="px-6 py-4 font-medium">#{pedido.id.toString().padStart(6, '0')}</td>
                                        <td className="px-6 py-4">{pedido.usuario.nome}</td>
                                        <td className="px-6 py-4">{new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-6 py-4">{pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={pedido.statusPedido.id}
                                                onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                                                className={`p-2 rounded-md border text-sm ${statusColors[pedido.statusPedido.nome] || 'bg-gray-100'}`}
                                            >
                                                {statusList.map(status => (
                                                    <option key={status.id} value={status.id}>{status.nome}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         {pedidosFiltrados.length === 0 && <p className="text-center py-8 text-gray-500">Nenhum pedido encontrado.</p>}
                    </div>
                )}
            </div>
        </>
    );
}