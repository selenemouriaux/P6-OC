export const createSortingElement = {
  // Crée un dropdown de tri accessible
  // @param {Function} onSort - Callback appelé quand l'utilisateur change le tri
  dropdown: ({ onSort }) => {
    // Crée l'élément select avec les attributs d'accessibilité appropriés
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Trier les médias par");

    // Définit les options de tri disponibles
    const options = [
      { value: "popularity", text: "Popularité" },
      { value: "date", text: "Date" },
      { value: "title", text: "Titre" },
    ];

    // Crée et ajoute chaque option au select
    options.forEach(({ value, text }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.appendChild(option);
    });

    // Ajoute le gestionnaire d'événements pour le tri
    select.addEventListener("change", (e) => onSort(e.target.value));
    return select;
  },
};
