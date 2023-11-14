// const Raphael = {
//   nome,
//   altura,

//   digaOla: function () {
//     console.log(`Olá, meu nome é ${this.nome}.`);
//   },
// };

// Raphael.nome = "Raphael";
// console.log(Raphael.nome);
// Raphael.digaOla();

// const pessoa2 = Raphael;

// console.log(pessoa2.nome);

// pessoa2.nome = "Paula";
// pessoa2.digaOla();

// Raphael.digaOla();

class Pessoa {
  constructor({ nome, altura, idade, peso }) {
    this._nome = nome;
    this._altura = altura;
    this._idade = idade;
    this._peso = peso;
  }

  digaOla() {
    console.log(`Olá, meu nome é ${this._nome}.`);
  }
  get nome() {
    return this._nome;
  }
  set nome(novoNome) {
    this._nome = novoNome;
  }
}

const objInicial = { nome: "Raphael", altura: "1.7", idade: "40", peso: "25" };

const pessoa = new Pessoa(objInicial);
pessoa.nome = "Paula";
pessoa.digaOla();
console.log(pessoa.nome);

const objInicial2 = { nome: "Natalia", altura: "1.7", idade: "40", peso: "25" };
const outraPessoa = new Pessoa(objInicial2);
outraPessoa.digaOla();

class Aluno extends Pessoa {
  constructor(objPadrao) {
    super(objPadrao);
    // const { turma } = objPadrao;

    this._turma = objPadrao.turma;

    // this._turma = turma;
  }
}

const objAluno = {
  nome: "Natalia",
  altura: "1.7",
  idade: "40",
  peso: "25",
  turma: "A",
};

const aluno = new Aluno(objAluno);
aluno.digaOla();
console.log(aluno._turma);

const objProf = {
  nome: "Paula",
  altura: "1.7",
  idade: "40",
  peso: "25",
  turmas: ["A", "C"],
};

class Professor extends Pessoa {
  constructor(valInicial) {
    super(valInicial);
    this._turmas = valInicial.turmas;
  }
  darPrimeiraAula() {
    console.log(`Minha primeira aula é na turma: ${this._turmas[0]}`);
  }
}

const professor = new Professor(objProf);
professor.digaOla();
professor.darPrimeiraAula();

function Empregado(nome) {
  this.nome = nome;

  this.digaOla = function () {
    console.log(`Olá, meu nome é ${this.nome}`);
  };
}

const empregado = new Empregado("Raphael");
console.log(empregado.nome);
empregado.digaOla();

function teste(event) {
  console.log("event", event);
  event.target.style.backgroundColor = "red";
}
