// src/components/ui/ConfirmationModal.tsx
"use client";

import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  // --- NOVA PROPRIEDADE AQUI ---
  cancelButtonClass?: string; // Propriedade opcional para customizar o estilo do botão Cancelar
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, cancelButtonClass }: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  // --- Classes padrão para o botão Cancelar se não for fornecida uma customizada ---
  const defaultCancelClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center animate-fade-in-up">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{message}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            type="button"
            // --- APLICA A CLASSE CUSTOMIZADA OU A PADRÃO ---
            className={cancelButtonClass || defaultCancelClasses}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}