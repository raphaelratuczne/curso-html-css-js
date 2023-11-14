/*
npm i -g live-server sass typescript
*/

let meuTexto: string = "meu texto";
let meuOutroTexto = "outro texto";

let meuNumero: number = 0;

let meuBool: boolean = true;

let varVariavel: any = "qualquer coisa";

const meuArray: string[] = ["Paula", "Nati"];
const meuSecArray: number[] = [1, 2, 3, 4];
const meuTerArray: Array<string> = [];

interface IPessoa {
  nome: string;
  altura: number;
  peso?: number;
}

const meuObj: IPessoa = {
  nome: "Raphael",
  altura: 1.71,
};

let altura: number | null = 10;

let myTuple: [string, number, boolean, any] = ["texto", 2, true, 123];

enum Tamanho {
  P = "pequeno",
  M = "medio",
  G = "grande",
}

const camisa = {
  cor: "rosa",
  tamanho: Tamanho.M,
};

const semaforo: {
  cor: "amarelo" | "verde" | "vermelho";
} = {
  cor: "verde",
};

interface meuObj {
  msg: string;
  outraVar?: number;
  finalizado?: boolean;
}

function teste({ outraVar = 100, msg }: meuObj): string {
  const msgCriada = `a msg é ${msg}, ${outraVar}`;
  console.log(msgCriada);
  return msgCriada;
}

function teste2({ msg, finalizado }: meuObj): string {
  if (finalizado) {
    const msgCriada = `a msg é ${msg}, ${finalizado}`;
    console.log(msgCriada);
    return msgCriada;
  }
  return "padrão";
}

const novaMsg: string = teste({
  finalizado: false,
  msg: "texto",
});

/*
Exercicio

criar um novo diretorio para esse exercicio
nomeie pasta exercicio-parametros-url
copiar os arquivos desta aula e colar dentro do novo diretorio
limpar o novo diretorio do código antigo
copiar a lista de alunos do arquivo exercicio-loop.js para um arquivo na nova pasta
criar as interfaces para a lista de alunos
exportar as listas de alunos e materias
importar as listas de alunos e materias no script main.ts
*/

//* API - Application Programming Interface
//? API é um conjunto de rotinas e padrões de programação para acesso a um aplicativo de software ou plataforma baseado na Web.

//?   https://meu-sistema.com/api/posts/1
//?   [https]://    [meu-sistema.com]/    [api/posts]/    [1]
///   [protocolo]   [dominio]             [recurso]       [identificador]

//? https://meu-sistema.com/api/posts?id=1
//? https://meu-sistema.com/api/posts?page=1&order=asc&limit=10
//? https://meu-sistema.com/api/posts/1/comments
//? https://meu-sistema.com/api/posts/1/comments?order=asc

//* URL - Uniform Resource Locator
//? URL é um endereço web
//* HEADER - Cabeçalho
//? Header é um cabeçalho de requisição e resposta
//* BODY - Corpo
//? Body é o corpo da requisição e resposta

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((data) => console.log("todos", data));

// async function call() {
//   const resp = await fetch("https://jsonplaceholder.typicode.com/todos/2");
//   const data = await resp.json();
//   console.log("call data", data);
// }
// call();

// fetch("https://reqres.in/api/users")
//   .then((response) => response.json())
//   .then((data) => console.log("users", data));

// fetch("http://localhost:3500/games")
//   .then((response) => response.json())
//   .then((data) => console.log("games", data));

// fetch("http://localhost:3500/games?_page=2&_limit=3")
//   .then((response) => {
//     console.log(
//       "total",
//       response.headers.get("x-total-count"),
//       "links",
//       response.headers.get("link")
//     );
//     return response.json();
//   })
//   .then((data) => console.log("games", data));

// fetch("http://localhost:3500/games", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "Banjo-Kazooie",
//     year: 1998,
//     played: true,
//   }),
// }).then((response) => {
//   console.log(response);
// });

// const url = window.location.href;
// console.log("url", url);

console.log("href", window.location.href);
console.log("protocol", window.location.protocol);
console.log("host", window.location.host);
console.log("pathname", window.location.pathname);
console.log("search", window.location.search);
console.log("hash", window.location.hash);
console.log("port", window.location.port);

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("nome")) {
  console.log("nome", searchParams.get("nome"));
}
if (searchParams.has("sobrenome")) {
  console.log("sobrenome", searchParams.get("sobrenome"));
}
if (searchParams.has("idade")) {
  console.log(
    "idade",
    searchParams.get("idade"),
    typeof searchParams.get("idade")
  );
}
