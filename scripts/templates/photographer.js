function photographerTemplate(data) {
  const { name, city, country, tagline, price, portrait } = data;

  function getUserCardDOM() {
    const link = createAccessibleElement.link({
      href: `photographer.html?id=${data.id}`,
      text: "",
      ariaLabel: `${name}, photographe de ${city}`,
    });

    withKeyboardNavigation(link);

    const article = document.createElement("article");

    const imgBox = document.createElement("div");
    const img = createAccessibleElement.image({
      src: `assets/photographers/${portrait}`,
      alt: `photo du visage de ${name}, photographe`,
    });
    imgBox.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const slogan = document.createElement("blockquote");
    slogan.textContent = tagline;
    const cost = document.createElement("span");
    cost.textContent = `${price}€/jour`;

    article.appendChild(imgBox);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(cost);

    link.appendChild(article);

    return link;
  }
  return { getUserCardDOM };
}
