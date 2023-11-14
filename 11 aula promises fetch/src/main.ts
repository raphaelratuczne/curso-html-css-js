// callbacks

function deuCerto(numero: number) {
  console.log("deu certo", numero);
}

function deuErro(msg: string) {
  console.log(msg);
}

// Promises (async/await)

// const promise1 = new Promise<string>((resolve, reject) => {
//   if (Math.random() * 100 > 50) {
//     resolve("é maior que 50");
//   } else {
//     reject("é menor que 50");
//   }
// });

// promise1
//   .then((resultado) => {
//     console.log(resultado);
//   })
//   .catch((error) => {
//     console.log("error:", error);
//   });

// function promise2() {
//   return new Promise<void>((resolve, reject) => {
//     try {
//       // faz uma requisição
//       // se a requisição foi respondida
//       resolve();
//     } catch (e) {
//       reject(e);
//     }
//   });
// }

// promise2().then().catch();

// async function promise3() {
//   // promise1.then((msg) => console.log(msg))

//   const msg = await promise1;
//   console.log(msg);

//   return promise2();
//   console.log("as promises foram chamadas e finalizadas");
// }
// promise3();

// fetch

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

//* https://jsonplaceholder.typicode.com/

// async function consulta() {
//   fetch("https://jsonplaceholder.typicode.com/todos/32")
//     .then((response) => {
//       console.log("response", response);
//       if (response.ok) {
//         response.json().then((data) => {
//           console.log("data", data);
//         });
//       } else {
//         throw {
//           status: response.status,
//           message: response.statusText,
//         };
//       }
//     })
//     .catch((e) => {
//       console.log("error", e);
//     });
// }
// consulta();

async function consulta2() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log("data", data);
}
consulta2();

//* REST client

//? https://jsonplaceholder.typicode.com/posts
//? GET POST PUT (PATCH) DELETE

//* instalar o json-server
//? npm install -g json-server
//* instalar a extensão REST Client no vscode

async function getGames() {
  const resp = await fetch("http://localhost:3500/games");
  const games = await resp.json();
  console.log("games", games);
}
getGames();
