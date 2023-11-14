// function geraNotas() {
//   const intervalos = [
//     [2, 5],
//     [4, 7],
//     [5, 9],
//     [6, 10],
//     [7, 10],
//   ];
//   const materias = Object.keys(listaMaterias);
//   const objMaterias = {};
//   for (let materia of materias) {
//     const key = Math.round(Math.random() * (intervalos.length - 1));
//     const intervaloSelecionado = intervalos[key];
//     const notas = [
//       getRandomNumber(...intervaloSelecionado),
//       getRandomNumber(...intervaloSelecionado),
//       getRandomNumber(...intervaloSelecionado),
//       getRandomNumber(...intervaloSelecionado),
//     ];
//     objMaterias[materia] = notas;
//   }
//   return objMaterias;
// }

// function gerarFaltas() {
//   const materias = Object.keys(listaMaterias);
//   const objMaterias = {};
//   for (let materia of materias) {
//     objMaterias[materia] = Math.round(Math.random() * 10);
//   }
//   return objMaterias;
// }

const totalAulas = 16;

const listaMaterias = {
  matematica: "Matemática",
  portugues: "Português",
  historia: "História",
  geografia: "Geografia",
  fisica: "Física",
  quimica: "Química",
  linguas: "Línguas",
};

const listaAlunos = [
  {
    id: 1,
    nome: "Carlos Souza",
    turma: "A",
    notas: {
      matematica: [8.5, 7.2, 6, 5.6],
      portugues: [5.4, 6.8, 5.3, 6.3],
      historia: [8.4, 8.4, 5.4, 8.5],
      geografia: [7.9, 9.6, 6.7, 8.1],
      fisica: [9.5, 9.4, 9.7, 9.8],
      quimica: [5.2, 5.2, 5, 6.6],
      linguas: [5, 5, 5, 5],
    },
    faltas: {
      matematica: 1,
      portugues: 5,
      historia: 2,
      geografia: 6,
      fisica: 1,
      quimica: 7,
      linguas: 7,
    },
  },
  {
    id: 2,
    nome: "Mariana Rocha",
    turma: "B",
    notas: {
      matematica: [8.2, 6.2, 7.4, 7.2],
      portugues: [7.5, 9.4, 7.1, 9.1],
      historia: [7.8, 8.9, 8, 8.7],
      geografia: [8.7, 8.3, 9, 9.9],
      fisica: [4.3, 6.8, 4.8, 4.1],
      quimica: [9, 7.5, 8.2, 8.7],
      linguas: [2.5, 2.8, 3.2, 3.9],
    },
    faltas: {
      matematica: 4,
      portugues: 3,
      historia: 5,
      geografia: 9,
      fisica: 8,
      quimica: 6,
      linguas: 3,
    },
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    turma: "C",
    notas: {
      matematica: [6.1, 8.3, 9.1, 6.9],
      portugues: [9.4, 6.6, 6.8, 9.2],
      historia: [8.3, 7.4, 8.5, 8.2],
      geografia: [6.5, 8.3, 8.2, 5],
      fisica: [5, 5, 5, 5],
      quimica: [8.8, 8.2, 8.9, 6.7],
      linguas: [8.6, 8.5, 7.8, 7.3],
    },
    faltas: {
      matematica: 3,
      portugues: 3,
      historia: 7,
      geografia: 4,
      fisica: 7,
      quimica: 7,
      linguas: 7,
    },
  },
  {
    id: 4,
    nome: "Ana Silva",
    turma: "A",
    notas: {
      matematica: [8.1, 7.4, 9.3, 6.7],
      portugues: [6.1, 5.5, 6.9, 5.2],
      historia: [8.3, 6.7, 7.8, 8.7],
      geografia: [6.2, 6.8, 4.8, 5.5],
      fisica: [8.1, 9.9, 8.4, 8.7],
      quimica: [4, 4.3, 2.6, 2.3],
      linguas: [6.4, 6.3, 8.1, 8.8],
    },
    faltas: {
      matematica: 9,
      portugues: 8,
      historia: 3,
      geografia: 7,
      fisica: 9,
      quimica: 3,
      linguas: 10,
    },
  },
  {
    id: 5,
    nome: "Carlos Pereira",
    turma: "B",
    notas: {
      matematica: [6.5, 6.8, 5, 6.9],
      portugues: [8.6, 7.4, 6.3, 9.8],
      historia: [7, 7.6, 7.8, 8.7],
      geografia: [4.1, 4, 5.3, 5.6],
      fisica: [3.7, 5, 2.2, 4.1],
      quimica: [5.1, 8, 5.4, 8.8],
      linguas: [9, 9.4, 9.9, 6.2],
    },
    faltas: {
      matematica: 9,
      portugues: 5,
      historia: 3,
      geografia: 6,
      fisica: 9,
      quimica: 1,
      linguas: 1,
    },
  },
  {
    id: 6,
    nome: "Pedro Souza",
    turma: "C",
    notas: {
      matematica: [7.2, 8, 7.6, 5.4],
      portugues: [6.4, 7.3, 7, 5.1],
      historia: [7.8, 8.9, 6.9, 7.1],
      geografia: [8.7, 7.4, 9.4, 7],
      fisica: [6.5, 5.5, 6, 5.5],
      quimica: [4.8, 2.9, 2.3, 2.2],
      linguas: [7.9, 7.5, 8.5, 5.6],
    },
    faltas: {
      matematica: 1,
      portugues: 4,
      historia: 6,
      geografia: 1,
      fisica: 8,
      quimica: 1,
      linguas: 5,
    },
  },
  {
    id: 7,
    nome: "Fernanda Pereira",
    turma: "A",
    notas: {
      matematica: [7.7, 9.2, 8.4, 9.3],
      portugues: [7, 4, 5.4, 5.9],
      historia: [6.9, 7.7, 9.1, 6.1],
      geografia: [4.7, 5.1, 5.2, 4.1],
      fisica: [9.2, 9.7, 7.9, 7.2],
      quimica: [8.3, 8, 9.1, 6.9],
      linguas: [8.8, 5.9, 5.3, 7.3],
    },
    faltas: {
      matematica: 2,
      portugues: 9,
      historia: 3,
      geografia: 4,
      fisica: 6,
      quimica: 4,
      linguas: 3,
    },
  },
  {
    id: 8,
    nome: "Julia Silva",
    turma: "B",
    notas: {
      matematica: [4.9, 6.6, 5.9, 4.5],
      portugues: [4.1, 4.2, 6, 4.7],
      historia: [4, 7, 6.8, 4.8],
      geografia: [4.2, 2.6, 2.2, 4],
      fisica: [9.3, 9.6, 7.3, 8.2],
      quimica: [7, 7.3, 7.5, 6.6],
      linguas: [4.1, 5.8, 5.6, 4.6],
    },
    faltas: {
      matematica: 9,
      portugues: 3,
      historia: 4,
      geografia: 2,
      fisica: 9,
      quimica: 2,
      linguas: 8,
    },
  },
  {
    id: 9,
    nome: "Pedro Lima",
    turma: "C",
    notas: {
      matematica: [8, 8.5, 5.6, 5.8],
      portugues: [9.3, 9.3, 7.5, 8.3],
      historia: [5, 5, 5, 5],
      geografia: [8, 7.1, 9.8, 8.6],
      fisica: [5, 6, 6, 6],
      quimica: [6, 6.5, 5, 6.6],
      linguas: [6.5, 5.6, 5, 8.6],
    },
    faltas: {
      matematica: 6,
      portugues: 5,
      historia: 1,
      geografia: 5,
      fisica: 6,
      quimica: 6,
      linguas: 6,
    },
  },
  {
    id: 10,
    nome: "Julia Pereira",
    turma: "A",
    notas: {
      matematica: [5.9, 5.2, 6.3, 6.5],
      portugues: [5.2, 4.2, 6.9, 4.6],
      historia: [6, 4.1, 7, 5.1],
      geografia: [8.3, 5.8, 7.8, 8.4],
      fisica: [6.2, 6.8, 6.5, 6.3],
      quimica: [9.5, 8.3, 8.7, 9.3],
      linguas: [2.2, 2.8, 4.5, 5],
    },
    faltas: {
      matematica: 1,
      portugues: 3,
      historia: 3,
      geografia: 10,
      fisica: 0,
      quimica: 7,
      linguas: 9,
    },
  },
  {
    id: 11,
    nome: "Ana Oliveira",
    turma: "B",
    notas: {
      matematica: [8.2, 9.2, 8, 6.9],
      portugues: [4.6, 5.8, 5.7, 5.7],
      historia: [6.7, 4.9, 4.8, 5.1],
      geografia: [8.3, 9.7, 9.5, 7.1],
      fisica: [4.8, 5.8, 6.4, 5.7],
      quimica: [8.3, 9.3, 6.4, 8.4],
      linguas: [8.6, 9.9, 7, 7],
    },
    faltas: {
      matematica: 8,
      portugues: 7,
      historia: 8,
      geografia: 2,
      fisica: 9,
      quimica: 9,
      linguas: 9,
    },
  },
  {
    id: 12,
    nome: "Ana Santos",
    turma: "C",
    notas: {
      matematica: [3.9, 2.5, 3.7, 3.6],
      portugues: [4.2, 4.3, 4.1, 5.6],
      historia: [6.1, 7.3, 6, 6.8],
      geografia: [8.5, 6.7, 6, 8.1],
      fisica: [8, 8.8, 5.9, 8.1],
      quimica: [8.5, 9, 7.2, 8.4],
      linguas: [3.7, 3.5, 2.8, 2.2],
    },
    faltas: {
      matematica: 1,
      portugues: 8,
      historia: 3,
      geografia: 5,
      fisica: 3,
      quimica: 1,
      linguas: 5,
    },
  },
  {
    id: 13,
    nome: "Maria Santos",
    turma: "A",
    notas: {
      matematica: [5.6, 6.8, 5.4, 4.1],
      portugues: [4.9, 4.5, 3.4, 4.7],
      historia: [2.5, 4.8, 3.3, 3.1],
      geografia: [9.7, 8.8, 8.9, 7],
      fisica: [4.6, 5, 6.8, 4.6],
      quimica: [5.1, 7.9, 8, 5.2],
      linguas: [7.9, 7.4, 8.8, 7.3],
    },
    faltas: {
      matematica: 2,
      portugues: 2,
      historia: 5,
      geografia: 9,
      fisica: 8,
      quimica: 7,
      linguas: 0,
    },
  },
  {
    id: 14,
    nome: "Gustavo Costa",
    turma: "B",
    notas: {
      matematica: [6, 5.5, 6.1, 5.3],
      portugues: [5.8, 5, 6, 5.9],
      historia: [9.1, 9.9, 9.4, 9.6],
      geografia: [6.4, 7.2, 8.1, 5.8],
      fisica: [6.7, 5.5, 7.8, 8.3],
      quimica: [5, 5, 5, 5],
      linguas: [9.5, 7.4, 6.1, 7.1],
    },
    faltas: {
      matematica: 7,
      portugues: 7,
      historia: 6,
      geografia: 6,
      fisica: 4,
      quimica: 5,
      linguas: 7,
    },
  },
  {
    id: 15,
    nome: "Pedro Santos",
    turma: "C",
    notas: {
      matematica: [7.6, 7.4, 7.3, 6.7],
      portugues: [5.2, 8.1, 7, 6.3],
      historia: [8.8, 8.2, 9.4, 7.2],
      geografia: [6.5, 6.7, 4.2, 4.1],
      fisica: [9.2, 8.9, 8.8, 9.9],
      quimica: [6.4, 6.3, 6.5, 5.5],
      linguas: [4.2, 4.7, 6.9, 4.5],
    },
    faltas: {
      matematica: 2,
      portugues: 3,
      historia: 7,
      geografia: 6,
      fisica: 9,
      quimica: 7,
      linguas: 3,
    },
  },
  {
    id: 16,
    nome: "Lucas Almeida",
    turma: "A",
    notas: {
      matematica: [6.3, 8.2, 5.3, 7.9],
      portugues: [4.3, 4.4, 6.6, 4.2],
      historia: [6.4, 7.5, 7, 7.1],
      geografia: [6, 6.6, 7.5, 8.4],
      fisica: [6.2, 8.9, 9.2, 7.2],
      quimica: [7.1, 9.2, 7.4, 9.7],
      linguas: [4.5, 5, 4.2, 4.9],
    },
    faltas: {
      matematica: 4,
      portugues: 6,
      historia: 2,
      geografia: 6,
      fisica: 9,
      quimica: 5,
      linguas: 4,
    },
  },
  {
    id: 17,
    nome: "João Pereira",
    turma: "B",
    notas: {
      matematica: [6.3, 7.5, 5.6, 8.6],
      portugues: [2.8, 2.6, 2.7, 3.3],
      historia: [6.3, 4.5, 5.5, 4.6],
      geografia: [5.4, 5.7, 4.2, 6.2],
      fisica: [6, 6.7, 4.9, 6.6],
      quimica: [8.2, 6.3, 9.6, 8],
      linguas: [8.4, 7, 7.8, 6.6],
    },
    faltas: {
      matematica: 5,
      portugues: 10,
      historia: 3,
      geografia: 9,
      fisica: 0,
      quimica: 6,
      linguas: 9,
    },
  },
  {
    id: 18,
    nome: "Ana Almeida",
    turma: "C",
    notas: {
      matematica: [6.5, 7.6, 8.5, 6.1],
      portugues: [5.6, 9, 8.5, 5.1],
      historia: [6.5, 8.7, 6.8, 7.2],
      geografia: [4.1, 4.3, 3.6, 3.4],
      fisica: [6.9, 6.4, 6.1, 8.7],
      quimica: [4.8, 3.9, 4.6, 2.3],
      linguas: [5.2, 5.9, 4.4, 5],
    },
    faltas: {
      matematica: 1,
      portugues: 6,
      historia: 10,
      geografia: 9,
      fisica: 8,
      quimica: 3,
      linguas: 10,
    },
  },
  {
    id: 19,
    nome: "Fernanda Rocha",
    turma: "A",
    notas: {
      matematica: [7.4, 6.4, 6.6, 6.6],
      portugues: [8.4, 6.9, 6.3, 8.8],
      historia: [6.8, 6, 7.8, 8.1],
      geografia: [6.9, 6.6, 6, 4.3],
      fisica: [9.1, 8.5, 8.4, 9],
      quimica: [6.8, 5.6, 5.7, 6.6],
      linguas: [4.6, 5, 3.8, 3.9],
    },
    faltas: {
      matematica: 2,
      portugues: 2,
      historia: 9,
      geografia: 0,
      fisica: 10,
      quimica: 9,
      linguas: 3,
    },
  },
  {
    id: 20,
    nome: "Julia Ferreira",
    turma: "B",
    notas: {
      matematica: [4.1, 6.1, 5.1, 4.2],
      portugues: [5.1, 5.1, 6.3, 5.5],
      historia: [2.1, 4.4, 2.7, 2.6],
      geografia: [9.7, 8.2, 7.2, 8],
      fisica: [7, 8.3, 7.3, 7.2],
      quimica: [5.6, 6.7, 6.9, 4.3],
      linguas: [5.7, 5.6, 6.6, 5.2],
    },
    faltas: {
      matematica: 3,
      portugues: 5,
      historia: 5,
      geografia: 2,
      fisica: 2,
      quimica: 9,
      linguas: 10,
    },
  },
  {
    id: 21,
    nome: "Maria Rocha",
    turma: "C",
    notas: {
      matematica: [5.6, 5.9, 6.6, 5.8],
      portugues: [7.1, 8.6, 8.3, 6],
      historia: [3.4, 2.2, 3, 3.9],
      geografia: [8.2, 6.6, 8.9, 8.4],
      fisica: [8.2, 9, 7.2, 7.6],
      quimica: [9.8, 7.4, 8, 7.9],
      linguas: [5.3, 5.5, 5.4, 4.7],
    },
    faltas: {
      matematica: 10,
      portugues: 6,
      historia: 9,
      geografia: 0,
      fisica: 4,
      quimica: 8,
      linguas: 4,
    },
  },
  {
    id: 22,
    nome: "Carlos Rocha",
    turma: "A",
    notas: {
      matematica: [7.6, 7.8, 9, 9.4],
      portugues: [8.7, 8.1, 8.2, 9.6],
      historia: [4.5, 5.6, 6.7, 6.1],
      geografia: [6.6, 6.7, 5.3, 5.1],
      fisica: [9.9, 9.6, 9.5, 9.7],
      quimica: [5.9, 6.6, 6.9, 6.7],
      linguas: [5.3, 5.6, 4, 5.7],
    },
    faltas: {
      matematica: 10,
      portugues: 8,
      historia: 3,
      geografia: 10,
      fisica: 7,
      quimica: 3,
      linguas: 4,
    },
  },
  {
    id: 23,
    nome: "Gustavo Santos",
    turma: "B",
    notas: {
      matematica: [9.5, 6.3, 7.7, 9.6],
      portugues: [6.2, 6.6, 5.1, 5.9],
      historia: [8.6, 5.5, 8.7, 7.3],
      geografia: [6.7, 4.5, 4.5, 5.8],
      fisica: [4.1, 4.5, 3.2, 4.3],
      quimica: [8.9, 7.1, 8.5, 8.3],
      linguas: [7.5, 8.5, 8.4, 9.6],
    },
    faltas: {
      matematica: 8,
      portugues: 4,
      historia: 2,
      geografia: 3,
      fisica: 7,
      quimica: 1,
      linguas: 7,
    },
  },
  {
    id: 24,
    nome: "Pedro Ferreira",
    turma: "C",
    notas: {
      matematica: [7.1, 6.4, 7.3, 6.4],
      portugues: [9.3, 7.1, 7.3, 9.6],
      historia: [6.9, 7.6, 8.8, 6.2],
      geografia: [4.2, 2.8, 4.6, 3],
      fisica: [8.4, 7.3, 6.9, 6.2],
      quimica: [6.7, 7.7, 8.1, 7.1],
      linguas: [6.8, 4.4, 4.9, 5.3],
    },
    faltas: {
      matematica: 8,
      portugues: 1,
      historia: 0,
      geografia: 0,
      fisica: 5,
      quimica: 0,
      linguas: 4,
    },
  },
  {
    id: 25,
    nome: "Julia Almeida",
    turma: "A",
    notas: {
      matematica: [5.6, 4.9, 5.8, 4],
      portugues: [5, 4.3, 5.8, 5.2],
      historia: [8.4, 7.9, 6.8, 8],
      geografia: [4.2, 6.6, 5.6, 4.3],
      fisica: [9.4, 6.4, 7.6, 7.9],
      quimica: [4.2, 5.9, 6.6, 6.9],
      linguas: [6.3, 6.2, 6.5, 6.8],
    },
    faltas: {
      matematica: 6,
      portugues: 3,
      historia: 2,
      geografia: 9,
      fisica: 2,
      quimica: 4,
      linguas: 2,
    },
  },
  {
    id: 26,
    nome: "João Ferreira",
    turma: "B",
    notas: {
      matematica: [9, 10, 8, 7.3],
      portugues: [8.4, 9.8, 6.8, 6.4],
      historia: [5.2, 6.1, 5.2, 5.1],
      geografia: [7.3, 9.7, 7.8, 7.9],
      matematica: [9, 10, 8, 7.3],
      quimica: [6, 8.3, 7.8, 7],
      linguas: [6.2, 5, 4, 5.1],
    },
    faltas: {
      matematica: 5,
      portugues: 0,
      historia: 4,
      geografia: 4,
      fisica: 1,
      quimica: 4,
      linguas: 0,
    },
  },
  {
    id: 27,
    nome: "Lucas Oliveira",
    turma: "C",
    notas: {
      matematica: [9.8, 9.3, 7.5, 9.5],
      portugues: [6.6, 5, 8, 6.3],
      historia: [7.6, 7.6, 7.5, 9],
      geografia: [7, 7.1, 6.4, 8.1],
      fisica: [7.3, 9.6, 6.9, 6.3],
      quimica: [6.9, 6.6, 6.2, 5.3],
      linguas: [9.5, 8, 7.2, 8.2],
    },
    faltas: {
      matematica: 9,
      portugues: 8,
      historia: 5,
      geografia: 9,
      fisica: 6,
      quimica: 2,
      linguas: 0,
    },
  },
  {
    id: 28,
    nome: "João Souza",
    turma: "A",
    notas: {
      matematica: [8.1, 6.4, 7.8, 6.9],
      portugues: [7.3, 8.3, 8.2, 9.7],
      historia: [5.4, 6, 6.5, 6.6],
      geografia: [7.8, 8.6, 8.5, 8],
      fisica: [4, 5.3, 4.5, 6],
      quimica: [4.6, 5.4, 4.6, 5.8],
      linguas: [6.4, 7.7, 6.5, 8],
    },
    faltas: {
      matematica: 6,
      portugues: 9,
      historia: 4,
      geografia: 8,
      fisica: 7,
      quimica: 5,
      linguas: 6,
    },
  },
  {
    id: 29,
    nome: "Fernanda Costa",
    turma: "B",
    notas: {
      matematica: [5.3, 7.7, 8.5, 8.7],
      portugues: [7.2, 8.2, 6.3, 8.6],
      historia: [5, 5.5, 5, 4.8],
      geografia: [5, 5, 6, 6],
      fisica: [6, 6.3, 5.2, 6.8],
      quimica: [4.9, 5.6, 5, 5.8],
      linguas: [7.2, 8.2, 6.3, 8.6],
    },
    faltas: {
      matematica: 3,
      portugues: 2,
      historia: 4,
      geografia: 5,
      fisica: 0,
      quimica: 0,
      linguas: 3,
    },
  },
  {
    id: 30,
    nome: "Fernanda Oliveira",
    turma: "C",
    notas: {
      matematica: [6.6, 5.2, 5, 4.6],
      portugues: [6, 6.3, 4.9, 4.7],
      historia: [3.5, 3.6, 2.1, 4.1],
      geografia: [7.2, 6.2, 7.1, 8.9],
      fisica: [4.8, 3.5, 2.1, 3.7],
      quimica: [5.6, 8.4, 7.5, 9],
      linguas: [3.9, 3.3, 2.6, 3.3],
    },
    faltas: {
      matematica: 5,
      portugues: 3,
      historia: 1,
      geografia: 3,
      fisica: 9,
      quimica: 7,
      linguas: 9,
    },
  },
];

