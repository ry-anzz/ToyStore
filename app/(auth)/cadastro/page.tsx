// src/app/(auth)/cadastro/page.tsx
"use client"; 

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';

// URL base da sua API do Spring Boot
const API_URL = 'http://localhost:8080/api'; 

export default function CadastroPage() {
  const router = useRouter();

  const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // 1. Coleta dos dados do formulário
    const userData = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      cpf: formData.get('cpf'),
      senha: formData.get('senha'),
      // Telefone é configurado como opcional no seu model, setamos como vazio:
      telefone: "", 
      administrador: false,
    };

    try {
        // 2. CHAMADA POST para o endpoint de criação de usuário no Spring Boot
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert('✅ Cadastro realizado com sucesso! Faça login.');
            router.push('/login'); // Redireciona para o login
        } else {
            // Se houver um erro (ex: CPF ou Email duplicado)
            const errorData = await response.json();
            alert(`❌ Falha no cadastro: ${errorData.message || 'Dados inválidos ou duplicados (CPF/Email).'}`);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('❌ Erro ao conectar com o servidor. Verifique se o Spring Boot está ativo.');
    }
  };


  return (
    // ESTILO GARANTE A CENTRALIZAÇÃO COM O LAYOUT PAI (AuthLayout)
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-blue-500 transform hover:scale-105 transition-transform duration-300"> 
      <div className="text-center">
        <Blocks size={64} className="mx-auto text-blue-500 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-800">Vamos Brincar!</h1>
        <p className="text-blue-500 mt-2 text-lg">Crie sua conta e comece a diversão!</p>
      </div>

      <form onSubmit={handleCadastro} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-gray-700">Nome Completo</label>
          <Input id="nome" name="nome" type="text" placeholder="Seu nome completo" required className="mt-1 w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-mail</label>
          <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="mt-1 w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="cpf" className="block text-sm font-semibold text-gray-700">CPF</label>
          <Input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" required className="mt-1 w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">Senha</label>
          <Input id="senha" name="senha" type="password" placeholder="••••••••" required className="mt-1 w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <Button type="submit" className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg">
          Cadastrar e Começar!
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Já é um jogador?{' '}
        <Link href="/login" className="font-bold text-blue-600 hover:underline">
          Faça Login aqui!
        </Link>
      </p>
    </div>
  );
}