// Factory pour créer les éléments du carousel
const createCarouselElement = {
  // Crée le conteneur principal du carousel
  container: () => {
    const container = document.createElement("div");
    container.classList.add("carousel");
    // Attributs ARIA pour l'accessibilité
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    container.setAttribute("aria-label", "Image carousel");
    return container;
  },

  // Crée les éléments de navigation du carousel
  // @param {Function} onPrevious - Callback pour l'image précédente
  // @param {Function} onNext - Callback pour l'image suivante
  // @param {Function} onClose - Callback pour fermer le carousel
  navigation: ({ onPrevious, onNext, onClose }) => {
    const nav = document.createElement("div");
    nav.classList.add("carousel-nav");

    // Crée les boutons de navigation avec leurs labels appropriés
    const prevButton = createAccessibleElement.button({
      label: "Précédent",
      onClick: onPrevious,
      ariaLabel: "Image précédente",
    });

    const nextButton = createAccessibleElement.button({
      label: "Suivant",
      onClick: onNext,
      ariaLabel: "Image suivante",
    });

    const closeButton = createAccessibleElement.button({
      label: "×",
      onClick: onClose,
      ariaLabel: "Fermer le carousel",
    });

    // Assemble la navigation
    nav.appendChild(prevButton);
    nav.appendChild(nextButton);
    nav.appendChild(closeButton);

    return nav;
  },
};
