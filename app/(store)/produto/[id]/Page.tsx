"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Produto, Avaliacao } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { StarRating } from "@/components/products/StarRating";
import { ReviewItem } from "@/components/products/ReviewItem";
import { ReviewForm } from "@/components/products/ReviewForm";
import { ShoppingCart, Heart } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Popup } from "@/components/ui/Popup";
import Link from "next/link";

const API_URL = "http://localhost:8080/api";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { adicionarAoCarrinho } = useCart();
  const { user } = useAuth();
  const { toggleFavorito, isFavorito } = useFavorites();
  
  const [produto, setProduto] = useState<Produto | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [deletingReview, setDeletingReview] = useState<Avaliacao | null>(null);
  const [editingReview, setEditingReview] = useState<Avaliacao | null>(null);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const fetchProductData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [productRes, reviewsRes] = await Promise.all([
        fetch(`${API_URL}/produtos/${id}`),
        fetch(`${API_URL}/produtos/${id}/avaliacoes`)
      ]);
      if (!productRes.ok) throw new Error("Produto não encontrado");
      setProduto(await productRes.json());
      if (reviewsRes.ok) setAvaliacoes(await reviewsRes.json());
    } catch (error) {
      console.error(error);
      setProduto(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleDeleteReview = async () => {
    if (!deletingReview || !user) return;
    try {
      const response = await fetch(`${API_URL}/avaliacoes/${deletingReview.id}?usuarioId=${user.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Falha ao excluir avaliação.");
      setPopup({ show: true, message: 'Avaliação excluída com sucesso!', type: 'success' });
      fetchProductData();
    } catch (error: any) {
      setPopup({ show: true, message: error.message, type: 'error' });
    } finally {
      setDeletingReview(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Carregando produto...</div>;
  }

  if (!produto) {
    return <div className="text-center py-20">Produto não encontrado.</div>;
  }
  
  const isProductFavorite = isFavorito(produto.id);
  const averageRating = avaliacoes.length > 0 ? avaliacoes.reduce((acc, review) => acc + review.nota, 0) / avaliacoes.length : 0;
  const userHasReviewed = user ? avaliacoes.some(review => review.autorId === user.id) : false;

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <ConfirmationModal
        isOpen={!!deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={handleDeleteReview}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir sua avaliação? Esta ação não pode ser desfeita."
        cancelButtonClass="bg-blue-500 hover:bg-blue-600 text-white"
      />
      
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ReviewForm
            produtoId={produto.id}
            initialData={editingReview}
            onReviewSubmit={() => {
              setEditingReview(null);
              fetchProductData();
            }}
            onCancel={() => setEditingReview(null)}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div><ProductImageCarousel images={produto.imagens.map(img => img.imagemUrl)} /></div>
          <div className="space-y-4">
            <div><span className="text-sm text-gray-500">{produto.marca?.nome} / {produto.categoria?.nome}</span><div className="flex items-start justify-between gap-4"><h1 className="text-4xl font-bold">{produto.nome}</h1><button onClick={() => toggleFavorito(produto.id)} className="p-2 mt-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Adicionar aos favoritos"><Heart size={28} className={`transition-colors ${isProductFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} /></button></div></div>
            <div className="flex items-center gap-2"><StarRating rating={averageRating} /><span className="text-sm text-gray-600">({avaliacoes.length} avaliações)</span></div>
            <p className="text-4xl font-light text-blue-600">{produto.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <div><h3 className="font-semibold text-lg mb-2">Descrição</h3><p className="text-gray-700 leading-relaxed">{produto.descricao}</p></div>
            <Button className="w-full text-lg py-3" onClick={() => adicionarAoCarrinho(produto)}><ShoppingCart className="mr-2" /> Adicionar ao Carrinho</Button>
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
                    <ReviewItem 
                      key={review.id} 
                      review={{...review, data: new Date(review.data).toLocaleDateString('pt-BR')}}
                      currentUser={user}
                      onEdit={() => setEditingReview(review)}
                      onDelete={() => setDeletingReview(review)}
                    />
                  ))}
                </div>
              ) : ( <p>Este produto ainda não tem avaliações. Seja o primeiro a avaliar!</p> )}
            </div>
            <div>
              {user ? (
                userHasReviewed && !editingReview ? ( // Não mostra a mensagem se estiver editando
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h3 className="font-semibold text-gray-700">Obrigado pela sua avaliação!</h3>
                    <p className="text-sm text-gray-500 mt-2">Você já avaliou este produto.</p>
                  </div>
                ) : (
                  !editingReview && <ReviewForm produtoId={produto.id} onReviewSubmit={fetchProductData} />
                )
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-700">Faça login para avaliar</h3>
                  <p className="text-sm text-gray-500 mt-2">Você precisa estar conectado para deixar sua opinião.</p>
                  <Button asChild className="mt-4">
                    <Link href="/login">Fazer Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}