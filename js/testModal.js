import { stopTimer } from "./testTimer.js";
import { clearElement } from "./utils/clearElement.js";

export const showModal = () => {
  const modal = document.getElementById("modal");
  const scoreboard = document.querySelector(".scoreboard");

  modal.classList.add("active");

  const confirmButton = modal.querySelector('button[data-action="confirm-exit"]');
  const cancelButton = modal.querySelector('button[data-action="cancel-exit"]');

  confirmButton.addEventListener("click", () => {
    const view = document.getElementById("view");
    
    clearElement(view);
    
    const span = document.createElement("span");
    span.classList.add("tests__select");
    span.textContent = "Выберите тест из списка";
    
    view.appendChild(span);
    
    scoreboard.classList.remove("active");
    modal.classList.remove("active");

    stopTimer();
  });

  cancelButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });
};
