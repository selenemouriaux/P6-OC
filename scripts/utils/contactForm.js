const modal = createAccessibleElement.modal({
  photographer: "Mimi Keel",
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

document.body.appendChild(modal);

const openModalButton = createAccessibleElement.button({
  label: "Open Modal",
  onClick: () => modal.showModal(),
});

document.body.appendChild(openModalButton);