/*
  Utilizando os dados acima, faça um script que:

  1. Calcule a média de cada matéria do aluno e mostre os alunos 
  que passaram de ano (média maior ou igual a 7), separados por turma.

  2. Mostre os alunos que reprovaram em alguma materia por 
  faltas (limite de 50% de faltas), separados por turma.

  3. Mostre os alunos que reprovaram em alguma materia por média 
  (limite de média 5), separados por turma.

  4. Mostre os alunos que poderão fazer uma prova de recuperação 
  (limite de média 7), separados por turma.

  5. Desconsidere os alunos que já reprovaram, agrupe os alunos em novas turmas sendo que:
    - Turma A: alunos que possuem menores notas em português e linguas,
    - Turma B: alunos que possuem menores notas em matemática, física e química,
    - Turma C: alunos que possuem menores notas em historia e geografia,
  Considere que um aluno não pode estar em mais de uma turma. 
  Caso o aluno tenha nota baixa em duas matérias, considere a menor nota.


  [x] iterar por todos os alunos
  [x] encontrar a propriedade de notas
  [x] encontrar as faltas
  [x] iterar por cada materia
  [x] calcular as medias por materia
*/

// for (let i = 0; i < listaAlunos.length; i++) {
//   console.log(listaAlunos[i]);
// }

