document.addEventListener("DOMContentLoaded", () => {
  function initGiftAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initGiftAnimations, 100);
      return;
    }

    const giftSection = document.getElementById("gift-section");
    if (!giftSection) return;

    //Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: giftSection,
        start: "top 75%",
      },
    });

    //Animate Header
    const headerElements = giftSection.querySelectorAll(".gift-header > *");
    if (headerElements.length) {
      tl.fromTo(
        headerElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      );
    }

    //Animate Banks
    const bankCards = giftSection.querySelectorAll(".gift-banks > div");
    if (bankCards.length) {
      tl.fromTo(
        bankCards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" },
        "-=0.5",
      );
    }
  }

  initGiftAnimations();
});
