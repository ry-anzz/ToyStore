// src/components/ui/Popup.tsx
"use client";

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface PopupProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export function Popup({ type, message, onClose }: PopupProps) {
  const isSuccess = type === 'success';
  const [show, setShow] = useState(false);

  // Efeito para controlar a animação e o auto-fechamento
  useEffect(() => {
    // Inicia a animação de entrada
    setShow(true);

    // Agenda o início da animação de saída
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // O pop-up some após 5 segundos

    return () => clearTimeout(timer);
  }, []);

  // Função que inicia a animação de saída e depois chama o onClose real
  const handleClose = () => {
    setShow(false); // Inicia a animação de saída
    setTimeout(() => {
      onClose(); // Fecha o componente de vez após a animação
    }, 300); // Duração da animação em ms
  };

  const baseBgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div 
      className={`
        fixed top-6 right-6 z-50 max-w-sm w-full rounded-lg shadow-lg p-4 border-l-4 
        ${baseBgColor} ${borderColor}
        transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon size={22} className={textColor} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <span className="sr-only">Fechar</span>
            <X size={20} className={textColor} />
          </button>
        </div>
      </div>
    </div>
  );
}