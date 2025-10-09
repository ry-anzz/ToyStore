// src/types/index.ts

export interface Marca {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  imagem_url: string;
  quantidadeEstoque?: number;
  // --- CORREÇÃO AQUI: A API sempre retorna o objeto completo ---
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

// --- INTERFACE DE AVALIAÇÃO ATUALIZADA ---
// Agora ela corresponde ao que o backend envia
export interface Avaliacao {
  id: number;
  autor: string; // Tinha 'usuarioId'
  data: string;    // Tinha 'dataAvaliacao'
  descricao: string;
  nota: 1 | 2 | 3 | 4 | 5;
  produtoId?: number; // Opcional, pois a API não envia mais
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