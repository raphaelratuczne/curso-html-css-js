var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://127.0.0.1:3500/usuarios");
        users = yield resp.json();
        console.log("users", users);
        createListUsers(users);
    });
}
loadUsers();
function createListUsers(users) {
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
    tbody.innerHTML = trs.join("");
}
export {};
