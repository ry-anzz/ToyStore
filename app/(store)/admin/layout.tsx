// src/app/(store)/admin/layout.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { LayoutDashboard, Package, LogOut, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  

  // Proteção de rota: se o usuário não for admin, redireciona
  if (!user?.administrador) {
    if (typeof window !== "undefined") {
      router.push('/');
    }
    return (
        <div className="text-center py-20">
            <p>Acesso negado. Você precisa ser um administrador.</p>
        </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm("Deseja sair da sua conta?")) {
        logout();
        router.push('/?logout=true');
    }
  };

  

  const navLinks = [
    { name: "Gerenciar Produtos", href: "/admin/produtos", icon: Package },
    { name: "Gerenciar Marcas", href: "/admin/marcas", icon: Package },
    { name: "Métodos de Pagamento", href: "/admin/metodos-pagamento", icon: Package },
    { name: "Voltar para Loja", href: "/", icon: Home },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Menu Lateral do Admin */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Painel Admin</h2>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                pathname === link.href ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
        </nav>
        <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-red-400 hover:bg-gray-700"
        >
            <LogOut size={20} />
            Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}