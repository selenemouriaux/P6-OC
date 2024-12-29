const initPhotographerPage = async () => {
  try {
    // Récupère l'ID et les données
    const photographerId = getUrlParam("id");
    const data = await fetchPhotographerData(photographerId);
    const photographerName = formatPhotographFilesPath(data.photographer.name);
    const initialLikes = data.media.reduce(
      (totalLikes, { likes }) => totalLikes + likes,
      0
    );

    // Initialise les managers
    const carouselManager = createCarouselManager(data.media);
    const sortManager = createSortManager(data.media);

    // Affiche les informations du photographe
    renderPhotographerInfo(data.photographer);
    renderFooter({ initialLikes, dailyRate: data.photographer.price });

    // Configure le tri
    setupSorting(sortManager, data.media);

    // Affiche la grille initiale
    updateMediaGrid(data.media, carouselManager, photographerName);
  } catch (error) {
    console.error("Error initializing page:", error);
  }
};

const renderFooter = ({ initialLikes, dailyRate }) => {
  const { footer, updateLikes } = createFooter({
    initialLikes,
    dailyRate,
  });
  const anchor = document.querySelector("main");
  anchor.insertAdjacentElement("afterend", footer());
};

// Fonctions helper pour l'initialisation
const renderPhotographerInfo = (photographer) => {
  const container = document.querySelector(".photograph-header");
  container.innerHTML =
    photographerTemplate(photographer).getUserHeaderDOM().innerHTML;
};

const setupSorting = (sortManager, mediaList) => {
  const sortingContainer = document.querySelector(".sorting-section");
  const dropdown = createSortingElement.dropdown({
    onSort: (criteria) => {
      const sortedMedia = sortManager.sort(criteria);
      updateMediaGrid(sortedMedia);
    },
  });
  sortingContainer.appendChild(dropdown);
};

const updateMediaGrid = (medias, carouselManager, photographerName) => {
  const mediaGrid = document.querySelector(".media-grid");
  mediaGrid.innerHTML = "";
  medias.forEach((media, index) => {
    media.image
      ? (media.image = `/assets/images/${photographerName}/${media.image}`)
      : (media.video = `/assets/images/${photographerName}/${media.video}`);
    const mediaCard = createMediaElement.card({
      media,
      onClick: () => carouselManager.show(index),
      photographerName,
    });
    mediaGrid.appendChild(mediaCard);
  });
};

// Initialise la page au chargement
document.addEventListener("DOMContentLoaded", initPhotographerPage);
