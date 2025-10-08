// src/app/(store)/layout.tsx

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext"; // 1. IMPORTAMOS O NOVO PROVIDER
import { AuthProvider } from "@/contexts/AuthContext";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. ENVOLVEMOS A APLICAÇÃO COM OS DOIS PROVIDERS
    <AuthProvider> 
      <CartProvider>
        <FavoritesProvider>
          {/* ... restante do layout ... */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}