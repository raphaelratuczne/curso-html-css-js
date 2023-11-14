const inputTask = document.querySelector("#input-task");
const btnAddTask = document.querySelector("#btn-add-task");
const listTask = document.querySelector("#list-task");
const templateItemTask = document.querySelector("#template-item-task");

let tasks = [
  {
    id: 1,
    text: "Comprar pão",
    checked: false,
  },
];
// let tasks = [];

function saveTasks(_tasks) {
  if (_tasks) {
    const transformadoEmTexto = JSON.stringify(_tasks);
    localStorage.setItem("tasks", transformadoEmTexto);
  }
}

function loadTasks() {
  const valorCarregado = localStorage.getItem("tasks");
  const _tasks = JSON.parse(valorCarregado);
  return _tasks;
}

function check() {
  const input = this.querySelector("input");
  const id = this.getAttribute("id");
  // console.log("id", id, tasks);
  if (input.checked) {
    this.classList.remove("list-group-item-light");
    this.classList.add("list-group-item-success");
    tasks.forEach(function (tarefa) {
      if (tarefa.id == id) {
        tarefa.checked = true;
      }
    });
  } else {
    this.classList.remove("list-group-item-success");
    this.classList.add("list-group-item-light");
    tasks.forEach(function (tarefa) {
      if (tarefa.id == id) {
        tarefa.checked = false;
      }
    });
  }
  saveTasks(tasks);
}

function remove() {
  const li = this.parentNode;
  const id = li.getAttribute("id");
  tasks = tasks.filter(function (tarefa) {
    return tarefa.id != id;
  });
  saveTasks(tasks);
  li.remove();
}

function handleAddTask() {
  const value = inputTask.value;
  if (value) {
    const novoId = Math.random() * 100000;
    const _task = {
      id: novoId,
      text: value,
      checked: false,
    };
    console.log("criar", tasks);
    tasks.push(_task);
    saveTasks(tasks);
    addTask(_task);
    console.log(tasks);
    inputTask.value = "";
  }
}

function addTask(novaTarefa) {
  const newItemTask = templateItemTask.content.cloneNode(true);
  newItemTask.querySelector("span").textContent = novaTarefa.text;
  const input = newItemTask.querySelector("input");
  const li = newItemTask.querySelector("li");
  li.setAttribute("id", novaTarefa.id);
  if (novaTarefa.checked) {
    input.setAttribute("checked", true);
    li.classList.remove("list-group-item-light");
    li.classList.add("list-group-item-success");
  }
  li.addEventListener("click", check);
  newItemTask.querySelector("button").addEventListener("click", remove);
  listTask.appendChild(newItemTask);
}

function setTasks() {
  const _tarefas = loadTasks();
  console.log("tarefas carregadas", _tarefas);
  if (_tarefas) {
    tasks = _tarefas;
    _tarefas.forEach(function (tarefa) {
      addTask(tarefa);
    });
  }
}
setTasks();

btnAddTask.addEventListener("click", handleAddTask);

/*
  Tarefa:
  Criar um app para lista de compras
  esse app precisa ter:
    um input para o item
    um input para a quantidade
    um select para a unidade de medida (unidade, kg, l)
*/

/*
//* para salvar um valor
const pessoa = {
    nome: "Nome da pessoa",
    idade: 25,
    bool: true,
    array: [1, "asd", {}, []],
  };

  const transformadoEmTexto = JSON.stringify(pessoa);

  sessionStorage.setItem("meu-valor", transformadoEmTexto);


//* para carregar um valor
const valorCarregado = sessionStorage.getItem("meu-valor");
const novoObj = JSON.parse(valorCarregado);
console.log("valorCarregado", novoObj);
*/
