// src/components/user/OrderItem.tsx
import { Pedido } from "@/types";
import { Button } from "../ui/Button";
import Link from 'next/link'; // 1. Importar o componente Link

interface OrderItemProps {
  order: Pedido;
}

const statusColors: { [key: string]: string } = {
  'Entregue': 'bg-green-100 text-green-800',
  'A caminho': 'bg-blue-100 text-blue-800',
  'Preparando pacote': 'bg-yellow-100 text-yellow-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

export function OrderItem({ order }: OrderItemProps) {
  const formattedDate = new Date(order.dataPedido).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <div className="border rounded-lg p-4 space-y-4 transition-shadow hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b">
        <div>
          <h3 className="font-bold text-lg">Pedido #{order.id.toString().padStart(6, '0')}</h3>
          <p className="text-sm text-gray-500">Realizado em: {formattedDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.statusPedido.nome] || 'bg-gray-100'}`}>
            {order.statusPedido.nome}
          </span>
          <p className="font-bold text-lg">
            {order.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex items-center -space-x-2">
          {order.itens.slice(0, 4).map((item) => (
            <img
              key={item.produto.id}
              src={item.produto.imagens?.[0]?.imagemUrl || ''}
              alt={item.produto.nome}
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />
          ))}
          {order.itens.length > 4 && (
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white bg-gray-100 text-gray-600 font-semibold">
              +{order.itens.length - 4}
            </div>
          )}
        </div>
        
        {/* 2. AQUI ESTÁ A CORREÇÃO: O botão agora é um link */}
        <Button asChild>
          <Link href={`/conta/pedidos/${order.id}`}>Ver Detalhes</Link>
        </Button>
      </div>
    </div>
  );
}