import { IDeparts } from '../types';

export async function loadDeparts(): Promise<IDeparts[]> {
  const resp = await fetch('http://localhost:3500/departamentos');
  const departamentos: IDeparts[] = await resp.json();
  return departamentos;
}
