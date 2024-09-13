import { showTestDescription } from "./testDescription.js";
import { showTestQuestions } from "./testQuestions.js";
import { startTimer } from "./testTimer.js";
import { showModal } from "./testModal.js";
import { showTestResults } from "./testResults.js";
import { fetchTests } from "./testData.js";
import { clearElement } from "./utils/clearElement.js";
import { deleteClass } from "./utils/deleteClass.js";
import  "./burger.js";

const list = document.getElementById("list");
const view = document.getElementById("view");
const burger = document.getElementById("burger");

const handleTestSelection = (test, testName, currentName) => {
  const { description, data } = test;
  showTestDescription(description);

  view.addEventListener("click", (e) => {
    const action = e.target.closest("button[data-action]")?.dataset.action;

    if (action === "start") {
      showTestQuestions(data, testName, currentName);
    }

    if (action === "finish") {
      showTestResults(test, testName);
    }

    if (action === "back") {
      clearElement(view);
      deleteClass();

      const span = document.createElement("span");
      span.classList.add("tests__select");
      span.textContent = "Выберите тест из списка";

      view.appendChild(span);
    }
  });
};

fetchTests().then((arr) => {
  list.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-btn]");

    if (!button) return; 

    if (window.innerWidth <= 576) {
      list.classList.remove('active');
      burger.classList.remove('active');
    }

    deleteClass();

    button.classList.add('active');

    const currentBtn = button.dataset.btn;
    const currentName = button.textContent;
    const scoreboard = document.querySelector('.scoreboard');
    const scoreboardArr = scoreboard.querySelectorAll('.scoreboard__btn');
    scoreboardArr.forEach((btn) => btn.removeAttribute('disabled'));
    scoreboard.classList.remove('active');

    if (currentBtn) {
      const test = arr[currentBtn];
      if (test) {
        handleTestSelection(test, currentBtn, currentName);
      } else {
        console.log(`Не найден тест для кнопки: ${currentBtn}`);
      }
    }
  });
});


