import nomes from "./lista-nomes.js";

// const h1 = document.getElementById("meu-h1");
// const li = [...document.getElementsByTagName("li")];

// console.log(h1);
// console.log(li);
// console.log(li[1].textContent);

// h1.textContent = "teste inserindo texto";
// li[1].textContent = "alterando valor";

// console.log(
//   ([...document.getElementsByClassName("item")][2].textContent = "outro valor")
// );

// document.querySelector("#meu-h1").textContent = "novo valor";
// document.querySelector("#meu-h1").innerHTML =
//   "<span style='color:red'>novo valor</span>";

// console.log("o numero importando foi:", numero);

const ul = document.querySelector("ul");
console.log(ul);
ul.innerHTML = "";
// let lis = "";
for (const nome of nomes) {
  // lis += `<li>${nome}</li>`;
  // const novoLI = `
  //   <li>
  //     <a>
  //       <span>${nome}</span>
  //     </a>
  //   </li>
  // `;

  const li = document.createElement("li");
  const a = document.createElement("a");
  const span = document.createElement("span");
  span.style.color = "red";
  span.textContent = nome;
  a.appendChild(span);
  a.setAttribute("href", `#${nome}`);
  li.appendChild(a);
  ul.appendChild(li);
}
// ul.innerHTML = lis;
