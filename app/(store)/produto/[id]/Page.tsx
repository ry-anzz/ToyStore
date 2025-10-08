"use client";

import { useEffect, useState } from "react";
import { Produto } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";

const API_URL = "http://localhost:8080/api";

export default function ProductListPage() {
  const { adicionarAoCarrinho } = useCart();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    fetch(`${API_URL}/produtos`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro de rede: ${res.status}`);
        return res.json();
      })
      .then((data: Produto[]) => setProdutos(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Erro: {error}</div>;
  if (produtos.length === 0) return <div>Carregando produtos...</div>;

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-6">
      {produtos.map((produto) => (
        <div key={produto.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">{produto.nome}</h2>
          <p className="text-blue-600 font-semibold">
            {produto.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <Button className="mt-4" onClick={() => adicionarAoCarrinho(produto)}>
            Adicionar ao Carrinho
          </Button>
        </div>
      ))}
    </div>
  );
}
