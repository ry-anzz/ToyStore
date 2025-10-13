// src/app/(auth)/cadastro/page.tsx
"use client"; 

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Popup } from "@/components/ui/Popup";
import Link from "next/link";
import { Blocks } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react'; // 1. IMPORTAR useCallback

const API_URL = 'http://localhost:8080/api';

const estadosBrasileiros = [
  { sigla: 'AC', nome: 'Acre' }, { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' }, { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' }, { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' }, { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' }, { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' }, { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' }, { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' }, { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' }, { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' }, { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' }, { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' }, { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' }, { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', telefone: '', ddd: '', senha: '',
    confirmarSenha: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', uf: '',
  });
  const [popup, setPopup] = useState({ show: false, type: 'success' as 'success' | 'error', message: '' });

  // 2. FUNÇÃO PARA BUSCAR O ENDEREÇO PELO CEP
  const fetchAddress = useCallback(async (cep: string) => {
    const cepNumerico = cep.replace(/\D/g, '');
    if (cepNumerico.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      const data = await response.json();
      if (data.erro) {
        setPopup({ show: true, type: 'error', message: 'CEP não encontrado.' });
        return;
      }
      
      // Preenche os campos do formulário com os dados da API
      setFormData(prev => ({
        ...prev,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      }));

    } catch (error) {
      setPopup({ show: true, type: 'error', message: 'Não foi possível buscar o CEP.' });
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    let maskedValue = value;
    if (id === 'cpf') maskedValue = maskCpf(value);
    else if (id === 'ddd') maskedValue = value.replace(/\D/g, '').substring(0, 2);
    else if (id === 'telefone') maskedValue = maskTelefone(value);
    else if (id === 'cep') {
        maskedValue = maskCep(value);
        // 3. CHAMA A FUNÇÃO DE BUSCA QUANDO O CEP ESTIVER COMPLETO
        if (maskedValue.replace(/\D/g, '').length === 8) {
          fetchAddress(maskedValue);
        }
    }

    setFormData(prev => ({ ...prev, [id]: maskedValue }));
  };
  
  const maskCpf = (v:string) => { v=v.replace(/\D/g,"");v=v.replace(/(\d{3})(\d)/,"$1.$2");v=v.replace(/(\d{3})(\d)/,"$1.$2");v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");return v.substring(0,14) };
  const maskTelefone = (v:string) => { v=v.replace(/\D/g,"");v=v.replace(/(\d{5})(\d)/,"$1-$2");return v.substring(0,10) };
  const maskCep = (v:string) => { v=v.replace(/\D/g,"");v=v.replace(/(\d{5})(\d)/,"$1-$2");return v.substring(0,9) };

  const handleNextStep = () => {
    if (formData.senha.length < 6) {
      setPopup({ show: true, type: 'error', message: 'A senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setPopup({ show: true, type: 'error', message: 'As senhas não coincidem.' });
      return;
    }
    setStep(2);
  };
  
  const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nome, email, senha, rua, numero, bairro, cidade, uf } = formData;
    const cpfUnmasked = formData.cpf.replace(/\D/g, '');
    const telefoneCompleto = `${formData.ddd}${formData.telefone}`.replace(/\D/g, '');
    const cepUnmasked = formData.cep.replace(/\D/g, '');

    const userData = {
      nome, email, senha, cpf: cpfUnmasked, telefone: telefoneCompleto, administrador: false,
      enderecos: [{ rua, numero, bairro, cidade, uf: uf.toUpperCase(), cep: cepUnmasked, apelido: "Principal" }]
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            setPopup({ show: true, type: 'success', message: 'Cadastro realizado! Redirecionando para o login.' });
            setTimeout(() => router.push('/login'), 2000); 
        } else {
            const errorData = await response.json();
            setPopup({ show: true, type: 'error', message: errorData.message || 'Dados inválidos ou duplicados.' });
        }
    } catch (error) {
        setPopup({ show: true, type: 'error', message: 'Erro de conexão com o servidor.' });
    }
  };

  return (
    <>
      {popup.show && <Popup type={popup.type} message={popup.message} onClose={() => setPopup({ ...popup, show: false })} />}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 border-t-8 border-blue-500"> 
        <div className="text-center">
          <Blocks size={64} className="mx-auto text-blue-500 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800">{step === 1 ? 'Crie Sua Conta' : 'Endereço Principal'}</h1>
          <p className="text-blue-500 mt-2 text-lg">{step === 1 ? 'Vamos começar com seus dados pessoais.' : 'Nos diga onde entregar seus brinquedos.'}</p>
        </div>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
            <Input id="nome" placeholder="Nome Completo" required value={formData.nome} onChange={handleInputChange} className="w-full" />
            <Input id="email" type="email" placeholder="Seu melhor e-mail" required value={formData.email} onChange={handleInputChange} className="w-full" />
            <Input id="cpf" placeholder="CPF" required value={formData.cpf} onChange={handleInputChange} className="w-full" />
            <div className="flex gap-4">
              <Input id="ddd" placeholder="DDD" required value={formData.ddd} onChange={handleInputChange} className="w-1/3" />
              <Input id="telefone" placeholder="Telefone" required value={formData.telefone} onChange={handleInputChange} className="w-2/3" />
            </div>
            <Input id="senha" type="password" placeholder="Senha (mín. 6 caracteres)" required value={formData.senha} onChange={handleInputChange} className="w-full" />
            <Input id="confirmarSenha" type="password" placeholder="Confirmar Senha" required value={formData.confirmarSenha} onChange={handleInputChange} className="w-full" />
            <Button type="submit" className="w-full text-lg py-3">Próximo Passo</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCadastro} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/3"><label htmlFor="cep">CEP</label><Input id="cep" value={formData.cep} onChange={handleInputChange} required className="mt-1 w-full"/></div>
              <div className="sm:w-2/3"><label htmlFor="rua">Rua</label><Input id="rua" value={formData.rua} onChange={handleInputChange} required className="mt-1 w-full"/></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/3"><label htmlFor="numero">Número</label><Input id="numero" value={formData.numero} onChange={handleInputChange} required className="mt-1 w-full"/></div>
              <div className="sm:w-2/3"><label htmlFor="bairro">Bairro</label><Input id="bairro" value={formData.bairro} onChange={handleInputChange} required className="mt-1 w-full"/></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-2/3"><label htmlFor="cidade">Cidade</label><Input id="cidade" value={formData.cidade} onChange={handleInputChange} required className="mt-1 w-full"/></div>
              <div className="sm:w-1/3">
                <label htmlFor="uf">UF</label>
                <select id="uf" name="uf" value={formData.uf} onChange={handleInputChange} required
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled>Selecione</option>
                  {estadosBrasileiros.map(estado => (
                    <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full text-lg py-3">Finalizar Cadastro!</Button>
            <Button type="button" onClick={() => setStep(1)} className="w-full bg-gray-600 hover:bg-gray-700">Voltar</Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta? <Link href="/login" className="font-bold text-blue-600 hover:underline">Faça Login aqui!</Link>
        </p>
      </div>
    </>
  );
}