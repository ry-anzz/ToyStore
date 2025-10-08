// src/app/(auth)/cadastro/page.tsx
"use client"; 

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// URL base da sua API do Spring Boot
const API_URL = 'http://localhost:8080/api';

export default function CadastroPage() {
  const router = useRouter();
  const [cpfValue, setCpfValue] = useState(''); 

  // LÓGICA DE MÁSCARA E LIMITE DE CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // 1. Remove tudo que não for dígito
    
    // 2. Limita a 11 caracteres (999.999.999-99)
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // 3. Aplica a máscara: XXX.XXX.XXX-XX
    if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d{3})$/, '$1');
    }

    setCpfValue(value);
  };

  const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // O CPF enviado para a API deve estar SEM PONTOS/TRAÇOS
    const cpfUnmasked = (formData.get('cpf') as string).replace(/\D/g, ''); 

    const userData = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      cpf: cpfUnmasked, // ENVIA O CPF LIMPO
      senha: formData.get('senha'), 
      telefone: "", 
      administrador: false,
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert('✅ Cadastro realizado com sucesso! Faça login.');
            router.push('/login'); 
        } else {
            // Se houver um erro (ex: CPF ou Email duplicado, status 400/500)
            const errorData = await response.json();
            alert(`❌ Falha no cadastro: ${errorData.message || 'Dados inválidos ou duplicados (CPF/Email).'}`);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('❌ Erro de conexão. Verifique se o Spring Boot está ativo.');
    }
  };


  return (
    // O layout pai centraliza este div
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
          {/* APLICAÇÃO DA MÁSCARA */}
          <Input 
            id="cpf" 
            name="cpf" 
            type="text" 
            placeholder="000.000.000-00" 
            required 
            value={cpfValue} // Usa o valor mascarado
            onChange={handleCpfChange} // Aplica a máscara ao digitar
            inputMode="numeric" // Sugere teclado numérico em mobile
            maxLength={14} // Limita o tamanho máximo com pontos
            className="mt-1 w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500" 
          />
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