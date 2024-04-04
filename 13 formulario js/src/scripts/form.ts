import '../assets/scss/main.scss';
import { loadDeparts } from './apis/departamentos';
import { addDoc, deleteDocumento } from './apis/documentos';
import { loadUser, saveUser, updateUser } from './apis/usuarios';
import {
  IDeparts,
  ISaveDocumento,
  ISaveUser,
  IUpdateUser,
  IUser,
} from './types';

const form = document.querySelector('form');
const listaDepartamentos = document.querySelector(
  '#lista-departamentos',
) as HTMLUListElement;
const labelDepartamentos = document.querySelector(
  '.label-departamentos',
) as HTMLLabelElement;
const receberOfertas = document.querySelector(
  '#receber-ofertas',
) as HTMLInputElement;
const btnEnviar = document.querySelector('#btnEnviar');
let formSubmitted = false;
const cpf = document.querySelector('#cpf') as HTMLInputElement;
const celular = document.querySelector('#celular') as HTMLInputElement;
const foto = document.querySelector('#foto') as HTMLInputElement;
const preview = document.querySelector('#preview') as HTMLInputElement;
const dropZone = document.querySelector('#drop-zone') as HTMLDivElement;
const arquivos = document.querySelector('#arquivos') as HTMLInputElement;
let user: IUser | null = null;
const docsToDelete: string[] = [];

if (listaDepartamentos && labelDepartamentos) {
  listaDepartamentos.style.display = 'none';
  labelDepartamentos.style.display = 'none';
}

receberOfertas.addEventListener('change', () => {
  if (receberOfertas.checked) {
    listaDepartamentos.style.display = '';
    labelDepartamentos.style.display = '';
  } else {
    listaDepartamentos.style.display = 'none';
    labelDepartamentos.style.display = 'none';
  }
});

async function init() {
  const departamentos = await loadDeparts();
  createListDeparts(departamentos);
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    const _user = await loadUser(id);
    if (_user) {
      console.log('_user', _user);
      user = _user;
      populateForm(_user);
    }
  }
}
init();

function createListDeparts(departs: IDeparts[]) {
  const lis = [];
  for (const depart of departs) {
    lis.push(`
      <li>
        <label class="for-checks">
          <input type="checkbox" name="interesses" value="${depart.id}">
          ${depart.nome}
        </label>
      </li>
    `);
  }

  const lista = document.querySelector('#lista-departamentos');
  if (lista) {
    lista.innerHTML = lis.join('');
  }
}

function populateForm(_user: IUser) {
  const {
    nome,
    sobrenome,
    email,
    nascimento,
    cpf,
    celular,
    sexo,
    // foto,
    // arquivos,
    observacao,
    receber_ofertas,
    interesses,
  } = form!;
  nome.value = _user.nome;
  sobrenome.value = _user.sobrenome;
  email.value = _user.email;
  nascimento.value = _user.nascimento;
  cpf.value = _user.cpf;
  celular.value = _user.celular;
  observacao.value = _user.observacao;
  // [...sexo].forEach(s => {
  //   if (s.value === _user.sexo) {
  //     s.checked = true;
  //   }
  // });
  sexo.value = _user.sexo;
  if (_user.receber_ofertas) {
    receber_ofertas.checked = true;
    listaDepartamentos.style.display = '';
    labelDepartamentos.style.display = '';
    [...interesses].forEach(inter => {
      if (_user.interesses.includes(Number(inter.value))) {
        inter.checked = true;
      }
    });
  }
  if (_user.foto) {
    const img = document.createElement('img');
    img.src = _user.foto;
    preview.appendChild(img);
  }

  if (_user.documentos) {
    const ul = dropZone.querySelector('ul.lista-arquivos-carregados');
    _user.documentos.forEach(doc => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = doc.nome;
      const button = document.createElement('button');
      button.classList.add('btn-delete-file');
      button.textContent = 'X';
      // button.dataset.name = arquivos.files![i].name;
      button.addEventListener('click', (ev: Event) => {
        ev.stopPropagation();
        docsToDelete.push(doc.id);
        li.remove();
        console.log('docsToDelete', docsToDelete);
      });
      li.appendChild(span);
      li.appendChild(button);
      ul?.appendChild(li);
    });
  }
}

//* CRUD
//* Create
//* Reade
//* Update
//* Delete

// mascara para cpf
function maskCPF(cpf: HTMLInputElement) {
  let value = cpf.value;
  // remove tudo que não é numero
  value = value.replace(/\D/g, '').slice(0, 11);
  // mascara o numero como xxx.xxx.xxx-xx
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
  cpf.value = value;
}
cpf.addEventListener('keyup', () => maskCPF(cpf));

