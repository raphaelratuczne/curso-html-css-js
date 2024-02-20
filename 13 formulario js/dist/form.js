const form = document.querySelector("form");
const btnEnviar = document.querySelector("#btnEnviar");
let formSubmitted = false;
const cpf = document.querySelector("#cpf");
const celular = document.querySelector("#celular");
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
// mascara para cpf
function maskCPF(cpf) {
    let value = cpf.value;
    // remove tudo que não é numero
    value = value.replace(/\D/g, "").slice(0, 11);
    // mascara o numero como xxx.xxx.xxx-xx
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})/, "$1-$2");
    cpf.value = value;
}
cpf.addEventListener("keyup", () => maskCPF(cpf));
// mascara para cpf
function maskCelPhone(celular) {
    let value = celular.value;
    // remove tudo que não é numero
    value = value.replace(/\D/g, "").slice(0, 11);
    // mascara o numero como (xx) xxxxx-xxxx
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    celular.value = value;
}
celular.addEventListener("keyup", () => maskCelPhone(celular));
// função para exibir uma msg de erro no campo small
function showErrorMsg(input, msg) {
    input.parentNode.querySelector("small").textContent = msg;
}
// função para exibir uma msg de erro no campo small para campos radio
function showErrorMsgRadio(listRadios, msg) {
    listRadios[0].parentNode.parentNode.querySelector("small").textContent =
        msg;
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
function validateCelPhone(input) {
    const value = input.value.replace(/\D/g, "");
    if (value.length !== 11) {
        return false;
    }
    return true;
}
function validateRadios(input) {
    if (!input.value) {
        return false;
    }
    return true;
}
function validateDate(input) {
    if (input.value) {
        const dataAtual = new Date();
        console.log("dataAtual", dataAtual);
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
        console.log("dataNascimento", dataNascimento);
        // if (dataNascimento.getTime() > dataAtual.getTime()) {
        //   console.log("A data de nascimento é maior que a data de hj");
        // }
        // vou adicionar 20 dias na data atual
        // const novoDia = dataAtual.getDate() + 20;
        // dataAtual.setDate(novoDia);
        // console.log("data atual + 20 dias", dataAtual.toLocaleDateString("pt-BR"));
        // como corrigir o timestamp de uma data setada yyyy-mm-dd
        const timestamp = dataAtual.getTimezoneOffset();
        console.log("timestamp", timestamp);
        dataNascimento.setMinutes(dataNascimento.getMinutes() + timestamp);
        console.log("data de nascimento com timestamp corrigida", dataNascimento);
    }
    if (!input.value) {
        return false;
    }
    return true;
}
function validateCpf(input) {
    let value = input.value.replace(/\D/g, "").slice(0, 11);
    let Soma = 0;
    let Resto;
    if (value == "00000000000")
        return false;
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
    };
    // 3º pega os campos do formulário
    const { nome, sobrenome, email, nascimento, cpf, celular, sexo } = form;
    // 4º cria uma função para validar o campo nome
    const validaNome = () => {
        // verifica se o nome (obrigatório) foi inserido
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
    const validaNascimento = () => {
        if (!validateDate(nascimento)) {
            showErrorMsg(nascimento, "Insira uma data válida");
            objForm.nascimento = false;
        }
        else {
            showErrorMsg(nascimento, "");
            objForm.nascimento = true;
        }
    };
    nascimento.onchange = validaNascimento;
    validaNascimento();
    const validaCpf = () => {
        if (!validateCpf(cpf)) {
            showErrorMsg(cpf, "Insira um cpf válido");
            objForm.cpf = false;
        }
        else {
            showErrorMsg(cpf, "");
            objForm.cpf = true;
        }
    };
    cpf.onkeyup = validaCpf;
    validaCpf();
    const validaCelPhone = () => {
        if (!validateCelPhone(celular)) {
            showErrorMsg(celular, "Insira um telefone válido");
            objForm.celular = false;
        }
        else {
            showErrorMsg(celular, "");
            objForm.celular = true;
        }
    };
    celular.onkeyup = validaCelPhone;
    validaCelPhone();
    const validaSexo = () => {
        if (!validateRadios(sexo)) {
            showErrorMsgRadio(sexo, "Selecione seu sexo");
            objForm.sexo = false;
        }
        else {
            showErrorMsgRadio(sexo, "");
            objForm.sexo = true;
        }
    };
    sexo[0].parentNode.parentNode.onchange = validaSexo;
    validaSexo();
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