// for (let j in listaAlunos) {
//   console.log("in", listaAlunos[j]);
//   console.log("nome", listaAlunos[j].nome);
// }

// const [aluno] = listaAlunos;

/*
// exercicio 1
for (let i = 0; i < listaAlunos.length; i++) {
  const alunos = listaAlunos[i];
  const nome = alunos.nome;

  if (alunos.turma === "A") {
    // for (let j=0; j<listaAlunos.length; j++){
    const notas = alunos.notas;

    for (let materias in notas) {
      const arrNota = notas[materias];
      const [b1, b2, b3, b4] = arrNota;
      const media = parseInt((b1 + b2 + b3 + b4) / 4);

      if (media >= 7) {
        console.log(
          `A media do aluno ${nome} da turma A na materia ${materias} é de ${media}, entao ele está aprovado`
        );
      }
    }
    // }
  } else if (alunos.turma === "B") {
    // console.log(nome);

    // for (let j=0; j<listaAlunos.length; j++){
    const notas = alunos.notas;

    for (let materias in notas) {
      const arrNota = notas[materias];
      const [b1, b2, b3, b4] = arrNota;
      const media = parseInt((b1 + b2 + b3 + b4) / 4);

      if (media >= 7) {
        console.log(
          `A media do aluno ${nome} da turma B na materia ${materias} é de ${media}, entao ele está aprovado`
        );
      }
    }
    // }
  } else {
    // console.log(nome);

    // for (let j=0; j<listaAlunos.length; j++){
    const notas = alunos.notas;

    for (let materias in notas) {
      const arrNota = notas[materias];
      const [b1, b2, b3, b4] = arrNota;
      const media = parseInt((b1 + b2 + b3 + b4) / 4);

      if (media >= 7) {
        console.log(
          `A media do aluno ${nome} da turma C na materia ${materias} é de ${media}, entao ele está aprovado`
        );
      }
    }
    // }
  }
}
*/
/*
//NAT - EX 2
for (let aluno of listaAlunos) {
  const { faltas } = aluno;
  // if (aluno.turma === "A") {
  for (let materia in faltas) {
    const totalFaltas = parseInt(faltas[materia]);
    if (totalFaltas > 8) {
      console.log(
        `O(A) ${aluno.nome} da Turma ${aluno.turma} reprovou em ${materia} devido excesso de faltas (${totalFaltas}).`
      );
    }
  }
  // }
  // if (aluno.turma === "B") {
  //   for (let materia in faltas) {
  //     const totalFaltas = parseInt(faltas[materia]);
  //     if (totalFaltas > 8) {
  //       console.log(
  //         `O(A) ${aluno.nome} da Turma B reprovou em ${materia} devido excesso de faltas (${totalFaltas}).`
  //       );
  //     }
  //   }
  // }
  // if (aluno.turma === "C") {
  //   for (let materia in faltas) {
  //     const totalFaltas = parseInt(faltas[materia]);
  //     if (totalFaltas > 8) {
  //       console.log(
  //         `O(A) ${aluno.nome} da Turma C reprovou em ${materia} devido excesso de faltas (${totalFaltas}).`
  //       );
  //     }
  //   }
  // }
}
*/
/*
// exercicio 2 - paula

for (let i = 0; i < listaAlunos.length; i++) {
  const alunos = listaAlunos[i];
  const nomes = alunos.nome;

  if (alunos.turma === "A") {
    // for (let j=0; j<listaAlunos.length; j++){
    const faltas = alunos.faltas;

    for (let ausencias in faltas) {
      const falta = faltas[ausencias];

      if (falta > 8) {
        console.log(
          `O aluno(a) ${nomes} da turma A foi reprovado na materia ${ausencias} por ter ${falta} faltas`
        );
      }
    }
    // }
  }
  //         else if (alunos.turma === "B"){
  //               // for (let j=0; j<listaAlunos.length; j++){
  //                 const faltas = alunos.faltas;

  //                     for (let ausencias in faltas){
  //                     const falta = faltas[ausencias];

  //                         if (falta > 8){
  //                             console.log(`O aluno(a) ${nomes} da turma B foi reprovado na materia ${ausencias} por ter ${falta} faltas`);
  //                         }
  //                     }
  //             // }
  //         }
  //         else {
  //                 // for (let j=0; j<listaAlunos.length; j++){
  //                 const faltas = alunos.faltas;

  //                     for (let ausencias in faltas){
  //                     const falta = faltas[ausencias];

  //                         if (falta > 8){
  //                             console.log(`O aluno(a) ${nomes} da turma C foi reprovado na materia ${ausencias} por ter ${falta} faltas`);
  //                         }
  //                     }
  //             // }
  //         }
}
*/
/*
// exercicio 3 - Paula

for (let i = 0; i < listaAlunos.length; i++) {
  const alunos = listaAlunos[i];
  const nome = alunos.nome;

  if (alunos.turma === "A") {
    // console.log(nome);

    // for (let j=0; j<listaAlunos.length; j++){
    const notas = alunos.notas;

    for (let materias in notas) {
      const arrNota = notas[materias];
      const [b1, b2, b3, b4] = arrNota;
      const media = parseInt((b1 + b2 + b3 + b4) / 4);

      if (media < 5) {
        console.log(
          `A media do aluno ${nome} da turma A na materia ${materias} é de ${media}, entao ele está reprovado`
        );
      }
    }
    // }
  }
  //     else if (alunos.turma === "B"){

  //         // console.log(nome);

  //         // for (let j=0; j<listaAlunos.length; j++){
  //             const notas = alunos.notas;

  //             for ( let materias in notas){
  //                 const arrNota = notas[materias];
  //                 const [b1, b2, b3, b4] = arrNota;
  //                 const media = parseInt((b1 + b2 + b3 + b4)/4);

  //                 if ( media < 5) {
  //                     console.log(`A media do aluno ${nome} da turma B na materia ${materias} é de ${media}, entao ele está reprovado`);
  //                 }

  //             }
  //         // }

  //     }
  //     else {
  //         // console.log(nome);

  //         // for (let j=0; j<listaAlunos.length; j++){
  //             const notas = alunos.notas;

  //             for ( let materias in notas){
  //                 const arrNota = notas[materias];
  //                 const [b1, b2, b3, b4] = arrNota;
  //                 const media = parseInt((b1 + b2 + b3 + b4)/4);

  //                 if ( media < 5) {
  //                     console.log(`A media do aluno ${nome} da turma C na materia ${materias} é de ${media}, entao ele está reprovado`);
  //                 }

  //             }
  //         // }

  //     }
}
*/
/*
// NAT - EX 3
for (let aluno of listaAlunos) {
  const { notas } = aluno;

  for (let materia in notas) {
    const [n1, n2, n3, n4] = notas[materia];
    const media = (n1 + n2 + n3 + n4) / 4;
    const materiaBonita = listaMaterias[materia];
    const mediaBonita = media.toFixed(1);
    if (parseFloat(mediaBonita) < 5) {
      console.log(
        `O(A) ${aluno.nome} da turma ${aluno.turma} reprovou em ${materiaBonita} devido sua nota ${mediaBonita} estar abaixo da média 5.`
      );
    }
  }
}
*/

