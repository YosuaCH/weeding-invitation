document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const gallerySection = document.getElementById("gallery-section");
  const track = document.querySelector(".horizontal-track");

  if (gallerySection && track) {
    gallerySection.classList.remove("hidden-initially");
    function getScrollAmount() {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    }

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: gallerySection,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  }
});
