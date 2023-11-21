var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const filtro = {
    id: "0",
    nome: "",
};
document.querySelector(".busca").addEventListener("search", (ev) => {
    const value = ev.target.value;
    console.log("valor da busca", value);
    filtro.nome = value;
    getStudents(filtro);
});
let listaTurmas = [];
function getTurmas() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3500/lista-turmas");
        const data = yield resp.json();
        listaTurmas = data;
        populateSelectTurmas(data);
        getStudents(filtro);
    });
}
function populateSelectTurmas(lista) {
    const select = document.querySelector("#turma");
    if (select && lista.length > 0) {
        for (const turma of lista) {
            const opt = document.createElement("option");
            opt.setAttribute("value", String(turma.id));
            opt.textContent = turma.name;
            select.appendChild(opt);
        }
        select.addEventListener("change", handleSelectTurma);
    }
}
getTurmas();
function handleSelectTurma(event) {
    const turmaId = event.target.value;
    filtro.id = turmaId;
    getStudents(filtro);
}
function getStudents({ id, nome }, page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `http://localhost:3500/lista-alunos?_sort=nome&_limit=7&_page=${page}`;
        if (id !== "0") {
            url += `&turma=${id}`;
        }
        if (nome) {
            url += `&nome_like=${nome}`;
        }
        const resp = yield fetch(url);
        const totalCount = parseInt(resp.headers.get("X-Total-Count") || "0");
        const data = yield resp.json();
        createListStudents(data);
        createPagination(totalCount, page);
    });
}
function createListStudents(students) {
    const listaAlunos = document.querySelector(".lista-alunos");
    let alunos = "";
    if (listaAlunos) {
        for (const student of students) {
            const turma = listaTurmas.find((t) => t.id === student.turma);
            alunos += `
        <li>
          <span class="id">${student.id}</span>
          <a href="details.html?id=${student.id}"><span class="name">${student.nome}</span></a>
          <span class="classe">${(turma === null || turma === void 0 ? void 0 : turma.name) || ""}</span>
        </li>
      `;
        }
        listaAlunos.querySelector("ul").innerHTML = alunos;
    }
}
function createPagination(totalCount, actualPage) {
    const totalPages = Math.ceil(totalCount / 7);
    // criar ul
    const ul = document.createElement("ul");
    // cria link para pagina anterior
    const liPrev = document.createElement("li");
    const aPrev = document.createElement("a");
    aPrev.setAttribute("href", "#");
    aPrev.textContent = "Anterior";
    if (actualPage > 1) {
        aPrev.onclick = () => getStudents(filtro, actualPage - 1);
    }
    liPrev.appendChild(aPrev);
    ul.appendChild(liPrev);
    // cria links para as paginas
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        a.textContent = String(i);
        if (i === actualPage) {
            li.classList.add("active");
        }
        else {
            a.onclick = () => getStudents(filtro, i);
        }
        li.appendChild(a);
        ul.appendChild(li);
    }
    // cria link para a proxima pagina
    const liNext = document.createElement("li");
    const aNext = document.createElement("a");
    aNext.setAttribute("href", "#");
    aNext.textContent = "Próximo";
    if (actualPage < totalPages) {
        aNext.onclick = () => getStudents(filtro, actualPage + 1);
    }
    liNext.appendChild(aNext);
    ul.appendChild(liNext);
    const pagination = document.querySelector(".paginacao");
    if (pagination) {
        pagination.innerHTML = "";
        pagination.appendChild(ul);
    }
}
export {};
/*
excluia os comandos de export no arquivo de lista de alunos
excluia os comandos de import do arquivo main.ts
mova todas as interfaces para o arquivo main.ts
transforme a lista de materias e a lista de alunos em um objeto com 2 propriedades (lista-materias, lista-alunos)
renomeie a extensão do arquivo lista-alunos.ts para .json e mova-o para um novo diretorio chamado data
no package.json, adicione o script:
  "json:server": "npx json-server -p 3500 ./data/lista-alunos.json -w",
na raiz do projeto, crie o arquivo api.rest para testar as apis (opcional)

exemplos para o arquivo rest:
    GET http://localhost:3500/lista-materias HTTP/1.1
    ###
    GET http://localhost:3500/lista-alunos HTTP/1.1
    ###
    GET http://localhost:3500/lista-alunos?_sort=nome HTTP/1.1

criar a função para carregar a lista de alunos
exiba na tela uma lista de alunos contendo
id, nome e turma
(criar uma função para criar o html com a lista de alunos)
*/
//* exercicio filtros
//? adicione um campo para busca por nome e um select para selecionar a turma na tela de listagem
//? crie uma lista de turmas dentro do nosso arquivo json
//? substitua as turmas de cada aluno pelo id da turma correspondente na lista de turmas
//? cria uma função para carregar a lista de turmas
//? crie uma função para popular o select com as turmas carregadas
//? guarde a lista de turmas carregada em uma variavel separada para ser usada mais tarde
//? carregue a lista de estudantes apos carregar a lista de turmas
//? ajuste a função de mostrar a lista de estudantes para mostrar a turma correspondente
//? crie uma função para ser chamada sempre que o select de turma for alterado
//? link essa função ao select (pode fazer isso dentro da função que popula o selct)
//? pegue o valor selecionado no select
//? passe esse valor do select como filtro para trazer a lista de alunos (de acordo com a turma selecionada)
//* continuação (filtro de busca)
//? coloque um type="search" para o input de busca
//? encontre o campo de busca com o document.querySelector
//? atribua um eventListener para o evento search
//? pegue o valor desse campo de busca e passe para a função de carregar a lista de estudantes
//? dentro da função de carregar estudantes, passe o nome para a url de filtro
//! vc pode separar os valores de id da turma e nome da busca para chamar na função de filtro
