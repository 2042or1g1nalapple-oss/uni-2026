import createNavbar from "../components/navbar/index.js";
import insertAdditionalButtons from "./insert-additional-buttons.js";
import initScrollAnimations from "../utils/scroll-animations.js";
import renderFeaturedProducts from "./render-featured-products.js";
import renderFeaturedNews from "./render-featured-news.js";
import renderFeaturedTeam from "./render-featured-team.js";

const header = document.querySelector("header");

createNavbar(header);

window.addEventListener("scroll", function () {
  if (window.scrollY > 1) {
    header.classList.add("animate");
  } else {
    header.classList.remove("animate");
  }
});

insertAdditionalButtons();
initScrollAnimations();
renderFeaturedProducts();
renderFeaturedNews();
renderFeaturedTeam();
