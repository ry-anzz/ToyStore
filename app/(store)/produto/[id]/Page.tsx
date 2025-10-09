"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Produto, Avaliacao } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { StarRating } from "@/components/products/StarRating";
import { ReviewItem } from "@/components/products/ReviewItem";
import { ReviewForm } from "@/components/products/ReviewForm";
import { ShoppingCart } from "lucide-react";

// GARANTA QUE A URL DA API ESTEJA CORRETA AQUI
const API_URL = "http://localhost:8080/api";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { adicionarAoCarrinho } = useCart();
  
  const [produto, setProduto] = useState<Produto | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        // GARANTA QUE A CHAMADA FETCH ESTEJA CORRETA AQUI
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`${API_URL}/produtos/${id}`),
          fetch(`${API_URL}/produtos/${id}/avaliacoes`)
        ]);

        if (!productRes.ok) throw new Error("Produto não encontrado");
        
        const productData = await productRes.json();
        // A API retorna 'imagemUrl', mas o tipo espera 'imagem_url', vamos ajustar aqui
        if (productData.imagemUrl && !productData.imagem_url) {
          productData.imagem_url = productData.imagemUrl;
        }
        setProduto(productData);
        
        if (reviewsRes.ok) {
          setAvaliacoes(await reviewsRes.json());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-20">Carregando produto...</div>;
  }

  if (!produto) {
    return <div className="text-center py-20">Produto não encontrado.</div>;
  }

  const averageRating = avaliacoes.length > 0
    ? avaliacoes.reduce((acc, review) => acc + review.nota, 0) / avaliacoes.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <ProductImageCarousel images={[produto.imagem_url]} />
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500">{produto.marca?.nome} / {produto.categoria?.nome}</span>
            <h1 className="text-4xl font-bold">{produto.nome}</h1>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} />
            <span className="text-sm text-gray-600">({avaliacoes.length} avaliações)</span>
          </div>
          <p className="text-4xl font-light text-blue-600">
            {produto.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <p className="text-gray-700 leading-relaxed">{produto.descricao}</p>
          <Button className="w-full text-lg py-3" onClick={() => adicionarAoCarrinho(produto)}>
            <ShoppingCart className="mr-2" /> Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 border-b pb-4">Avaliações dos Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">O que estão dizendo</h3>
            {avaliacoes.length > 0 ? (
              <div className="space-y-6">
                {avaliacoes.map((review) => (
                   <ReviewItem key={review.id} review={{...review, autor: review.autor || "Anônimo", data: new Date(review.data).toLocaleDateString('pt-BR')}} />
                ))}
              </div>
            ) : (
              <p>Este produto ainda não tem avaliações. Seja o primeiro a avaliar!</p>
            )}
          </div>
          <div>
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}