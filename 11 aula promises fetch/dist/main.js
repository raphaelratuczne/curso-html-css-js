"use strict";
// callbacks
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function deuCerto(numero) {
    console.log("deu certo", numero);
}
function deuErro(msg) {
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
function consulta2() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = yield response.json();
        console.log("data", data);
    });
}
consulta2();
//* REST client
//? https://jsonplaceholder.typicode.com/posts
//? GET POST PUT (PATCH) DELETE
//* instalar o json-server
//? npm install -g json-server
//* instalar a extensão REST Client no vscode
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3500/games");
        const games = yield resp.json();
        console.log("games", games);
    });
}
getGames();
