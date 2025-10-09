// src/components/cart/CartItem.tsx
"use client";

import { useCart } from "@/contexts/CartContext";
import { ItemCarrinho } from "@/types"; // Usando o tipo que você definiu no index.ts
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from 'next/link';

interface CartItemProps {
  item: ItemCarrinho;
}

export function CartItem({ item }: CartItemProps) {
  const { produto, quantidade } = item;
  const { aumentarQuantidade, diminuirQuantidade, removerDoCarrinho } = useCart();

  // CORREÇÃO: Lógica para pegar a primeira imagem da lista de objetos
  const displayImage =
    produto.imagens && produto.imagens.length > 0
      ? produto.imagens[0].imagemUrl // Acessando a URL da forma correta
      : "https://placehold.co/100x100/FBBF24/333?text=BrinqueFeliz";

  return (
    // NOVO ESTILO: Card mais limpo e espaçado, com a borda apenas embaixo
    <div className="flex items-center gap-4 sm:gap-6 border-b border-slate-200 py-6 last:border-b-0">
      {/* Imagem do Produto */}
      <Link href={`/produto/${produto.id}`}>
        <img 
          src={displayImage} // Usando a imagem correta
          alt={produto.nome}
          className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg object-cover border-2 border-slate-100"
        />
      </Link>

      {/* Detalhes do Produto */}
      <div className="flex-grow flex flex-col gap-1">
        <Link href={`/produto/${produto.id}`}>
          <h3 className="font-bold text-lg text-slate-800 hover:text-sky-600 transition-colors">{produto.nome}</h3>
        </Link>
        <p className="text-slate-500 font-semibold">
          {produto.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        
        {/* NOVO ESTILO: Seletor de Quantidade arredondado */}
        <div className="flex items-center gap-2 border border-slate-300 rounded-full p-1 w-fit mt-2">
          <button 
            onClick={() => diminuirQuantidade(produto.id)} 
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} className="text-slate-600" />
          </button>
          <span className="font-bold text-slate-700 px-2 w-8 text-center">{quantidade}</span>
          <button 
            onClick={() => aumentarQuantidade(produto.id)} 
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Preço Total e Botão de Remover */}
      <div className="flex flex-col items-end justify-between self-stretch gap-4">
        <p className="font-extrabold text-lg text-slate-800 hidden sm:block">
          {(produto.valor * quantidade).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <button 
          onClick={() => removerDoCarrinho(produto.id)} 
          className="text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Remover item do carrinho"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}