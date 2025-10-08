// src/components/user/AddressForm.tsx
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Endereco } from "@/types";

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

interface AddressFormProps {
  onCancel: () => void;
  onSave: (addressData: Endereco) => void;
  initialData?: Endereco | null;
}

export function AddressForm({ onCancel, onSave, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState({
    apelido: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', uf: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        apelido: initialData.apelido || '', cep: initialData.cep || '',
        rua: initialData.rua || '', numero: initialData.numero || '',
        bairro: initialData.bairro || '', cidade: initialData.cidade || '',
        uf: initialData.uf || '',
      });
    }
  }, [initialData]);

  const maskCep = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 8);
    if (v.length > 5) {
      v = v.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let finalValue = value;

    if (id === 'cep') {
      finalValue = maskCep(value);
    }

    setFormData(prev => ({ ...prev, [id]: finalValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...initialData, ...formData });
  };

  return (
    <div className="border rounded-lg p-6 bg-gray-50 mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? 'Editar Endereço' : 'Adicionar Novo Endereço'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apelido" className="block text-sm font-medium text-gray-700">Apelido do Endereço</label>
          <Input id="apelido" type="text" value={formData.apelido} onChange={handleInputChange} placeholder="Ex: Casa, Trabalho" className="mt-1 w-full" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
            <Input id="cep" type="text" value={formData.cep} onChange={handleInputChange} placeholder="00000-000" required className="mt-1 w-full" />
          </div>
          <div className="sm:w-2/3">
            <label htmlFor="rua" className="block text-sm font-medium text-gray-700">Rua</label>
            <Input id="rua" type="text" value={formData.rua} onChange={handleInputChange} placeholder="Nome da sua rua" required className="mt-1 w-full" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3">
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número</label>
            <Input id="numero" type="text" value={formData.numero} onChange={handleInputChange} placeholder="123" required className="mt-1 w-full" />
          </div>
          <div className="sm:w-2/3">
            <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
            <Input id="bairro" type="text" value={formData.bairro} onChange={handleInputChange} placeholder="Seu bairro" required className="mt-1 w-full" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-2/3">
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
            <Input id="cidade" type="text" value={formData.cidade} onChange={handleInputChange} placeholder="Sua cidade" required className="mt-1 w-full" />
          </div>
          <div className="sm:w-1/3">
            <label htmlFor="uf" className="block text-sm font-medium text-gray-700">UF</label>
            <select
              id="uf" name="uf" value={formData.uf} onChange={handleInputChange} required
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>Selecione</option>
              {/* ALTERAÇÃO AQUI: Exibe sigla e nome completo */}
              {estadosBrasileiros.map(estado => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.sigla} - {estado.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">Cancelar</Button>
            <Button type="submit">Salvar Endereço</Button>
        </div>
      </form>
    </div>
  );
}