import { IUf } from '../types';

export async function getUfs(): Promise<IUf[]> {
  const resp = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  );
  return resp.json();
}
