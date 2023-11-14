"use strict";
var _a, _b, _c, _d;
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
let apontador = null;
function iniciar() {
    if (!apontador) {
        apontador = setInterval(mostraMsg, 1000);
    }
    else {
        clearInterval(apontador);
        apontador = null;
    }
}
(_a = document.querySelector("#btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", iniciar);
//* inicio do codigo do timer
let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
function updateTimerDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const timerDisplay = document.querySelector("#timer");
    timerDisplay === null || timerDisplay === void 0 ? void 0 : timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
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
(_b = document.querySelector("#startButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", startTimer);
(_c = document.querySelector("#stopButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", stopTimer);
(_d = document.querySelector("#resetButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", resetTimer);
