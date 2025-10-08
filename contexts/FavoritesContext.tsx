// src/contexts/FavoritesContext.tsx

"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface IFavoritesContext {
  favoritos: number[];
  toggleFavorito: (produtoId: number) => void;
  isFavorito: (produtoId: number) => boolean;
}

export const FavoritesContext = createContext<IFavoritesContext>({
  favoritos: [],
  toggleFavorito: () => {},
  isFavorito: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // Lógica para adicionar ou remover um item dos favoritos
  const toggleFavorito = (produtoId: number) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.includes(produtoId)) {
        // Se já for favorito, remove
        return prevFavoritos.filter((id) => id !== produtoId);
      } else {
        // Se não for, adiciona
        return [...prevFavoritos, produtoId];
      }
    });
  };

  // Função auxiliar para verificar se um item é favorito
  const isFavorito = (produtoId: number) => {
    return favoritos.includes(produtoId);
  };

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  return useContext(FavoritesContext);
};