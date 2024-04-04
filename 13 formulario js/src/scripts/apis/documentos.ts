import { IDocumento, ISaveDocumento } from '../types';

export async function addDoc(payload: ISaveDocumento) {
  if (!payload) {
    return;
  }

  const resp = await fetch('http://localhost:3500/documentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return resp.json();
}

export async function getDocumentosByUser(
  userId: string,
): Promise<IDocumento[]> {
  const resp = await fetch(
    `http://localhost:3500/documentos?usuarioId=${userId}`,
  );
  return await resp.json();
}

export async function deleteDocumento(id: string) {
  try {
    const resp = await fetch(`http://localhost:3500/documentos/${id}`, {
      method: 'DELETE',
    });
    return resp.json();
  } catch (e) {
    console.log('error', e);
  }
}
