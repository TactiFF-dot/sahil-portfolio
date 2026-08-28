
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
   HEADER
========================================= */

const header = document.querySelector(".header");

function updateHeader() {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");

function closeMenu() {

  menuBtn.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("menu-open");

}

menuBtn.addEventListener("click", () => {

  menuBtn.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");

});


document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  }
);


/* =========================================
   HERO PARALLAX
========================================= */

const visual =
  document.querySelector(".hero-visual");

window.addEventListener(
  "mousemove",
  event => {

    if (window.innerWidth <= 700) {
      return;
    }

    const x =
      (event.clientX / window.innerWidth - .5) * 2;

    const y =
      (event.clientY / window.innerHeight - .5) * 2;

    visual.style.transform =
      `translate(${x * 18}px, ${y * 18}px) translateY(-50%)`;

  }
);


/* =========================================
   ACTIVE NAV
========================================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav a");

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(link => {
          link.classList.remove("active");
        });

        const active =
          document.querySelector(
            `.nav a[href="#${entry.target.id}"]`
          );

        if (active) {
          active.classList.add("active");
        }

      });

    },
    {
      threshold: .25
    }
  );


sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================================
   PROJECT TILT
========================================= */

const projectCards =
  document.querySelectorAll(".project-card");

projectCards.forEach(card => {

  const preview =
    card.querySelector(".project-preview");

  card.addEventListener(
    "mousemove",
    event => {

      if (window.innerWidth <= 700) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - .5) * 3;

      const rotateX =
        ((y / rect.height) - .5) * -3;

      preview.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-7px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      preview.style.transform = "";

    }
  );

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems =
  document.querySelectorAll(
    ".service-card, .why-card, .process-item, .about-statement"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "is-visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: .12
    }
  );


revealItems.forEach(item => {

  item.style.opacity = "0";
  item.style.transform = "translateY(30px)";
  item.style.transition =
    "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)";

  revealObserver.observe(item);

});


/* =========================================
   REVEAL ACTIVE STATE
========================================= */

const revealStyle =
  document.createElement("style");

revealStyle.textContent = `
  .is-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(
  revealStyle
);


/* =========================================
   SMOOTH ANCHOR OFFSET
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const headerHeight =
          document.querySelector(
            ".header"
          ).offsetHeight;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================
   CONTACT EMAIL FALLBACK
========================================= */

const contactEmail =
  document.querySelector(".contact-email");

if (contactEmail) {

  contactEmail.addEventListener(
    "click",
    () => {

      contactEmail.classList.add(
        "clicked"
      );

    }
  );

}

