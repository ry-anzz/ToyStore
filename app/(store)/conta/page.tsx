// src/app/(store)/conta/page.tsx
"use client"; 

import { useAuth } from "@/contexts/AuthContext"; // 1. Importar o hook de autenticação
import { User, MapPin } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  // 2. Pegar os dados do usuário LOGADO a partir do contexto
  const { user } = useAuth();

  // Se os dados do usuário ainda não foram carregados, exibe uma mensagem
  if (!user) {
    return <div>Carregando dados da conta...</div>;
  }

  // Se os dados já carregaram, exibe o painel
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Olá, {user.nome}!</h2>
      <p className="text-gray-600 mb-8">
        Bem-vindo ao seu painel! Aqui você pode gerenciar seus pedidos,
        endereços e informações pessoais.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card de Dados Pessoais com dados DINÂMICOS */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2"><User /> Meus Dados</h3>
            <Link href="/conta/dados" className="text-sm font-semibold text-blue-600 hover:underline">Ver tudo</Link>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Nome:</span> {user.nome}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Telefone:</span> {user.telefone}</p>
          </div>
        </div>

        {/* Card de Endereços com dados DINÂMICOS */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2"><MapPin /> Meus Endereços</h3>
            <Link href="/conta/enderecos" className="text-sm font-semibold text-blue-600 hover:underline">Ver tudo</Link>
          </div>
          {user.enderecos && user.enderecos.length > 0 ? (
            <div className="space-y-3">
              {user.enderecos.map(addr => (
                <div key={addr.id} className="pb-2 border-b last:border-none">
                  <p className="font-semibold">{addr.apelido || 'Endereço Principal'}</p>
                  <p className="text-sm text-gray-600">{addr.rua}, {addr.numero} - {addr.cidade}/{addr.uf}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum endereço cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}