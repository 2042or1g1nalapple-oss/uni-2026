export const animationSelectors = [
  ".fade-in-left",
  ".fade-in-right",
  ".fade-in-top",
  ".fade-in-bottom",
];

let observer;

export function observeScrollAnimations(root = document) {
  const elements = root.querySelectorAll(animationSelectors.join(", "));

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );
  }

  elements.forEach((element) => observer.observe(element));
}

export default function initScrollAnimations() {
  observeScrollAnimations();
}
