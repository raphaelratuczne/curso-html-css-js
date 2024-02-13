import { IDeparts } from "./types";

const form = document.querySelector("form");
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;
const cpf = document.querySelector("#cpf") as HTMLInputElement;

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
          <input type="checkbox" name="interesses[]" value="${depart.id}">
          ${depart.nome}
        </label>
      </li>
    `);
  }

  const lista = document.querySelector("#lista-departamentos");
  if (lista) {
    lista.innerHTML = lis.join("");
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

// função para exibir uma msg de erro no campo small
function showErrorMsg(input: HTMLInputElement, msg: string) {
  input.parentNode!.querySelector("small")!.textContent = msg;
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
  };
  // 3º pega os campos do formulario
  const { nome, sobrenome, email, nascimento, cpf } = form!;

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
