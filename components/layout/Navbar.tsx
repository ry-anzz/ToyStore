// src/components/layout/Navbar.tsx

"use client"; 

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart, User, Blocks } from 'lucide-react'; 
import { SearchBar } from './SearchBar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Marca } from '@/types'; // Importamos o tipo Marca

export function Navbar() {
  const { totalItens } = useCart();
  const { isAuthenticated, user } = useAuth(); 
  
    // NOVO: Estado para guardar a lista de marcas
  const [marcas, setMarcas] = useState<Marca[]>([]);

   useEffect(() => {
    // Simulação de uma chamada de API para /api/marcas
    const fetchMarcas = () => {
      const mockMarcas: Marca[] = [
        { id: 1, nome: "Lego" },
        { id: 2, nome: "Mattel" },
        { id: 3, nome: "Hasbro" },
        { id: 4, nome: "Estrela" },
        { id: 5, nome: "Playmobil" },
      ];
      setMarcas(mockMarcas);
    };
    fetchMarcas();
  }, []);

  const getDisplayName = () => {
    if (!user || !user.nome) return "Minha Conta";
    const nameParts = user.nome.trim().split(' ');
    return nameParts[0]; // Mostrando só o primeiro nome, fica mais limpo
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      {/* BARRA PRINCIPAL - COM FUNDO BRANCO E LEVE */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO MAIS COLORIDO */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <Blocks size={32} className="text-sky-500" />
          <span className="text-amber-500">Toy</span>
          <span className="text-slate-700">Store</span>
        </Link>

        <div className="hidden md:flex justify-center flex-grow px-10">
          <SearchBar />
        </div>

        {/* ÍCONES COM AS NOVAS CORES */}
        <div className="flex items-center space-x-6 text-slate-700 font-semibold">
          {isAuthenticated ? (
            <Link href="/conta" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <User className="w-6 h-6" />
              <span className="hidden lg:inline">Olá, {getDisplayName()}</span>
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <User className="w-6 h-6" />
              <span className="hidden lg:inline">Entrar</span>
            </Link>
          )}
          
          <Link href="/carrinho" className="relative flex items-center gap-2 hover:text-amber-500 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full">
                {totalItens}
              </span>
            )}
            <span className="hidden lg:inline">Carrinho</span>
          </Link>
        </div>
      </div>
      
       {/* BARRA DE MARCAS - AGORA DINÂMICA */}
      <div className="bg-sky-600 text-white">
        <nav className="container mx-auto px-6 h-12 flex items-center justify-center gap-4 sm:gap-8 font-bold">
          {/* Usamos .map() para criar um Link para cada marca */}
          {marcas.map((marca) => (
            <Link 
              key={marca.id}
              href={`/?marca=${marca.nome}`} 
              className="p-2 hover:bg-amber-500  rounded-md transition-colors "
            >
              {marca.nome}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}