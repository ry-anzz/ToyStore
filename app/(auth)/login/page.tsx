// src/app/(auth)/login/page.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Popup } from "@/components/ui/Popup";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; 
import { useState } from "react";

const API_URL = 'http://localhost:8080/api'; 

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const credentials = {
            email: formData.get('email'),
            senha: formData.get('senha'),
        };

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const authData = await response.json(); 
                login(credentials.email as string, authData.token || "token_simulado"); 
                
                setPopup({ show: true, type: 'success', message: 'Login bem-sucedido! Bem-vindo(a) de volta.' });
                
                // MUDANÇA AQUI: Redireciona para a página principal
                setTimeout(() => router.push('/'), 2000);
            } else {
                setPopup({ show: true, type: 'error', message: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
            }
        } catch (error) {
            setPopup({ show: true, type: 'error', message: 'Erro de conexão. Verifique se o backend está ativo.' });
        }
    };

    return (
        <>
            {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-yellow-500">
                <div className="text-center">
                    <Blocks size={64} className="mx-auto text-yellow-500 mb-4" />
                    <h1 className="text-4xl font-extrabold text-gray-800">Hora de Brincar!</h1>
                    <p className="text-yellow-500 mt-2 text-lg">Entre na sua conta e divirta-se!</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-mail</label>
                        <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="mt-1 w-full" />
                    </div>
                    <div>
                        <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">Senha</label>
                        <Input id="senha" name="senha" type="password" placeholder="••••••••" required className="mt-1 w-full" />
                    </div>

                    <Button type="submit" className="w-full text-lg py-3 bg-yellow-600 hover:bg-yellow-700">
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
        </>
    );
}