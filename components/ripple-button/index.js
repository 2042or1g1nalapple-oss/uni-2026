function createRipple(element, event) {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  const ripple = document.createElement("span");

  ripple.className = "ripple-button__ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;

  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  element.append(ripple);

  return ripple;
}

export default function createRippleButton({
  label,
  href,
  variant = "nav",
  ariaLabel,
  type = "button",
  className = "",
  content,
}) {
  const element = document.createElement(href ? "a" : "button");

  if (href) {
    element.href = href;
  } else {
    element.type = type;
  }

  element.className = `ripple-button ripple-button--${variant} ${className}`;

  element.setAttribute("aria-label", ariaLabel || label);

  const contentElement = document.createElement("span");
  contentElement.className = "ripple-button__content";

  if (content instanceof Node) {
    contentElement.append(content);
  } else {
    contentElement.textContent = content ?? label;
  }

  element.append(contentElement);

  element.addEventListener("click", (event) => {
    if (event.detail === 0) return;

    if (element.tagName === "A") {
      const link = element;

      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      event.preventDefault();

      const ripple = createRipple(element, event);

      let navigated = false;

      const navigate = () => {
        if (navigated) return;

        navigated = true;
        window.location.assign(link.href);
      };

      ripple.addEventListener("animationend", navigate, { once: true });

      // Fallback in case animationend isn't fired.
      setTimeout(navigate, 350);

      return;
    }

    const ripple = createRipple(element, event);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });

  return element;
}
