// ===============================
// AI VISION STUDIO — PORTFOLIO JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // LOADING SCREEN
  // -------------------------------
  const loader = document.getElementById("loader");
  const loadNum = document.getElementById("loadNum");
  const loadBar = document.getElementById("loadBar");

  if (loader && loadNum && loadBar) {
    document.body.classList.add("loading");

    let progress = 0;

    const loading = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;

      if (progress >= 100) {
        progress = 100;
        clearInterval(loading);

        setTimeout(() => {
          loader.classList.add("done");
          document.body.classList.remove("loading");
        }, 500);
      }

      loadNum.textContent = String(progress).padStart(2, "0");
      loadBar.style.width = progress + "%";
    }, 55);
  }


  // -------------------------------
  // CUSTOM CURSOR
  // -------------------------------
  const cursor = document.getElementById("cursor");

  if (cursor && window.innerWidth > 800) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactive = document.querySelectorAll(
      "a, button, .project, .magnetic"
    );

    interactive.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("big");

        if (element.classList.contains("project")) {
          const text = cursor.querySelector("span");

          if (text) {
            text.textContent = "OPEN";
          }
        }
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("big");
      });

    });
  }


  // -------------------------------
  // MAGNETIC ELEMENTS
  // -------------------------------
  document.querySelectorAll(".magnetic").forEach((element) => {

    element.addEventListener("mousemove", (e) => {

      const rect = element.getBoundingClientRect();

      const x =
        (e.clientX - rect.left - rect.width / 2) * 0.18;

      const y =
        (e.clientY - rect.top - rect.height / 2) * 0.18;

      element.style.transform =
        `translate(${x}px, ${y}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });

  });


  // -------------------------------
  // SCROLL PROGRESS
  // -------------------------------
  const progressBar = document.getElementById("progress");

  function updateScrollProgress() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.height = percentage + "%";
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  // -------------------------------
  // HERO PARALLAX
  // -------------------------------
  const heroTitle =
    document.querySelector(".hero-title-wrap");

  if (heroTitle) {

    window.addEventListener("scroll", () => {

      const amount = Math.min(window.scrollY * 0.12, 100);

      heroTitle.style.transform =
        `translateY(${amount}px)`;

    }, {
      passive: true
    });
  }


  // -------------------------------
  // SCROLL REVEAL
  // -------------------------------
  const revealElements =
    document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("in");

              revealObserver.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  // -------------------------------
  // MENU
  // -------------------------------
  const menuButton =
    document.getElementById("menuBtn");

  const menuPanel =
    document.getElementById("menuPanel");

  const menuClose =
    document.getElementById("menuClose");

  if (menuButton && menuPanel) {

    menuButton.addEventListener("click", () => {
      menuPanel.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (menuClose && menuPanel) {

    menuClose.addEventListener("click", () => {
      menuPanel.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  document.querySelectorAll(".menu-panel a").forEach((link) => {

    link.addEventListener("click", () => {

      menuPanel?.classList.remove("open");

      document.body.style.overflow = "";
    });

  });


  // -------------------------------
  // LIVE CLOCK
  // -------------------------------
  const clock =
    document.getElementById("clock");

  function updateClock() {

    if (!clock) return;

    const now = new Date();

    clock.textContent =
      now.toLocaleTimeString("en-IN", {
        hour12: false
      });
  }

  updateClock();

  setInterval(updateClock, 1000);


  // -------------------------------
  // NUMBER COUNTERS
  // -------------------------------
  const counters =
    document.querySelectorAll("[data-count]");

  if (counters.length) {

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting &&
              !entry.target.dataset.done
            ) {

              entry.target.dataset.done = "true";

              const target =
                Number(entry.target.dataset.count);

              let current = 0;

              const step = () => {

                current += Math.ceil(target / 18);

                if (current > target) {
                  current = target;
                }

                entry.target.textContent = current;

                if (current < target) {
                  requestAnimationFrame(step);
                }

              };

              step();

              counterObserver.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.8
        }
      );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }


  // -------------------------------
  // PROJECT MODAL
  // -------------------------------
  const modal =
    document.getElementById("projectModal");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalKind =
    document.getElementById("modalKind");

  const modalDescription =
    document.getElementById("modalDesc");

  const modalLink =
    document.getElementById("modalLink");

  const modalClose =
    document.getElementById("modalClose");


  document.querySelectorAll(".project").forEach((project) => {

    project.addEventListener("click", () => {

      if (!modal) return;

      const title =
        project.dataset.project || "PROJECT";

      const kind =
        project.dataset.kind || "DESIGN";

      const description =
        project.dataset.description ||
        "Creative project by AI Vision Studio.";

      const url =
        project.dataset.url || "";


      if (modalTitle) {
        modalTitle.textContent = title;
      }

      if (modalKind) {
        modalKind.textContent = kind;
      }

      if (modalDescription) {
        modalDescription.textContent =
          description;
      }


      if (modalLink) {

        if (url) {

          modalLink.href = url;

          modalLink.classList.remove("disabled");

          modalLink.innerHTML =
            'OPEN LIVE PROJECT <span>↗</span>';

        } else {

          modalLink.href = "#";

          modalLink.classList.add("disabled");

          modalLink.innerHTML =
            'CASE STUDY AVAILABLE ON REQUEST <span>→</span>';
        }
      }


      modal.classList.add("open");

      document.body.style.overflow = "hidden";
    });

  });


  // -------------------------------
  // CLOSE MODAL
  // -------------------------------
  function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");

    document.body.style.overflow = "";
  }


  if (modalClose) {
    modalClose.addEventListener(
      "click",
      closeModal
    );
  }


  // ESCAPE KEY
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeModal();

      menuPanel?.classList.remove("open");

      document.body.style.overflow = "";
    }

  });


  // -------------------------------
  // PROJECT 3D TILT
  // -------------------------------
  if (window.innerWidth > 800) {

    document.querySelectorAll(".project").forEach((project) => {

      const visual =
        project.querySelector(".project-visual");

      if (!visual) return;


      project.addEventListener("mousemove", (e) => {

        const rect =
          project.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
            rect.width -
          0.5;

        const y =
          (e.clientY - rect.top) /
            rect.height -
          0.5;


        visual.style.transform =
          `perspective(1000px)
           rotateX(${y * -4}deg)
           rotateY(${x * 4}deg)
           scale(.99)`;
      });


      project.addEventListener("mouseleave", () => {

        visual.style.transform = "";
      });

    });

  }


  // -------------------------------
  // SMOOTH ANCHOR SCROLL
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) return;

      const target =
        document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // -------------------------------
  // SERVICE HOVER
  // -------------------------------
  document.querySelectorAll(".service-row").forEach((row) => {

    row.addEventListener("mouseenter", () => {

      row.style.transform =
        "translateX(8px)";
    });

    row.addEventListener("mouseleave", () => {

      row.style.transform =
        "translateX(0)";
    });

  });


  // -------------------------------
  // PREVENT MODAL LINK ISSUE
  // -------------------------------
  if (modalLink) {

    modalLink.addEventListener("click", (event) => {

      if (
        modalLink.classList.contains("disabled")
      ) {
        event.preventDefault();
      }

    });

  }

});
