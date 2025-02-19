import { createMediaElement } from "../templates/mediaElements.js";
import { createCarouselElement } from "../patterns/carouselElements.js";

// Gestionnaire du carousel
// Gère l'état et les comportements du carousel
// @param {Array} medias - Liste des médias à afficher dans le carousel
export const createCarouselManager = (medias) => {
  // État interne : index du média actuellement affiché
  let currentIndex = 0;

  // Gère les événements clavier pour la navigation
  const handleKeyboard = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        previous(); // Média précédent
        break;
      case "ArrowRight":
        next(); // Média suivant
        break;
      case "Escape":
        close(); // Ferme le carousel
        break;
      case " ":
        // Lecture/Pause si c'est une vidéo
        if (medias[currentIndex].video) {
          toggleVideo();
        }
        break;
    }
  };

  // Navigation vers le média précédent
  // Utilise l'opérateur modulo pour la rotation circulaire
  const previous = () => {
    currentIndex = (currentIndex - 1 + medias.length) % medias.length;
    updateCarousel();
  };

  // Navigation vers le média suivant
  const next = () => {
    currentIndex = (currentIndex + 1) % medias.length;
    updateCarousel();
  };

  // Ferme le carousel et nettoie les événements
  const close = () => {
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      carousel.remove();
      document.removeEventListener("keydown", handleKeyboard);
    }
  };

  // Gère la lecture/pause des vidéos
  const toggleVideo = () => {
    const video = document.querySelector(".carousel video");
    const playButton = document.querySelector(".carousel .play-button");
    if (video && playButton) {
      if (video.paused) {
        video.play();
        playButton.classList.add("playing");
      } else {
        video.pause();
        playButton.classList.remove("playing");
      }
    }
  };

  // Met à jour l'affichage du carousel
  const updateCarousel = () => {
    const carousel = document.querySelector(".carousel");
    const currentMedia = medias[currentIndex];

    // Crée le bon type d'élément média
    const mediaElement = currentMedia.image
      ? createMediaElement.image(currentMedia)
      : createMediaElement.video(currentMedia);

    // Met à jour le contenu
    const content = carousel.querySelector(".carousel-content");
    content.innerHTML = "";
    content.appendChild(mediaElement);

    // Ajoute les gestionnaires d'événements pour la vidéo
    if (currentMedia.video) {
      const video = content.querySelector("video");
      const playButton = content.querySelector(".play-button");

      if (video && playButton) {
        // Gestionnaire de clic sur le bouton de lecture
        playButton.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleVideo();
        });

        // Met à jour l'état du bouton quand la vidéo se termine
        video.addEventListener("ended", () => {
          playButton.classList.remove("playing");
        });
      }
    }
  };

  // Affiche le carousel à partir d'un index donné
  // @param {number} startIndex - Index du média initial
  const show = (startIndex) => {
    currentIndex = startIndex;

    // Crée la structure du carousel
    const container = createCarouselElement.container();
    const content = document.createElement("div");
    content.classList.add("carousel-content");

    // Crée la navigation avec les callbacks
    const nav = createCarouselElement.navigation({
      onPrevious: previous,
      onNext: next,
      onClose: close,
    });

    // Assemble et affiche le carousel
    container.appendChild(content);
    container.appendChild(nav);
    document.body.appendChild(container);

    // Ajoute les écouteurs d'événements
    document.addEventListener("keydown", handleKeyboard);
    updateCarousel();
  };

  // Expose uniquement la méthode nécessaire
  return { show };
};
