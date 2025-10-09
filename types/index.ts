export interface Marca {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface ProdutoImagem {
  id?: number;
  imagemUrl: string;
}

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  imagens: ProdutoImagem[];
  quantidadeEstoque?: number;
  marca?: Marca;
  categoria?: Categoria;
}

export interface Endereco {
  id?: number;
  usuario_id?: number;
  apelido?: string;
  nome?: string;
  rua: string;
  bairro: string;
  uf: string;
  cidade: string;
  numero: string;
  cep: string;
  nomeDestinatario?: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  ddd?: string;
  administrador: boolean;
  enderecos?: Endereco[];
}

export interface Avaliacao {
  id: number;
  autor: string;
  autorId: number;
  data: string;
  descricao: string;
  nota: 1 | 2 | 3 | 4 | 5;
  editado: boolean;
  produtoId?: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export interface MetodoPagamento {
  id?: number;
  nome: string;
}

export interface Banner {
  id: number;
  titulo: string;
  imagemUrl: string;
}

export interface ItemPedido {
  id: number;
  quantidade: number;
  precoUnitario: number;
  produto: Pick<Produto, 'id' | 'nome' | 'imagens'>;
}

export interface Pedido {
  id: number;
  dataPedido: string;
  valorTotal: number;
  statusPedido: {
    id: number;
    nome: string;
  };
  itens: ItemPedido[];
}