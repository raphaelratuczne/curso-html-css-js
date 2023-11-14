// const n1 = parseInt(prompt("Digite um valor."));
// const n2 = parseInt(prompt("Digite outro valor."));

// const resultado = n1 + n2;

// console.log(resultado);

// console.log("O resultado da soma de " + n1 + " com " + n2 + " é:" + resultado);
// console.log(`O resultado da soma de ${n1} com ${n2} é: ${n1 + n2}`);

// const v1 = parseInt(prompt("Digite um número."));

// const anterior = v1 - 1;
// const posterior = v1 + 1;

// console.log(
//   `O valor anterior de ${v1} é ${anterior} e o valor posterior é ${posterior}`
// );

/* 
Escreva um programa que: 

- pegue um número e mostre seu dobro, seu triplo e sua divisão por 3
- pegue 3 notas de um aluno e calcule sua média
- pegue um valor em metros e converta em centímetros e milímetros
(1m é igual 100cm, e é igual a 1000mm)
- pegue um nº inteiro e mostre sua tabuada
- pegue um valor em real e converta para dolar (1 dolar vale R$5.4)
- pegue a altura e largura de uma parede e calcule qt latas de tinta precisa para pinta-lá (1 lata pinta 2m²)
- leia o preço de um produto e mostre o novo valor com 5% de desconto 
- calcule um aumento de 15% em um salário
- converta a temperatura de C° para F° ((9*c)/5)+32
- pegue a qtdade de dias de um carro alugado e some com a qtdade de km rodados e calcule o valor a ser pago
- (90 reais por dia + 0.36 por km)


para a proxima aula assistir os videos 7 e 8.
*/

//NAT - pegue a altura e largura de uma parede e calcule qt latas de tinta precisa para pinta-lá (1 lata pinta 2m²)

// const v1 = parseFloat(prompt("Qual a largura da sua parede?"));
// const v2 = parseFloat(prompt("Qual a altura da sua parede?"));
// const v3 = Math.ceil((v1 * v2) / 2); //como posso colocar para ele arrendondar para cima?

// const v4 = Math.round(2.2);
// console.log("v4", v4);
// const v5 = Math.round(2.5);
// console.log("v5", v5);
// const v6 = Math.round(2.8);
// console.log("v6", v6);
// const v7 = Math.ceil(2.1);
// console.log("v7", v7);
// const v8 = Math.floor(2.9);
// console.log("v8", v8);

// alert(`Você precisará de ${v3} latas de tinta.
// A memória de cálculo é: área da parede (${
//   v1 * v2
// }m²) dividido pela metragem que uma lata pinta (2m²).`);

//NAT- calcule um aumento de 15% em um salário

// const v1 = parseInt(prompt("Qual o seu salário hoje?"));

// alert(`Com aumento de 15% seu salário será R$${v1 * 1.15}.`);

// const n1 = 5;

// console.log(Number.isInteger(n1));
// Math.random()
// Math.round(Math.random() * 10)
// console.log(Math.round(Math.random() * 10) + 10);

// const n1 = 50;
// const s1 = n1.toString();

// const n = 1.112321312;
// const n2 = parseFloat(n.toFixed(3));
// console.log(typeof n2, n2);

// const n = 5;
// const txt = "O javascript é muito legal";
// const txt2 = "mas...";
// const txt3 = "muito";

// pega o tamanho de um texto
// console.log(txt.length);

// encontra 1 caractere
// console.log(txt.charAt(n));
// console.log(txt.charCodeAt(n));

// concatena textos
// console.log("jeito 1", txt + txt2 + txt3);
// console.log("jeito 1", txt.concat(txt2, txt3));

// verifica se possui um texto
// console.log(txt.includes(txt3));

// verifica a posição de uma letra ou palavra
// console.log(txt.indexOf("as"));
// console.log(txt.lastIndexOf("as"));

// preenche um texto com determinado caractere
// console.log(txt.padEnd(40, "_"));
// console.log(txt.padStart(40, "."));

// procura e troca uma ocorrencia de letra/palavra
// console.log(txt.replace("javascript", "html"));
// console.log(txt.replaceAll("a", "4"));

// corta o tamanho de um texto
// console.log(txt.slice(0, 10));
// console.log(txt.slice(10));
// console.log(txt.slice(0, -10));
// console.log(txt.slice(-10));

// converte o texto para maiúsculas ou minúsculas
// console.log(txt.toUpperCase());
// console.log(txt.toLowerCase());

// console.log(txt.trim());
// console.log(txt.trimEnd());
// console.log(txt.trimStart());

