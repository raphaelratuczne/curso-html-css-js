import { IDeparts } from "./types";

const form = document.querySelector("form");
const listaDepartamentos = document.querySelector(
  "#lista-departamentos"
) as HTMLUListElement;
const labelDepartamentos = document.querySelector(
  ".label-departamentos"
) as HTMLLabelElement;
const receberOfertas = document.querySelector(
  "#receber-ofertas"
) as HTMLInputElement;
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;
const cpf = document.querySelector("#cpf") as HTMLInputElement;
const celular = document.querySelector("#celular") as HTMLInputElement;
const foto = document.querySelector("#foto") as HTMLInputElement;
const preview = document.querySelector("#preview") as HTMLDivElement;
const dropZone = document.querySelector("#drop-zone") as HTMLDivElement;
const arquivos = document.querySelector("#arquivos") as HTMLInputElement;

if (labelDepartamentos && listaDepartamentos) {
  listaDepartamentos.style.display = "none";
  labelDepartamentos.style.display = "none";
}

receberOfertas.addEventListener("change", () => {
  if (receberOfertas.checked) {
    listaDepartamentos.style.display = "";
    labelDepartamentos.style.display = "";
  } else {
    listaDepartamentos.style.display = "none";
    labelDepartamentos.style.display = "none";
  }
});

async function loadDeparts() {
  const resp = await fetch("http://localhost:3500/departamentos");
  const departamentos: IDeparts[] = await resp.json();
  console.log("departamentos", departamentos);
  createListDeparts(departamentos);
}

loadDeparts();

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
    listaDepartamentos.innerHTML = lis.join("");
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
  value = value.replace(/\D/g, "").slice(0, 11);
  // mascara o numero como xxx.xxx.xxx-xx
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpf.value = value;
}
cpf.addEventListener("keyup", () => maskCPF(cpf));

// mascara para celular
function maskCelPhone(celular: HTMLInputElement) {
  let value = celular.value;
  // remove tudo que não é número
  value = value.replace(/\D/g, "").slice(0, 11);
  // mascara o numero como (xx) xxxxx-xxxx
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  celular.value = value;
}
celular.addEventListener("keyup", () => maskCelPhone(celular));

