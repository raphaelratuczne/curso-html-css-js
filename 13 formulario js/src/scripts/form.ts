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
const preview = document.querySelector('#preview') as HTMLDivElement;
const dropZone = document.querySelector('#drop-zone') as HTMLDivElement;
const arquivos = document.querySelector('#arquivos') as HTMLInputElement;
let user: IUser | null = null;
const docsToDelete: string[] = [];

if (labelDepartamentos && listaDepartamentos) {
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
    console.log('user', _user);
    if (_user) {
      populateForm(_user);
      user = _user;
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

  if (listaDepartamentos) {
    listaDepartamentos.innerHTML = lis.join('');
  }
}

function populateForm(user: IUser) {
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
  nome.value = user.nome;
  sobrenome.value = user.sobrenome;
  email.value = user.email;
  nascimento.value = user.nascimento;
  cpf.value = user.cpf;
  celular.value = user.celular;
  [...sexo].forEach(s => {
    if (s.value === user.sexo) {
      s.checked = true;
    }
  });
  observacao.value = user.observacao;
  if (user.receber_ofertas) {
    receber_ofertas.checked = true;
    listaDepartamentos.style.display = '';
    labelDepartamentos.style.display = '';
    [...interesses].forEach(inter => {
      if (user.interesses.includes(Number(inter.value))) {
        inter.checked = true;
      }
    });
  }
  if (user.foto) {
    preview.innerHTML = '';
    const img = document.createElement('img');
    img.src = user.foto;
    preview.appendChild(img);
  }
  if (user.documentos.length > 0) {
    const ul = dropZone.querySelector(
      'ul.lista-arquivos-carregados',
    ) as HTMLUListElement;
    user.documentos.forEach(doc => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = doc.nome;
      const button = document.createElement('button');
      button.classList.add('btn-delete-file');
      button.textContent = 'X';
      button.onclick = function () {
        event?.stopPropagation();
        docsToDelete.push(doc.id);
        li.remove();
        console.log('docsToDelete', docsToDelete);
      };
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
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
  // remove tudo que não é número
  value = value.replace(/\D/g, '').slice(0, 11);
  // mascara o numero como xxx.xxx.xxx-xx
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  cpf.value = value;
}
cpf.addEventListener('keyup', () => maskCPF(cpf));

// mascara para celular
function maskCelPhone(celular: HTMLInputElement) {
  let value = celular.value;
  // remove tudo que não é número
  value = value.replace(/\D/g, '').slice(0, 11);
  // mascara o numero como (xx) xxxxx-xxxx
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  celular.value = value;
}
celular.addEventListener('keyup', () => maskCelPhone(celular));

foto.addEventListener('change', () => {
  // console.log("file", foto.files);
  preview.innerHTML = '';
  if (foto.files?.length && foto.files[0]) {
    const img = document.createElement('img');
    preview.appendChild(img);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      // console.log("e", e.target);
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(foto.files![0]);
  }
});

if (dropZone) {
  dropZone.addEventListener('dragover', (ev: DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = 'copy';
    ev.dataTransfer!.effectAllowed = 'all';
    // console.log("files dragover", ev.dataTransfer?.files);
  });
  dropZone.addEventListener('drop', (ev: DragEvent) => {
    console.log('drop', ev);
    console.log('files drop', ev.dataTransfer?.files);
    ev.preventDefault();
    if (ev.dataTransfer?.files.length) {
      console.log('adiciona arquivos');
      arquivos.files = ev.dataTransfer.files;
      console.log('arquivos 1', arquivos.files);
      const event = new Event('change');
      arquivos.dispatchEvent(event);
    }
  });
  dropZone.addEventListener('click', () => {
    arquivos.click();
  });
}

function removeFile(name: string) {
  console.log('remove file', name);
  const dt = new DataTransfer();
  for (let i = 0; i < arquivos.files!.length; i++) {
    const file = arquivos.files![i];
    if (file.name !== name) {
      dt.items.add(file);
    }
  }
  arquivos.files = dt.files;

  const event = new Event('change');
  arquivos.dispatchEvent(event);
}

function listaArquivos() {
  console.log('lista de arquivos');
  const ul = dropZone.querySelector(
    'ul.lista-arquivos-adicionados',
  ) as HTMLUListElement;

  if (arquivos.files?.length) {
    ul.innerHTML = '';
    for (let i = 0; i < arquivos.files.length; i++) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = arquivos.files[i].name;
      const button = document.createElement('button');
      button.classList.add('btn-delete-file');
      button.textContent = 'X';
      button.onclick = function () {
        event?.stopPropagation();
        removeFile(arquivos.files![i].name);
      };
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  } else {
    ul.innerHTML = '';
  }
}
arquivos.addEventListener('change', listaArquivos);

// função para exibir uma msg de erro no campo small
function showErrorMsg(
  input: HTMLInputElement | RadioNodeList,
  msg: string,
  type: 'input' | 'radio' = 'input',
) {
  if (type === 'input') {
    (input as HTMLInputElement).parentNode!.querySelector(
      'small',
    )!.textContent = msg;
  } else if (type === 'radio') {
    (input as RadioNodeList)[0].parentNode!.parentNode!.querySelector(
      'small',
    )!.textContent = msg;
  }
}

function showErrorMsgCheckbox(inputs: RadioNodeList, msg: string) {
  inputs[0].parentNode!.parentNode!.parentNode!.parentNode!.querySelector(
    'small',
  )!.textContent = msg;
}

// função para validar campos obrigatórios
function validateRequiredField(input: HTMLInputElement) {
  if (!input.value || input.value.length === 0 || input.value.trim() === '') {
    return false;
  }
  return true;
}

function validateMinLengthField(input: HTMLInputElement, min: number) {
  if (!input.value || input.value.length < min) {
    return false;
  }
  return true;
}

function validateEmailField(input: HTMLInputElement) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.value)) {
    return false;
  }
  return true;
}

