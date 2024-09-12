import { showTestResults } from "./testResults.js";

let timer;
let startTime;
let timerElement;

export const startTimer = (seconds, test, testName) => {
  if (timer) {
    stopTimer();
  }

  timerElement = document.getElementById("timer");
  let timeRemaining = seconds;

  const updateTimer = () => {
    if (!document.hidden) {
      const now = Date.now();
      const elapsedTime = Math.floor((now - startTime) / 1000);
      timeRemaining = Math.max(seconds - elapsedTime, 0);

      const minutes = Math.floor(timeRemaining / 60);
      const secondsDisplay = timeRemaining % 60;

      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${secondsDisplay.toString().padStart(2, "0")}`;

      if (timeRemaining === 0) {
        cancelAnimationFrame(timer);
        timer = null;
        showTestResults(test, testName);
      } else {
        timer = requestAnimationFrame(updateTimer);
      }
    } else {
      timer = requestAnimationFrame(updateTimer);
    }
  };

  startTime = Date.now();
  timer = requestAnimationFrame(updateTimer);
};

export const stopTimer = () => {
  if (timer) {
    cancelAnimationFrame(timer);
    timer = null;
  }
};

