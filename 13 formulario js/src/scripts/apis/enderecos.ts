import { IEndereco, ISaveEndereco } from '../types';

export async function addEndereco(payload: ISaveEndereco) {
  const resp = await fetch('http://localhost:3500/enderecos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export async function getEnderecosByUser(userId: string): Promise<IEndereco[]> {
  try {
    const resp = await fetch(
      `http://localhost:3500/enderecos?usuarioId=${userId}`,
    );
    return resp.json();
  } catch (e) {
    console.log('error', e);
    return [];
  }
}

export async function deleteEndereco(id: string) {
  try {
    const resp = await fetch(`http://localhost:3500/enderecos/${id}`, {
      method: 'DELETE',
    });
    return resp.json();
  } catch (e) {
    console.log('error', e);
    return null;
  }
}
