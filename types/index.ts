// src/types/index.ts

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  ddd: string;
  administrador: boolean;
}

export interface Endereco {
  id: number;
  usuario_id: number;
  rua: string;
  bairro: string;
  uf: string;
  cidade: string;
  numero: string;
  cep: string;
  nome: string;
}

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
  categoria: number;
  marca: number;
}

export interface Avaliacao {
    id: number;
    usuario_id: number;
    produto_id: number;
    descricao: string;
    data: string; // ou Date
    nota: 1 | 2 | 3 | 4 | 5;
}

export interface ItemCarrinho {
    id: number;
    produto: Produto;
    quantidade: number;
}