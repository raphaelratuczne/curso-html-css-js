import { IEndereco } from '../types';

export async function getEnderecosByUser(userId: string): Promise<IEndereco[]> {
  const resp = await fetch(
    `http://localhost:3500/enderecos?usuarioId=${userId}`,
  );
  return await resp.json();
}

export async function deleteEndereco(id: string) {
  try {
    const resp = await fetch(`http://localhost:3500/enderecos/${id}`, {
      method: 'DELETE',
    });
    return resp.json();
  } catch (e) {
    console.log('error', e);
  }
}
