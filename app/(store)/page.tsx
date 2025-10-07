// src/app/(store)/page.tsx
"use client";

import { ProductCard } from '@/components/products/ProductCard';
import { Produto } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Nossos dados mockados agora servirão como a "base de dados" completa
const mockProducts: Produto[] = [
  { id: 1, nome: 'Lego Classic', valor: 150.00, imagem_url: '/images/lego.jpg', descricao: '...', categoria: 1, marca: 1 },
  { id: 2, nome: 'Boneca Barbie', valor: 89.90, imagem_url: '/images/barbie.jpg', descricao: '...', categoria: 2, marca: 2 },
  { id: 3, nome: 'Jogo de Tabuleiro War', valor: 120.00, imagem_url: '/images/war.jpg', descricao: '...', categoria: 3, marca: 3 },
  { id: 4, nome: 'Urso de Pelúcia Gigante', valor: 199.99, imagem_url: '/images/urso.jpg', descricao: '...', categoria: 4, marca: 4 },
  // Adicione mais produtos para testar os filtros
];

export default function HomePage() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Este useEffect reage a mudanças na URL (busca e filtros de categoria)
  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category'); // Ainda não implementado, mas pronto para o futuro

    const filtered = mockProducts.filter(product => {
      const matchesQuery = product.nome.toLowerCase().includes(query);
      // Adicionar lógica de categoria aqui no futuro
      return matchesQuery;
    });

    setFilteredProducts(filtered);
  }, [searchParams]);

  return (
    <div className="space-y-12">
      {/* Hero Banner - Seção de Destaque */}
      <section className="relative bg-blue-500 text-white h-80 rounded-2xl flex items-center justify-center text-center p-6 overflow-hidden">
        <div className="z-10">
          <h1 className="text-5xl font-extrabold drop-shadow-md">A Diversão Começa Aqui!</h1>
          <p className="mt-4 text-xl">Encontre os brinquedos favoritos da garotada com os melhores preços.</p>
        </div>
        {/* Elementos decorativos */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-pink-400 rounded-full opacity-50"></div>
      </section>

      {/* Seção Principal da Loja */}
      <section className="flex flex-col md:flex-row gap-8">
        {/* Barra Lateral de Filtros (ainda visual) */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">Filtros</h3>
            {/* Filtros de Categoria (exemplo) */}
            <div>
              <h4 className="font-semibold mb-2">Categorias</h4>
              <ul className="space-y-1 text-gray-700">
                <li><a href="#" className="hover:text-blue-600">Blocos de Montar</a></li>
                <li><a href="#" className="hover:text-blue-600">Bonecas & Cia</a></li>
                <li><a href="#" className="hover:text-blue-600">Jogos</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Grade de Produtos */}
        <main className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">Nenhum produto encontrado.</h2>
              <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtros.</p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}