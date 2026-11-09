import createRippleButton from "../ripple-button/index.js";

function createIcon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");

  const paths = {
    menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
    close: ["M18 6 6 18", "m6 6 12 12"],
  };

  paths[name].forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("d", pathData);

    svg.append(path);
  });

  return svg;
}

export default function createNavbar(container) {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  const logo = document.createElement("a");
  logo.className = "navbar__logo";
  logo.href = "/index.html";
  logo.textContent = "University";

  const linksContainer = document.createElement("div");
  linksContainer.className = "navbar__links";

  linksContainer.id = "navbar-links";

  const buttonLabels = [
    ["About", "about.html"],
    ["Services", "services.html"],
    ["Products", "products.html"],
    ["News", "news.html"],
    ["Gallery", "gallery.html"],
    ["FAQ", "faq.html"],
    ["Contact", "contact.html"],
    ["Team", "team.html"],
  ];

  buttonLabels.forEach(([label, href]) => {
    const navButton = createRippleButton({
      label,
      href,
      variant: "nav",
      className: "navbar__nav-button",
    });

    linksContainer.append(navButton);
  });

  const burgerButton = createRippleButton({
    label: "Toggle navigation",
    variant: "burger",
    className: "navbar__burger-button",
    content: createIcon("menu"),
  });

  burgerButton.setAttribute("aria-expanded", "false");
  burgerButton.setAttribute("aria-controls", linksContainer.id);

  navbar.append(logo, linksContainer, burgerButton);

  // Toggle mobile navigation
  burgerButton.addEventListener("click", () => {
    const isExpanded = burgerButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isExpanded);
  });

  // Close menu after navigation
  linksContainer.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileQuery.matches) {
      closeMenu();
    }
  });

  // Close menu using Escape
  function handleKeydown(event) {
    if (
      event.key === "Escape" &&
      mobileQuery.matches &&
      burgerButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      burgerButton.focus();
    }
  }

  function setMenuState(isExpanded) {
    burgerButton.setAttribute("aria-expanded", String(isExpanded));
    linksContainer.classList.toggle("navbar__links--open", isExpanded);

    burgerButton
      .querySelector(".ripple-button__content")
      .replaceChildren(createIcon(isExpanded ? "close" : "menu"));
  }

  function closeMenu() {
    setMenuState(false);
  }

  const mobileQuery = window.matchMedia("(max-width: 768px)");

  mobileQuery.addEventListener("change", (event) => {
    setMenuState(false);

    if (!event.matches) {
      linksContainer.classList.remove("navbar__links--closed");
    }
  });

  document.addEventListener("keydown", handleKeydown);

  // Initial visibility
  if (window.matchMedia("(max-width: 768px)").matches) {
    // linksContainer.hidden = true;
    linksContainer.height = "0vh";
    linksContainer.overflow = "hidden";
  }

  container.append(navbar);

  return navbar;
}
