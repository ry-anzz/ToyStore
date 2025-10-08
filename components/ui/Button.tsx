// src/components/ui/Button.tsx

import { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot'; // Precisamos instalar isso!

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean; // Adicionamos a nova propriedade
}

export function Button({ children, className, asChild = false, ...props }: ButtonProps) {
  // Se asChild for true, usamos o Slot, que passará as props para o filho (nosso Link)
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={`bg-blue-600 text-white font-semibold cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}