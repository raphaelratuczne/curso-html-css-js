import { ICidade } from '../types';

export async function getCidadesPorUf(uf: string): Promise<ICidade[]> {
  const resp = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
  );
  return resp.json();
}