// const parede = {
//   espessura: 0.3,
//   cor: "branca",
//   altura: 2,
// };
// console.log(parede);

// const outraParede = {
//   altura: 10,
//   largura: 5,
// };
// console.log(outraParede);

// const novaParede = {};
// Object.assign(novaParede, parede, outraParede);
// console.log(novaParede);

// console.log(parede.cor);
// let propriedade = "espessura";
// console.log(parede[propriedade]);
// propriedade = "altura";
// console.log(parede[propriedade]);

// parede.cor = "Rosa";
// console.log(parede.cor);

// parede[propriedade] = 10;

// console.log(parede[propriedade]);

// console.log(parede);

// const propiedades = Object.keys(novaParede);

// console.log(propiedades);

// const valores = Object.values(novaParede);

// console.log(valores);

// const obj = {
//   nome: "Raphael",
//   idade: 40,
//   acordado: true,
//   paisesQueVisitou: ["Argentina"],
// };

// console.log(obj.nome);

// console.log(arr);

// console.log(arr[0]);

// const arr = ["Raphael", 40, true, false, { teste: 123 }, [1, 2, 3, 4, 5]];
// const arr2 = ["Raphael", "Paula", "Natalia"];
// const diasDaSemana = ["domingo", "segunda", "terça", "quarta"];
// const listaDeAlunos = [
//   {
//     nome: "Raphael",
//     turma: "A",
//   },
//   {
//     nome: "Paula",
//     turma: "B",
//   },
//   {
//     nome: "Natalia",
//     turma: "B",
//   },
// ];

// const obj = {
//   nome: "Raphael",
//   cidade: "Guarulhos",
// };
// const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 6, 5];
// const nomes = ["Raphael", "Paula", "Natalia"];

// console.log("length: ", numeros.length);

// console.log("concat: ", numeros.concat(nomes));

// const novoArray = new Array(5);
// novoArray.fill(false);
// console.log(novoArray);

// console.log("includes:", numeros.includes(6));

// console.log("indexOf", numeros.indexOf(6));

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

// incremento e decremento
// let variavel = 100;

// if (variavel === 100) variavel++;

// variavel -= 5;

// console.log(variavel);

// const minhaVar = "valor";

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const [banana, maca, pera] = arr;

// console.log(banana, maca, pera);

// console.log("arr", arr);

// const obj = {
//   nome: "meu nome",
//   sobrenome: "ultimo nome",
//   outros: "mais alguma coisa",
//   maisCoisa: "mais outra coisa",
//   sub1: {
//     sub2: 123,
//   },
// };

// const nome = "usuário";

// const { nome: apelido, sobrenome, ...resto } = obj;

// console.log(apelido, sobrenome);

// const [a, b, ...tudoQueSobrou] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log(a, b);
// console.log(tudoQueSobrou);

// console.log(resto);

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const arr3 = [...arr1, 7, ...arr2, 8, 9];
// console.log("arr3", arr3);

// const obj2 = {
//   nome: "Raphael",
//   maisUmaProp: 123456,
//   eMaisUmaProp: true,
// };

// const obj3 = {
//   ...obj2,
//   ...obj,
//   nome: "Renan",
// };

// console.log(obj3);

// const clone = [...arr];

// console.log("clone", clone);

// const objClone = { ...obj };
// const objClone2 = { ...obj, sub1: { ...obj.sub1 } };

// console.log("objClone", objClone.sub1.sub2);

// objClone2.sub1.sub2 = false;
// console.log("objClone2", objClone2.sub1.sub2);
// console.log("objClone", objClone.sub1.sub2);

// const stringizado = JSON.stringify(obj);
// const novoObj = JSON.parse(stringizado);
// const novoObj2 = JSON.parse(stringizado);

// novoObj.sub1.sub2 = "aaaaaaa";

// console.log("obj parse:", novoObj);
// console.log("obj parse2:", novoObj2);

// const arrStr = JSON.parse(JSON.stringify(arr));

// console.log(arrStr);

// const valor = 100;

// if (valor === 100) {
//   console.log("vale cem");
// } else if (valor > 10) {
//   console.log("maior dez");
// } else if (valor < 500) {
//   console.log("menor 500");
// } else {
//   console.log("nao vale cem nem dez");
// }

// const resultado = valor === 100 ? "é cem" : "não é cem";

// if () {
//   resultado = ;
// } else {
//   resultado = ;
// }
// console.log(resultado);

// exercicios:

/*

1. Faça um script que verifique se uma letra digitada num campo 
de input é vogal ou consoante.

2. Faça um script que pede duas notas de um aluno. Em seguida 
ele deve calcular a média do aluno e dar o seguinte resultado:

    A mensagem "Aprovado", se a média alcançada for maior ou igual a sete;
    A mensagem "Reprovado", se a média for menor do que sete;
    A mensagem "Aprovado com Distinção", se a média for igual a dez.

3. Faça um script que leia três números inteiros e mostre o maior deles.  

4. Faça um script que pede dois inteiros e armazene eles em duas 
variáveis. Em seguida, troque o valor das variáveis, invertendo e 
exibindo o antes e o depois em uma janela de alert.

5.  Faça um script que leia um número e exiba o dia correspondente 
da semana. (1-Domingo, 2- Segunda, etc.), se digitar outro valor 
deve aparecer valor inválido.
*/
//NAT
/* const input = prompt('Digite uma letra');

const vogais = ['a', 'e', 'i', 'o', 'u'];

if (vogais.includes(input)) {
    alert('É uma vogal!');
}
else {
    alert('É uma consoante!');
} */

// PAULA
/* const text = prompt("Digite uma letra aqui");

if (text === "a" || text === "e" || text === "i" || text === "o" || text === "u" ){
    console.log("é uma vogal");
}else{
    console.log("é uma consoante");
} */

// NAT - exerc 2
// const nota1 = parseInt(prompt('Digite a primeira nota'));
// const nota2 = parseInt(prompt('Digite a segunda nota'));

// if (((nota1+nota2)/2) < 7){
//     alert('Está Reprovado!');
// }
// else if (((nota1+nota2)/2) == 10){
//     alert('Está Aprovado com Distinção!');
// }
// else if (((nota1+nota2)/2) >= 7 && ((nota1+nota2)/2) < 10){
//     alert('Está Aprovado!');
// }
// else {
//     alert('Digite as notas novamente.');
// };

// paula exerc 2

// const nota1 = parseFloat(prompt("Digite a primeira nota"));
// const nota2 = parseFloat(prompt("Digite a segunda nota"));

// const media = (nota1 + nota2) / 2;

// if (media === 10) {
//     console.log("Aprovado com Distincao");
// } else if (media >= 7) {
//     console.log("Aprovado");
// } else{
//     console.log("Reprovado");
// }

// NAT - EXERCÍCIO 3
// const num1 = parseInt(prompt('Digite o primeiro número'));
// const num2 = parseInt(prompt('Digite o segundo número'));
// const num3 = parseInt(prompt('Digite o terceiro número'));

// alert (`O maior número é: ${Math.max(num1, num2, num3)}`);

// paula - exerc 3

// const num1 = parseFloat(prompt("Digite o primeiro numero"));
// const num2 = parseFloat(prompt("Digite o segundo numero"));
// const num3 = parseFloat(prompt("Digite o terceiro numero"));

// if (num1 > num2 && num1> num3) {
//     console.log(`O maior numero é o primeiro`);
// } else if ( num2 > num1 && num2 > num3) {
//     console.log(`O maior numero é o segundo`);
// } else {
//     console.log(`O maior numero é o terceiro`);
// }

//NAT - exerc 4
// let num1 = (prompt('Digite o primeiro número inteiro'));
// let num2 = (prompt('Digite o segundo número inteiro'));

// alert (`Antes era ${num1} agora é ${num1.replace (num1,num2)}`);
// alert (`Antes era ${num2} agora é ${num2.replace (num2,num1)}`);

// paula exerc 4

// const var1 = parseFloat(prompt("Digite o primeiro numero"));
// const var2 = parseFloat(prompt("Digite o segundo numero"));

// const novaVar1 = var2;
// const novaVar2 = var1;

// console.log(novaVar1);
// console.log(novaVar2);

//NAT
//PRECISO DESSE MONTE DE IF??
// const diaSem = parseInt(prompt('Digite um número de 1 a 7'));

// if (diaSem == 1){
//     alert ('Domingo');
// }
// else if (diaSem == 2){
//     alert ('Segunda');
// }

// else if (diaSem == 3){
//     alert ('Terça');
// }

// else if (diaSem == 4){
//     alert ('Quarta');
// }
// else if (diaSem == 5){
//     alert ('Quinta');
// }
// else if (diaSem == 6){
//     alert ('Sexta');
// }

// else if (diaSem == 7){
//     alert ('Sábado');
// }
// else {
//     alert ('Digite novamente')
// }

// const diaSem = parseInt(prompt("Digite um número de 1 a 7"));

// const arrayDias = [
//   "Domingo",
//   "Segunda",
//   "Terça",
//   "Quarta",
//   "Quinta",
//   "Sexta",
//   "Sábado",
// ];

