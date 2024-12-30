import { initContactForm } from "../utils/contactForm.js";
import { createAccessibleElement } from "../patterns/accessibleElements.js";
import { withKeyboardNavigation } from "../patterns/keyboardNavigation.js";

export function photographerTemplate(data) {
  const { name, city, country, tagline, price, portrait } = data;
  const modal = initContactForm(name);

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

  function getUserHeaderDOM() {
    const article = document.createElement("article");

    const imgBox = document.createElement("div");
    imgBox.classList.add("imgBox");
    const img = createAccessibleElement.image({
      src: `assets/photographers/${portrait}`,
      alt: `photo du visage de ${name}, photographe`,
    });
    imgBox.appendChild(img);

    const h1 = document.createElement("h1");
    h1.textContent = name;
    const location = document.createElement("span");
    location.textContent = `${city}, ${country}`;
    const slogan = document.createElement("blockquote");
    slogan.textContent = tagline;
    const identity = document.createElement("div");
    identity.classList.add("info");
    identity.append(h1, location, slogan);
    const contactMe = document.createElement("button");
    contactMe.textContent = "Contactez-moi";
    contactMe.classList.add("contact_button");
    contactMe.onclick = () => modal.showModal();

    article.appendChild(identity);
    article.appendChild(contactMe);
    article.appendChild(imgBox);

    // Append modal to DOM
    document.body.appendChild(modal);

    return article;
  }

  return { getUserCardDOM, getUserHeaderDOM };
}
