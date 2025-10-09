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
  removerDoCarrinho: (produtoId: number) => void;
  aumentarQuantidade: (produtoId: number) => void;
  diminuirQuantidade: (produtoId: number) => void;
  limparCarrinho: () => void; // NOVO
}

export const CartContext = createContext<ICartContext>({
  itens: [],
  totalItens: 0,
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: () => {},
  aumentarQuantidade: () => {},
  diminuirQuantidade: () => {},
  limparCarrinho: () => {}, // NOVO
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = itens.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      aumentarQuantidade(produto.id);
    } else {
      setItens([...itens, { produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produtoId: number) => {
    setItens(itens.filter(item => item.produto.id !== produtoId));
  };

  const aumentarQuantidade = (produtoId: number) => {
    setItens(
      itens.map(item =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (produtoId: number) => {
    const itemExistente = itens.find(item => item.produto.id === produtoId);
    if (!itemExistente) return;
    if (itemExistente.quantidade === 1) {
      removerDoCarrinho(produtoId);
    } else {
      setItens(
        itens.map(item =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <CartContext.Provider 
      value={{ 
        itens, 
        totalItens, 
        adicionarAoCarrinho, 
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho, // NOVO
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};