import { ISaveDocumento } from '../types';

export async function addDoc(payload: ISaveDocumento) {
  if (!payload) {
    return;
  }

  const resp = await fetch('http://127.0.0.1:3500/documentos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return resp.json();
}
