import '../assets/scss/main.scss';
import { getCidadesPorUf } from './apis/cidades';
import { loadDeparts } from './apis/departamentos';
import { addEndereco } from './apis/enderecos';
import { getUfs } from './apis/uf';
import { loadUser } from './apis/usuarios';
import { ICidade, IDeparts, ISaveEndereco, IUf, IUser } from './types';

const modal = document.querySelector('#modal') as HTMLDialogElement;
const btnAddEndereco = document.querySelector('.btn-add') as HTMLButtonElement;
const btnCancelar = document.querySelector('.btn-cancel') as HTMLButtonElement;
const btnConfirmar = document.querySelector(
  '.btn-confirm',
) as HTMLButtonElement;
const selectUf = document.querySelector('#estado') as HTMLSelectElement;
const selectCidade = document.querySelector('#cidade') as HTMLSelectElement;
const form = document.querySelector('form') as HTMLFormElement;
let user: IUser | null = null;

btnAddEndereco.onclick = () => {
  modal?.showModal();
};

btnCancelar.onclick = () => {
  modal?.close();
};

async function init() {
  const id = new URLSearchParams(window.location.search).get('id');
  const _user = await loadUser(id);
  if (_user) {
    showUserData(_user);
    user = _user;
  }
  const ufs = await getUfs();
  console.log('ufs', ufs);
  populateUfSelect(ufs);
}
init();

function populateUfSelect(ufs: IUf[]) {
  let _ufs = '<option value="" disabled selected>Selecione</option>';
  const sort = (a: IUf, b: IUf) => {
    if (a.sigla < b.sigla) {
      return -1;
    } else if (a.sigla > b.sigla) {
      return 1;
    }
    return 0;
  };
  ufs.sort(sort).forEach(uf => {
    _ufs += `
      <option value="${uf.id}">${uf.nome}</option>
    `;
  });
  selectUf.innerHTML = _ufs;
}

selectUf.addEventListener('change', async () => {
  const cidades = await getCidadesPorUf(selectUf.value);
  console.log('cidades', cidades);
  populateCidadeSelect(cidades);
});

function populateCidadeSelect(cidades: ICidade[]) {
  let _cidades = '<option value="" disabled selected>Selecione</option>';
  const sort = (a: ICidade, b: ICidade) => {
    if (a.nome < b.nome) {
      return -1;
    } else if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  };
  cidades.sort(sort).forEach(cidade => {
    _cidades += `
      <option value="${cidade.id}">${cidade.nome}</option>
    `;
  });
  selectCidade.innerHTML = _cidades;
}

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

btnConfirmar.onclick = async () => {
  if (user) {
    const { nome, cep, rua, numero, complemento, bairro, estado, cidade } =
      form;
    const payload: ISaveEndereco = {
      nome: nome.value,
      cep: cep.value,
      rua: rua.value,
      numero: numero.value,
      complemento: complemento.value,
      bairro: bairro.value,
      estado: estado.value,
      cidade: cidade.value,
      usuarioId: user.id,
    };
    const end = await addEndereco(payload);
    if (end) {
      form.reset();
      modal?.close();
      init();
    }
  }
};
