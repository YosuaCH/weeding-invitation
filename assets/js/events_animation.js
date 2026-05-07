document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    eventRows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateCardInfo(row),
        onEnterBack: () => updateCardInfo(row),
      });
    });

    function updateCardInfo(row) {
      // Fade out
      gsap.to([titleEl, timeEl, locationEl], {
        opacity: 0,
        y: 5,
        duration: 0.2,
        onComplete: () => {
          // Fade back in
          gsap.to([titleEl, timeEl, locationEl], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
          });
        },
      });
    }
  }
});