// exercicio 4 - paula
// for (i=0 ; i < listaAlunos.length ; i++) {
//     const alunos = listaAlunos[i];
//     const nome = alunos.nome

//     if (alunos.turma === "A") {

//         // console.log(nome);

//         // for (let j=0; j<listaAlunos.length; j++){
//             const notas = alunos.notas;

//             for ( let materias in notas){
//                 const arrNota = notas[materias];
//                 const [b1, b2, b3, b4] = arrNota;
//                 const media = (b1 + b2 + b3 + b4)/4;

//                 if ( media >= 5 && media < 7) {
//                     console.log(`A media do aluno ${nome} da turma A na materia ${materias} é de ${media}, entao ele pode fazer recuperacao`);
//                 }

//             }
//         // }

//     }
//     else if (alunos.turma === "B"){

//         // console.log(nome);

//         // for (let j=0; j<listaAlunos.length; j++){
//             const notas = alunos.notas;

//             for ( let materias in notas){
//                 const arrNota = notas[materias];
//                 const [b1, b2, b3, b4] = arrNota;
//                 const media = (b1 + b2 + b3 + b4)/4;

//                 if ( media >= 5 && media < 7) {
//                     console.log(`A media do aluno ${nome} da turma B na materia ${materias} é de ${media}, entao ele pode fazer recuperacaoo`);
//                 }

