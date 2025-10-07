import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Produto } from '@/types';

interface ProductCardProps {
  product: Produto;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Link href={`/produto/${product.id}`}>
        <img src={product.imagem_url} alt={product.nome} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.nome}</h3>
        <p className="text-gray-600 mt-1">
          {product.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <Button className="w-full mt-4">
          Adicionar ao Carrinho
        </Button>
      </div>
    </Card>
  );
}