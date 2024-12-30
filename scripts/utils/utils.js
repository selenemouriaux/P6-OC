export const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const fetchPhotographerData = async (id) => {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    return {
      photographer: data.photographers.find((p) => p.id === parseInt(id)),
      media: data.media.filter((m) => m.photographerId === parseInt(id)),
    };
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    throw error;
  }
};

export const formatPhotographFilesPath = (name = "") => {
  const parts = name.split(" ");
  const cleanedPart = parts[0].replace(/-/g, " ");
  return cleanedPart;
};
