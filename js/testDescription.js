import { clearElement } from "./utils/clearElement.js";

export const showTestDescription = (description) => {
  const view = document.getElementById("view");

  clearElement(view);

  const descriptionDiv = document.createElement("section");
  descriptionDiv.classList.add("description");

  const descriptionHead = document.createElement("h2");
  descriptionHead.classList.add("description__head");
  descriptionHead.textContent = "Описание";

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("description__text");
  descriptionText.textContent = description;

  const startButton = document.createElement("button");
  startButton.classList.add("description__btn", "description__btn--start");
  startButton.setAttribute("type", "button");
  startButton.setAttribute("data-action", "start");
  startButton.textContent = "Начать";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("description__btn", "description__btn--back");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("data-action", "back");
  cancelButton.textContent = "Отмена";

  descriptionDiv.appendChild(descriptionHead);
  descriptionDiv.appendChild(descriptionText);
  descriptionDiv.appendChild(startButton);
  descriptionDiv.appendChild(cancelButton);

  view.appendChild(descriptionDiv);
};
