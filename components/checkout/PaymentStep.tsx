"use client";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popup } from "../ui/Popup";

interface PaymentStepProps {
  onBack: () => void;
  selectedAddressId: number;
}

const API_URL = 'http://localhost:8080/api';

export function PaymentStep({ onBack, selectedAddressId }: PaymentStepProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { itens, totalItens, limparCarrinho } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const handleFinalize = async () => {
    if (!user || totalItens === 0 || !selectedAddressId) {
      setPopup({ show: true, message: 'Faltam informações para finalizar o pedido.', type: 'error'});
      return;
    }
    
    setIsLoading(true);

    const pedidoData = {
      usuarioId: user.id,
      enderecoId: selectedAddressId,
      metodoPagamentoId: 1, // Assumindo "Cartão de Crédito" como ID 1
      itens: itens,
    };

    try {
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar o pedido.');
      }

      limparCarrinho();
      setPopup({ show: true, message: 'Pedido finalizado com sucesso!', type: 'success' });
      
      setTimeout(() => {
        router.push('/conta/pedidos');
      }, 2000);

    } catch (error: any) {
      setPopup({ show: true, message: error.message, type: 'error'});
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">2. Pagamento</h2>
        <div className="space-y-4">
          <div><label htmlFor="cardNumber">Número do Cartão</label><Input id="cardNumber" placeholder="0000 0000 0000 0000" /></div>
          <div><label htmlFor="cardName">Nome no Cartão</label><Input id="cardName" placeholder="Nome como no cartão" /></div>
          <div className="flex gap-4">
            <div className="flex-1"><label htmlFor="expiryDate">Validade</label><Input id="expiryDate" placeholder="MM/AA" /></div>
            <div className="flex-1"><label htmlFor="cvv">CVV</label><Input id="cvv" placeholder="123" /></div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 gap-3">
          <Button onClick={onBack} className="bg-gray-600 hover:bg-gray-700">Voltar</Button>
          <Button className="flex-grow text-lg" onClick={handleFinalize} disabled={isLoading}>
            <Lock size={18} className="mr-2"/> {isLoading ? 'Processando...' : 'Finalizar Compra'}
          </Button>
        </div>
      </div>
    </>
  );
}