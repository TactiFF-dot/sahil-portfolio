/* =========================================================
   SAHIL KOKODE — PORTFOLIO V2
   FINAL MATCHED SCRIPT
   HTML + CSS MATCHED VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const body = document.body;
  const header = document.querySelector(".header");
  const nav = document.querySelector("#nav");
  const menuBtn = document.querySelector("#menuBtn");
  const loader = document.querySelector("#loader");

  const filterButtons =
    document.querySelectorAll(".project-filter");

  const projectCards =
    document.querySelectorAll(".project-list-v2 .project-card");

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a[href^='#']");

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =========================================================
     1. LOADER
     ========================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("hidden");
      }

      body.classList.add("page-loaded");

    }, reduceMotion ? 0 : 700);

  });


  /* =========================================================
     2. MOBILE NAVIGATION
     ========================================================= */

  if (menuBtn && nav) {

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );


    menuBtn.addEventListener("click", () => {

      const isOpen =
        nav.classList.toggle("active");

      menuBtn.classList.toggle(
        "active",
        isOpen
      );

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    /* Close menu when navigation link is clicked */

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Open menu"
        );

        body.classList.remove("menu-open");

      });

    });

  }


  /* =========================================================
     3. ESCAPE KEY
  ========================================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (!nav || !menuBtn) return;

    nav.classList.remove("active");
    menuBtn.classList.remove("active");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      "Open menu"
    );

    body.classList.remove("menu-open");

  });


  /* =========================================================
     4. HEADER SCROLL EFFECT
  ========================================================= */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================================
     5. SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", event => {

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

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header
          ? header.offsetHeight
          : 0;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: position,
        behavior: reduceMotion
          ? "auto"
          : "smooth"
      });

    });

  });


  /* =========================================================
     6. ACTIVE NAV LINK
  ========================================================= */

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

      const top =
        section.offsetTop - 180;

      const bottom =
        top + section.offsetHeight;

      if (
        window.scrollY >= top &&
        window.scrollY < bottom
      ) {
        currentSection =
          section.id;
      }

    });


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  updateActiveNav();


  /* =========================================================
     7. PROJECT FILTER SYSTEM
  ========================================================= */

  if (
    filterButtons.length &&
    projectCards.length
  ) {

    filterButtons.forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.filter;


          /* Active filter button */

          filterButtons.forEach(btn => {
            btn.classList.remove("active");
          });

          button.classList.add("active");


          /* Filter project cards */

          projectCards.forEach(card => {

            const category =
              card.dataset.category;

            const show =
              filter === "all" ||
              category === filter;


            if (show) {

              card.classList.remove(
                "is-hidden"
              );

              card.setAttribute(
                "aria-hidden",
                "false"
              );

              /*
               * Restart CSS filter-in animation
               */

              if (!reduceMotion) {

                card.classList.remove(
                  "filter-in"
                );

                void card.offsetWidth;

                card.classList.add(
                  "filter-in"
                );

              }

            } else {

              card.classList.add(
                "is-hidden"
              );

              card.setAttribute(
                "aria-hidden",
                "true"
              );

            }

          });

        }
      );

    });

  }


  /* =========================================================
     8. PROJECT CARD MOUSE TILT
  ========================================================= */

  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (
    finePointer &&
    !reduceMotion
  ) {

    projectCards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          if (
            card.classList.contains(
              "is-hidden"
            )
          ) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateX =
            ((y - centerY) /
              centerY) * -1.4;

          const rotateY =
            ((x - centerX) /
              centerX) * 1.4;

          card.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =========================================================
     9. HERO VISUAL PARALLAX
  ========================================================= */

  const hero =
    document.querySelector(".hero");

  const heroVisual =
    document.querySelector(".hero-visual");

  const orbitOne =
    document.querySelector(".orbit-one");

  const orbitTwo =
    document.querySelector(".orbit-two");


  if (
    hero &&
    heroVisual &&
    finePointer &&
    !reduceMotion
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX -
            rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY -
            rect.top) /
          rect.height -
          0.5;


        heroVisual.style.transform =
          `translateY(-50%)
           translate3d(
             ${x * 14}px,
             ${y * 14}px,
             0
           )`;


        if (orbitOne) {

          orbitOne.style.marginLeft =
            `${x * 10}px`;

          orbitOne.style.marginTop =
            `${y * 10}px`;

        }


        if (orbitTwo) {

          orbitTwo.style.marginLeft =
            `${x * -8}px`;

          orbitTwo.style.marginTop =
            `${y * -8}px`;

        }

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroVisual.style.transform =
          "translateY(-50%)";

        if (orbitOne) {
          orbitOne.style.marginLeft = "";
          orbitOne.style.marginTop = "";
        }

        if (orbitTwo) {
          orbitTwo.style.marginLeft = "";
          orbitTwo.style.marginTop = "";
        }

      }
    );

  }


  /* =========================================================
     10. SERVICE CARD INTERACTION
  ========================================================= */

  const serviceCards =
    document.querySelectorAll(
      ".service-card"
    );


  if (
    finePointer &&
    !reduceMotion
  ) {

    serviceCards.forEach(card => {

      card.addEventListener(
        "mouseenter",
        () => {
          card.classList.add(
            "service-hover"
          );
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.classList.remove(
            "service-hover"
          );
        }
      );

    });

  }


  /* =========================================================
     11. PROCESS ITEM INTERACTION
  ========================================================= */

  const processItems =
    document.querySelectorAll(
      ".process-item"
    );


  processItems.forEach(item => {

    item.addEventListener(
      "mouseenter",
      () => {
        item.classList.add(
          "process-active"
        );
      }
    );

    item.addEventListener(
      "mouseleave",
      () => {
        item.classList.remove(
          "process-active"
        );
      }
    );

  });


  /* =========================================================
     12. CAPABILITY HOVER
  ========================================================= */

  const capabilities =
    document.querySelectorAll(
      ".capability-list span"
    );


  capabilities.forEach(item => {

    item.addEventListener(
      "mouseenter",
      () => {
        item.classList.add(
          "capability-active"
        );
      }
    );

    item.addEventListener(
      "mouseleave",
      () => {
        item.classList.remove(
          "capability-active"
        );
      }
    );

  });


  /* =========================================================
     13. CTA MAGNETIC EFFECT
  ========================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".hero-button, .header-cta, .big-cta"
    );


  if (
    finePointer &&
    !reduceMotion
  ) {

    magneticButtons.forEach(button => {

      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            `translate(
              ${x * 0.07}px,
              ${y * 0.07}px
            )`;

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform = "";

        }
      );

    });

  }


  /* =========================================================
     14. FOOTER BACK TO TOP
  ========================================================= */

  const footerTop =
    document.querySelector(
      '.footer a[href="#top"]'
    );


  if (footerTop) {

    footerTop.addEventListener(
      "click",
      event => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: reduceMotion
            ? "auto"
            : "smooth"
        });

      }
    );

  }


  /* =========================================================
     15. RESIZE CLEANUP
  ========================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          if (
            window.innerWidth > 700 &&
            nav &&
            menuBtn
          ) {

            nav.classList.remove(
              "active"
            );

            menuBtn.classList.remove(
              "active"
            );

            menuBtn.setAttribute(
              "aria-expanded",
              "false"
            );

            menuBtn.setAttribute(
              "aria-label",
              "Open menu"
            );

            body.classList.remove(
              "menu-open"
            );

          }


          /* Reset project transforms */

          projectCards.forEach(card => {
            card.style.transform = "";
          });


          /* Reset hero */

          if (heroVisual) {
            heroVisual.style.transform =
              "translateY(-50%)";
          }

        }, 150);

    },
    { passive: true }
  );


  /* =========================================================
     16. TOUCH DEVICE SAFETY
  ========================================================= */

  if (!finePointer) {

    projectCards.forEach(card => {
      card.style.transform = "";
    });

  }


  /* =========================================================
     17. FINAL STATE
  ========================================================= */

  body.classList.add(
    "js-enabled"
  );

  updateHeader();
  updateActiveNav();

});

