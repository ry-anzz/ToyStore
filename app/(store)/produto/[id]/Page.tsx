// src/app/(store)/produto/[id]/page.tsx
"use client";

import { Button } from '@/components/ui/Button';
import { Review, ReviewItem } from '@/components/products/ReviewItem';
import { ReviewForm } from '@/components/products/ReviewForm';
import { Produto } from '@/types';
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { useCart } from '@/contexts/CartContext'; // <-- CORREÇÃO 1: IMPORT ADICIONADO

// Dados mockados de um produto
const mockProducts: Produto[] = [
    { id: 1, nome: 'Lego Classic', valor: 150.00, imagens: ['/images/lego.jpg', '/images/lego2.jpg', '/images/lego3.jpg'], descricao: 'Um conjunto incrível...', categoria: 1, marca: 1 },
    { id: 2, nome: 'Boneca Barbie', valor: 89.90, imagens: ['/images/barbie.jpg', '/images/barbie2.jpg'], descricao: 'A boneca mais famosa...', categoria: 2, marca: 2 },
    { id: 3, nome: 'Jogo de Tabuleiro War', valor: 120.00, imagens: ['/images/war.jpg'], descricao: 'Conquiste territórios...', categoria: 3, marca: 3 },
    { id: 4, nome: 'Urso de Pelúcia Gigante', valor: 199.99, imagens: ['/images/urso.jpg', '/images/urso2.jpg', '/images/urso3.jpg', '/images/urso4.jpg'], descricao: 'Um amigo fofinho...', categoria: 4, marca: 4 },
];
// Dados mockados das avaliações para este produto
const mockReviews: Review[] = [
    {id: 1, autor: 'Maria S.', data: '10 de Setembro, 2025', nota: 5, descricao: 'Meu filho amou! Passa horas brincando e criando coisas novas. A qualidade das peças é excelente.'},
    {id: 2, autor: 'João P.', data: '02 de Outubro, 2025', nota: 4, descricao: 'Ótimo brinquedo, muito educativo. Só achei que poderia vir com mais peças especiais, mas no geral, vale muito a pena.'},
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { adicionarAoCarrinho } = useCart();
  const product = mockProducts.find(p => p.id === +params.id);

  if (!product) { return <div>Produto não encontrado!</div>; }

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <ProductImageCarousel images={product.imagens} />
        </div>

        {/* Coluna de Informações */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.nome}</h1>
          <p className="text-3xl text-blue-600 font-semibold">
            {product.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-gray-700 text-lg">{product.descricao}</p>
          {/* CORREÇÃO 2: ONCLICK ADICIONADO AO BOTÃO */}
          <Button 
            className="w-full text-lg py-3 mt-4" 
            onClick={() => adicionarAoCarrinho(product)}
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
      
      {/* SEÇÃO DE AVALIAÇÕES */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-3xl font-bold mb-6">Avaliações dos Clientes</h2>
        
        <ReviewForm />

        <div>
          {mockReviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
} 