//             }
//         // }

//     }
//     else {
//         // console.log(nome);

//         // for (let j=0; j<listaAlunos.length; j++){
//             const notas = alunos.notas;

//             for ( let materias in notas){
//                 const arrNota = notas[materias];
// const [b1, b2, b3, b4] = arrNota;
//                 const media = (b1 + b2 + b3 + b4)/4;

//                 if ( media >= 5 && media < 7) {
//                     console.log(`A media do aluno ${nome} da turma C na materia ${materias} é de ${media}, entao ele pode fazer recuperacao`);
//                 }

//             }
//         // }

//     }
// }

// debugger;

// array para separar os aprovados
const aprovados = [];
// loop na lista de todos os alunos
for (const aluno of listaAlunos) {
  // flag para avisar que reprovou
  // começa com false pq nesse momento, ninguem reprovou ainda
  let reprovado = false;
  // pego as faltas
  const { faltas } = aluno;
  // loop em todas as materias dentro das faltas
  for (let materia in faltas) {
    // se o numero de faltas for maior que 7
    if (faltas[materia] > 7) {
      // marca como reprovado
      reprovado = true;
    }
  }

  // se não foi marcado como reprovado por faltas, então testa por medias
  if (!reprovado) {
    // crio uma nova propriedade para guardar as medias
    aluno.medias = {};
    // loop pelas notas em cada materia
    for (let materia in aluno.notas) {
      // pego as notas
      const [n1, n2, n3, n4] = aluno.notas[materia];
      // calculo as medias
      const media = (n1 + n2 + n3 + n4) / 4;
      // verifico se reprovou por media
      if (media < 5) {
        // marca como reprovado
        reprovado = true;
      } else {
        aluno.medias[materia] = media;
      }
    }

    // se não foi marcado como reprovado por media
    if (!reprovado) {
      // então adiciono ao array de aprovados
      aprovados.push(aluno);
    }
  }
}

