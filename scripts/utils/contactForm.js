import { createAccessibleElement } from "../patterns/accessibleElements.js";

function initContactForm(photographerName) {
  const modal = createAccessibleElement.modal({
    photographer: photographerName,
    fields: [
      { label: "Prénom", type: "text", name: "firstName" },
      { label: "Nom", type: "text", name: "lastName" },
      { label: "Email", type: "email", name: "email" },
      { label: "Votre message", type: "text", name: "message" },
    ],
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
    },
  });

  return modal;
}

export { initContactForm };
