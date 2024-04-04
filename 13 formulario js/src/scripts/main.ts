import '../assets/scss/main.scss';
import { deleteDocumento, getDocumentosByUser } from './apis/documentos';
import { deleteEndereco, getEnderecosByUser } from './apis/enderecos';
import { deleteUsuario, loadUsers } from './apis/usuarios';
import { IUsersList } from './types';

let excludeUserId: string = '';
const btnConfirmExclude = document.querySelector(
  '.btn-confirm',
) as HTMLButtonElement;
const modal = document.querySelector('#modal') as HTMLDialogElement;

document.querySelector('.btn-cancel')!.addEventListener('click', () => {
  modal.close();
});

async function init() {
  const users = await loadUsers();
  createListUsers(users);
}
init();

function createListUsers(users: IUsersList[]) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  // const trs = [];
  for (const user of users) {
    const tr = document.createElement('tr');
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
    const btnExcluir = tr.querySelector('.btn-delete') as HTMLButtonElement;
    if (btnExcluir) {
      btnExcluir.onclick = () => {
        excludeUserId = user.id;
        document.querySelector('#nome-excluir')!.textContent =
          `${user.nome} ${user.sobrenome}`;
        modal.showModal();
      };
    }

    tbody?.appendChild(tr);
  }
}

btnConfirmExclude.addEventListener('click', async () => {
  if (excludeUserId) {
    // carrega os endereços do usuario
    const enderecos = await getEnderecosByUser(excludeUserId);
    enderecos.forEach(async endereco => {
      await deleteEndereco(endereco.id);
    });

    // carrega lista de documentos do usuario
    const documentos = await getDocumentosByUser(excludeUserId);
    documentos.forEach(async documento => {
      await deleteDocumento(documento.id);
    });

    await deleteUsuario(excludeUserId);
    excludeUserId = '';
  }
  modal.close();
  init();
});
