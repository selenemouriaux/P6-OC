const withKeyboardNavigation = (element) => {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      element.click();
    }
  });
  return element;
};
