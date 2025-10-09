// src/app/(store)/page.tsx
"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Popup } from "@/components/ui/Popup";
import { Categoria, Produto } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Carousel } from "@/components/home/Carousel";
import { Filter, Search, X } from "lucide-react";
import Link from "next/link";

const API_URL = "http://localhost:8080/api";

// Lista de categorias que você pediu
const listaCategorias: Categoria[] = [
    { id: 1, nome: "Blocos" },
    { id: 2, nome: "Bonecos" },
    { id: 3, nome: "Carrinhos" },
    { id: 4, nome: "Jogos de Tabuleiro" },
    { id: 5, nome: "Pelucias" },
];

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      // Limpa o parâmetro da URL sem recarregar a página
      window.history.replaceState(null, "", "/");
    }
  }, [searchParams]);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const marcaFiltro = searchParams.get("marca");
  const categoriaFiltro = searchParams.get("categoria");

  const filteredProducts = produtos.filter((product) => {
    const matchesQuery = product.nome.toLowerCase().includes(query);
    const matchesMarca = !marcaFiltro || product.marca.nome === marcaFiltro;
    const matchesCategoria = !categoriaFiltro || product.categoria.nome === categoriaFiltro;

    return matchesQuery && matchesMarca && matchesCategoria;
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
        <h2 className="text-2xl font-bold text-red-700">Oops! Algo deu errado.</h2>
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
        <Carousel />

        <section className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-28">
              <h3 className="flex items-center gap-2 font-extrabold text-xl text-slate-700 border-b-2 border-slate-200 pb-3 mb-4">
                <Filter size={20} className="text-sky-500" />
                Filtros
              </h3>

              {(marcaFiltro || categoriaFiltro) && (
                <div className="mb-6 p-3 bg-amber-100 rounded-md">
                  <h4 className="font-bold text-amber-900 mb-2 text-sm">Filtros Ativos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {marcaFiltro && <span className="flex items-center gap-1 text-xs bg-sky-200 text-sky-800 font-semibold px-2 py-1 rounded-full">{marcaFiltro}</span>}
                    {categoriaFiltro && <span className="flex items-center gap-1 text-xs bg-teal-200 text-teal-800 font-semibold px-2 py-1 rounded-full">{categoriaFiltro}</span>}
                  </div>
                  <button onClick={() => router.push('/')} className="text-xs text-sky-600 hover:underline block mt-3 font-semibold w-full text-left">
                    <X size={12} className="inline mr-1"/>Limpar todos os filtros
                  </button>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-600 mb-3">Categorias</h4>
                <ul className="space-y-2 text-slate-500 font-semibold">
                  {listaCategorias.map(categoria => (
                    <li key={categoria.id}>
                      <Link
                        href={`/?categoria=${categoria.nome}`}
                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-amber-100 hover:text-amber-700 transition-colors ${
                            categoriaFiltro === categoria.nome ? 'bg-amber-100 text-amber-800 font-bold' : ''
                        }`}
                      >
                        {categoria.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

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
                  Tente uma busca diferente ou limpar os filtros.
                </p>
              </div>
            )}
          </main>
        </section>
      </div>
    </>
  );
}