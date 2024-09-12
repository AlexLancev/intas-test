export const fetchTests = async () => {
  try {
    const response = await fetch("tests/data.json");
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки JSON:", error);
  }
};