// mascara para cpf
function maskCelPhone(celular: HTMLInputElement) {
  let value = celular.value;
  // remove tudo que não é numero
  value = value.replace(/\D/g, '').slice(0, 11);
  // mascara o numero como (xx) xxxxx-xxxx
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  celular.value = value;
}
celular.addEventListener('keyup', () => maskCelPhone(celular));

foto.addEventListener('change', () => {
  preview.innerHTML = '';
  if (foto.files && foto.files.length) {
    const img = document.createElement('img');
    preview.appendChild(img);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(foto.files[0]);
  }
});

dropZone.addEventListener('dragover', (ev: DragEvent) => {
  ev.preventDefault();
  ev.dataTransfer!.dropEffect = 'copy';
  ev.dataTransfer!.effectAllowed = 'all';
});

dropZone.addEventListener('drop', (ev: DragEvent) => {
  console.log('drop', ev);
  console.log('files', ev.dataTransfer?.files);
  ev.preventDefault();
  if (ev.dataTransfer?.files.length) {
    console.log('adicionar arquivos');
    arquivos.files = ev.dataTransfer?.files;

    const event = new Event('change');
    arquivos.dispatchEvent(event);
    // listaArquivos();
  }
});

dropZone.addEventListener('click', () => {
  arquivos.click();
});

function removeFile(name: string) {
  console.log('removeFile', name);
  const dt = new DataTransfer();
  for (const arquivo of [...arquivos.files!]) {
    if (arquivo.name !== name) {
      dt.items.add(arquivo);
    }
  }
  arquivos.files = dt.files;

  const event = new Event('change');
  arquivos.dispatchEvent(event);
  // listaArquivos();
}

function listaArquivos() {
  console.log('files', arquivos.files);
  // <li>
  //   <span>arquivo.pdf</span>
  //   <button class="btn-delete-file">x</button>
  // </li>
  const ul = dropZone.querySelector('ul.lista-arquivos-adicionados');
  ul!.innerHTML = '';
  if (arquivos.files?.length) {
    // [...arquivos.files].forEach((arquivo) => {arquivo})
    // for (const arquivo of [...arquivos.files]) {arquivo}
    // for (const i in [...arquivos.files]) {arquivos.files[i]}

    for (let i = 0; i < arquivos.files.length; i++) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = arquivos.files[i].name;
      const button = document.createElement('button');
      button.classList.add('btn-delete-file');
      button.textContent = 'X';
      button.dataset.name = arquivos.files![i].name;
      button.addEventListener('click', (ev: Event) => {
        ev.stopPropagation();
        const target = ev.target as HTMLButtonElement;
        removeFile(target.dataset!.name!);
      });
      li.appendChild(span);
      li.appendChild(button);
      ul?.appendChild(li);
    }
  }
}

arquivos.addEventListener('change', listaArquivos);

// função para exibir uma msg de erro no campo small
function showErrorMsg(input: HTMLInputElement, msg: string) {
  input.parentNode!.querySelector('small')!.textContent = msg;
}

// função para exibir uma msg de erro no campo small para campos radio
function showErrorMsgRadio(listRadios: RadioNodeList, msg: string) {
  listRadios[0].parentNode!.parentNode!.querySelector('small')!.textContent =
    msg;
}

function showErrorMsgCheckbox(listCheckboxes: RadioNodeList, msg: string) {
  listCheckboxes[0].parentNode!.parentNode!.parentNode!.parentNode!.querySelector(
    'small',
  )!.textContent = msg;
}

// função para validar campos obrigatórios
function validateRequired(input: HTMLInputElement) {
  if (!input.value || input.value.length === 0 || input.value.trim() === '') {
    return false;
  }
  return true;
}

function validateMinLength(input: HTMLInputElement, min: number) {
  if (!input.value || input.value.length < min) {
    return false;
  }
  return true;
}

function validateEmail(input: HTMLInputElement) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.value)) {
    return false;
  }
  return true;
}

function validateCelPhone(input: HTMLInputElement) {
  const value = input.value.replace(/\D/g, '');
  if (value.length !== 11) {
    return false;
  }
  return true;
}

function validateRadios(input: RadioNodeList) {
  if (!input.value) {
    return false;
  }
  return true;
}

