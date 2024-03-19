import '../assets/scss/main.scss';
import { loadDeparts } from './apis/departamentos';
import { loadUser } from './apis/usuarios';
import { IDeparts, IUser } from './types';

const modal = document.querySelector('#modal') as HTMLDialogElement;
const btnAddEndereco = document.querySelector('.btn-add') as HTMLButtonElement;
const btnCancelar = document.querySelector('.btn-cancel') as HTMLButtonElement;

btnAddEndereco.onclick = () => {
  modal?.showModal();
};

btnCancelar.onclick = () => {
  modal?.close();
};

async function init() {
  const id = new URLSearchParams(window.location.search).get('id');
  const user = await loadUser(Number(id));
  showUserData(user);
}
init();

async function showUserData(user: IUser) {
  document
    .querySelector('#linkEditUser')!
    .setAttribute('href', `form.html?id=${user.id}`);

  const elFoto = document.querySelector('#uFoto') as HTMLImageElement;
  elFoto.setAttribute('src', user.foto);
  elFoto.hidden = false;

  document.querySelector('#uId')!.textContent = String(user.id);

  document.querySelector('#uNome')!.textContent =
    `${user.nome} ${user.sobrenome}`;

  document.querySelector('#uEmail')!.textContent = user.email;

  const [ano, mes, dia] = user.nascimento.split('-');
  document.querySelector('#uNasc')!.textContent = `${dia}/${mes}/${ano}`;

  document.querySelector('#uCpf')!.textContent = user.cpf;

  document.querySelector('#uCel')!.textContent = user.celular;

  document.querySelector('#uSexo')!.textContent =
    user.sexo === 'M' ? 'Masculino' : 'Feminino';

  document.querySelector('#uOfer')!.textContent = user.receber_ofertas
    ? 'Sim'
    : 'Não';

  document.querySelector('#uObs')!.textContent = user.observacao;

  const departamentos: IDeparts[] = await loadDeparts();
  const interesses = user.interesses.map(id => {
    const depart = departamentos.find(d => d.id === id);
    return depart?.nome;
  });
  document.querySelector('#uInter')!.textContent = interesses.join(', ');

  const listaArquivos = document.querySelector('#lista-arquivos')!;
  listaArquivos.innerHTML = '';
  if (user.documentos) {
    for (const doc of user.documentos) {
      const divDoc = document.createElement('div');
      divDoc.classList.add('arquivo');
      divDoc.innerHTML = `
        <p><strong>Nome:</strong> ${doc.nome}</p>
        <p><strong>Arquivo:</strong> <a href="#">${doc.nome}.pdf</a></p>
        <button class="btn-delete">Excluir</button>
      `;

      listaArquivos.appendChild(divDoc);
    }
  }

  const listaEnderecos = document.querySelector('#lista-enderecos')!;
  listaEnderecos.innerHTML = '';
  if (user.enderecos) {
    for (const end of user.enderecos) {
      const divEnd = document.createElement('div');
      divEnd.classList.add('endereco');
      divEnd.innerHTML = `
        <p><strong>Identificação:</strong> ${end.nome}</p>
        <p><strong>CEP:</strong> ${end.cep}</p>
        <p><strong>Logradouro:</strong> ${end.rua}</p>
        <p><strong>Número:</strong> ${end.numero}</p>
        <p><strong>Complemento:</strong> ${end.complemento}</p>
        <p><strong>Bairro:</strong> ${end.bairro}</p>
        <p><strong>Cidade:</strong> ${end.cidade}</p>
        <p><strong>Estado:</strong> ${end.estado}</p>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      `;

      listaEnderecos.appendChild(divEnd);
    }
  }
}
