"use client";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Lock, CreditCard, Copy, QrCode } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Popup } from "../ui/Popup";
import { MetodoPagamento } from "@/types";

interface PaymentStepProps {
  onBack: () => void;
  selectedAddressId: number;
}

const API_URL = 'http://localhost:8080/api';

export function PaymentStep({ onBack, selectedAddressId }: PaymentStepProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { itens, totalItens, limparCarrinho } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | null>(null);
  const [pixKey, setPixKey] = useState<string | null>(null);
  const [hasCopiedPixKey, setHasCopiedPixKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  // NOVO ESTADO PARA OS DADOS DO CARTÃO
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [metodosPagamentoApi, setMetodosPagamentoApi] = useState<MetodoPagamento[]>([]);

  useEffect(() => {
    const fetchMetodosPagamento = async () => {
      try {
        const response = await fetch(`${API_URL}/metodos-pagamento`);
        if (response.ok) {
          setMetodosPagamentoApi(await response.json());
        } else {
          console.error("API falhou ao buscar métodos de pagamento.");
          setPopup({ show: true, message: 'Não foi possível carregar os métodos de pagamento.', type: 'error' });
        }
      } catch (error) {
        console.error("Falha ao buscar métodos de pagamento:", error);
        setPopup({ show: true, message: 'Erro de conexão ao buscar métodos de pagamento.', type: 'error' });
      }
    };
    fetchMetodosPagamento();
  }, []);

  // NOVAS FUNÇÕES PARA AS MÁSCARAS DO CARTÃO
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.target;

    if (id === 'number') {
      value = value.replace(/\D/g, ''); // Remove tudo que não for dígito
      value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
      value = value.substring(0, 19); // Limita o tamanho (16 dígitos + 3 espaços)
    }

    if (id === 'expiry') {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1/$2');
      value = value.substring(0, 5);
    }

    if (id === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    }
    
    if (id === 'name') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setCardData(prev => ({ ...prev, [id]: value }));
  };


  const handleGeneratePixKey = () => {
    const randomKey = crypto.randomUUID();
    setPixKey(randomKey);
    setHasCopiedPixKey(false);
    setPopup({ show: true, message: 'Chave Pix gerada com sucesso!', type: 'success' });
  };

  const handleCopyPixKey = () => {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey);
      setHasCopiedPixKey(true);
      setPopup({ show: true, message: 'Chave copiada para a área de transferência!', type: 'success' });
    }
  };
  
  const selectPaymentMethod = (method: 'cartao' | 'pix') => {
    setPaymentMethod(method);
    setPixKey(null);
    setHasCopiedPixKey(false);
  }

  const handleFinalize = async () => {
    if (!paymentMethod) {
      setPopup({ show: true, message: 'Selecione um método de pagamento para finalizar o pedido.', type: 'error'});
      return;
    }
    if (!user || totalItens === 0 || !selectedAddressId) {
      setPopup({ show: true, message: 'Não foi possível finalizar o pedido. Verifique os itens e o endereço.', type: 'error'});
      return;
    }

    if (paymentMethod === 'pix') {
      if (!pixKey) {
        setPopup({ show: true, message: 'Você precisa gerar a chave Pix antes de finalizar.', type: 'error'});
        return;
      }
      if (!hasCopiedPixKey) {
        setPopup({ show: true, message: 'Por favor, copie a chave Pix para confirmar o pagamento.', type: 'error'});
        return;
      }
    }
    
    setIsLoading(true);

    const nomeMetodo = paymentMethod === 'cartao' ? 'Cartão de Crédito' : 'Pix';
    const metodoSelecionado = metodosPagamentoApi.find(m => m.nome.toLowerCase() === nomeMetodo.toLowerCase());

    if (!metodoSelecionado || !metodoSelecionado.id) {
      setPopup({ show: true, message: `O método de pagamento "${nomeMetodo}" não foi encontrado no sistema.`, type: 'error'});
      setIsLoading(false);
      return;
    }
    
    const pedidoData = {
      usuarioId: user.id,
      enderecoId: selectedAddressId,
      metodoPagamentoId: metodoSelecionado.id,
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
        
        <div className="mb-6">
          <p className="font-medium mb-2 text-gray-700">Escolha como pagar:</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => selectPaymentMethod('cartao')}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                paymentMethod === 'cartao' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <CreditCard size={28} className="mb-2" />
              <span className="font-semibold">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => selectPaymentMethod('pix')}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${
                paymentMethod === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <QrCode size={28} className="mb-2" />
              <span className="font-semibold">Pix</span>
            </button>
          </div>
        </div>
        
        <div className="min-h-[180px] flex flex-col justify-center">
          {paymentMethod === 'cartao' && (
            <div className="space-y-4 animate-fade-in-up">
              {/* INPUTS ATUALIZADOS PARA USAR O ESTADO E AS FUNÇÕES DE MÁSCARA */}
              <div><label htmlFor="number">Número do Cartão</label><Input id="number" placeholder="0000 0000 0000 0000" value={cardData.number} onChange={handleCardInputChange} /></div>
              <div><label htmlFor="name">Nome no Cartão</label><Input id="name" placeholder="Nome como no cartão" value={cardData.name} onChange={handleCardInputChange} /></div>
              <div className="flex gap-4">
                <div className="flex-1"><label htmlFor="expiry">Validade</label><Input id="expiry" placeholder="MM/AA" value={cardData.expiry} onChange={handleCardInputChange} /></div>
                <div className="flex-1"><label htmlFor="cvv">CVV</label><Input id="cvv" placeholder="123" value={cardData.cvv} onChange={handleCardInputChange} /></div>
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="animate-fade-in-up w-full">
              {!pixKey ? (
                <div className="text-center">
                  <Button onClick={handleGeneratePixKey}>
                    <QrCode size={18} className="mr-2"/> Gerar Chave Pix para Pagamento
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 text-center">Use o código abaixo para pagar via Pix (Copia e Cola):</p>
                  <div className="flex items-center gap-2">
                    <Input readOnly value={pixKey} className="bg-gray-100 text-center text-sm flex-grow" />
                    <Button onClick={handleCopyPixKey} className="bg-gray-600 hover:bg-gray-700 p-2">
                      <Copy size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-8 pt-6 border-t gap-4">
          <Button onClick={onBack} className="bg-gray-600 hover:bg-gray-700">Voltar</Button>
          <Button 
            className="flex-grow text-lg" 
            onClick={handleFinalize} 
            disabled={isLoading || !paymentMethod}
          >
            <Lock size={18} className="mr-2"/> {isLoading ? 'Processando...' : 'Finalizar Compra'}
          </Button>
        </div>
      </div>
    </>
  );
}