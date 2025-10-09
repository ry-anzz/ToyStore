"use client";

import { OrderItem } from "@/components/user/OrderItem";
import { Button } from "@/components/ui/Button"; // CAMINHO CORRIGIDO
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Pedido } from "@/types";

const API_URL = "http://localhost:8080/api";

export default function OrdersPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchPedidos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/pedidos/usuario/${user.id}`);
        if (response.ok) {
          setPedidos(await response.json());
        }
      } catch (error) {
        console.error("Falha ao buscar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPedidos();
  }, [user]);

  if (isLoading) {
    return <div>Carregando histórico de pedidos...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Histórico de Pedidos</h2>
      
      {pedidos.length > 0 ? (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <OrderItem key={pedido.id} order={pedido} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Você ainda não fez nenhum pedido.</h3>
          <p className="text-gray-500 mt-2">Que tal encontrar um brinquedo novo?</p>
          <Button asChild className="mt-4">
            <Link href="/">Ir para a Loja</Link>
          </Button>
        </div>
      )}
    </div>
  );
}