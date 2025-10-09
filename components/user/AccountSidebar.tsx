// src/components/user/AccountSidebar.tsx
"use client"; 

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Home, Package, MapPin, LogOut, Heart, Shield } from "lucide-react"; 
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";

const navLinks = [
  { name: "Painel", href: "/conta", icon: Home },
  { name: "Meus Pedidos", href: "/conta/pedidos", icon: Package },
  { name: "Meus Endereços", href: "/conta/enderecos", icon: MapPin },
  { name: "Meus Favoritos", href: "/conta/favoritos", icon: Heart },
  { name: "Meus Dados", href: "/conta/dados", icon: User },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/?logout=true');
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          handleLogout();
        }}
        title="Confirmar Saída"
        message="Você tem certeza que deseja sair da sua conta?"
        // --- ALTERAÇÃO AQUI ---
        cancelButtonClass="bg-blue-500 hover:bg-blue-600 text-white" 
        // --- FIM DA ALTERAÇÃO ---
      />

      <aside className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}

          {user?.administrador && (
            <Link
              href="/admin/produtos"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 ${
                pathname.startsWith('/admin') ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700"
              }`}
            >
              <Shield className="h-5 w-5" />
              Painel Admin
            </Link>
          )}

          <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 text-left"
          >
              <LogOut className="h-5 w-5" />
              Sair
          </button>
        </nav>
      </aside>
    </>
  );
}