function validateDateField(input: HTMLInputElement) {
  if (input.value) {
    // pega a data atual usando um objeto Date
    const dataAtual = new Date();
    console.log('dataAtual', dataAtual);
    // transforma a data passada em um objeto date
    const dataNascimento = new Date(input.value);
    console.log('dataNascimento', dataNascimento);
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
    // verifica se a data passada é anterior a data de hoje
    // if (dataNascimento.getTime() >= dataAtual.getTime()) {
    //   console.log("A data de nascimento é maior que a data atual");
    // }
    // adiciona 25 dias a data atual
    // dataAtual.setDate(dataAtual.getDate() + 25);
    // console.log("data atual + 25 dias", dataAtual.toLocaleDateString("pt-BR"));

    // ajusta o timezone da data de nascimento
    const timezone = dataAtual.getTimezoneOffset();
    console.log('getTimezoneOffset', timezone);
    dataNascimento.setMinutes(dataNascimento.getMinutes() + timezone);
    console.log('dataNascimento', dataNascimento);
  }

  if (!input.value) {
    return false;
  }
  return true;
}

function validateCPF(cpf: HTMLInputElement) {
  let value = cpf.value.replace(/\D/g, '').slice(0, 11);
  let Soma;
  let Resto;
  Soma = 0;
  if (value == '00000000000') return false;

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(value.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;

  if (Resto != parseInt(value.substring(10, 11))) {
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

function validateRadio(input: RadioNodeList) {
  if (!input.value) {
    return false;
  }
  return true;
}

function validateFile(input: HTMLInputElement) {
  // const file = input.files![0];
  // console.log("name", file.name);
  // console.log("size", file.size);
  // console.log("type", file.type);
  const n = input.files?.length;
  if (n === 0) {
    return false;
  }
  return true;
}

function validateCheckboxes(
  receber_ofertas: HTMLInputElement,
  interesses: any,
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
    receber_ofertas: true,
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
  console.log('receber_ofertas', receber_ofertas, receber_ofertas.checked);
  console.log('interesses', interesses);

  // 4º cria uma função para validar o campo nome
  const validaNome = () => {
    // verifica se o nome (obrigatorio) foi inserido
    if (!validateRequiredField(nome)) {
      showErrorMsg(nome, 'O nome é obrigatório!');
      objForm.nome = false;
    } else if (!validateMinLengthField(nome, 3)) {
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
    if (!validateRequiredField(sobrenome)) {
      showErrorMsg(sobrenome, 'O sobrenome é obrigatório!');
      objForm.sobrenome = false;
    } else if (!validateMinLengthField(sobrenome, 3)) {
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
    if (!validateEmailField(email)) {
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
    if (!validateDateField(nascimento)) {
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
    if (!validateCPF(cpf)) {
      showErrorMsg(cpf, 'Insira um CPF válido!');
      objForm.cpf = false;
    } else {
      showErrorMsg(cpf, '');
      objForm.cpf = true;
    }
  };
  cpf.onkeyup = validaCpf;
  validaCpf();

  const validaCelular = () => {
    if (!validateCelPhone(celular)) {
      showErrorMsg(celular, 'Insira um número válido!');
      objForm.celular = false;
    } else {
      showErrorMsg(celular, '');
      objForm.celular = true;
    }
  };
  celular.onkeyup = validaCelular;
  validaCelular();

  const validaSexo = () => {
    if (!validateRadio(sexo)) {
      showErrorMsg(sexo, 'Selecione seu sexo!', 'radio');
      objForm.sexo = false;
    } else {
      showErrorMsg(sexo, '', 'radio');
      objForm.sexo = true;
    }
  };
  sexo[0].parentNode.parentNode.onchange = validaSexo;
  validaSexo();

  const validaFoto = () => {
    if (!validateFile(foto)) {
      // se não salvou uma foto antes
      if (user && user.foto) {
        showErrorMsg(foto, '');
        objForm.foto = true;
      } else {
        showErrorMsg(foto, 'Selecione uma foto!');
        objForm.foto = false;
      }
    } else {
      if (user) {
        user.foto = '';
      }
      showErrorMsg(foto, '');
      objForm.foto = true;
    }
  };
  foto.onchange = validaFoto;
  validaFoto();

  const validaArquivos = () => {
    if (!validateFile(arquivos)) {
      // verifica se já tem documentos salvos
      if (user && user.documentos.length > 0) {
        if (docsToDelete.length === user.documentos.length) {
          showErrorMsg(arquivos, 'Selecione ao menos 1 arquivo!');
          objForm.arquivos = false;
        } else {
          showErrorMsg(arquivos, '');
          objForm.arquivos = true;
        }
      } else {
        showErrorMsg(arquivos, 'Selecione ao menos 1 arquivo!');
        objForm.arquivos = false;
      }
    } else {
      showErrorMsg(arquivos, '');
      objForm.arquivos = true;
    }
  };
  arquivos.onchange = validaArquivos;
  validaArquivos();

  const validaObservacao = () => {
    if (!validateRequiredField(observacao)) {
      showErrorMsg(observacao, 'Insira uma mensagem!');
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
      showErrorMsgCheckbox(interesses, 'Selecione ao menos 1 interesse!');
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
        foto: null,
        observacao: observacao.value,
      };

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log('e', e.target);
        payload.foto = e.target!.result as string;

        console.log('payload user', payload);
        saveUser(payload).then(resp => {
          console.log('resposta user', resp);

          const nFiles = arquivos.files.length;
          [...arquivos.files].forEach(async (arq: File, i: number) => {
            const readerDoc = new FileReader();
            readerDoc.onload = async (d: ProgressEvent<FileReader>) => {
              const payloadDoc: ISaveDocumento = {
                nome: arq.name,
                tipo: arq.type,
                arquivo: d.target!.result as string,
                usuarioId: resp.id,
              };
              await addDoc(payloadDoc);
              if (i + 1 === nFiles) {
                btnEnviar.removeAttribute('disabled');
                btnEnviar.textContent = 'Enviar';
                window.location.href = 'index.html';
              }
            };
            readerDoc.readAsDataURL(arq);
          });
        });
      };
      reader.readAsDataURL(foto.files![0]);
    } else {
      const payload: IUpdateUser = {
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

      await updateUser(user.id, payload);

      if (foto.files!.length > 0) {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          const payloadFoto: IUpdateUser = {
            foto: e.target!.result as string,
          };
          await updateUser(user.id, payloadFoto);
        };
        reader.readAsDataURL(foto.files![0]);
      }

      if (docsToDelete.length > 0) {
        docsToDelete.forEach(async idDoc => {
          await deleteDocumento(idDoc);
        });
      }

      if (arquivos.files.length > 0) {
        const nFiles = arquivos.files.length;
        [...arquivos.files].forEach(async (arq: File, i: number) => {
          const readerDoc = new FileReader();
          readerDoc.onload = async (d: ProgressEvent<FileReader>) => {
            const payloadDoc: ISaveDocumento = {
              nome: arq.name,
              tipo: arq.type,
              arquivo: d.target!.result as string,
              usuarioId: user.id,
            };
            await addDoc(payloadDoc);
            if (i + 1 === nFiles) {
              btnEnviar.removeAttribute('disabled');
              btnEnviar.textContent = 'Enviar';
              window.location.href = 'index.html';
            }
          };
          readerDoc.readAsDataURL(arq);
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
