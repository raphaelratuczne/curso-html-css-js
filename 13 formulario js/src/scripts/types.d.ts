export interface IUsersList {
  id: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  sexo: string;
  email: string;
  foto: string;
}

export interface IUser {
  id: string;
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

export interface ISaveUser {
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
}

export interface IDocumento {
  id: string;
  nome: string;
  tipo: string;
  arquivo: string;
  usuarioId: string;
}

export interface ISaveDocumento {
  nome: string;
  tipo: string;
  arquivo: string;
  usuarioId: string;
}

export interface IEndereco {
  id: string;
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
