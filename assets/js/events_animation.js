document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    const eventRows = document.querySelectorAll(".event-row");
    const eventInfoCard = document.getElementById("event-info-card");
    const titleEl = document.getElementById("event-title");
    const timeEl = document.getElementById("event-time");
    const locationEl = document.getElementById("event-location");

    // Smooth Scroll/Parallax for each row
    eventRows.forEach((row, index) => {
      // Parallax effect for inner images
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

      // Fade out
      gsap.to([titleEl, timeEl, locationEl], {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Update text
          titleEl.innerText = title;
          timeEl.innerText = time;
          locationEl.innerText = location;
          if (eventInfoCard) eventInfoCard.style.backgroundColor = bgColor;

          // Fade back in
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

    if (eventRows.length > 0 && titleEl) {
      const firstRow = eventRows[0];
      titleEl.innerText = firstRow.getAttribute("data-title") || "";
      timeEl.innerText = firstRow.getAttribute("data-time") || "";
      locationEl.innerText = firstRow.getAttribute("data-location") || "";
      if (eventInfoCard)
        eventInfoCard.style.backgroundColor =
          firstRow.getAttribute("data-bg-color") || "#f8f6f0";
    }
  }
});
