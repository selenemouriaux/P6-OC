const fetchPhotographerData = async (id) => {
  try {
    const response = await fetch("../data/photographers.json");
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

export { fetchPhotographerData };
