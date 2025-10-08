// src/components/cart/CartItem.tsx
"use client"; // Necessário para usar hooks

import { Produto } from "@/types";
import { useCart } from "@/contexts/CartContext"; // Importamos o hook
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    produto: Produto;
    quantidade: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { produto, quantidade } = item;
  
  // Pegamos as novas funções do nosso contexto
  const { aumentarQuantidade, diminuirQuantidade, removerDoCarrinho } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      {/* Imagem do Produto (sem alterações) */}
      <img src={produto.imagem_url} alt={produto.nome} className="h-24 w-24 rounded-md object-cover" />

      {/* Detalhes do Produto (sem alterações) */}
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{produto.nome}</h3>
        <p className="text-gray-600">
          {produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>

      {/* Seletor de Quantidade (AGORA FUNCIONAL) */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
        <button onClick={() => diminuirQuantidade(produto.id)} className="p-1 hover:bg-gray-100 rounded-md">
          <Minus size={16} />
        </button>
        <span className="font-semibold px-2">{quantidade}</span>
        <button onClick={() => aumentarQuantidade(produto.id)} className="p-1 hover:bg-gray-100 rounded-md">
          <Plus size={16} />
        </button>
      </div>

      {/* Preço Total do Item (sem alterações) */}
      <div className="w-24 text-right font-bold">
        {(produto.valor * quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </div>

      {/* Botão de Remover (AGORA FUNCIONAL) */}
      <button onClick={() => removerDoCarrinho(produto.id)} className="text-gray-500 hover:text-red-600">
        <Trash2 size={20} />
      </button>
    </div>
  );
}