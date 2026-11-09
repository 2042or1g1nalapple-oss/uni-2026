import createRippleButton from "../components/ripple-button/index.js";
import { observeScrollAnimations } from "../utils/scroll-animations.js";

export default async function renderFeaturedNews() {
  const container = document.querySelector("#featured-news");

  if (!container) return;

  try {
    const response = await fetch("../assets/json/news.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const news = await response.json();

    const featuredNews = news
      .filter((article) => article.featured)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const animationSelectors = [
      "fade-in-left",
      "fade-in-bottom",
      "fade-in-right",
    ];

    featuredNews.forEach((article, index) => {
      const card = document.createElement("article");
      card.className = `news-card ${animationSelectors[index]}`;

      card.style.setProperty("--animation-delay", `${index * 120}ms`);

      // Image
      const imageWrapper = document.createElement("div");
      imageWrapper.className = "news-card__image-wrapper";

      const image = document.createElement("img");
      image.className = "news-card__image";
      image.src = article.image;
      image.alt = article.imageAlt;
      image.loading = "lazy";

      const category = document.createElement("span");
      category.className = "news-card__category";
      category.textContent = article.category;

      imageWrapper.append(image, category);

      // Content
      const content = document.createElement("div");
      content.className = "news-card__content";

      const metadata = document.createElement("div");
      metadata.className = "news-card__metadata";

      const date = document.createElement("time");
      date.dateTime = article.date;
      date.textContent = dateFormatter.format(
        new Date(`${article.date}T00:00:00`),
      );

      const readTime = document.createElement("span");
      readTime.textContent = `${article.readTime} min read`;

      metadata.append(date, readTime);

      const title = document.createElement("h3");
      title.className = "news-card__title";
      title.textContent = article.title;

      const excerpt = document.createElement("p");
      excerpt.className = "news-card__excerpt";
      excerpt.textContent = article.excerpt;

      // Footer
      const footer = document.createElement("div");
      footer.className = "news-card__footer";

      const author = document.createElement("span");
      author.className = "news-card__author";
      author.textContent = `By ${article.author}`;

      const detailsButton = createRippleButton({
        label: "Read more",
        href: `article.html?slug=${encodeURIComponent(article.slug)}`,
        variant: "outlined",
        className: "news-card__details",
      });

      footer.append(author, detailsButton);

      content.append(metadata, title, excerpt, footer);

      card.append(imageWrapper, content);
      container.append(card);
    });

    // Register dynamically created cards.
    observeScrollAnimations(container);
  } catch (error) {
    console.error("Failed to render featured news:", error);

    container.textContent = "Unable to load our latest news.";
  }
}
