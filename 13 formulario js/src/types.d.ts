export interface IUsersList {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  sexo: string;
  email: string;
  foto: string;
}

export interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  nascimento: string;
  cpf: string;
  celular: string;
  sexo: string;
  receber_ofertas: boolean;
  interesses: number[];
  foto: string;
  observacao: string;
  documentos?: IDocumento[];
  enderecos?: IEndereco[];
}

export interface IDocumento {
  id: number;
  nome: string;
  tipo: string;
  arquivo: string;
  usuarioId: number;
}

export interface IEndereco {
  id: number;
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  usuarioId: number;
}

export interface IDeparts {
  id: number;
  nome: string;
}
