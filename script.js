const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

const openIcon = document.getElementById("menu-open-icon");
const closeIcon = document.getElementById("menu-close-icon");

menuButton.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");

  openIcon.classList.toggle("hidden", !isOpen);
  closeIcon.classList.toggle("hidden", isOpen);

  menuButton.setAttribute("aria-expanded", String(!isOpen));
});

/* Close mobile menu after clicking a link */

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");

    openIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");

    menuButton.setAttribute("aria-expanded", "false");
  });
});

