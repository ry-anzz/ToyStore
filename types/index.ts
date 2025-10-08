// src/types/index.ts

// Tipos baseados nas Entidades JPA
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
  imagemUrl: string; // Corrigido para camelCase
  quantidadeEstoque: number; // Corrigido para camelCase
  
  // No frontend, a API pode retornar os objetos completos ou apenas IDs
  // Vamos assumir que a API retorna os objetos completos para o GET by ID
  marca?: Marca; 
  categoria?: Categoria; 
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  administrador: boolean;
}

export interface Endereco {
  id: number;
  usuarioId: number; // Corrigido para camelCase
  rua: string;
  bairro: string;
  uf: string;
  cidade: string;
  numero: string;
  cep: string;
  nomeDestinatario?: string; // Corrigido para camelCase (opcional)
  apelido?: string; // Adicionado do Endereco.java criado acima
}

export interface Avaliacao {
    id: number;
    usuarioId: number; // Corrigido para camelCase
    produtoId: number; // Corrigido para camelCase
    descricao: string;
    dataAvaliacao: string; // Corrigido para camelCase
    nota: 1 | 2 | 3 | 4 | 5;
}

export interface ItemCarrinho {
    id: number;
    produto: Produto;
    quantidade: number;
}