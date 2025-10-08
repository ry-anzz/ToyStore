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
  marca?: Marca | number;
  categoria?: Categoria | number;
}

export interface Endereco {
  id: number;
  usuario_id?: number; // Opcional pois o backend não envia de volta
  apelido?: string; // Opcional pois pode ser nulo
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
  // --- LINHA ADICIONADA ABAIXO ---
  enderecos?: Endereco[]; // Adiciona a lista de endereços (opcional)
}

export interface Avaliacao {
  id: number;
  usuarioId: number;
  produtoId: number;
  descricao: string;
  dataAvaliacao: string;
  nota: 1 | 2 | 3 | 4 | 5;
}

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
}