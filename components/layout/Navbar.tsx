// src/components/layout/Navbar.tsx
"use client"; 

import Link from 'next/link';
import { ShoppingCart, User, Blocks } from 'lucide-react'; 
import { SearchBar } from './SearchBar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const { totalItens } = useCart();
  const { isAuthenticated, user } = useAuth(); 

  const getDisplayName = () => {
    if (!user || !user.nome) return "Minha Conta";
    const nameParts = user.nome.trim().split(' ');
    if (nameParts.length > 1) return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
    return user.nome;
  };

  return (
    <header className="shadow-md sticky top-0 z-50">
      {/* BARRA PRINCIPAL - AGORA AZUL */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <Blocks size={32} />
            ToyStore
          </Link>

          <div className="hidden md:flex justify-center flex-grow px-10">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-6 text-white font-medium">
            {isAuthenticated ? (
              <Link href="/conta" className="flex items-center hover:text-gray-200">
                <User className="w-6 h-6" />
                <span className="ml-2 hidden lg:inline">{getDisplayName()}</span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center hover:text-gray-200">
                <User className="w-6 h-6" />
                <span className="ml-2 hidden lg:inline">Fazer Login</span>
              </Link>
            )}
            
            <Link href="/carrinho" className="relative flex items-center hover:text-gray-200">
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
      </div>
      
      {/* BARRA DE CATEGORIAS - VERMELHA */}
      <div className="bg-red-600 text-white">
        <nav className="container mx-auto px-6 py-2 flex justify-center gap-6 sm:gap-8 font-semibold">
          <Link href="/?category=blocos" className="hover:underline">Blocos de Montar</Link>
          <Link href="/?category=bonecas" className="hover:underline">Bonecas & Cia</Link>
          <Link href="/?category=jogos" className="hover:underline">Jogos de Tabuleiro</Link>
          <Link href="/?category=pelucias" className="hover:underline">Pelúcias</Link>
          <Link href="/?category=carrinhos" className="hover:underline">Carrinhos</Link>
        </nav>
      </div>
    </header>
  );
}