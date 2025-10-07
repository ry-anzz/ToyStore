// src/app/(store)/layout.tsx

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

// O nome do componente começa com letra maiúscula: StoreLayout
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}