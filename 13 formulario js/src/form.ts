import { IDeparts } from "./types";

const form = document.querySelector("form");
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;

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

// função para exibir uma msg de erro no campo small
function showErrorMsg(input: HTMLInputElement, msg: string) {
  input.parentNode!.querySelector("small")!.textContent = msg;
}

// função para validar campos obrigatórios
function validateRequired(input: HTMLInputElement) {
  if (!input.value || input.value.length === 0 || input.value.trim() === "") {
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
  const fields = {
    nome: true,
    sobrenome: true,
    email: true,
  };
  // 3º pega os campos do formulario
  const { nome, sobrenome, email } = form!;

  // 4º cria uma função para validar o campo nome
  const validaNome = () => {
    // verifica se o nome (obrigatorio) foi inserido
    if (validateRequired(nome)) {
      showErrorMsg(nome, "");
      fields.nome = true;
    } else {
      showErrorMsg(nome, "O nome é obrigatório!");
      fields.nome = false;
    }
  };
  nome.onkeyup = validaNome;
  validaNome();

  // 5º cria uma função para validar o campo sobrenome
  const validaSobrenome = () => {
    // verifica se o sobrenome (obrigatorio) foi digitado
    if (validateRequired(sobrenome)) {
      showErrorMsg(sobrenome, "");
      fields.sobrenome = true;
    } else {
      showErrorMsg(sobrenome, "O sobrenome é obrigatório!");
      fields.sobrenome = false;
    }
  };
  sobrenome.onkeyup = validaSobrenome;
  validaSobrenome();

  const validaEmail = () => {
    // verifica se um email valido foi digitado
    if (validateEmail(email)) {
      showErrorMsg(email, "");
      fields.email = true;
    } else {
      showErrorMsg(email, "Por favor use um email válido!");
      fields.email = false;
    }
  };
  email.onkeyup = validaEmail;
  validaEmail();

  const isValid = Object.values(fields).every((field) => field);
  return isValid;
}

function handleSubmit() {
  // seta a flag para avisar que foi feita uma tentativa de enviar o form
  formSubmitted = true;
  // 2º chama a função para validar o form antes de enviar
  if (validateForm()) {
    console.log("Formulário válido, enviando...");
  } else {
    console.log("Formulário inválido, não enviado!");
  }
  // o envio será feito depois da validação (nas proximas aulas)
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
