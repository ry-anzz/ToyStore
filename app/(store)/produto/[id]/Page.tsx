// src/app/(store)/produto/[id]/page.tsx
import { Button } from '@/components/ui/Button';
import { Avaliacao } from '@/types';

// Simulação de dados
const mockProduct = { id: 1, nome: 'Lego Classic', valor: 150.00, imagem_url: '/images/lego.jpg', descricao: 'Um conjunto incrível para soltar a imaginação.', categoria: 1, marca: 1 };
const mockReviews: Avaliacao[] = [
    {id: 1, usuario_id: 1, produto_id: 1, descricao: 'Meu filho adorou!', data: '2025-10-01', nota: 5}
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Aqui você faria uma busca na API pelo produto com o `params.id`
  
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <img src={mockProduct.imagem_url} alt={mockProduct.nome} className="w-full rounded-lg shadow-lg" />
      </div>
      <div>
        <h1 className="text-4xl font-bold">{mockProduct.nome}</h1>
        <p className="text-2xl text-blue-600 font-semibold my-4">
          {mockProduct.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <p className="text-gray-700 mb-6">{mockProduct.descricao}</p>
        <Button className="w-full text-lg">
          Adicionar ao Carrinho
        </Button>
      </div>
      {/* Seção de Avaliações */}
      <div className="md:col-span-2 mt-8">
        <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
        {/* Mapear e exibir o componente de avaliação */}
      </div>
    </div>
  );
}