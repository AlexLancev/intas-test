export const bodyScroll = {
  lock() {
    document.body.classList.add("lock");
  },
  unLock() {
    document.body.classList.remove("lock");
  },
  toggle() {
    document.body.classList.toggle("lock");
  },
};
