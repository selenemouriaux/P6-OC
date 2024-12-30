export const createAccessibleElement = {
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
      const fieldDiv = document.createElement("div");

      const labelElement = document.createElement("label");
      labelElement.textContent = label;
      labelElement.htmlFor = name;

      const input =
        type === "text" && name === "message"
          ? document.createElement("textarea")
          : document.createElement("input");

      if (type !== "text" || name !== "message") {
        input.type = type;
      }
      input.name = name;
      input.id = name;
      input.required = true;

      fieldDiv.appendChild(labelElement);
      fieldDiv.appendChild(input);
      form.appendChild(fieldDiv);
    });

    // Submit Button
    const submitButton = createAccessibleElement.button({
      label: "Envoyer",
      ariaLabel: "Envoyer le formulaire",
      onClick: (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        dialog.close();
      },
    });
    submitButton.classList.add("contact_button");

    const buttonDiv = document.createElement("div");
    buttonDiv.appendChild(submitButton);
    form.appendChild(buttonDiv);
    dialog.appendChild(form);

    // Close Button
    const closeButton = createAccessibleElement.button({
      label: "×",
      ariaLabel: "Fermer la modale",
      onClick: () => dialog.close(),
    });
    closeButton.classList.add("close-button");

    dialog.appendChild(closeButton);

    return dialog;
  },
};
