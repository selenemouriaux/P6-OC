import { photographerTemplate } from "../templates/photographer.js";
import { createSortingElement } from "../patterns/sortingElements.js";
import { createMediaElement } from "../templates/mediaElements.js";
import { createCarouselManager } from "../managers/carouselManager.js";
import { createSortManager } from "../managers/sortManager.js";
import { createFooter } from "../patterns/footer.js";
import {
  getUrlParam,
  fetchPhotographerData,
  formatPhotographFilesPath,
} from "../utils/utils.js";

const initPhotographerPage = async () => {
  try {
    // Récupère l'ID et les données
    // Handle both original URL and redirected URL
    const urlParts = window.location.pathname.split("/");
    const photographerId =
      getUrlParam("id") ||
      (urlParts[urlParts.length - 1] === "photographer"
        ? "243"
        : urlParts[urlParts.length - 1]);
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
    setupSorting(sortManager, data.media, carouselManager, photographerName);

    // Affiche la grille initiale
    updateMediaGrid(data.media, carouselManager, photographerName);
  } catch (error) {
    console.error("Error initializing page:", error.message || error);
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
  const template = photographerTemplate(photographer);
  const headerDOM = template.getUserHeaderDOM();
  container.appendChild(headerDOM);
};

const setupSorting = (
  sortManager,
  mediaList,
  carouselManager,
  photographerName
) => {
  const sortingContainer = document.querySelector(".sorting-section");
  const dropdown = createSortingElement.dropdown({
    onSort: (criteria) => {
      const sortedMedia = sortManager.sort(criteria);
      updateMediaGrid(sortedMedia, carouselManager, photographerName);
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
