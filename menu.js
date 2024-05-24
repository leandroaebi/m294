/**
 * Funktion zur Implementierung der Navigation-Animation
 * 
 * @function navSlide
 * @description Aktiviert die Navigation-Animation und das Burger-Menü
 * @returns {void}
 * 
 * @author Leandro Aebi
 */
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");

      navLinks.forEach((link, index) => {
          if (link.style.animation) {
              link.style.animation = "";
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
      });
      burger.classList.toggle("toggle");
  });
};

// Initialisierung der Navigation-Animation
navSlide();
