import createRippleButton from "../components/ripple-button/index.js";

export default function insertAdditionalButtons() {
  [
    {
      location: document.querySelector(".hero__search"),
      button: {
        label: "Search",
        href: "?search=",
        variant: "filled",
        className: "hero__search-button",
      },
    },
    {
      location: document.querySelector("#about-actions"),
      button: {
        label: "Discover our story",
        href: "about.html",
        variant: "filled",
      },
    },
    {
      location: document.querySelector("#services-actions"),
      button: {
        label: "Explore our services",
        href: "services.html",
        variant: "filled",
      },
    },
    {
      location: document.querySelector("#products-actions"),
      button: {
        label: "Explore all products",
        href: "products.html",
        variant: "filled",
      },
    },
    {
      location: document.querySelector("#news-actions"),
      button: {
        label: "Explore all news",
        href: "news.html",
        variant: "filled",
      },
    },
    {
      location: document.querySelector("#team-actions"),
      button: {
        label: "Meet the whole team",
        href: "team.html",
        variant: "filled",
      },
    },
    {
      location: document.querySelector("#contact-cta-actions"),
      button: {
        label: "Contact us",
        href: "contact.html",
        variant: "filled",
      },
    },
  ].forEach((insertion) => {
    if (insertion.location)
      insertion.location.append(createRippleButton(insertion.button));
  });
}