foto.addEventListener("change", () => {
  // console.log("file", foto.files);
  preview.innerHTML = "";
  if (foto.files?.length && foto.files[0]) {
    const img = document.createElement("img");
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
  dropZone.addEventListener("dragover", (ev: DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer!.dropEffect = "copy";
    ev.dataTransfer!.effectAllowed = "all";
    // console.log("files dragover", ev.dataTransfer?.files);
  });
  dropZone.addEventListener("drop", (ev: DragEvent) => {
    console.log("drop", ev);
    console.log("files drop", ev.dataTransfer?.files);
    ev.preventDefault();
    if (ev.dataTransfer?.files.length) {
      console.log("adiciona arquivos");
      arquivos.files = ev.dataTransfer.files;
      console.log("arquivos 1", arquivos.files);
      const event = new Event("change");
      arquivos.dispatchEvent(event);
    }
  });
  dropZone.addEventListener("click", () => {
    arquivos.click();
  });
}

function removeFile(name: string) {
  console.log("remove file", name);
  const dt = new DataTransfer();
  for (let i = 0; i < arquivos.files!.length; i++) {
    const file = arquivos.files![i];
    if (file.name !== name) {
      dt.items.add(file);
    }
  }
  arquivos.files = dt.files;

  const event = new Event("change");
  arquivos.dispatchEvent(event);
}

function listaArquivos() {
  console.log("lista de arquivos");
  const ul = dropZone.querySelector("ul") as HTMLUListElement;

  if (arquivos.files?.length) {
    ul.innerHTML = "";
    for (let i = 0; i < arquivos.files.length; i++) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = arquivos.files[i].name;
      const button = document.createElement("button");
      button.classList.add("btn-delete-file");
      button.textContent = "X";
      button.onclick = function () {
        event?.stopPropagation();
        removeFile(arquivos.files![i].name);
      };
      li.appendChild(span);
      li.appendChild(button);
      ul.appendChild(li);
    }
  } else {
    ul.innerHTML = "";
  }
}
arquivos.addEventListener("change", listaArquivos);

// função para exibir uma msg de erro no campo small
function showErrorMsg(
  input: HTMLInputElement | RadioNodeList,
  msg: string,
  type: "input" | "radio" = "input"
) {
  if (type === "input") {
    (input as HTMLInputElement).parentNode!.querySelector(
      "small"
    )!.textContent = msg;
  } else if (type === "radio") {
    (input as RadioNodeList)[0].parentNode!.parentNode!.querySelector(
      "small"
    )!.textContent = msg;
  }
}

function showErrorMsgCheckbox(inputs: RadioNodeList, msg: string) {
  inputs[0].parentNode!.parentNode!.parentNode!.parentNode!.querySelector(
    "small"
  )!.textContent = msg;
}

// função para validar campos obrigatórios
function validateRequiredField(input: HTMLInputElement) {
  if (!input.value || input.value.length === 0 || input.value.trim() === "") {
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
    console.log("dataAtual", dataAtual);
    // transforma a data passada em um objeto date
    const dataNascimento = new Date(input.value);
    console.log("dataNascimento", dataNascimento);
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
    console.log("getTimezoneOffset", timezone);
    dataNascimento.setMinutes(dataNascimento.getMinutes() + timezone);
    console.log("dataNascimento", dataNascimento);
  }

  if (!input.value) {
    return false;
  }
  return true;
}

function validateCPF(cpf: HTMLInputElement) {
  let value = cpf.value.replace(/\D/g, "").slice(0, 11);
  let Soma;
  let Resto;
  Soma = 0;
  if (value == "00000000000") return false;

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
  const value = input.value.replace(/\D/g, "");
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
  interesses: RadioNodeList
) {
  if (receber_ofertas.checked) {
    const arr: boolean[] = [];
    [...interesses].forEach((interesse) => {
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
  console.log("receber_ofertas", receber_ofertas, receber_ofertas.checked);
  console.log("interesses", interesses);

  // 4º cria uma função para validar o campo nome
  const validaNome = () => {
    // verifica se o nome (obrigatorio) foi inserido
    if (!validateRequiredField(nome)) {
      showErrorMsg(nome, "O nome é obrigatório!");
      objForm.nome = false;
    } else if (!validateMinLengthField(nome, 3)) {
      showErrorMsg(nome, "Digite ao menos 3 letras!");
      objForm.nome = false;
    } else {
      showErrorMsg(nome, "");
      objForm.nome = true;
    }
  };
  nome.onkeyup = validaNome;
  validaNome();

  // 5º cria uma função para validar o campo sobrenome
  const validaSobrenome = () => {
    // verifica se o sobrenome (obrigatorio) foi digitado
    if (!validateRequiredField(sobrenome)) {
      showErrorMsg(sobrenome, "O sobrenome é obrigatório!");
      objForm.sobrenome = false;
    } else if (!validateMinLengthField(sobrenome, 3)) {
      showErrorMsg(sobrenome, "Digite ao menos 3 letras!");
      objForm.sobrenome = false;
    } else {
      showErrorMsg(sobrenome, "");
      objForm.sobrenome = true;
    }
  };
  sobrenome.onkeyup = validaSobrenome;
  validaSobrenome();

  const validaEmail = () => {
    if (!validateEmailField(email)) {
      showErrorMsg(email, "Insira um e-mail válido");
      objForm.email = false;
    } else {
      showErrorMsg(email, "");
      objForm.email = true;
    }
  };
  email.onkeyup = validaEmail;
  validaEmail();

  const validaNascimento = () => {
    if (!validateDateField(nascimento)) {
      showErrorMsg(nascimento, "Insira uma data válida");
      objForm.nascimento = false;
    } else {
      showErrorMsg(nascimento, "");
      objForm.nascimento = true;
    }
  };
  nascimento.onchange = validaNascimento;
  validaNascimento();

  const validaCpf = () => {
    if (!validateCPF(cpf)) {
      showErrorMsg(cpf, "Insira um CPF válido!");
      objForm.cpf = false;
    } else {
      showErrorMsg(cpf, "");
      objForm.cpf = true;
    }
  };
  cpf.onkeyup = validaCpf;
  validaCpf();

  const validaCelular = () => {
    if (!validateCelPhone(celular)) {
      showErrorMsg(celular, "Insira um número válido!");
      objForm.celular = false;
    } else {
      showErrorMsg(celular, "");
      objForm.celular = true;
    }
  };
  celular.onkeyup = validaCelular;
  validaCelular();

  const validaSexo = () => {
    if (!validateRadio(sexo)) {
      showErrorMsg(sexo, "Selecione seu sexo!", "radio");
      objForm.sexo = false;
    } else {
      showErrorMsg(sexo, "", "radio");
      objForm.sexo = true;
    }
  };
  sexo[0].parentNode.parentNode.onchange = validaSexo;
  validaSexo();

  const validaFoto = () => {
    if (!validateFile(foto)) {
      showErrorMsg(foto, "Selecione uma foto!");
      objForm.foto = false;
    } else {
      showErrorMsg(foto, "");
      objForm.foto = true;
    }
  };
  foto.onchange = validaFoto;
  validaFoto();

  const validaArquivos = () => {
    if (!validateFile(arquivos)) {
      showErrorMsg(arquivos, "Selecione ao menos 1 arquivo!");
      objForm.arquivos = false;
    } else {
      showErrorMsg(arquivos, "");
      objForm.arquivos = true;
    }
  };
  arquivos.onchange = validaArquivos;
  validaArquivos();

  const validaObservacao = () => {
    if (!validateRequiredField(observacao)) {
      showErrorMsg(observacao, "Insira uma mensagem!");
      objForm.observacao = false;
    } else {
      showErrorMsg(observacao, "");
      objForm.observacao = true;
    }
  };
  observacao.onkeyup = validaObservacao;
  validaObservacao();

  const validaInteresses = () => {
    if (!validateCheckboxes(receber_ofertas, interesses)) {
      showErrorMsgCheckbox(interesses, "Selecione ao menos 1 interesse!");
      objForm.interesses = false;
    } else {
      showErrorMsgCheckbox(interesses, "");
      objForm.interesses = true;
    }
  };
  receber_ofertas.onchange = validaInteresses;
  [...interesses].forEach((interesse) => {
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

function handleSubmit() {
  // seta a flag para avisar que foi feita uma tentativa de enviar o form
  formSubmitted = true;
  // 2º chama a função para validar o form antes de enviar
  if (validateForm()) {
    console.log("O formulário é valido, vamos salvar.");
  } else {
    console.log("O formulário não é valido, vamos corrigir.");
  }
}

if (form) {
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    return false;
  });
}

if (btnEnviar) {
  // 1º ao clicar no botão enviar, chama a função para submeter o formulario
  btnEnviar.addEventListener("click", handleSubmit);
}
