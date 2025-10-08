// src/app/(auth)/login/page.tsx - COMPLETO E COM CHAMADA DE API

"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; 

// URL base da sua API do Spring Boot
const API_URL = 'http://localhost:8080/api'; 

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth(); // Pegamos a função login do contexto

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        // 1. Coleta das credenciais
        const credentials = {
            email: formData.get('email'),
            senha: formData.get('senha'), // Coleta a senha digitada
        };

        try {
            // 2. CHAMADA AO ENDPOINT DE LOGIN DO SPRING BOOT
            // NOTA: Assumimos que o endpoint de login é POST /api/auth/login
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                // 3. Se a autenticação for bem-sucedida, lemos o token (ou os dados do usuário)
                const authData = await response.json(); 
                
                // 4. Chamada REAL à função de login do Context (Simulando o uso de token)
                // Usamos o email e um token (que o backend retornaria se fosse JWT)
                login(credentials.email as string, authData.token || "token_simulado"); 

                alert(`✅ Login bem-sucedido para ${credentials.email}!`);
                router.push('/conta'); // Redireciona
            } else {
                // 5. Se houver erro de credencial (401, 404, etc.)
                alert('❌ Credenciais inválidas. Verifique seu e-mail e senha.');
            }
        } catch (error) {
            console.error('Erro de rede/API:', error);
            alert('❌ Erro de conexão com o servidor. Verifique se o Spring Boot está rodando.');
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-yellow-500 transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
                {/* O AuthLayout (pai) centraliza este bloco */}
                <Blocks size={64} className="mx-auto text-yellow-500 mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-800">Hora de Brincar!</h1>
                <p className="text-yellow-500 mt-2 text-lg">Entre na sua conta e divirta-se!</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4"> {/* LIGAÇÃO COM A FUNÇÃO */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-mail</label>
                    {/* name="email" é crucial para o formData */}
                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="mt-1 w-full border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>
                <div>
                    <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">Senha</label>
                    {/* name="senha" é crucial para o formData */}
                    <Input id="senha" name="senha" type="password" placeholder="••••••••" required className="mt-1 w-full border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" />
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