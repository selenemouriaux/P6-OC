// Gestionnaire de tri
// Gère le tri des médias selon différents critères
// @param {Array} medias - Liste des médias à trier
export const createSortManager = (medias) => {
  // Définit les fonctions de tri pour chaque critère
  const sortFunctions = {
    // Tri par nombre de likes (décroissant)
    popularity: (a, b) => b.likes - a.likes,
    // Tri par date (plus récent d'abord)
    date: (a, b) => new Date(b.date) - new Date(a.date),
    // Tri alphabétique par titre
    title: (a, b) => a.title.localeCompare(b.title),
  };

  // Trie les médias selon le critère choisi
  // @param {string} criteria - Critère de tri ('popularity', 'date', ou 'title')
  // @returns {Array} Nouvelle liste triée des médias
  const sort = (criteria) => {
    return [...medias].sort(sortFunctions[criteria]);
  };

  return { sort };
};
