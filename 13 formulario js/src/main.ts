import { IUsersList } from "./types";

let users: IUsersList[] = [];

async function loadUsers() {
  const resp = await fetch("http://127.0.0.1:3500/usuarios");
  users = await resp.json();
  console.log("users", users);
  createListUsers(users);
}

loadUsers();

function createListUsers(users: IUsersList[]) {
  const tbody = document.querySelector("tbody");
  const trs = [];
  for (const user of users) {
    const tr = `
      <tr>
        <td><a href="user.html?id=${user.id}">${user.nome} ${user.sobrenome}</a></td>
        <td>${user.cpf}</td>
        <td>${user.sexo}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn-edit">Editar</button>
          <button data-open-modal class="btn-delete">Excluir</button>
        </td>
      </tr>
    `;
    trs.push(tr);
  }
  tbody!.innerHTML = trs.join("");
}
