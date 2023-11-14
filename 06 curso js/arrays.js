const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nomes = [
  "Maria",
  "João",
  "Ana",
  "Pedro",
  "Beatriz",
  "Carlos",
  "Mariana",
  "Gustavo",
  "Isabela",
  "Rafael",
  "Larissa",
  "Lucas",
  "Camila",
  "Felipe",
  "Fernanda",
  "Matheus",
  "Laura",
  "Thiago",
  "Juliana",
  "Guilherme",
  "Lívia",
  "Enzo",
  "Bruna",
  "Vinícius",
  "Amanda",
  "Leonardo",
  "Carolina",
  "Gabriel",
  "Isadora",
  "Ricardo",
  "Tatiana",
];

// console.log("length: ", numeros.length);

// console.log("concat: ", numeros.concat(nomes));

// const novoArray = new Array(5);
// novoArray.fill(false);
// console.log(novoArray);

// console.log("includes:", numeros.includes(6));

// console.log("indexOf", nomes.indexOf("Rafael"));

// console.log("lastIndexOf", numeros.lastIndexOf(6));

// console.log("join:", numeros.join(", "));

// const ultimo = numeros.pop();
// console.log("pop:", ultimo);
// console.log("numeros depois do pop", numeros);

// console.log("push:", numeros.push(99));
// console.log("numeros depois do push", numeros);

// console.log("unshift:", numeros.unshift(0));
// console.log("numeros depois do unshift", numeros);

// const corte = numeros.slice(3, 8);
// console.log("corte:", corte);
// console.log("numeros depois do slice:", numeros);

// numeros.splice(6, 0, "inserido");
// console.log("splice: ", numeros);

// numeros.splice(6, 1, 5.5);
// console.log("splice: ", numeros);

// console.log("reverse:", numeros.reverse());

// console.log("obj:", typeof obj);
// console.log("numeros:", typeof numeros);

// console.log("Array.isArray obj:", Array.isArray(obj));
// console.log("Array.isArray numeros:", Array.isArray(numeros));

function nomeDaFuncao(parametro) {
  //...
}

// const sobrenome = "Silva";
// for (let i in nomes) {
//   nomes[i] = `${nomes[i]} ${sobrenome}`;
//   console.log(nomes[i]);
// }

// nomes.forEach((nome, i) => {
//   console.log(i, nome);
// });

// const arrayComSobrenomes = nomes.map((nome) => {
//   return `${nome} ${sobrenome}`;
// });

// const novoArrayNumeros = numeros.map((numero) => {
//   return numero * 2;
// });

// const temMais = nomes.every((nome) => {
//   return nome.length > 2;
// });
// console.log("tem mais q 3 letras", temMais);

// const tem = nomes.some((nome) => {
//   return nome === "Raphael";
// });
// console.log("tem algum Raphael?", tem);

// const filtrados = numeros.filter((numero) => {
//   return numero % 2 === 0;
// });
// console.log("pares:", filtrados);

// const nomesFiltrados = nomes.filter((nome) => {
//   return nome[0] === "M";
// });
// console.log("nomes que começam com M", nomesFiltrados);

// const encontrado = nomes.find((nome) => {
//   return nome[0] === "A";
// });
// console.log("encontrado", encontrado);

// const encontrado = nomes.findIndex((nome) => {
//   return nome[0] === "A";
// });
// console.log("encontrado", encontrado);

// const encontrado = nomes.findLast((nome) => {
//   return nome[0] === "A";
// });
// console.log("encontrado", encontrado);

// const encontrado = nomes.findLastIndex((nome) => {
//   return nome[0] === "A";
// });
// console.log("encontrado", encontrado);

// const nomesReordenados = nomes.sort();
// const nomesReordenados = nomes.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   } else {
//     return 0;
//   }
// });
// console.log(nomesReordenados);

// let valorInicial = 0;
// const total = numeros.reduce((acumulador, itemAtual) => {
//   return acumulador + itemAtual;
// }, valorInicial);
// console.log("total", total);

// const nomeDonPedro = nomes.reduce((acumulador, itemAtual) => {
//   return acumulador + " " + itemAtual;
// }, "");
// console.log(nomeDonPedro);

/*
1 - crie uma função que converta todos os nomes para maiusculas
2 - crie uma função que adiciona novos nomes para o array
3 - crie uma função que ordene os nomes
4 - crie uma função que vai procurar por um nome
5 - crie uma função para remover um nome
*/

// exercicio 1 Paula
// nomes.forEach((caixaAlta) => {
//   console.log(caixaAlta.toUpperCase());
// });

//NAT
// function nomesMaiusculos(array) {
//   return array.map((item) => item.toUpperCase());
// }
// console.log(nomesMaiusculos(nomes));

// const nomesMaiusculos = nomes.map((nome) => {
//   return nome.toUpperCase();
// });
// console.log(nomesMaiusculos);

// exer 2 - paula
// const sobrenome = "Silva";
// const nomeCompleto = nomes.map((nome) => {
//   return `${nome} ${sobrenome}`;
// });
// console.log(nomeCompleto);

//NAT
// function nomesCompleta(array, novoNome) {
//   array.push(novoNome);
//   console.log(array);
// }
// nomesCompleta(nomes, "Natalia");
// nomesCompleta(nomes, "Paula");

// exer 3 paula
// const nomesOrganizados = nomes.sort((a, b) => {
//   if (a > b) return 1;
//   else if (b > a) return -1;
//   else return 0;
// });
// console.log(nomesOrganizados);

//NAT
// const nomesOrdenados = nomes.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   } else {
//     return 0;
//   }
// });
// console.log(nomesOrdenados);

// exerc 4 paula
// const procurar = nomes.some((nome) => {
//   return nome === "Ana";
// });
// console.log(`tem alguma Luiz?`, procurar);

//NAT
// function temNome(array, nome) {
//   console.log(array.includes(nome));
// }
// temNome(nomes, "Nat");

// exer 5 paula
// console.log(nomes);
// const removido = nomes.pop();
// console.log(removido);

//NAT
// function semCarlos(array) {
//   array.splice(array.indexOf("Carlos"), 1);
//   return console.log(array);
// }

// semCarlos(nomes);

// function removerNome(nome, array) {
//   return array.filter((n) => n !== nome);
// }
// console.log(removerNome("Mariana", nomes));
