// src/components/layout/Navbar.tsx
"use client"; 

import Link from 'next/link';
import { ShoppingCart, User, Blocks, LogOut } from 'lucide-react'; 
import { SearchBar } from './SearchBar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; // IMPORTADO

export function Navbar() {
  const { totalItens } = useCart();
  const { isAuthenticated, logout } = useAuth(); // ESTADO E FUNÇÃO DO CONTEXTO

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Barra Principal */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <Blocks size={32} />
          ToyStore
        </Link>

        {/* Barra de Busca */}
        <div className="hidden md:flex justify-center flex-grow">
          <SearchBar />
        </div>

        {/* Ícones de Ação - LÓGICA DE AUTENTICAÇÃO */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            // Opções para usuário LOGADO
            <>
              <Link href="/conta" className="flex items-center text-gray-700 hover:text-blue-600">
                <User className="w-6 h-6" />
                <span className="ml-2 hidden lg:inline">Minha Conta</span>
              </Link>
              <button 
                  onClick={logout} // Chama a função de logout do contexto
                  className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
              >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-2 hidden lg:inline">Sair</span>
              </button>
            </>
          ) : (
            // Opções para usuário DESLOGADO
            <Link href="/login" className="flex items-center text-gray-700 hover:text-blue-600">
              <User className="w-6 h-6" />
              <span className="ml-2 hidden lg:inline">Fazer Login</span>
            </Link>
          )}
          
          {/* Carrinho (visível para ambos, mas com contagem real) */}
          <Link href="/carrinho" className="relative flex items-center text-gray-700 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
            {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
              {totalItens}
            </span>
            )}
            <span className="ml-2 hidden lg:inline">Carrinho</span>
          </Link>
        </div>
      </div>
      {/* Barra de Categorias (inalterado) */}
      <div className="bg-blue-600 text-white">
        <nav className="container mx-auto px-6 py-2 flex justify-center gap-6 font-semibold">
          <Link href="/?category=lego" className="hover:underline">Blocos de Montar</Link>
          <Link href="/?category=bonecas" className="hover:underline">Bonecas & Cia</Link>
          <Link href="/?category=jogos" className="hover:underline">Jogos de Tabuleiro</Link>
          <Link href="/?category=pelucias" className="hover:underline">Pelúcias</Link>
          <Link href="/?category=carrinhos" className="hover:underline">Carrinhos</Link>
        </nav>
      </div>
    </header>
  );
}