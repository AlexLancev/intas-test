import { startTimer, stopTimer } from "./testTimer.js";
import { showModal } from "./testModal.js";
import { showTestResults } from "./testResults.js";

import { clearElement } from "./utils/clearElement.js";

export const showTestQuestions = (questions, testName) => {
  const view = document.getElementById("view");
  const scoreboard = document.querySelector(".scoreboard");

  clearElement(view);

  scoreboard.classList.add("active");

  const answerCount = document.getElementById("answer-count");
  answerCount.textContent = `0/${questions.length}`;

  const questionListBox = document.createElement("div");
  questionListBox.classList.add("questions-box");

  const questionList = document.createElement("ul");
  questionList.classList.add("questions");

  questions.forEach((q, index) => {
    const questionItem = document.createElement("li");
    questionItem.classList.add("question");

    const questionText = document.createElement("p");
    questionText.classList.add("question__heading");
    questionText.textContent = `${index + 1}. ${q.question}`;

    questionItem.appendChild(questionText);

    const questionRow = document.createElement("div");
    questionRow.classList.add("question__row");

    questionItem.appendChild(questionRow);

    q.answers.forEach((answer) => {
      const label = document.createElement("label");
      label.classList.add("question__label");

      const input = document.createElement("input");
      input.classList.add("question__answer", "visually-hidden");
      input.setAttribute("name", `question-${index}`);
      input.setAttribute("value", answer);
      input.setAttribute("type", "radio");
      input.setAttribute("data-question-index", index);

      const span = document.createElement("span");
      span.classList.add("question__text");
      span.textContent = answer;

      label.appendChild(input);
      label.appendChild(span);
      questionRow.appendChild(label);
    });

    questionList.appendChild(questionItem);
  });

  questionListBox.appendChild(questionList);

  const finishButton = document.createElement("button");
  finishButton.classList.add("question__btn");
  finishButton.setAttribute("type", "button");
  finishButton.setAttribute("data-action", "finish");
  finishButton.disabled = true;
  finishButton.textContent = "Завершить";

  questionListBox.appendChild(finishButton);
  view.appendChild(questionListBox);

  const answers = {};

  const updateAnswerCount = () => {
    const answered = Object.keys(answers).length;
    answerCount.textContent = `${answered}/${questions.length}`;
    finishButton.disabled = answered !== questions.length;
  };

  view.querySelectorAll(".question__answer").forEach((input) => {
    input.addEventListener("change", (e) => {
      const questionIndex = e.target.dataset.questionIndex;
      const selectedAnswer = e.target.value;
      answers[questionIndex] = selectedAnswer;

      localStorage.setItem(testName, JSON.stringify(answers));
      updateAnswerCount();
    });
  });

  document.querySelector('button[data-action="reset"]').addEventListener("click", () => {
    localStorage.removeItem(testName);
    document.querySelectorAll(".question__answer").forEach((input) => {
      input.checked = false;
    });
    Object.keys(answers).forEach((key) => delete answers[key]);
    updateAnswerCount();
  });

  document.querySelector('button[data-action="stop"]').addEventListener("click", () => {
    showModal();
  });

  finishButton.addEventListener("click", () => {
    // const arr = document.querySelectorAll('.scoreboard__btn');
    // arr.forEach((btn) => btn.setAttribute('disabled', ""))
    stopTimer();
    showTestResults({ data: questions }, testName);
  });

  startTimer(300, { data: questions }, testName);
};
