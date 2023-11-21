import { IAluno, ITurma } from "./types";

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

let listaTurmas: ITurma[] = [];
let listaMaterias: any = {};
let aluno: IAluno | null = null;

async function getStudent(id: number) {
  const resp = await fetch(`http://localhost:3500/lista-alunos/${id}`);
  const data = await resp.json();
  aluno = data;
}

async function getTurmas() {
  const resp = await fetch("http://localhost:3500/lista-turmas");
  const data = await resp.json();
  listaTurmas = data;
}

async function getMaterias() {
  const resp = await fetch("http://localhost:3500/lista-materias");
  const data = await resp.json();
  listaMaterias = data;
}

const values = window.location.search;
const searchParams = new URLSearchParams(values);

if (searchParams.has("id")) {
  console.log("id", searchParams.get("id"));
  const id = parseInt(searchParams.get("id")!);
  Promise.all([getTurmas(), getMaterias(), getStudent(id)]).then(() => {
    console.log(
      "listaTurmas",
      listaTurmas,
      "listaMaterias",
      listaMaterias,
      "aluno",
      aluno
    );
    document.querySelector("#nome")!.textContent = aluno!.nome;
    const turma = listaTurmas.find((turma) => turma.id === aluno!.turma);
    // trata "Turma X" para "Turma <span>X</span>"
    const turmaHtml = turma!.name.replace(
      /Turma (\w+)/,
      "Turma <span>$1</span>"
    );
    document.querySelector("#turma")!.innerHTML = turmaHtml;

    const notas = document.querySelector("#notas");
    notas!.innerHTML = "";
    for (const materia in aluno!.notas) {
      const tr = document.createElement("tr");
      const tdMateria = document.createElement("td");
      tdMateria.innerText = listaMaterias[materia];
      tr.appendChild(tdMateria);

      for (const nota of aluno!.notas[materia]) {
        const tdNota = document.createElement("td");
        tdNota.innerText = String(nota);
        tr.appendChild(tdNota);
      }
      notas!.appendChild(tr);
    }

    const faltas = document.querySelector("#faltas");
    faltas!.innerHTML = "";
    for (const materia in aluno!.faltas) {
      const tr = document.createElement("tr");
      const tdMateria = document.createElement("td");
      tdMateria.innerText = listaMaterias[materia];
      tr.appendChild(tdMateria);

      const tdFalta = document.createElement("td");
      tdFalta.innerText = String(aluno!.faltas[materia]);
      tr.appendChild(tdFalta);

      faltas!.appendChild(tr);
    }
  });
}
