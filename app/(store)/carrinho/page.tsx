// src/app/(store)/carrinho/page.tsx
"use client"; // Já deve ser um client component, mas garantimos

import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext"; // 1. Importamos nosso hook

export default function CartPage() {
  const { itens } = useCart(); // 2. Pegamos os itens REAIS do contexto

  // 3. O subtotal agora é calculado com base nos itens reais
  const subtotal = itens.reduce((acc, item) => {
    return acc + item.produto.valor * item.quantidade;
  }, 0);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

        {itens.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Seu carrinho está vazio.</h2>
          <Button  className="mt-4">
            <Link href="/">Ver produtos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            {itens.map((item) => (
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