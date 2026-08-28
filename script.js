
/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

  const loader =
    document.getElementById("loader");

  setTimeout(() => {

    loader.classList.add("hidden");

  }, 1500);

});


/* =========================================
   HEADER SCROLL
========================================= */

const header =
  document.querySelector(".header");

function updateHeader() {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

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


menuBtn.addEventListener("click", () => {

  menuBtn.classList.toggle("active");

  nav.classList.toggle("active");

});


/* Close menu after clicking */

document
  .querySelectorAll(".nav a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      menuBtn.classList.remove("active");

      nav.classList.remove("active");

    });

  });


/* =========================================
   HERO PARALLAX
========================================= */

const visual =
  document.querySelector(".hero-visual");


window.addEventListener(
  "mousemove",
  (event) => {

    if (window.innerWidth <= 700) {
      return;
    }

    const x =
      (event.clientX /
        window.innerWidth - 0.5) * 2;

    const y =
      (event.clientY /
        window.innerHeight - 0.5) * 2;

    visual.style.transform =
      `translate(${x * 18}px, ${y * 18}px) translateY(-50%)`;

  }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav a"
  );


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {

          link.classList.remove(
            "active"
          );

        });


        const activeLink =
          document.querySelector(
            `.nav a[href="#${entry.target.id}"]`
          );


        if (activeLink) {

          activeLink.classList.add(
            "active"
          );

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
   PROJECT CARD TILT
========================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


projectCards.forEach((card) => {

  const preview =
    card.querySelector(
      ".project-preview"
    );


  card.addEventListener(
    "mousemove",
    (event) => {

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
        ((x / rect.width) - 0.5) * 3;

      const rotateX =
        ((y / rect.height) - 0.5) * -3;


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

      preview.style.transform =
        "";

    }
  );

});


/* =========================================
   ESC KEY CLOSES MENU
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      menuBtn.classList.remove(
        "active"
      );

      nav.classList.remove(
        "active"
      );

    }

  }
);

