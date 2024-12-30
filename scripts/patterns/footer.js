export function createFooter({ initialLikes, dailyRate }) {
  let likes = initialLikes;
  let footerElement;
  let likesText;

  function footer() {
    // Crée l'élément footer
    footerElement = document.createElement("footer");

    // Crée et configure l'élément pour les likes
    likesText = document.createElement("span");
    likesText.textContent = `${likes} ❤️`;

    // Crée et configure l'élément pour le tarif journalier
    const rateText = document.createElement("span");
    rateText.textContent = `${dailyRate}€ / jour`;

    // Ajoute les éléments au footer
    footerElement.appendChild(likesText);
    footerElement.appendChild(rateText);

    return footerElement;
  }

  function updateLikes(newLikes) {
    likes = newLikes;
    likesText.textContent = `${likes} ❤️`; // Mets à jour l'élément DOM
  }

  return { footer, updateLikes };
}
