import { IDeparts } from "./types";

async function loadDeparts() {
  const resp = await fetch("http://127.0.0.1:3500/departamentos");
  const departamentos: IDeparts[] = await resp.json();
  console.log("departamentos", departamentos);
  createListDeparts(departamentos);
}

loadDeparts();

function createListDeparts(departs: IDeparts[]) {
  const lis = [];
  for (const depart of departs) {
    lis.push(`
      <li>
        <label class="for-checks">
          <input type="checkbox" name="interesses[]" value="${depart.id}">
          ${depart.nome}
        </label>
      </li>
    `);
  }

  const lista = document.querySelector("#lista-departamentos");
  if (lista) {
    lista.innerHTML = lis.join("");
  }
}

//* CRUD
//* Create
//* Reade
//* Update
//* Delete
