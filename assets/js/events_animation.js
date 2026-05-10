document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    const eventRows = document.querySelectorAll(".event-row");
    const eventInfoCard = document.getElementById("event-info-card");
    const titleEl = document.getElementById("event-title");
    const timeEl = document.getElementById("event-time");
    const locationEl = document.getElementById("event-location");
    const infoPin = document.getElementById("event-info-pin");
    const scrollWrapper = document.querySelector(".events-scroll-wrapper");

    // 2. GSAP Pinning for the central card
    if (infoPin && scrollWrapper) {
      ScrollTrigger.create({
        trigger: scrollWrapper,
        start: "top top",
        end: "bottom bottom",
        pin: infoPin,
        pinSpacing: false,
      });
    }

    // 3. Smooth Scroll/Parallax for each row
    eventRows.forEach((row, index) => {
      const leftImg = row.querySelector(".parallax-img-left");
      const rightImg = row.querySelector(".parallax-img-right");

      if (leftImg) {
        gsap.to(leftImg, {
          yPercent: index % 2 === 0 ? 25 : -25,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (rightImg) {
        gsap.to(rightImg, {
          yPercent: index % 2 === 0 ? -25 : 25,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Update Card Info when row is in center
      ScrollTrigger.create({
        trigger: row,
        start: "top center+=20%",
        end: "bottom center-=20%",
        onEnter: () => updateCardInfo(row),
        onEnterBack: () => updateCardInfo(row),
      });
    });

    function updateCardInfo(row) {
      if (!titleEl || !timeEl || !locationEl) return;

      const title = row.getAttribute("data-title") || "";
      const time = row.getAttribute("data-time") || "";
      const location = row.getAttribute("data-location") || "";
      const bgColor = row.getAttribute("data-bg-color") || "#f8f6f0";

      // Only update if there's actual data, otherwise keep current
      if (!title && !time && !location) return;

      gsap.to([titleEl, timeEl, locationEl], {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          titleEl.innerText = title;
          timeEl.innerText = time;
          locationEl.innerText = location;
          if (eventInfoCard) eventInfoCard.style.backgroundColor = bgColor;

          gsap.to([titleEl, timeEl, locationEl], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });
    }

    // Initial state
    if (eventRows.length > 0 && titleEl) {
      const firstRow = eventRows[0];
      const title = firstRow.getAttribute("data-title") || "";
      if (title) {
        titleEl.innerText = title;
        timeEl.innerText = firstRow.getAttribute("data-time") || "";
        locationEl.innerText = firstRow.getAttribute("data-location") || "";
        if (eventInfoCard)
          eventInfoCard.style.backgroundColor =
            firstRow.getAttribute("data-bg-color") || "#f8f6f0";
      }
    }
  }
});
