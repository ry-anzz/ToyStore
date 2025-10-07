// src/app/(store)/carrinho/page.tsx

import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import { Produto } from "@/types";
import Link from "next/link";

// Dados mockados para simular um carrinho com produtos
const mockCartItems = [
  {
    produto: { id: 1, nome: 'Lego Classic', valor: 150.00, imagem_url: '/images/lego.jpg', descricao: '...', categoria: 1, marca: 1 },
    quantidade: 2,
  },
  { 
    produto: { id: 2, nome: 'Boneca Barbie', valor: 89.90, imagem_url: '/images/barbie.jpg', descricao: '...', categoria: 2, marca: 2 },
    quantidade: 1,
  },
];

export default function CartPage() {
  // Calculamos o subtotal baseado nos nossos dados mockados
  const subtotal = mockCartItems.reduce((acc, item) => {
    return acc + item.produto.valor * item.quantidade;
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      {mockCartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Seu carrinho está vazio.</h2>
          <Button  className="mt-4">
            <Link href="/">Ver produtos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Coluna da Esquerda: Lista de Itens */}
          <div className="lg:col-span-2">
            {mockCartItems.map((item) => (
              <CartItem key={item.produto.id} item={item} />
            ))}
          </div>

          {/* Coluna da Direita: Resumo do Pedido */}
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm sticky top-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Resumo do Pedido</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>
                {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <Button className="w-full mt-6 text-lg">
              <Link href="/checkout">Finalizar Compra</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}