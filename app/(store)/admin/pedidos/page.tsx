"use client";
import { useState, useEffect } from "react";
import { Pedido, StatusPedido } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Popup } from "@/components/ui/Popup";
import { Search } from "lucide-react";

const API_URL = 'http://localhost:8080/api';

export default function AdminPedidosPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [statusList, setStatusList] = useState<StatusPedido[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [popup, setPopup] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [pedidosRes, statusRes] = await Promise.all([
                fetch(`${API_URL}/pedidos`),
                fetch(`${API_URL}/status-pedido`),
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

    useEffect(() => { fetchData(); }, []);

    const handleStatusChange = async (pedidoId: number, novoStatusId: number) => {
        try {
            const response = await fetch(`${API_URL}/pedidos/${pedidoId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statusId: novoStatusId }),
            });
            if (!response.ok) throw new Error('Falha ao atualizar status.');

            setPopup({ show: true, type: 'success', message: 'Status do pedido atualizado com sucesso!'});
            // Atualiza o estado local para refletir a mudança instantaneamente
            setPedidos(prevPedidos => prevPedidos.map(p => {
                if (p.id === pedidoId) {
                    const novoStatus = statusList.find(s => s.id === novoStatusId);
                    return { ...p, statusPedido: novoStatus! };
                }
                return p;
            }));
        } catch (error: any) {
            setPopup({ show: true, type: 'error', message: error.message });
        }
    };

    const filteredPedidos = pedidos.filter(p => 
        p.id.toString().padStart(6, '0').includes(searchTerm)
    );

    if (isLoading) return <div>Carregando pedidos...</div>;

    return (
        <>
            {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
            <div>
                <h1 className="text-3xl font-bold mb-6">Gerenciar Pedidos</h1>

                <div className="relative mb-6 max-w-sm">
                    <Input 
                        placeholder="Filtrar por número do pedido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Pedido</th>
                                <th className="px-6 py-3 text-left">Cliente</th>
                                <th className="px-6 py-3 text-left">Data</th>
                                <th className="px-6 py-3 text-left">Valor</th>
                                <th className="px-6 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPedidos.map(pedido => (
                                <tr key={pedido.id}>
                                    <td className="px-6 py-4 font-mono">#{pedido.id.toString().padStart(6, '0')}</td>
                                    <td className="px-6 py-4">{pedido.nomeCliente}</td>
                                    <td className="px-6 py-4">{new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4">{pedido.valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={pedido.statusPedido.id}
                                            onChange={(e) => handleStatusChange(pedido.id, parseInt(e.target.value))}
                                            className="border-gray-300 rounded-md p-2"
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
                </div>
            </div>
        </>
    );
}