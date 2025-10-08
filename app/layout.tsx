// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. IMPORTAR TODOS OS PROVIDERS
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loja de Brinquedos",
  description: "A melhor loja de brinquedos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. ENVOLVER TODA A APLICAÇÃO COM OS PROVIDERS */}
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}