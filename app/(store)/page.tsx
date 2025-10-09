// src/app/(store)/page.tsx
"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Popup } from "@/components/ui/Popup";
import { Produto } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Carousel } from "@/components/home/Carousel";
import { Filter, Search } from "lucide-react";

const API_URL = "http://localhost:8080/api";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

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
    if (searchParams.get("logout") === "true") {
      setPopup({
        show: true,
        type: "success",
        message: "Você saiu da sua conta com sucesso!",
      });
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams]);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const marcaFiltro = searchParams.get("marca"); // 1. Pegamos o filtro de marca da URL

  const filteredProducts = produtos.filter((product) => {
    // Condição 1: O nome do produto corresponde à busca?
    const matchesQuery = product.nome.toLowerCase().includes(query);

    // Condição 2: A marca do produto corresponde ao filtro? (Se não houver filtro, considera verdadeiro)
    const matchesMarca = !marcaFiltro || product.marca.nome === marcaFiltro;

    // O produto só aparece se atender às DUAS condições
    return matchesQuery && matchesMarca;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-400"></div>
        <p className="text-slate-600 font-semibold">Carregando brinquedos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-red-50 rounded-lg">
        <h2 className="text-2xl font-bold text-red-700">
          Oops! Algo deu errado.
        </h2>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <>
      {popup.show && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      <div className="space-y-16">
        {/* Carrossel (assumindo que já está estilizado ou é um componente externo) */}
        <Carousel />

        {/* Seção Principal da Loja com novo layout */}
        <section className="flex flex-col lg:flex-row gap-10">
          {/* NOVO ESTILO: Barra Lateral de Filtros */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-28">
              <h3 className="flex items-center gap-2 font-extrabold text-xl text-slate-700 border-b-2 border-slate-200 pb-3 mb-4">
                <Filter size={20} className="text-sky-500" />
                Filtros
              </h3>
              <div>
                <h4 className="font-bold text-slate-600 mb-3">Categorias</h4>
                <ul className="space-y-2 text-slate-500 font-semibold">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-amber-100 hover:text-amber-700 transition-colors"
                    >
                      Blocos de Montar
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-amber-100 hover:text-amber-700 transition-colors"
                    >
                      Bonecas & Cia
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-amber-100 hover:text-amber-700 transition-colors"
                    >
                      Jogos
                    </a>
                  </li>
                </ul>
              </div>
              {/* Espaço para mais filtros no futuro (preço, marca, etc.) */}
            </div>
          </aside>

          {/* NOVO ESTILO: Grade de Produtos */}
          <main className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Nossos Brinquedos
              </h2>
              <span className="text-sm font-semibold text-slate-500">
                {filteredProducts.length} produtos encontrados
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
                <Search size={48} className="mx-auto text-slate-400" />
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">
                  Nenhum produto encontrado.
                </h2>
                <p className="text-slate-500 mt-2">
                  Tente uma busca diferente ou verifique os filtros.
                </p>
              </div>
            )}
          </main>
        </section>
      </div>
    </>
  );
}
