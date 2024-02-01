let users = [];
const modal = document.querySelector("#modal");
document.querySelector(".btn-cancel").addEventListener("click", () => {
    modal.close();
});
async function loadUsers() {
    const resp = await fetch("http://localhost:3500/usuarios");
    users = await resp.json();
    console.log("users", users);
    createListUsers(users);
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
