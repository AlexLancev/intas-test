import { stopTimer } from "./testTimer.js";
import { clearElement } from "./utils/clearElement.js";
import { bodyScroll } from "./utils/bodyScroll.js";
import { deleteClass } from "./utils/deleteClass.js";

export const showModal = () => {
  const modal = document.getElementById("modal");
  const scoreboard = document.querySelector(".scoreboard");

  modal.classList.add("active");

  const confirmButton = modal.querySelector('button[data-action="confirm-exit"]');
  const cancelButton = modal.querySelector('button[data-action="cancel-exit"]');

  confirmButton.addEventListener("click", () => {
    const view = document.getElementById("view");
    
    deleteClass();
    clearElement(view);
    bodyScroll.unLock();
    
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
    bodyScroll.unLock();
  });
};
