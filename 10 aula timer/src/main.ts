const date = new Date();
console.log("date", date);
const data = date.toISOString();
console.log("data", data);
const ano_mes_dia = date.toLocaleDateString("PT-br");
console.log("ano_mes_dia", ano_mes_dia);
const time = date.getTime();
console.log("time", time);

function funcaoASerChamada() {
  console.log("chamou a função depois de 3s");
}

setTimeout(funcaoASerChamada, 10000);

let cont = 0;
function mostraMsg() {
  console.log(`funcao chamada ${cont++}`);
}

let apontador: any = null;

function iniciar() {
  if (!apontador) {
    apontador = setInterval(mostraMsg, 1000);
  } else {
    clearInterval(apontador);
    apontador = null;
  }
}

document.querySelector("#btn")?.addEventListener("click", iniciar);

//* inicio do codigo do timer
let timerInterval: any;
let startTime: any;
let elapsedTime = 0;
let isRunning = false;

function updateTimerDisplay() {
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const timerDisplay = document.querySelector("#timer");
  timerDisplay?.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime * 1000;
    timerInterval = setInterval(() => {
      elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      updateTimerDisplay();
    }, 1000);
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  updateTimerDisplay();
}

document.querySelector("#startButton")?.addEventListener("click", startTimer);
document.querySelector("#stopButton")?.addEventListener("click", stopTimer);
document.querySelector("#resetButton")?.addEventListener("click", resetTimer);
