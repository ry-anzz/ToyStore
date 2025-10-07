// src/components/user/OrderItem.tsx

import { Produto } from "@/types";
import { Button } from "../ui/Button";

// Simulando a estrutura de um pedido que viria da API
export interface Order {
  id: string;
  data: string;
  status: 'Entregue' | 'A caminho' | 'Processando';
  valorTotal: number;
  itens: {
    produto: Pick<Produto, 'imagem_url' | 'nome'>;
  }[];
}

interface OrderItemProps {
  order: Order;
}

// Cores para os status do pedido
const statusColors = {
  'Entregue': 'bg-green-100 text-green-800',
  'A caminho': 'bg-blue-100 text-blue-800',
  'Processando': 'bg-yellow-100 text-yellow-800',
};

export function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 transition-shadow hover:shadow-lg">
      {/* Cabeçalho do Pedido */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b">
        <div>
          <h3 className="font-bold text-lg">Pedido #{order.id}</h3>
          <p className="text-sm text-gray-500">Realizado em: {order.data}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.status]}`}>
            {order.status}
          </span>
          <p className="font-bold text-lg">
            {order.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      {/* Itens do Pedido e Botão */}
      <div className="flex justify-between items-end">
        {/* Imagens dos produtos */}
        <div className="flex items-center space-x-2">
          {order.itens.slice(0, 4).map((item, index) => (
            <img
              key={index}
              src={item.produto.imagem_url}
              alt={item.produto.nome}
              className="w-14 h-14 rounded-md object-cover border"
            />
          ))}
          {order.itens.length > 4 && (
            <div className="flex items-center justify-center w-14 h-14 rounded-md border bg-gray-100 text-gray-600 font-semibold">
              +{order.itens.length - 4}
            </div>
          )}
        </div>
        <Button >Ver Detalhes</Button>
      </div>
    </div>
  );
}

// Adicione isso no seu `tailwind.config.ts` se o Button não tiver essas props
// No nosso caso, vamos criar um botão mais simples
// e podemos passar a classe diretamente.
// Para simplificar, vou ajustar o componente do botão depois. Por agora, vamos usar um genérico.