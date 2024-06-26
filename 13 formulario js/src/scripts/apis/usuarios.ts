import { ISaveUser, IUpdateUser, IUser } from '../types';

export async function loadUsers() {
  const resp = await fetch('http://localhost:3500/usuarios');
  const users = await resp.json();
  return users;
}

export async function loadUser(id: string) {
  if (!id) {
    return;
  }

  const resp = await fetch(
    `http://localhost:3500/usuarios/${id}?_embed=documentos&_embed=enderecos`,
  );
  const user: IUser = await resp.json();
  return user;
}

export async function saveUser(payload: ISaveUser) {
  if (!payload) {
    return;
  }
  const resp = await fetch('http://localhost:3500/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export async function updateUser(payload: IUpdateUser, id: string) {
  if (!payload || !id) {
    return;
  }
  const resp = await fetch(`http://localhost:3500/usuarios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export async function deleteUsuario(id: string) {
  try {
    const resp = await fetch(`http://localhost:3500/usuarios/${id}`, {
      method: 'DELETE',
    });
    return resp.json();
  } catch (e) {
    console.log('error', e);
  }
}
