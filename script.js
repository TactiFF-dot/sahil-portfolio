/* =========================================================
   SAHIL KOKODE — PORTFOLIO V2
   Complete JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MOBILE MENU
     ========================================================= */

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuBtn.classList.toggle("active");

      const isOpen = nav.classList.contains("active");
      menuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================================================
     2. HEADER SCROLL EFFECT
     ========================================================= */

  const header = document.querySelector("header");

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();


  /* =========================================================
     3. SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        const headerHeight = header
          ? header.offsetHeight
          : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  /* =========================================================
     4. ACTIVE NAV LINK
     ========================================================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();


  /* =========================================================
     5. SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .fade-up"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("show");
    });

  }


  /* =========================================================
     6. PROJECT FILTER
     ========================================================= */

  const filterButtons = document.querySelectorAll(
    ".filter-btn, .project-filter button"
  );

  const projectCards = document.querySelectorAll(
    ".project-card, .project-item"
  );

  if (filterButtons.length && projectCards.length) {

    filterButtons.forEach(button => {

      button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
          button.dataset.filter ||
          button.getAttribute("data-category") ||
          "all";

        projectCards.forEach(card => {

          const category =
            card.dataset.category || "all";

          if (
            filter === "all" ||
            category === filter
          ) {

            card.style.display = "";

            requestAnimationFrame(() => {
              card.classList.remove("hidden");
              card.classList.add("show-card");
            });

          } else {

            card.classList.remove("show-card");
            card.classList.add("hidden");

            setTimeout(() => {
              if (card.classList.contains("hidden")) {
                card.style.display = "none";
              }
            }, 250);

          }

        });

      });

    });

  }


  /* =========================================================
     7. PROJECT CARD TILT
     ========================================================= */

  const tiltCards = document.querySelectorAll(
    ".project-card.tilt, .tilt-card"
  );

  if (window.matchMedia("(pointer: fine)").matches) {

    tiltCards.forEach(card => {

      card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -4;

        const rotateY =
          ((x - centerX) / centerX) * 4;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform =
          "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

      });

    });

  }


  /* =========================================================
     8. BUTTON RIPPLE EFFECT
     ========================================================= */

  const buttons = document.querySelectorAll(
    ".btn, .button, .cta-btn"
  );

  buttons.forEach(button => {

    button.addEventListener("click", event => {

      const rect =
        button.getBoundingClientRect();

      const ripple =
        document.createElement("span");

      const size =
        Math.max(rect.width, rect.height);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;

      ripple.classList.add("ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

    });

  });


  /* =========================================================
     9. CUSTOM CURSOR
     ========================================================= */

  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  if (
    cursor &&
    cursorDot &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    document.addEventListener("mousemove", event => {

      cursor.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      cursorDot.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

    });

    const hoverElements = document.querySelectorAll(
      "a, button, .project-card, .service-card"
    );

    hoverElements.forEach(element => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
      });

    });

  }


  /* =========================================================
     10. COUNTER ANIMATION
     ========================================================= */

  const counters = document.querySelectorAll(
    "[data-count]"
  );

  if ("IntersectionObserver" in window && counters.length) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
              parseInt(counter.dataset.count, 10);

            if (isNaN(target)) return;

            let current = 0;

            const duration = 1400;
            const increment =
              target / (duration / 16);

            const updateCounter = () => {

              current += increment;

              if (current < target) {

                counter.textContent =
                  Math.floor(current);

                requestAnimationFrame(updateCounter);

              } else {

                counter.textContent = target;

              }

            };

            updateCounter();

            counterObserver.unobserve(counter);

          });

        },
        {
          threshold: 0.7
        }
      );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* =========================================================
     11. CURRENT YEAR
     ========================================================= */

  const yearElements =
    document.querySelectorAll("[data-year]");

  yearElements.forEach(element => {
    element.textContent =
      new Date().getFullYear();
  });


  /* =========================================================
     12. BACK TO TOP
     ========================================================= */

  const backTop =
    document.querySelector(".back-to-top");

  if (backTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 600) {
        backTop.classList.add("show");
      } else {
        backTop.classList.remove("show");
      }

    });

    backTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================================================
     13. CONTACT FORM
     ========================================================= */

  const contactForm =
    document.querySelector("#contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      const name =
        contactForm.querySelector('[name="name"]')?.value.trim();

      const email =
        contactForm.querySelector('[name="email"]')?.value.trim();

      const message =
        contactForm.querySelector('[name="message"]')?.value.trim();

      if (!name || !email || !message) {
        showToast("Please fill all required fields.");
        return;
      }

      showToast(
        "Thanks! Your message is ready to send."
      );

      contactForm.reset();

    });

  }


  /* =========================================================
     14. TOAST MESSAGE
     ========================================================= */

  function showToast(message) {

    let toast =
      document.querySelector(".toast-message");

    if (!toast) {

      toast =
        document.createElement("div");

      toast.className =
        "toast-message";

      document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.hideTimer);

    toast.hideTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);

  }


  /* =========================================================
     15. IMAGE LAZY LOAD
     ========================================================= */

  const images =
    document.querySelectorAll("img");

  images.forEach(image => {

    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

  });


  /* =========================================================
     16. ESC KEY
     ========================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (nav) {
        nav.classList.remove("active");
      }

      if (menuBtn) {
        menuBtn.classList.remove("active");
        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }

  });


  /* =========================================================
     17. PAGE LOADED
     ========================================================= */

  document.body.classList.add("js-loaded");

});
