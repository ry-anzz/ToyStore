// src/app/(auth)/login/page.tsx

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Blocks } from "lucide-react"; // CORREÇÃO: Ícone que existe

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-yellow-500 transform hover:scale-105 transition-transform duration-300">
      <div className="text-center">
        {/* Usando o ícone correto aqui */}
        <Blocks size={64} className="mx-auto text-yellow-500 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-800">Hora de Brincar!</h1>
        <p className="text-yellow-500 mt-2 text-lg">Entre na sua conta e divirta-se!</p>
      </div>

      {/* O resto do formulário continua igual... */}
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-mail</label>
          <Input id="email" type="email" placeholder="seu@email.com" required className="mt-1 w-full border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">Senha</label>
          <Input id="senha" type="password" placeholder="••••••••" required className="mt-1 w-full border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" />
        </div>

        <Button type="submit" className="w-full text-lg py-3 bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200 shadow-lg">
          Entrar Agora!
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/cadastro" className="font-bold text-yellow-600 hover:underline">
          Cadastre-se aqui!
        </Link>
      </p>
    </div>
  );
}