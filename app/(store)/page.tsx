// src/app/(store)/page.tsx
"use client";

import { ProductCard } from '@/components/products/ProductCard';
import { Popup } from '@/components/ui/Popup';
import { Produto } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Carousel } from '@/components/home/Carousel'; // 1. IMPORTAR O CARROSSEL

const API_URL = 'http://localhost:8080/api';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

  useEffect(() => {
    const fetchProdutos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error("Falha ao carregar produtos.");
        const data: Produto[] = await response.json();
        setProdutos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (searchParams.get('logout') === 'true') {
      setPopup({ show: true, type: 'success', message: 'Você saiu da sua conta com sucesso!' });
      window.history.replaceState(null, '', '/');
    }
  }, [searchParams]);

  const query = searchParams.get('q')?.toLowerCase() || '';
  const filteredProducts = produtos.filter(product => 
    product.nome.toLowerCase().includes(query)
  );

  if (isLoading) return <div className="text-center py-16">Carregando...</div>;
  if (error) return <div className="text-center py-16 text-red-600">Erro: {error}</div>;
  
  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}

      <div className="space-y-12">
        {/* 2. SUBSTITUIR O BANNER PELO CARROSSEL */}
        <Carousel />

        <section className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
             <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg border-b pb-2 mb-4">Filtros</h3>
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
    </>
  );
}