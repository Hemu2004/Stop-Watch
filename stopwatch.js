let startTime, updatedTime, difference;
let paused = true;
let interval;
let laps = [];

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
    }
}

function pauseTimer() {
    paused = true;
    clearInterval(interval);
    difference = new Date().getTime() - startTime;
}

function resetTimer() {
    paused = true;
    clearInterval(interval);
    startTime = updatedTime = difference = 0;
    laps = [];
    updateDisplay(0, 0, 0);
    lapsList.innerHTML = '';
}

function recordLap() {
    if (!paused) {
        laps.push(difference);
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const time = formatTime(updatedTime);
    updateDisplay(time.minutes, time.seconds, time.milliseconds);
}

function formatTime(time) {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(2, '0'),
    };
}

function updateDisplay(minutes, seconds, milliseconds) {
    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
    millisecondsDisplay.textContent = milliseconds;
}
