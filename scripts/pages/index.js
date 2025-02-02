import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

const displayData = (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
});
