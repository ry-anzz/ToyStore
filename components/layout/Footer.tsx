// src/components/layout/Footer.tsx

import Link from 'next/link';
import { Blocks, Facebook, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sky-600 text-white mt-20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold mb-4">
              <Blocks size={32} />
              <span>BrinqueFeliz</span>
            </Link>
            <p className="text-sky-100 max-w-xs">
              A sua loja de brinquedos favorita, onde a diversão nunca acaba!
            </p>
          </div>

          {/* Coluna 2: Links Institucionais */}
          <div>
            <h3 className="font-bold text-lg mb-4">A Loja</h3>
            <nav className="flex flex-col space-y-2 text-sky-100">
              <Link href="/sobre" className="hover:underline">Sobre Nós</Link>
              <Link href="/contato" className="hover:underline">Contato</Link>
              <Link href="/faq" className="hover:underline">Dúvidas Frequentes</Link>
            </nav>
          </div>

          {/* Coluna 3: Links de Ajuda */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ajuda</h3>
            <nav className="flex flex-col space-y-2 text-sky-100">
              <Link href="/politicas" className="hover:underline">Política de Privacidade</Link>
              <Link href="/trocas" className="hover:underline">Trocas e Devoluções</Link>
              <Link href="/envio" className="hover:underline">Informações de Envio</Link>
            </nav>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className="font-bold text-lg mb-4">Siga a gente!</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Facebook" className="p-2 bg-sky-500 rounded-full hover:bg-sky-400 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" aria-label="Instagram" className="p-2 bg-sky-500 rounded-full hover:bg-sky-400 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" aria-label="Youtube" className="p-2 bg-sky-500 rounded-full hover:bg-sky-400 transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="mt-12 pt-8 border-t border-sky-500 text-center text-sm text-sky-200">
          <p>&copy; {new Date().getFullYear()} Loja de Brinquedos BrinqueFeliz. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}