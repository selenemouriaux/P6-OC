const createAccessibleElement = {
  button: ({ label, onClick, ariaLabel }) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.setAttribute("aria-label", ariaLabel || label);
    button.addEventListener("click", onClick);
    return button;
  },

  link: ({ href, text, ariaLabel }) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    link.setAttribute("aria-label", ariaLabel || text);
    return link;
  },

  image: ({ src, alt, isDecorative = false }) => {
    const img = document.createElement("img");
    img.src = src;
    if (isDecorative) {
      img.setAttribute("alt", "");
      img.setAttribute("role", "presentation");
    } else {
      img.setAttribute("alt", alt);
    }
    return img;
  },
};
