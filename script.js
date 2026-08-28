
/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);
});


/* =========================================
   HEADER SCROLL
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  nav.classList.toggle("active");
});


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    menuBtn.classList.remove("active");
    nav.classList.remove("active");

  });

});


/* =========================================
   MOUSE PARALLAX
========================================= */

const visual = document.querySelector(".hero-visual");

window.addEventListener("mousemove", (event) => {

  if (window.innerWidth <= 700) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  visual.style.transform =
    `translate(${x * 18}px, ${y * 18}px) translateY(-50%)`;

});


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink =
        document.querySelector(
          `.nav a[href="#${entry.target.id}"]`
        );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    });

  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


/* =========================================
   SMOOTH BUTTON FEEDBACK
========================================= */

const heroButton = document.querySelector(".hero-button");

heroButton.addEventListener("mouseenter", () => {
  document.body.classList.add("button-hover");
});

heroButton.addEventListener("mouseleave", () => {
  document.body.classList.remove("button-hover");
});

