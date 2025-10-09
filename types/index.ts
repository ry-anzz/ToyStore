export interface Marca {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

// NOVA INTERFACE PARA IMAGENS
export interface ProdutoImagem {
  id?: number;
  imagemUrl: string;
}

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  // imagem_url: string; // REMOVIDO
  imagens: ProdutoImagem[]; // ADICIONADO
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
  data: string;
  descricao: string;
  nota: 1 | 2 | 3 | 4 | 5;
  produtoId?: number;
}

export interface ItemCarrinho {
  id: number;
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

// ...

export interface Avaliacao {
  id: number;
  autor: string;
  autorId: number; // NOVO
  data: string;
  descricao: string;
  nota: 1 | 2 | 3 | 4 | 5;
  editado: boolean; // NOVO
  produtoId?: number;
}

// ...