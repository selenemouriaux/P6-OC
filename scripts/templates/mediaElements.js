// Factory pour créer les éléments média (images et vidéos)
export const createMediaElement = {
  // Crée une carte média avec image/vidéo, titre et likes
  // @param {Object} media - Données du média
  // @param {Function} onClick - Callback pour l'ouverture du carousel
  card: ({ media, onClick }) => {
    const article = document.createElement("article");
    article.classList.add("media-card");

    // Crée l'élément média approprié (image ou vidéo)
    const mediaElement = media.image
      ? createMediaElement.image(media)
      : createMediaElement.video(media);

    // Ajoute les gestionnaires d'événements pour le clic et le clavier
    mediaElement.addEventListener("click", () => onClick(media));
    mediaElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(media);
      }
    });
    // Rend l'élément focusable pour la navigation au clavier
    mediaElement.setAttribute("tabindex", "0");

    // Crée et ajoute le titre
    const title = document.createElement("h2");
    title.textContent = media.title;

    // Crée et ajoute le compteur de likes
    const likes = document.createElement("span");
    likes.textContent = `${media.likes} ❤️`;
    likes.setAttribute("aria-label", `${media.likes} likes`);

    // Assemble la carte
    article.appendChild(mediaElement);
    article.appendChild(title);
    article.appendChild(likes);

    return article;
  },

  // Crée un élément image avec les attributs appropriés
  image: ({ image, title }) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = title; // Alt text pour l'accessibilité
    return img;
  },

  // Crée un élément vidéo avec les attributs appropriés
  video: ({ video, title }) => {
    const videoEl = document.createElement("video");
    videoEl.src = video;
    videoEl.setAttribute("aria-label", title); // Label pour l'accessibilité
    return videoEl;
  },
};