function validateDate(input: HTMLInputElement) {
  if (input.value) {
    const dataAtual = new Date();
    console.log('dataAtual', dataAtual);
    // console.log("getTime", dataAtual.getTime());
    // console.log("getFullYear", dataAtual.getFullYear());
    // console.log("getMonth", dataAtual.getMonth());
    // console.log("getDate", dataAtual.getDate());
    // console.log("getDay", dataAtual.getDay());
    // console.log("getHours", dataAtual.getHours());
    // console.log("getMinutes", dataAtual.getMinutes());
    // console.log("getSeconds", dataAtual.getSeconds());
    // console.log("getMilliseconds", dataAtual.getMilliseconds());
    // console.log("getUTCDate", dataAtual.getUTCDate());
    // console.log("toUTCString", dataAtual.toUTCString());
    // console.log("toISOString", dataAtual.toISOString());
    // console.log("toJSON", dataAtual.toJSON());
    // console.log("toString", dataAtual.toString());
    // console.log("toDateString", dataAtual.toDateString());
    // console.log("toTimeString", dataAtual.toTimeString());
    // console.log("toLocaleDateString", dataAtual.toLocaleDateString("pt-BR")); // ko-KR, pt-BR, en-US
    // console.log("toLocaleTimeString", dataAtual.toLocaleTimeString("pt-BR"));

    const dataNascimento = new Date(input.value); // yyyy-mm-dd
    console.log('dataNascimento', dataNascimento);
    // if (dataNascimento.getTime() > dataAtual.getTime()) {
    //   console.log("A data de nascimento é maior que a data de hj");
    // }

    // vou adicionar 20 dias na data atual
    // const novoDia = dataAtual.getDate() + 20;
    // dataAtual.setDate(novoDia);
    // console.log("data atual + 20 dias", dataAtual.toLocaleDateString("pt-BR"));

    // como corrigir o timestamp de uma data setada yyyy-mm-dd
    const timestamp = dataAtual.getTimezoneOffset();
    console.log('timestamp', timestamp);
    dataNascimento.setMinutes(dataNascimento.getMinutes() + timestamp);
    console.log('data de nascimento com timestamp corrigida', dataNascimento);
  }

  if (!input.value) {
    return false;
  }
  return true;
}

function validateCpf(input: HTMLInputElement) {
  let value = input.value.replace(/\D/g, '').slice(0, 11);
  let Soma = 0;
  let Resto;

  if (value == '00000000000') return false;

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) {
    Resto = 0;
  }
  if (Resto != parseInt(value.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) {
    Resto = 0;
  }
  if (Resto != parseInt(value.substring(10, 11))) {
    return false;
  }

  return true;
}

function validateFiles(input: HTMLInputElement) {
  // const file = input.files![0];
  // console.log("name", file.name);
  // console.log("size", file.size);
  // console.log("type", file.type);
  const n = input.files?.length;
  if (!n) {
    return false;
  }
  return true;
}

function validateCheckboxes(
  receber_ofertas: HTMLInputElement,
  interesses: RadioNodeList,
) {
  if (receber_ofertas.checked) {
    const arr: boolean[] = [];
    [...interesses].forEach(interesse => {
      arr.push((interesse as HTMLInputElement).checked);
    });
    if (!arr.includes(true)) {
      return false;
    }
  }

  return true;
}

