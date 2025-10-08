// src/contexts/CartContext.tsx

"use client";

import { Produto } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface ICartContext {
  itens: CartItem[];
  totalItens: number;
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: number) => void; // NOVO
  aumentarQuantidade: (produtoId: number) => void; // NOVO
  diminuirQuantidade: (produtoId: number) => void; // NOVO
}

export const CartContext = createContext<ICartContext>({
  itens: [],
  totalItens: 0,
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: () => {}, // NOVO
  aumentarQuantidade: () => {}, // NOVO
  diminuirQuantidade: () => {}, // NOVO
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = itens.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      aumentarQuantidade(produto.id); // Reutiliza a função de aumentar
    } else {
      setItens([...itens, { produto, quantidade: 1 }]);
    }
  };

  // NOVA FUNÇÃO para remover um item, não importa a quantidade
  const removerDoCarrinho = (produtoId: number) => {
    setItens(itens.filter(item => item.produto.id !== produtoId));
  };

  // NOVA FUNÇÃO para aumentar a quantidade
  const aumentarQuantidade = (produtoId: number) => {
    setItens(
      itens.map(item =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  // NOVA FUNÇÃO para diminuir a quantidade
  const diminuirQuantidade = (produtoId: number) => {
    const itemExistente = itens.find(item => item.produto.id === produtoId);
    
    // Se o item não existe, não faz nada
    if (!itemExistente) return;
    
    // Se a quantidade for 1, remove o item do carrinho
    if (itemExistente.quantidade === 1) {
      removerDoCarrinho(produtoId);
    } else {
      // Senão, apenas diminui a quantidade
      setItens(
        itens.map(item =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <CartContext.Provider 
      value={{ 
        itens, 
        totalItens, 
        adicionarAoCarrinho, 
        removerDoCarrinho, // NOVO
        aumentarQuantidade, // NOVO
        diminuirQuantidade, // NOVO
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};