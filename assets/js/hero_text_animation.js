const names = "David & Sarah";

opentype.load(
  "https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff",
  function (err, font) {
    if (err) {
      console.error("Gagal load font:", err);
      return;
    }
    const svgEl = document.getElementById("name");
    const NS = "http://www.w3.org/2000/svg";
    const fontPath = font.getPath(names, 10, 115, 88);
    const bb = fontPath.getBoundingBox();
    const pad = 18;

    svgEl.setAttribute(
      "viewBox",
      `${bb.x1 - pad} ${bb.y1 - pad} ${bb.x2 - bb.x1 + pad * 2} ${bb.y2 - bb.y1 + pad * 2}`,
    );

    const pathEl = document.createElementNS(NS, "path");
    pathEl.setAttribute("d", fontPath.toPathData(1));
    pathEl.setAttribute("fill", "rgba(255, 255, 255, 0)");
    pathEl.setAttribute("stroke", "white");
    pathEl.setAttribute("stroke-width", "1.5");
    svgEl.appendChild(pathEl);

    const L = pathEl.getTotalLength();

    gsap.set(pathEl, {
      strokeDasharray: L,
      strokeDashoffset: L,
    });
    const tl = gsap.timeline({ paused: true });
    window.heroAnimationTl = tl;

    setTimeout(() => {
      const cover = document.getElementById("cover-overlay");
      const coverVisible = cover && cover.style.display !== "none";
      if (!coverVisible) {
        document.body.classList.remove("overflow-hidden");
        document.body.style.overflow = "auto";
      }

      const quoteSection = document.getElementById("quote-section");
      if (quoteSection) {
        quoteSection.classList.remove("hidden-initially");
      }

      // Show couple section
      const coupleSection = document.getElementById("couple-section");
      if (coupleSection) {
        coupleSection.classList.remove("hidden-initially");
      }

      const eventsSection = document.getElementById("story-section");
      if (eventsSection) {
        eventsSection.classList.remove("hidden-initially");
        gsap.from(eventsSection, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });
      }

      if (window.initScrollAnimations) {
        window.initScrollAnimations();
      }
    }, 0);

    tl.to(
      ".hero-corner",
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      0,
    );

    tl.to("#sub-title", { opacity: 1, duration: 1, ease: "power2.out" }, 0)
      .to("#name-wrapper", { opacity: 1, duration: 0 }, 0)
      .to(
        pathEl,
        {
          strokeDashoffset: 0,
          duration: 25,
          ease: "none",
        },
        0,
      )
      .to(
        pathEl,
        {
          fill: "rgba(255, 255, 255, 1)",
          duration: 1.5,
        },
        "-=22",
      )
      .to("#line", { width: 200, duration: 0.9, ease: "power2.out" }, "-=21.5")
      .to("#date", { opacity: 1, duration: 1 }, "<");

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  },
);
