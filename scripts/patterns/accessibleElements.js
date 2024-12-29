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

  modal: ({ photographer, fields, onSubmit }) => {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-labelledby", `contacter ${photographer}`);
    dialog.classList.add("modal");

    // Title
    const modalTitle = document.createElement("h2");
    modalTitle.innerHTML = `Contactez-moi<br>${photographer}`;
    dialog.appendChild(modalTitle);

    // Form
    const form = document.createElement("form");
    form.method = "dialog"; // Allows closing with ESC or cancel
    fields.forEach(({ label, type, name }) => {
      const labelElement = document.createElement("label");
      labelElement.textContent = label;
      labelElement.htmlFor = name;

      const input = document.createElement("input");
      input.type = type;
      input.name = name;
      input.id = name;
      input.required = true;

      form.appendChild(labelElement);
      form.appendChild(input);
    });

    // Submit Button
    const submitButton = createAccessibleElement.button({
      label: "Submit",
      ariaLabel: "Submit form",
      onClick: (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        dialog.close();
      },
    });

    form.appendChild(submitButton);
    dialog.appendChild(form);

    // Close Button
    const closeButton = createAccessibleElement.button({
      label: "Close",
      ariaLabel: "Close modal",
      onClick: () => dialog.close(),
    });

    dialog.appendChild(closeButton);

    return dialog;
  },
};
