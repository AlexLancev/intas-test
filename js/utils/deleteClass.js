export const deleteClass = () => {
  const list = document.getElementById("list");
  const allButtons = list.querySelectorAll("button[data-btn]");
  allButtons.forEach((btn) => btn.classList.remove("active"));
};
