// src/app/(store)/conta/favoritos/page.tsx
"use client";

import { useEffect, useState } from "react"; // 1. Importar useEffect e useState
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Produto } from "@/types";
import Link from "next/link";

const API_URL = 'http://localhost:8080/api'; // URL da sua API

export default function FavoritesPage() {
  const { favoritos } = useFavorites();
  const [produtos, setProdutos] = useState<Produto[]>([]); // 2. Estado para guardar todos os produtos
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  // 3. Buscar todos os produtos da API quando o componente carregar
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
          throw new Error("Falha ao carregar produtos.");
        }
        const data: Produto[] = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // 4. Filtra a lista de produtos REAIS (vindos da API)
  const favoriteProducts = produtos.filter(product => 
    favoritos.includes(product.id)
  );

  if (isLoading) {
    return <div>Carregando seus produtos favoritos...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Meus Favoritos</h2>
      
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Sua lista de favoritos está vazia.</h3>
          <p className="text-gray-500 mt-2">Clique no coração de um produto para salvá-lo aqui!</p>
          <Button asChild className="mt-4">
            <Link href="/">Ver produtos</Link>
          </Button>
        </div>
      )}
    </div>
  );
}