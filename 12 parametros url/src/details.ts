console.log("href", window.location.href);
console.log("protocol", window.location.protocol);
console.log("host", window.location.host);
console.log("port", window.location.port);
console.log("pathname", window.location.pathname);
console.log("hash", window.location.hash);
console.log("search", window.location.search);

//! console.log("href", window.location.href.split("?")[1].split("&"));

const values = window.location.search;
const searchParams = new URLSearchParams(values);

if (searchParams.has("id")) {
  console.log("id", searchParams.get("id"));
  const id = parseInt(searchParams.get("id")!);
  getStudent(id);
}

async function getStudent(id: number) {
  const resp = await fetch(`http://localhost:3500/lista-alunos/${id}`);
  console.log("resp", resp);

  const data = await resp.json();
  console.log("data", data);
}
// if (searchParams.has("name")) {
//   console.log("name", searchParams.get("name"));
// }
// if (searchParams.has("class")) {
//   console.log("class", searchParams.get("class"));
// }

//* crie a pagina de detalhes do aluno conforme o exemplo
//* a pagina de detalhes do aluno deve carregar o id do aluno da url,
//* consultar os detalhes desse aluno e exibir na tela
//* crie um tratamento de erros para caso alguem coloque manualmente
//* na url um id que não existe
//? dica: use try catch ou verifique no "resp" se o status é 200 ou outro numero

//? https://http.cat/
//? estude os codigos de erro
