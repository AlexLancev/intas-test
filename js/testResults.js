import { clearElement } from "./utils/clearElement.js";
import { deleteClass } from "./utils/deleteClass.js";

let timer;

export const showTestResults = (test, testName) => {
  const view = document.getElementById("view");
  clearInterval(timer);

  const savedAnswers = JSON.parse(localStorage.getItem(testName)) || {};
  let correctAnswersCount = 0;

  clearElement(view);

  const results = document.createElement('section');
  results.classList.add('results');

  const title = document.createElement("h2");
  title.classList.add('results__title');
  title.textContent = "Тест завершён";
  results.appendChild(title);

  const resultList = document.createElement("ul");
  resultList.classList.add('results__list');

  test.data.forEach((q, index) => {
    const correctAnswer = q.correctAnswer;
    const userAnswer = savedAnswers[index] || "Нет ответа";
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctAnswersCount++;
    }

    const listItem = document.createElement("li");
    listItem.classList.add('results__list-item');

    const questionText = document.createElement("strong");
    questionText.classList.add('results__question');
    questionText.textContent = `Вопрос ${index + 1}: ${q.question}`;
    listItem.appendChild(questionText);

    const correctAnswerSpan = document.createElement("span");
    correctAnswerSpan.classList.add('results__correct-answer');
    correctAnswerSpan.textContent = `Правильный ответ: ${correctAnswer}`;
    
    const moreButton = document.createElement("button");
    moreButton.classList.add('results__btn-more');
    moreButton.setAttribute("type", "button");
    moreButton.setAttribute("aria-label", "Узнать подробнее");
    moreButton.setAttribute("data-action", "more");
    moreButton.setAttribute("data-index", index);
    moreButton.textContent = "?";

    const userAnswerSpan = document.createElement("span");
    userAnswerSpan.classList.add('results__user-answer');
    userAnswerSpan.textContent = `Вы ответили: ${userAnswer} (${isCorrect ? "Верно" : "Неверно"})`;

    listItem.appendChild(correctAnswerSpan);
    listItem.appendChild(moreButton);
    listItem.appendChild(userAnswerSpan);

    resultList.appendChild(listItem);
  });

  const resultSpan = document.createElement("span");
  resultSpan.classList.add('results__total');
  resultSpan.textContent = `Вы ответили правильно на ${correctAnswersCount} из ${test.data.length} вопросов`;
  results.appendChild(resultSpan);

  const answerTitle = document.createElement("strong");
  answerTitle.classList.add('results__your-answers');
  answerTitle.textContent = "Ваши ответы";
  results.appendChild(answerTitle);

  results.appendChild(resultList);

  const restartButton = document.createElement("button");
  restartButton.classList.add('results__restart-btn');
  restartButton.setAttribute("type", "button");
  restartButton.setAttribute("data-restart", "true");
  restartButton.textContent = "Пройти ещё раз";
  results.appendChild(restartButton);

  view.appendChild(results);

  view.querySelectorAll('button[data-action="more"]').forEach((button) => {
    const index = button.dataset.index;
    const fact = test.data[index].facts;
  
    let isPopupVisible = false;
    let isFocused = false;
  
    const showFactPopup = () => {
      if (isPopupVisible) return;
  
      const factPopup = document.createElement("div");
      factPopup.classList.add("fact-popup");
      factPopup.innerHTML = `<p>${fact}</p>`;
      
      button.insertAdjacentElement("afterend", factPopup);
  
      isPopupVisible = true;
  
      const hideFactPopup = () => {
        if (isFocused) return;
  
        factPopup.remove();
        isPopupVisible = false;
        button.removeEventListener("mouseleave", hideFactPopup);
        button.removeEventListener("blur", hideFactPopup);
      };
  
      button.addEventListener("mouseleave", hideFactPopup);
      button.addEventListener("blur", hideFactPopup);
    };
  
    button.addEventListener("mouseover", showFactPopup);
    button.addEventListener("focus", () => {
      isFocused = true;
      showFactPopup();
    });
  
    button.addEventListener("blur", () => {
      isFocused = false;
      if (!isPopupVisible) {
        isFocused = false;
      }
    });
  });

  restartButton.addEventListener("click", () => {
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.classList.remove('active');
    const scoreboardArr = scoreboard.querySelectorAll('.scoreboard__btn');
    scoreboardArr.forEach((btn) => btn.removeAttribute('disabled'));
    deleteClass();
    localStorage.removeItem(testName);
    clearElement(view);

    const span = document.createElement("span");
    span.classList.add("tests__select");
    span.textContent = "Выберите тест из списка";
    view.appendChild(span);
  });
};
