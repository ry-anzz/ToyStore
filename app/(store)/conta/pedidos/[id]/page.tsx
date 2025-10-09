// src/app/(store)/conta/pedidos/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pedido } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:8080/api";

const statusColors: { [key: string]: string } = {
  'Entregue': 'bg-green-100 text-green-800',
  'A caminho': 'bg-blue-100 text-blue-800',
  'Preparando pacote': 'bg-yellow-100 text-yellow-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPedido = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/pedidos/${id}`);
        if (response.ok) {
          setPedido(await response.json());
        } else {
          // Se o pedido não for encontrado, redireciona para a página de pedidos
          router.push('/conta/pedidos');
        }
      } catch (error) {
        console.error("Falha ao buscar detalhes do pedido:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPedido();
  }, [id, router]);

  if (isLoading) {
    return <div>Carregando detalhes do pedido...</div>;
  }

  if (!pedido) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">Pedido não encontrado.</h2>
        <Button asChild className="mt-4">
          <Link href="/conta/pedidos">Voltar para Meus Pedidos</Link>
        </Button>
      </div>
    );
  }

  const subtotal = pedido.itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);

  return (
    <div>
      <Link href="/conta/pedidos" className="flex items-center gap-2 text-blue-600 hover:underline mb-6 font-semibold">
          <ArrowLeft size={18} />
          Voltar para Meus Pedidos
      </Link>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Cabeçalho do Pedido */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Detalhes do Pedido #{pedido.id.toString().padStart(6, '0')}</h1>
            <p className="text-sm text-gray-500">
              Realizado em: {new Date(pedido.dataPedido).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[pedido.statusPedido.nome] || 'bg-gray-100'}`}>
            {pedido.statusPedido.nome}
          </span>
        </div>

        {/* Grid de Detalhes */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Coluna da Esquerda: Itens e Endereço */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Itens do Pedido</h2>
              <div className="space-y-4">
                {pedido.itens.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.produto.imagens?.[0]?.imagemUrl || ''}
                      alt={item.produto.nome}
                      className="w-20 h-20 rounded-md object-cover border"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.produto.nome}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                    </div>
                    <p className="font-medium text-gray-800">
                      {(item.precoUnitario * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Endereço de Entrega</h2>
              <div className="text-gray-600">
                <p className="font-bold">{pedido.endereco.apelido || 'Endereço'}</p>
                <p>{pedido.endereco.rua}, {pedido.endereco.numero}</p>
                <p>{pedido.endereco.bairro}, {pedido.endereco.cidade} - {pedido.endereco.uf}</p>
                <p>CEP: {pedido.endereco.cep}</p>
              </div>
            </div>
          </div>
          
          {/* Coluna da Direita: Resumo Financeiro */}
          <div className="bg-gray-50 p-6 rounded-lg self-start">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Resumo Financeiro</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}