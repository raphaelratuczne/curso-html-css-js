var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("href", window.location.href);
console.log("protocol", window.location.protocol);
console.log("host", window.location.host);
console.log("port", window.location.port);
console.log("pathname", window.location.pathname);
console.log("hash", window.location.hash);
console.log("search", window.location.search);
//! console.log("href", window.location.href.split("?")[1].split("&"));
// if (searchParams.has("name")) {
//   console.log("name", searchParams.get("name"));
// }
// if (searchParams.has("class")) {
//   console.log("class", searchParams.get("class"));
// }
let listaTurmas = [];
let listaMaterias = {};
let aluno = null;
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`http://localhost:3500/lista-alunos/${id}`);
        const data = yield resp.json();
        aluno = data;
    });
}
function getTurmas() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3500/lista-turmas");
        const data = yield resp.json();
        listaTurmas = data;
    });
}
function getMaterias() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3500/lista-materias");
        const data = yield resp.json();
        listaMaterias = data;
    });
}
const values = window.location.search;
const searchParams = new URLSearchParams(values);
if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id"));
    Promise.all([getTurmas(), getMaterias(), getStudent(id)]).then(() => {
        console.log("listaTurmas", listaTurmas, "listaMaterias", listaMaterias, "aluno", aluno);
        document.querySelector("#nome").textContent = aluno.nome;
        const turma = listaTurmas.find((turma) => turma.id === aluno.turma);
        // trata "Turma X" para "Turma <span>X</span>"
        const turmaHtml = turma.name.replace(/Turma (\w+)/, "Turma <span>$1</span>");
        document.querySelector("#turma").innerHTML = turmaHtml;
        const notas = document.querySelector("#notas");
        notas.innerHTML = "";
        for (const materia in aluno.notas) {
            const tr = document.createElement("tr");
            const tdMateria = document.createElement("td");
            tdMateria.innerText = listaMaterias[materia];
            tr.appendChild(tdMateria);
            for (const nota of aluno.notas[materia]) {
                const tdNota = document.createElement("td");
                tdNota.innerText = String(nota);
                tr.appendChild(tdNota);
            }
            notas.appendChild(tr);
        }
        const faltas = document.querySelector("#faltas");
        faltas.innerHTML = "";
        for (const materia in aluno.faltas) {
            const tr = document.createElement("tr");
            const tdMateria = document.createElement("td");
            tdMateria.innerText = listaMaterias[materia];
            tr.appendChild(tdMateria);
            const tdFalta = document.createElement("td");
            tdFalta.innerText = String(aluno.faltas[materia]);
            tr.appendChild(tdFalta);
            faltas.appendChild(tr);
        }
    });
}
export {};
