"use client"; // Adicionar "use client" no topo

import { useCart } from "@/contexts/CartContext"; // 1. IMPORTAR O CONTEXTO DO CARRINHO

export function OrderSummary() {
  const { itens } = useCart(); // 2. USAR OS ITENS REAIS DO CARRINHO

  const subtotal = itens.reduce((acc, item) => acc + item.produto.valor * item.quantidade, 0);
  const frete = 0; // Simulando frete grátis
  const total = subtotal + frete;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm lg:sticky lg:top-8">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Resumo do Pedido</h2>
      
      {/* 3. VERIFICAR SE HÁ ITENS ANTES DE MOSTRAR */}
      {itens.length > 0 ? (
        <>
          <div className="space-y-4">
            {itens.map(item => (
              <div key={item.produto.id} className="flex items-center gap-4">
                <img src={item.produto.imagens?.[0]?.imagemUrl || ''} alt={item.produto.nome} className="w-16 h-16 rounded-md object-cover border" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.produto.nome}</p>
                  <p className="text-sm text-gray-600">Qtd: {item.quantidade}</p>
                </div>
                <p className="font-medium">
                  {(item.produto.valor * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span className="text-green-600 font-semibold">Grátis</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-4">Seu carrinho está vazio.</p>
      )}
    </div>
  );
}