// src/app/(store)/conta/favoritos/page.tsx
"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Produto } from "@/types";
import Link from "next/link";

// Precisamos da lista completa de produtos para poder filtrar
// No futuro, isso viria de uma chamada de API, mas por agora usamos o mock
const mockProducts: Produto[] = [
    { id: 1, nome: 'Lego Classic', valor: 150.00, imagem_url: '/images/lego.jpg', descricao: '...', categoria: 1, marca: 1 },
    { id: 2, nome: 'Boneca Barbie', valor: 89.90, imagem_url: '/images/barbie.jpg', descricao: '...', categoria: 2, marca: 2 },
    { id: 3, nome: 'Jogo de Tabuleiro War', valor: 120.00, imagem_url: '/images/war.jpg', descricao: '...', categoria: 3, marca: 3 },
    { id: 4, nome: 'Urso de Pelúcia Gigante', valor: 199.99, imagem_url: '/images/urso.jpg', descricao: '...', categoria: 4, marca: 4 },
];

export default function FavoritesPage() {
  const { favoritos } = useFavorites();

  // Filtramos a lista de produtos para mostrar apenas os que estão nos favoritos
  const favoriteProducts = mockProducts.filter(product => 
    favoritos.includes(product.id)
  );

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