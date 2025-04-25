const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const btn5min = document.getElementById("btn-5min");
const btn3min = document.getElementById("btn-3min");
const btnReset = document.getElementById("btn-reset");
const coffeeFill = document.getElementById("coffee-fill");

let timerInterval;
let totalSeconds = 0;
let currentSeconds = 0;

// Function to update the timer display
function updateDisplay() {
  const min = Math.floor(currentSeconds / 60);
  const sec = currentSeconds % 60;
  minutes.textContent = String(min).padStart(2, "0");
  seconds.textContent = String(sec).padStart(2, "0");
}

// Function to update the progress bar
function updateProgressBar() {
  if (totalSeconds === 0) {
    coffeeFill.style.width = "0%";
    return;
  }

  const elapse = totalSeconds - currentSeconds;
  const percentage = (elapse / totalSeconds) * 100;
  coffeeFill.style.width = `${percentage}%`;
}

// Function to start the countdown
function startTimer(addSeconds) {
  // Add new time to current total
  totalSeconds += addSeconds;
  currentSeconds += addSeconds;

  updateDisplay();
  updateProgressBar();

  // Start timer if not already running
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      currentSeconds--;

      updateDisplay();
      updateProgressBar();

      if (currentSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        currentSeconds = 0;
        totalSeconds = 0;
      }
    }, 1000);
  }
}
// Reset timer function
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = 0;
  currentSeconds = 0;
  updateDisplay();
  updateProgressBar();
}

// Event listeners
btn5min.onclick = () => startTimer(5 * 60);
btn3min.onclick = () => startTimer(3 * 60);
btnReset.onclick = resetTimer;
