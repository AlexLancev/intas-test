import { showTestDescription } from "./testDescription.js";
import { showTestQuestions } from "./testQuestions.js";
import { startTimer } from "./testTimer.js";
import { showModal } from "./testModal.js";
import { showTestResults } from "./testResults.js";
import { fetchTests } from "./testData.js";
import { clearElement } from "./utils/clearElement.js";

const list = document.getElementById("list");
const view = document.getElementById("view");

const handleTestSelection = (test, testName) => {
  const { description, data } = test;
  showTestDescription(description);

  view.addEventListener("click", (e) => {
    const action = e.target.closest("button[data-action]")?.dataset.action;

    if (action === "start") {
      showTestQuestions(data, testName);
    }

    if (action === "finish") {
      showTestResults(test, testName);
    }

    if (action === "back") {
      clearElement(view);

      const span = document.createElement("span");
      span.classList.add("tests__select");
      span.textContent = "Выберите тест из списка";

      view.appendChild(span);
    }
  });
};

fetchTests().then((arr) => {
  list.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-btn]")?.dataset.btn;
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.classList.remove('active');

    if (button) {
      const test = arr[button];
      if (test) {
        handleTestSelection(test, button);
      } else {
        console.log(`Не найден тест для кнопки: ${button}`);
      }
    }
  });
});

