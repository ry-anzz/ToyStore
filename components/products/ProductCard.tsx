// src/components/products/ProductCard.tsx
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Produto } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart, ShoppingCart } from "lucide-react";

export function ProductCard({ product }: { product: Produto }) {
  const { adicionarAoCarrinho } = useCart();
  const { toggleFavorito, isFavorito } = useFavorites();

  const isProductFavorite = isFavorito(product.id);

  // AGORA ESTÁ CORRETO: Acessando a propriedade 'imagemUrl' do primeiro objeto da lista
  const displayImage =
    product.imagens && product.imagens.length > 0
      ? product.imagens[0].imagemUrl
      : "https://placehold.co/400x400/FBBF24/333?text=BrinqueFeliz";

  const valorFormatado =
    typeof product.valor === "number"
      ? product.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "Preço indisponível";

  return (
    <Card className="flex flex-col justify-between group overflow-hidden rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorito(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all"
          aria-label="Adicionar aos favoritos"
        >
          <Heart
            size={20}
            className={`transition-all duration-200 ${
              isProductFavorite ? "text-red-500 fill-red-500" : "text-slate-600"
            }`}
          />
        </button>

        <Link href={`/produto/${product.id}`} className="block">
          <div className="aspect-square w-full overflow-hidden bg-slate-100">
            <img
              src={displayImage}
              alt={product.nome}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/produto/${product.id}`} title={product.nome}>
          <h3 className="font-bold text-lg text-slate-800 truncate">
            {product.nome}
          </h3>
        </Link>
        <p className="text-sky-600 mt-1 text-2xl font-extrabold">
          {valorFormatado}
        </p>

        <div className="mt-auto pt-4">
          <Button
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-800 font-bold text-base"
            onClick={() => adicionarAoCarrinho(product)}
          >
            <ShoppingCart size={18} className="mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
}
