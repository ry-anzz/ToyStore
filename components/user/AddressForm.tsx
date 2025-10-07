// src/components/user/AddressForm.tsx

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface AddressFormProps {
  onCancel: () => void; // Função para fechar o formulário
}

export function AddressForm({ onCancel }: AddressFormProps) {
  return (
    <div className="border rounded-lg p-6 bg-gray-50 mt-6">
      <h3 className="text-xl font-semibold mb-4">Adicionar Novo Endereço</h3>
      <form className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-6">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Apelido do Endereço</label>
          <Input id="nome" type="text" placeholder="Ex: Casa, Trabalho" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
          <Input id="cep" type="text" placeholder="00000-000" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="rua" className="block text-sm font-medium text-gray-700">Rua</label>
          <Input id="rua" type="text" placeholder="Nome da sua rua" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número</label>
          <Input id="numero" type="text" placeholder="123" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
          <Input id="bairro" type="text" placeholder="Seu bairro" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
          <Input id="cidade" type="text" placeholder="Sua cidade" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="uf" className="block text-sm font-medium text-gray-700">UF</label>
          <Input id="uf" type="text" placeholder="SP" className="mt-1 w-full" />
        </div>
        <div className="sm:col-span-6 flex justify-end gap-2 mt-2">
            <Button type="button"  onClick={onCancel}>Cancelar</Button>
            <Button type="submit">Salvar Endereço</Button>
        </div>
      </form>
    </div>
  );
}