// if (diaSem > 7 || diaSem < 1) {
//   console.log("numero invalido");
// } else {
//   console.log(arrayDias[diaSem - 1]);
// }

// const arrayConvidados = [
//   { nome: "Raphael", presencas: 2 },
//   { nome: "Paulo", presencas: 2 },
//   { nome: "Marcelo", presencas: 3 },
//   { nome: "Natalia", presencas: 2 },
//   { nome: "Claudia", presencas: 5 },
// ];

// let soma = 0;
// let i = 0;

// while (arrayConvidados[i]) {
//   soma += arrayConvidados[i].presencas;
//   if (arrayConvidados[i].presencas > 2) {
//     console.log(
//       `o(a) ${arrayConvidados[i].nome} vai levar ${arrayConvidados[i].presencas}`
//     );
//   }
//   i++;
// }

// console.log(`o total de convidados é ${soma}`);
// function getRandomNumber(min, max) {
//   return parseFloat((Math.random() * (max - min) + min).toFixed(1));
// }

// let i = 0;

// while (i < 10) {
//   if (i === 5) {
//     // break;
//     i = 10;
//   }
//   console.log("while", i);
//   i++;
// }

// const max = 100;

// for (let j = 0; j < max; j++) {
//   console.log("for", j);
// }

// const notas = ["texto", 20, true, [], {}];

// for (let k = 0; k < arr.length; k++) {
//   console.log("arr", arr[k]);
// }

// for in
// for (let key in notas) {
//   console.log("for in", key, notas[key]);
// }

// for of
// for (let nota of notas) {
//   console.log("for of", nota);
// }

// const qtdadeDeNotas = 4;

// function calculaMedia(arrayDeNotas) {
//   const [n1, n2, n3, n4] = arrayDeNotas;

//   const media = (n1 + n2 + n3 + n4) / qtdadeDeNotas;

//   return media;
// }

// const arrayNotas = [5, 6, 7, 8];
// const arrayNotas2 = [6, 8, 7, 8];

// const mediaDoRaphael = calculaMedia(arrayNotas2);

// console.log(`a media do(a) Raphael é ${mediaDoRaphael}`);

// const minhaOutraFuncao = function () {
//   return "minha mensagem";
// };

// console.log(minhaOutraFuncao());

// const outraFuncao = (arrayDeNotas, qtdadeDeNotas) => {
//   const [n1, n2, n3, n4] = arrayDeNotas;

//   const media = (n1 + n2 + n3 + n4) / qtdadeDeNotas;

//   return media;
// };

// const outraFuncao2 = (val) => (val ? parseInt(val) + 2 : 0);

// const mesmaFuncao = (val) => {
//   if (val) {
//     return parseInt(val) + 2;
//   } else {
//     return 0;
//   }
// };

// const arr = [
//   function (val) {
//     console.log(val);
//   },
// ];

// arr[0]("valor passado");

// const obj = {
//   nNotas: 4,
//   calculaMedia: function (arrNotas) {
//     const [n1, n2, n3, n4] = arrNotas;

//     const media = (n1 + n2 + n3 + n4) / this.nNotas;

//     return media;
//   },
// };

// console.log(obj.calculaMedia([10, 8, 9, 10]));

// let cont = 0;
// while (cont < 10) {
//   console.log(cont);
//   cont++;
// }

// for (let i = 0; i < 10; i++) {
//   console.log(i);
// }

// let contador = 0;
// do {
//   console.log(contador);
//   contador++;
// } while (contador < 10);

const statusList = {
  ag: "aguardando pagamento",
  pg: "pagamento aprovado",
  ep: "em preparação",
  pd: "produto despachado",
  ac: "a caminho",
  se: "saiu para entrega ao destinatário",
  en: "entregue",
};

const statusAtual = 1;

// if (statusAtual === "ag") {
//   console.log(statusList["ag"]);
// } else if (statusAtual === "pg") {
//   console.log(statusList["pg"]);
// } else if (statusAtual === "ep") {
//   console.log(statusList["ep"]);
// } else if (statusAtual === "pd") {
//   console.log(statusList["pd"]);
// } else {
//   console.log("não encontrado");
// }

switch (statusAtual) {
  case 0:
    console.log(statusList["ag"]);
    break;
  case 1:
    console.log(statusList["pg"]);
    break;
  case 2:
    console.log(statusList["ep"]);
    break;
  case 3:
    console.log(statusList["pd"]);
    break;
  case 4:
    console.log(statusList["ac"]);
    break;
  case 5:
    console.log(statusList["se"]);
    break;
  case 6:
    console.log(statusList["en"]);
    break;
  default:
    console.log("não encontrado");
    break;
}
