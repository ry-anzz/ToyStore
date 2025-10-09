"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Produto } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

export function ProductCard({ product }: { product: Produto }) {
  const { adicionarAoCarrinho } = useCart();
  const { toggleFavorito, isFavorito } = useFavorites();

  const isProductFavorite = isFavorito(product.id);
  
  // Pega a URL da primeira imagem, ou um placeholder se não houver imagens
  const displayImage = product.imagens?.[0]?.imagemUrl || "https://via.placeholder.com/300x300.png?text=Sem+Imagem";

  return (
    <Card className="flex flex-col justify-between relative group"> 
      
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorito(product.id); }}
        className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full hover:bg-white transition-all"
        aria-label="Adicionar aos favoritos"
      >
        <Heart size={20} className={`transition-colors ${isProductFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
      </button>

      <Link href={`/produto/${product.id}`}>
        <img 
          src={displayImage} 
          alt={product.nome} 
          className="w-full h-48 object-cover cursor-pointer group-hover:opacity-80 transition-opacity" 
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{product.nome}</h3>
          <p className="text-gray-600 mt-1 text-xl font-bold">
            {product.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <Button className="w-full" onClick={() => adicionarAoCarrinho(product)}>
          Adicionar ao Carrinho
        </Button>
      </div>
    </Card>
  );
}