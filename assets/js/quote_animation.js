document.addEventListener("DOMContentLoaded", () => {
  function initQuoteAnimation() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initQuoteAnimation, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const quoteSection = document.getElementById("quote-section");
    if (!quoteSection) return;

    const lineTop = quoteSection.querySelector(".quote-line-top");
    const text = quoteSection.querySelector(".quote-text");
    const verse = quoteSection.querySelector(".quote-verse");
    const lineBottom = quoteSection.querySelector(".quote-line-bottom");

    // Initial state
    if (lineTop) gsap.set(lineTop, { scaleY: 0 });
    if (text) gsap.set(text, { opacity: 0, y: 30 });
    if (verse) gsap.set(verse, { opacity: 0, y: 20 });
    if (lineBottom) gsap.set(lineBottom, { scaleY: 0 });

    ScrollTrigger.create({
      trigger: quoteSection,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        if (lineTop) {
          tl.to(lineTop, { scaleY: 1, duration: 1.2 }, 0);
        }
        
        if (text) {
          tl.to(text, { opacity: 1, y: 0, duration: 1.2 }, 0.4);
        }
        
        if (verse) {
          tl.to(verse, { opacity: 1, y: 0, duration: 1.0 }, 0.8);
        }
        
        if (lineBottom) {
          tl.to(lineBottom, { scaleY: 1, duration: 1.2 }, 1.0);
        }
      },
    });
  }

  if (typeof gsap !== "undefined") {
    initQuoteAnimation();
  } else {
    window.addEventListener("load", initQuoteAnimation);
  }
});
