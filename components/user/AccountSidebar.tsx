// src/components/user/AccountSidebar.tsx

"use client"; // Adicionamos isso pois usaremos hooks como o usePathname para saber a página ativa

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Package, MapPin, LogOut } from "lucide-react";

// Lista de links do menu
const navLinks = [
  { name: "Painel", href: "/conta", icon: Home },
  { name: "Meus Pedidos", href: "/conta/pedidos", icon: Package },
  { name: "Meus Endereços", href: "/conta/enderecos", icon: MapPin },
  { name: "Meus Dados", href: "/conta/dados", icon: User },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
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
        <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50"
        >
            <LogOut className="h-5 w-5" />
            Sair
        </Link>
      </nav>
    </aside>
  );
}