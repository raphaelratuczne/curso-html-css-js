import { IDeparts } from "./types";

const form = document.querySelector("form");
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;

async function loadDeparts() {
  const resp = await fetch("http://127.0.0.1:3500/departamentos");
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

function validateForm() {
  // 3º pega os campos do formulario
  const { nome, sobrenome } = form!;

  // 4º cria uma função para validar o campo nome
  const validaNome = () => {
    // verifica se o nome (obrigatorio) foi inserido
    if (validateRequired(nome)) {
      showErrorMsg(nome, "");
    } else {
      showErrorMsg(nome, "O nome é obrigatório!");
    }
  };
  nome.onkeyup = validaNome;
  validaNome();

  // 5º cria uma função para validar o campo sobrenome
  const validaSobrenome = () => {
    // verifica se o sobrenome (obrigatorio) foi digitado
    if (validateRequired(sobrenome)) {
      showErrorMsg(sobrenome, "");
    } else {
      showErrorMsg(sobrenome, "O sobrenome é obrigatório!");
    }
  };
  sobrenome.onkeyup = validaSobrenome;
  validaSobrenome();
}

function handleSubmit() {
  // seta a flag para avisar que foi feita uma tentativa de enviar o form
  formSubmitted = true;
  // 2º chama a função para validar o form antes de enviar
  validateForm();
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
