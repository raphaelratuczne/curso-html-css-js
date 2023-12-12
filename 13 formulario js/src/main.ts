import { IUsersList } from "./types";

let users: IUsersList[] = [];
const modal = document.querySelector("#modal") as HTMLDialogElement;

document.querySelector(".btn-cancel")!.addEventListener("click", () => {
  modal.close();
});

async function loadUsers() {
  const resp = await fetch("http://127.0.0.1:3500/usuarios");
  users = await resp.json();
  console.log("users", users);
  createListUsers(users);
}

loadUsers();

function createListUsers(users: IUsersList[]) {
  const tbody = document.querySelector("tbody");
  // const trs = [];
  for (const user of users) {
    const tr = document.createElement("tr");
    const innerTr = `
      <td><a href="user.html?id=${user.id}"><img src="${user.foto}"></a></td>
      <td><a href="user.html?id=${user.id}">${user.nome} ${user.sobrenome}</a></td>
      <td>${user.cpf}</td>
      <td>${user.sexo}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      </td>
    `;
    tr.innerHTML = innerTr;
    const btnExcluir = tr.querySelector(".btn-delete") as HTMLButtonElement;
    if (btnExcluir) {
      btnExcluir.onclick = () => {
        document.querySelector(
          "#nome-excluir"
        )!.textContent = `${user.nome} ${user.sobrenome}`;
        modal.showModal();
      };
    }

    tbody?.appendChild(tr);
  }
}