/*
nome: string; // required, max 50
sobrenome: string; // required, max 50
email: string; // required, max 100, email
nascimento: string; // required, yyyy-mm-dd
cpf: string; // required, max 11 (somente números)
celular: string; // required, max 11 (somente números)
sexo: string; // required, enum[m, f]
receber_ofertas: boolean; // optional, boolean
interesses: number[]; // optional, required if receber_ofertas is true
foto: string; // required, text
observacao: string; // optional, max 255
*/
function validateForm() {
  const objForm = {
    nome: true,
    sobrenome: true,
    email: true,
    nascimento: true,
    cpf: true,
    celular: true,
    sexo: true,
    foto: true,
    arquivos: true,
    observacao: true,
    interesses: true,
  };
  // 3º pega os campos do formulário
  const {
    nome,
    sobrenome,
    email,
    nascimento,
    cpf,
    celular,
    sexo,
    foto,
    arquivos,
    observacao,
    receber_ofertas,
    interesses,
  } = form!;

  // 4º cria uma função para validar o campo nome
  const validaNome = () => {
    // verifica se o nome (obrigatório) foi inserido
    if (!validateRequired(nome)) {
      showErrorMsg(nome, 'O nome é obrigatório!');
      objForm.nome = false;
    } else if (!validateMinLength(nome, 3)) {
      showErrorMsg(nome, 'Digite ao menos 3 letras!');
      objForm.nome = false;
    } else {
      showErrorMsg(nome, '');
      objForm.nome = true;
    }
  };
  nome.onkeyup = validaNome;
  validaNome();

  // 5º cria uma função para validar o campo sobrenome
  const validaSobrenome = () => {
    // verifica se o sobrenome (obrigatorio) foi digitado
    if (!validateRequired(sobrenome)) {
      showErrorMsg(sobrenome, 'O sobrenome é obrigatório!');
      objForm.sobrenome = false;
    } else if (!validateMinLength(sobrenome, 3)) {
      showErrorMsg(sobrenome, 'Digite ao menos 3 letras!');
      objForm.sobrenome = false;
    } else {
      showErrorMsg(sobrenome, '');
      objForm.sobrenome = true;
    }
  };
  sobrenome.onkeyup = validaSobrenome;
  validaSobrenome();

  const validaEmail = () => {
    if (!validateEmail(email)) {
      showErrorMsg(email, 'Insira um e-mail válido');
      objForm.email = false;
    } else {
      showErrorMsg(email, '');
      objForm.email = true;
    }
  };
  email.onkeyup = validaEmail;
  validaEmail();

  const validaNascimento = () => {
    if (!validateDate(nascimento)) {
      showErrorMsg(nascimento, 'Insira uma data válida');
      objForm.nascimento = false;
    } else {
      showErrorMsg(nascimento, '');
      objForm.nascimento = true;
    }
  };
  nascimento.onchange = validaNascimento;
  validaNascimento();

  const validaCpf = () => {
    if (!validateCpf(cpf)) {
      showErrorMsg(cpf, 'Insira um cpf válido');
      objForm.cpf = false;
    } else {
      showErrorMsg(cpf, '');
      objForm.cpf = true;
    }
  };
  cpf.onkeyup = validaCpf;
  validaCpf();

  const validaCelPhone = () => {
    if (!validateCelPhone(celular)) {
      showErrorMsg(celular, 'Insira um telefone válido');
      objForm.celular = false;
    } else {
      showErrorMsg(celular, '');
      objForm.celular = true;
    }
  };
  celular.onkeyup = validaCelPhone;
  validaCelPhone();

  const validaSexo = () => {
    if (!validateRadios(sexo)) {
      showErrorMsgRadio(sexo, 'Selecione seu sexo');
      objForm.sexo = false;
    } else {
      showErrorMsgRadio(sexo, '');
      objForm.sexo = true;
    }
  };
  sexo[0].parentNode.parentNode.onchange = validaSexo;
  validaSexo();

  const validaFoto = () => {
    if (!validateFiles(foto)) {
      // se ja salvou uma foto antes
      if (user && user.foto) {
        showErrorMsg(foto, '');
        objForm.foto = true;
      } else {
        showErrorMsg(foto, 'Selecione uma foto.');
        objForm.foto = false;
      }
    } else {
      showErrorMsg(foto, '');
      objForm.foto = true;
    }
  };
  foto.onchange = validaFoto;
  validaFoto();

  const validaArquivos = () => {
    if (!validateFiles(arquivos)) {
      // verifica se ja tem arquivos salvos
      if (user && user.documentos.length > 0) {
        if (
          docsToDelete.length === user.documentos.length &&
          arquivos.files.length === 0
        ) {
          showErrorMsg(arquivos, 'Selecione ao menos 1 arquivo.');
          objForm.arquivos = false;
        } else {
          showErrorMsg(arquivos, '');
          objForm.arquivos = true;
        }
      }
    } else {
      showErrorMsg(arquivos, '');
      objForm.arquivos = true;
    }
  };
  arquivos.onchange = validaArquivos;
  validaArquivos();

  const validaObservacao = () => {
    // verifica se o nome (obrigatório) foi inserido
    if (!validateRequired(observacao)) {
      showErrorMsg(observacao, 'Por favor digite sua mensagem!');
      objForm.observacao = false;
    } else {
      showErrorMsg(observacao, '');
      objForm.observacao = true;
    }
  };
  observacao.onkeyup = validaObservacao;
  validaObservacao();

  const validaInteresses = () => {
    if (!validateCheckboxes(receber_ofertas, interesses)) {
      showErrorMsgCheckbox(interesses, 'Selecione ao menos 1 arquivo.');
      objForm.interesses = false;
    } else {
      showErrorMsgCheckbox(interesses, '');
      objForm.interesses = true;
    }
  };
  receber_ofertas.onchange = validaInteresses;
  [...interesses].forEach(interesse => {
    interesse.onchange = validaInteresses;
  });
  validaInteresses();

  // cria um array com os valores desse objeto
  // [true, true, false, true ...]
  const arrValores = Object.values(objForm);
  if (arrValores.includes(false)) {
    return false;
  }
  return true;
}

