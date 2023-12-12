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
const modal = document.querySelector("#modal");
document.querySelector(".btn-cancel").addEventListener("click", () => {
    modal.close();
});
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
        const btnExcluir = tr.querySelector(".btn-delete");
        if (btnExcluir) {
            btnExcluir.onclick = () => {
                document.querySelector("#nome-excluir").textContent = `${user.nome} ${user.sobrenome}`;
                modal.showModal();
            };
        }
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
    }
}
export {};
