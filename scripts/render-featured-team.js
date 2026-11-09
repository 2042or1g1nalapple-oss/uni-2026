import { observeScrollAnimations } from "../utils/scroll-animations.js";

export default async function renderFeaturedTeam() {
  const container = document.querySelector("#featured-team");

  if (!container) return;

  try {
    const response = await fetch("../assets/json/team.json");

    if (!response.ok) {
      throw new Error("Failed to load team data.");
    }

    const team = await response.json();

    const featuredMembers = team
      .filter((member) => member.featured)
      .slice(0, 3);

    const animationSelectors = [
      "fade-in-left",
      "fade-in-bottom",
      "fade-in-right",
    ];

    featuredMembers.forEach((member, index) => {
      const card = document.createElement("article");

      card.className = `team-card ${animationSelectors[index]}`;
      card.style.setProperty("--animation-delay", `${index * 100}ms`);

      const avatar = document.createElement("img");
      avatar.className = "team-card__avatar";
      avatar.src = member.image;
      avatar.alt = member.imageAlt;
      avatar.loading = "lazy";

      const name = document.createElement("h3");
      name.className = "team-card__name";
      name.textContent = member.name;

      const position = document.createElement("p");
      position.className = "team-card__position";
      position.textContent = member.position;

      const description = document.createElement("p");
      description.className = "team-card__description";
      description.textContent = member.description;

      card.append(avatar, name, position, description);
      container.append(card);
    });

    observeScrollAnimations(container);
  } catch (error) {
    console.error("Unable to render team members:", error);
    container.textContent = "Unable to load team members.";
  }
}
