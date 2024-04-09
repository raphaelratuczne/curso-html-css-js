import { ICidade } from '../types';

export async function getCidades(uf: number): Promise<ICidade[]> {
  const resp = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`,
  );
  return resp.json();
}