async function handleSubmit() {
  // seta a flag para avisar que foi feita uma tentativa de enviar o form
  formSubmitted = true;

  // 2º chama a função para validar o form antes de enviar
  if (validateForm()) {
    console.log('O formulário é valido, vamos salvar.');
    btnEnviar.setAttribute('disabled', 'true');
    btnEnviar.textContent = 'Salvando...';

    const {
      nome,
      sobrenome,
      email,
      nascimento,
      cpf,
      celular,
      sexo,
      foto,
      arquivos,
      observacao,
      receber_ofertas,
      interesses,
    } = form!;

    const _interesses = [...interesses]
      .filter(int => int.checked)
      .map(int => Number(int.value));

    if (!user) {
      const payload: ISaveUser = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        nascimento: nascimento.value,
        cpf: cpf.value,
        celular: celular.value,
        sexo: sexo.value,
        receber_ofertas: receber_ofertas.checked,
        interesses: _interesses,
        foto: '',
        observacao: observacao.value,
      };

      // salva o user sem foto
      const resp = await saveUser(payload);
      console.log('resposta', resp);

      if (resp.id) {
        // se salvou o user, adiciona a foto
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          const payloadComFoto: ISaveUser = {
            ...resp,
            foto: e.target!.result as string,
          };
          // atualiza o user com a foto
          await updateUser(payloadComFoto, resp.id);
        };
        reader.readAsDataURL(foto.files[0]);

        // salva os arquivos
        const nFiles = arquivos.files.length;
        [...arquivos.files].forEach(async (file: File, i: number) => {
          const payloadDoc: ISaveDocumento = {
            nome: file.name,
            tipo: file.type,
            arquivo: '',
            usuarioId: resp.id,
          };
          const readerDoc = new FileReader();
          readerDoc.onload = async (ev: ProgressEvent<FileReader>) => {
            payloadDoc.arquivo = ev.target!.result as string;
            await addDoc(payloadDoc);

            if (i + 1 === nFiles) {
              btnEnviar.removeAttribute('disabled');
              btnEnviar.textContent = 'Enviar';
              window.location.href = 'index.html';
            }
          };
          readerDoc.readAsDataURL(file);
        });
      }
    } else {
      // atualiza usuario
      const payloadUpdate: IUpdateUser = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        nascimento: nascimento.value,
        cpf: cpf.value,
        celular: celular.value,
        sexo: sexo.value,
        receber_ofertas: receber_ofertas.checked,
        interesses: _interesses,
        observacao: observacao.value,
      };

      await updateUser(payloadUpdate, user.id);

      if (foto.files.length > 0) {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          const payloadComFoto: IUpdateUser = {
            foto: e.target!.result as string,
          };
          // atualiza o user com a foto
          await updateUser(payloadComFoto, user.id);
        };
        reader.readAsDataURL(foto.files[0]);
      }

      if (docsToDelete.length > 0) {
        docsToDelete.forEach(async doc => {
          await deleteDocumento(doc);
        });
      }

      if (arquivos.files.length > 0) {
        const nFiles = arquivos.files.length;
        [...arquivos.files].forEach(async (file: File, i: number) => {
          const payloadDoc: ISaveDocumento = {
            nome: file.name,
            tipo: file.type,
            arquivo: '',
            usuarioId: user.id,
          };
          const readerDoc = new FileReader();
          readerDoc.onload = async (ev: ProgressEvent<FileReader>) => {
            payloadDoc.arquivo = ev.target!.result as string;
            await addDoc(payloadDoc);

            if (i + 1 === nFiles) {
              btnEnviar.removeAttribute('disabled');
              btnEnviar.textContent = 'Enviar';
              window.location.href = 'index.html';
            }
          };
          readerDoc.readAsDataURL(file);
        });
      } else {
        btnEnviar.removeAttribute('disabled');
        btnEnviar.textContent = 'Enviar';
        window.location.href = 'index.html';
      }
    }
  } else {
    console.log('O formulário não é valido, vamos corrigir.');
  }
}

if (form) {
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    return false;
  });
}

if (btnEnviar) {
  // 1º ao clicar no botão enviar, chama a função para submeter o formulario
  btnEnviar.addEventListener('click', handleSubmit);
}
