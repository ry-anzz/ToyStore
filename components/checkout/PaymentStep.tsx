// src/components/checkout/PaymentStep.tsx

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { CreditCard, Lock } from "lucide-react";

interface PaymentStepProps {
  onBack: () => void;
}

export function PaymentStep({ onBack }: PaymentStepProps) {
  const handleFinalize = () => {
    // No futuro, aqui seria o envio para a API
    alert("Pedido finalizado com sucesso! (Simulação)");
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">2. Pagamento</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número do Cartão</label>
          <Input id="cardNumber" type="text" placeholder="0000 0000 0000 0000" className="mt-1 w-full" />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Nome no Cartão</label>
          <Input id="cardName" type="text" placeholder="Nome como no cartão" className="mt-1 w-full" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Validade</label>
            <Input id="expiryDate" type="text" placeholder="MM/AA" className="mt-1 w-full" />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
            <Input id="cvv" type="text" placeholder="123" className="mt-1 w-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 gap-3">
        <Button onClick={onBack}>Voltar</Button>
        <Button className="flex-grow text-lg" onClick={handleFinalize}>
          <Lock size={18} className="mr-2"/> Finalizar Compra
        </Button>
      </div>
    </div>
  );
}