console.log(aprovados);

// cria novos arrays para agrupar as novas turmas
const turmaA = [];
const turmaB = [];
const turmaC = [];

// faz o loop pelos alunos aprovados
for (const aluno of aprovados) {
  // pego todos os valores das medias
  const medias = Object.values(aluno.medias);
  // const [n1,n2,n3,n4,n5,n6,n7] = medias;
  // const menorMedia = Math.min(n1,n2,n3,n4,n5,n6,n7);
  // pego a menor media
  const menorMedia = Math.min(...medias);

  // faço um loop para procurar a materia da menor media
  for (const materia in aluno.medias) {
    // se encontrei a materia da menor media
    if (aluno.medias[materia] === menorMedia) {
      if (materia === "portugues" || materia === "linguas") {
        turmaA.push(aluno);
      } else if (materia === "historia" || materia === "geografia") {
        turmaC.push(aluno);
      } else {
        turmaB.push(aluno);
      }
    }
  }
}

console.log("Sugestão de turma A", turmaA);
console.log("Sugestão de turma B", turmaB);
console.log("Sugestão de turma C", turmaC);

const alunosReordenados = listaAlunos.sort((a, b) => {
  if (a.nome > b.nome) {
    return 1;
  } else if (b.nome > a.nome) return -1;
  else return 0;
});

console.log(alunosReordenados);
