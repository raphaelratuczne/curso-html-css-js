const form = document.querySelector("form");
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;
async function loadDeparts() {
    const resp = await fetch("http://localhost:3500/departamentos");
    const departamentos = await resp.json();
    console.log("departamentos", departamentos);
    createListDeparts(departamentos);
}
loadDeparts();
function createListDeparts(departs) {
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
function showErrorMsg(input, msg) {
    input.parentNode.querySelector("small").textContent = msg;
}
// função para validar campos obrigatórios
function validateRequired(input) {
    if (!input.value || input.value.length === 0 || input.value.trim() === "") {
        return false;
    }
    return true;
}
function validateMinLength(input, min) {
    if (!input.value || input.value.length < min) {
        return false;
    }
    return true;
}
function validateEmail(input) {
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
    const objForm = {
        nome: true,
        sobrenome: true,
        email: true,
    };
    // 3º pega os campos do formulario
    const { nome, sobrenome, email } = form;
    // 4º cria uma função para validar o campo nome
    const validaNome = () => {
        // verifica se o nome (obrigatorio) foi inserido
        if (!validateRequired(nome)) {
            showErrorMsg(nome, "O nome é obrigatório!");
            objForm.nome = false;
        }
        else if (!validateMinLength(nome, 3)) {
            showErrorMsg(nome, "Digite ao menos 3 letras!");
            objForm.nome = false;
        }
        else {
            showErrorMsg(nome, "");
            objForm.nome = true;
        }
    };
    nome.onkeyup = validaNome;
    validaNome();
    // 5º cria uma função para validar o campo sobrenome
    const validaSobrenome = () => {
        // verifica se o sobrenome (obrigatorio) foi digitado
        if (!validateRequired(sobrenome)) {
            showErrorMsg(sobrenome, "O sobrenome é obrigatório!");
            objForm.sobrenome = false;
        }
        else if (!validateMinLength(sobrenome, 3)) {
            showErrorMsg(sobrenome, "Digite ao menos 3 letras!");
            objForm.sobrenome = false;
        }
        else {
            showErrorMsg(sobrenome, "");
            objForm.sobrenome = true;
        }
    };
    sobrenome.onkeyup = validaSobrenome;
    validaSobrenome();
    const validaEmail = () => {
        if (!validateEmail(email)) {
            showErrorMsg(email, "Insira um e-mail válido");
            objForm.email = false;
        }
        else {
            showErrorMsg(email, "");
            objForm.email = true;
        }
    };
    email.onkeyup = validaEmail;
    validaEmail();
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
    }
    else {
        console.log("O formulário não é valido, vamos corrigir.");
    }
}
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        return false;
    });
}
if (btnEnviar) {
    // 1º ao clicar no botão enviar, chama a função para submeter o formulario
    btnEnviar.addEventListener("click", handleSubmit);
}
export {};
