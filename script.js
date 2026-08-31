        reduceMotion ? 0 : 700
      );

    }
  );


  /* =========================================================
     2. MOBILE NAV
  ========================================================= */

  function closeMenu() {

    if (!nav || !menuBtn) {
      return;
    }

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


  if (menuBtn && nav) {

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );


    menuBtn.addEventListener(
      "click",
      () => {

        const isOpen =
          nav.classList.toggle(
            "active"
          );

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
          isOpen
            ? "Close menu"
            : "Open menu"
        );

        body.classList.toggle(
          "menu-open",
          isOpen
        );

      }
    );


    nav.querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });

  }


  /* =========================================================
     3. ESCAPE
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeMenu();

      }

    }
  );


  /* =========================================================
     4. HEADER SCROLL
  ========================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();


  /* =========================================================
     5. SMOOTH SCROLL
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );

          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }


          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const position =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight;


          window.scrollTo({

            top:
              position,

            behavior:
              reduceMotion
                ? "auto"
                : "smooth"

          });

        }
      );

    });


  /* =========================================================
     6. ACTIVE NAV
  ========================================================= */

  function updateActiveNav() {

    let currentSection =
      "";


    sections.forEach(
      section => {

        const top =
          section.offsetTop -
          180;

        const bottom =
          top +
          section.offsetHeight;


        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {

          currentSection =
            section.id;

        }

      }
    );


    navLinks.forEach(
      link => {

        const href =
          link.getAttribute(
            "href"
          );


        link.classList.toggle(
          "active",

          href ===
          `#${currentSection}`
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    {
      passive: true
    }
  );


  updateActiveNav();


  /* =========================================================
     7. PROJECT FILTER
  ========================================================= */

  if (
    filterButtons.length &&
    projectCards.length
  ) {

    filterButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const filter =
              button.dataset.filter;


            /* Active button */

            filterButtons.forEach(
              btn => {

                btn.classList.remove(
                  "active"
                );

              }
            );


            button.classList.add(
              "active"
            );


            /* Cards */

            projectCards.forEach(
              card => {

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


                  if (
                    !reduceMotion
                  ) {

                    card.classList.remove(
                      "filter-in"
                    );


                    void card.offsetWidth;


                    card.classList.add(
                      "filter-in"
                    );

                  }

                }

                else {

                  card.classList.add(
                    "is-hidden"
                  );

                  card.setAttribute(
                    "aria-hidden",
                    "true"
                  );

                }

              }
            );

          }
        );

      }
    );

  }


  /* =========================================================
     8. PROJECT TILT
  ========================================================= */

  if (
    finePointer &&
    !reduceMotion
  ) {

    projectCards.forEach(
      card => {

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
                centerY) *
              -1.2;


            const rotateY =
              ((x - centerX) /
                centerX) *
              1.2;


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

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =========================================================
     9. HERO PARALLAX
  ========================================================= */

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
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          .5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          .5;


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

          orbitOne.style.marginLeft =
            "";

          orbitOne.style.marginTop =
            "";

        }


        if (orbitTwo) {

          orbitTwo.style.marginLeft =
            "";

          orbitTwo.style.marginTop =
            "";

        }

      }
    );

  }


  /* =========================================================
     10. SERVICE INTERACTION
  ========================================================= */

  if (
    finePointer &&
    !reduceMotion
  ) {

    serviceCards.forEach(
      card => {

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

      }
    );

  }


  /* =========================================================
     11. PROCESS INTERACTION
  ========================================================= */

  processItems.forEach(
    item => {

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

    }
  );


  /* =========================================================
     12. CAPABILITIES
  ========================================================= */

  capabilityItems.forEach(
    item => {

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

    }
  );


  /* =========================================================
     13. MAGNETIC BUTTONS
  ========================================================= */

  const magneticButtons =
    document.querySelectorAll(
      ".hero-button, .header-cta, .big-cta"
    );


  if (
    finePointer &&
    !reduceMotion
  ) {

    magneticButtons.forEach(
      button => {

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
                ${x * .06}px,
                ${y * .06}px
              )`;

          }
        );


        button.addEventListener(
          "mouseleave",
          () => {

            button.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =========================================================
     14. BACK TO TOP
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

          behavior:
            reduceMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  }


  /* =========================================================
     15. RESIZE
  ========================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            if (
              window.innerWidth > 700
            ) {

              closeMenu();

            }


            projectCards.forEach(
              card => {

                card.style.transform =
                  "";

              }
            );


            if (heroVisual) {

              heroVisual.style.transform =
                "translateY(-50%)";

            }

          },
          150
        );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     16. TOUCH SAFETY
  ========================================================= */

  if (!finePointer) {

    projectCards.forEach(
      card => {

        card.style.transform =
          "";

      }
    );

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
