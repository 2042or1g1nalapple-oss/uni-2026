import createRippleButton from "../components/ripple-button/index.js";
import { observeScrollAnimations } from "../utils/scroll-animations.js";

export default async function renderFeaturedProducts() {
  const container = document.querySelector("#featured-products");

  if (!container) return;

  try {
    const response = await fetch("../assets/json/products.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const products = await response.json();

    const featuredProducts = products
      .filter((product) => product.featured)
      .slice(0, 4);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const animationSelectors = [
      "fade-in-left",
      "fade-in-bottom",
      "fade-in-top",
      "fade-in-right",
    ];

    featuredProducts.forEach((product, index) => {
      const card = document.createElement("article");
      card.className = `product-card ${animationSelectors[index]}`;

      card.style.setProperty("--animation-delay", `${index * 100}ms`);

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "product-card__image-wrapper";

      const image = document.createElement("img");
      image.className = "product-card__image";
      image.src = product.image;
      image.alt = product.imageAlt;
      image.loading = "lazy";

      imageWrapper.append(image);

      const content = document.createElement("div");
      content.className = "product-card__content";

      const category = document.createElement("span");
      category.className = "product-card__category";
      category.textContent = product.category;

      const title = document.createElement("h3");
      title.className = "product-card__title";
      title.textContent = product.name;

      const description = document.createElement("p");
      description.className = "product-card__description";
      description.textContent = product.description;

      const price = document.createElement("p");
      price.className = "product-card__price";
      price.textContent = currencyFormatter.format(product.price);

      const actions = document.createElement("div");
      actions.className = "product-card__actions";

      const detailsButton = createRippleButton({
        label: "View details",
        href: `product-details.html?product=${encodeURIComponent(product.slug)}`,
        variant: "outlined",
        className: "product-card__details",
      });

      actions.append(detailsButton);

      content.append(category, title, description, price, actions);

      card.append(imageWrapper, content);
      container.append(card);

      observeScrollAnimations(container);
    });
  } catch (error) {
    console.error("Failed to render featured products:", error);

    container.textContent = "Unable to load our products right now.";
  }
}
