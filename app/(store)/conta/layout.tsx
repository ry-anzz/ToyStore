// src/app/(store)/conta/layout.tsx

import { AccountSidebar } from "@/components/user/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Nosso menu lateral fixo */}
        <AccountSidebar />

        {/* O conteúdo da página (children) será renderizado aqui */}
        <main className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {children}
        </main>
      </div>
    </div>
  );
}