// src/app/(auth)/cadastro/page.tsx
"use client"; 

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Popup } from "@/components/ui/Popup";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_URL = 'http://localhost:8080/api';

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', telefone: '', ddd: '', senha: '',
    confirmarSenha: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', uf: '',
  });
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === 'cpf') setFormData(prev => ({ ...prev, [id]: maskCpf(value) }));
    else if (id === 'cep') setFormData(prev => ({ ...prev, [id]: maskCep(value) }));
    else if (id === 'ddd') setFormData(prev => ({ ...prev, [id]: value.replace(/\D/g, '').substring(0, 2) }));
    else if (id === 'telefone') setFormData(prev => ({ ...prev, [id]: maskTelefone(value) }));
    else setFormData(prev => ({ ...prev, [id]: value }));
  };

  const maskCpf = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{3})/, '$1.$2');
    return v;
  };

  const maskTelefone = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 9);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{4})/, '$1-$2');
    else if (v.length > 4) v = v.replace(/(\d{4})(\d{0,4})/, '$1-$2');
    if (v.endsWith('-')) v = v.slice(0, -1);
    return v;
  };
  
  const maskCep = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{3})/, '$1-$2');
    return v;
  };

  const handleNextStep = () => {
    if (formData.senha.length < 6) {
      setPopup({ show: true, type: 'error', message: 'A senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setPopup({ show: true, type: 'error', message: 'As senhas não coincidem. Verifique por favor.' });
      return;
    }
    setStep(2);
  };
  
  const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nome, email, senha, rua, numero, bairro, cidade, uf } = formData;
    const cpfUnmasked = formData.cpf.replace(/\D/g, '');
    const dddUnmasked = formData.ddd.replace(/\D/g, '');
    const telefoneUnmasked = formData.telefone.replace(/\D/g, '');
    const cepUnmasked = formData.cep.replace(/\D/g, '');

    const userData = {
      nome, email, senha, cpf: cpfUnmasked, telefone: `${dddUnmasked}${telefoneUnmasked}`, administrador: false,
      enderecos: [{ rua, numero, bairro, cidade, uf: uf.toUpperCase(), cep: cepUnmasked, apelido: "Principal" }]
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            setPopup({ show: true, type: 'success', message: 'Cadastro realizado com sucesso! Você será redirecionado.' });
            setTimeout(() => router.push('/login'), 2000); 
        } else {
            const errorData = await response.json();
            setPopup({ show: true, type: 'error', message: errorData.message || 'Dados inválidos ou duplicados.' });
        }
    } catch (error) {
        setPopup({ show: true, type: 'error', message: 'Erro de conexão. Verifique se o backend está ativo.' });
    }
  };

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-blue-500"> 
        <div className="text-center">
          <Blocks size={64} className="mx-auto text-blue-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800">
            {step === 1 ? 'Crie Sua Conta' : 'Endereço Principal'}
          </h1>
          <p className="text-blue-500 mt-2 text-lg">
            {step === 1 ? 'Vamos começar com seus dados pessoais.' : 'Nos diga onde entregar seus brinquedos.'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
            <Input id="nome" name="nome" type="text" placeholder="Nome Completo" required value={formData.nome} onChange={handleInputChange} className="w-full" />
            <Input id="email" name="email" type="email" placeholder="Seu melhor e-mail" required value={formData.email} onChange={handleInputChange} className="w-full" />
            <Input id="cpf" name="cpf" type="text" placeholder="CPF" required value={formData.cpf} onChange={handleInputChange} className="w-full" />
            <div className="flex gap-4">
              <Input id="ddd" name="ddd" type="text" placeholder="DDD" required value={formData.ddd} onChange={handleInputChange} className="w-1/3" />
              <Input id="telefone" name="telefone" type="text" placeholder="Telefone" required value={formData.telefone} onChange={handleInputChange} className="w-2/3" />
            </div>
            <Input id="senha" name="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required value={formData.senha} onChange={handleInputChange} className="w-full" />
            <Input id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Confirmar Senha" required value={formData.confirmarSenha} onChange={handleInputChange} className="w-full" />
            
            <Button type="submit" className="w-full text-lg py-3">Próximo Passo</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCadastro} className="space-y-4">
            <Input id="cep" name="cep" type="text" placeholder="CEP" required value={formData.cep} onChange={handleInputChange} className="w-full" />
            <Input id="rua" name="rua" type="text" placeholder="Rua / Avenida" required value={formData.rua} onChange={handleInputChange} className="w-full" />
            <div className="flex gap-4">
              <Input id="numero" name="numero" type="text" placeholder="Número" required value={formData.numero} onChange={handleInputChange} className="w-1/3" />
              <Input id="bairro" name="bairro" type="text" placeholder="Bairro" required value={formData.bairro} onChange={handleInputChange} className="w-2/3" />
            </div>
            <div className="flex gap-4">
                <Input id="cidade" name="cidade" type="text" placeholder="Cidade" required value={formData.cidade} onChange={handleInputChange} className="w-2/3" />
                <Input id="uf" name="uf" type="text" placeholder="UF" required value={formData.uf} onChange={handleInputChange} maxLength={2} className="w-1/3" />
            </div>
            
            <Button type="submit" className="w-full text-lg py-3">Finalizar Cadastro!</Button>
            <Button type="button" onClick={() => setStep(1)} className="w-full bg-gray-600 hover:bg-gray-700">Voltar</Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Faça Login aqui!
          </Link>
        </p>
      </div>
    </>
  );
}