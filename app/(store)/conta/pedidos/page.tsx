// src/app/(store)/conta/pedidos/page.tsx

import { OrderItem, Order } from "@/components/user/OrderItem";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Dados mockados para simular a lista de pedidos de um usuário
const mockOrders: Order[] = [
  {
    id: 'BR1001',
    data: '05 de Outubro, 2025',
    status: 'Entregue',
    valorTotal: 239.90,
    itens: [
      { produto: { imagem_url: '/images/lego.jpg', nome: 'Lego Classic' } },
      { produto: { imagem_url: '/images/barbie.jpg', nome: 'Boneca Barbie' } },
    ],
  },
  {
    id: 'BR1002',
    data: '28 de Setembro, 2025',
    status: 'A caminho',
    valorTotal: 150.00,
    itens: [
      { produto: { imagem_url: '/images/lego.jpg', nome: 'Lego Classic' } },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Histórico de Pedidos</h2>
      
      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Você ainda não fez nenhum pedido.</h3>
          <p className="text-gray-500 mt-2">Que tal encontrar um brinquedo novo?</p>
          <Button  className="mt-4">
            <Link href="/">Ir para a Loja</Link>
          </Button>
        </div>
      )}
    </div>
  );
}