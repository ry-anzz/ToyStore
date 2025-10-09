// src/app/(store)/carrinho/page.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

// O NOME DA FUNÇÃO DEVE COMEÇAR COM LETRA MAIÚSCULA
export default function CartPage() {
  const { itens } = useCart();

  const subtotal = itens.reduce((acc, item) => {
    return acc + item.produto.valor * item.quantidade;
  }, 0);

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-slate-800">Seu Carrinho</h1>

      {itens.length === 0 ? (
        // Card de "carrinho vazio" com o novo estilo
        <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-white">
          <ShoppingBag size={64} className="mx-auto text-slate-400" />
          <h2 className="text-2xl font-bold text-slate-700 mt-4">Seu carrinho está vazio.</h2>
          <p className="text-slate-500 mt-2">Que tal encontrar um brinquedo novo para encher ele de alegria?</p>
          <Button asChild className="mt-6 bg-amber-400 hover:bg-amber-500 text-slate-800 font-bold">
            <Link href="/">Ir para a Loja</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Coluna da esquerda com os itens */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
            {itens.map((item) => (
              <CartItem key={item.produto.id} item={item} />
            ))}
          </div>

          {/* Coluna da direita com o resumo */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-28">
            <h2 className="text-xl font-bold text-slate-700 mb-4 border-b-2 border-slate-200 pb-3">Resumo do Pedido</h2>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">Grátis</span>
              </div>
            </div>
            <div className="flex justify-between font-extrabold text-lg text-slate-800 mt-4 pt-4 border-t border-slate-200">
              <span>Total</span>
              <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <Button asChild className="w-full mt-6 text-lg bg-amber-400 hover:bg-amber-500 text-slate-800 font-bold">
              <Link href="/checkout">Finalizar Compra</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}