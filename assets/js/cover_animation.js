document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to");

  const guestNameEl = document.getElementById("cover-guest-name");
  if (guestNameEl && guestName) {
    guestNameEl.textContent = decodeURIComponent(guestName);
  }

  const SCROLL_KEYS = [32, 33, 34, 35, 36, 37, 38, 39, 40];

  function blockWheel(e) {
    e.preventDefault();
  }
  function blockTouch(e) {
    e.preventDefault();
  }
  function blockKeys(e) {
    if (SCROLL_KEYS.includes(e.keyCode)) e.preventDefault();
  }

  function lockScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockTouch, { passive: false });
    window.addEventListener("keydown", blockKeys, { passive: false });
    if (window.lenisInstance) window.lenisInstance.stop();
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    window.removeEventListener("wheel", blockWheel);
    window.removeEventListener("touchmove", blockTouch);
    window.removeEventListener("keydown", blockKeys);
    if (window.lenisInstance) window.lenisInstance.start();
  }

  lockScroll();

  const lenisStopInterval = setInterval(() => {
    if (window.lenisInstance) {
      window.lenisInstance.stop();
      clearInterval(lenisStopInterval);
    }
  }, 50);

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to("#cover-addressed", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      "#cover-guest-name",
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5",
    )
    .to(
      "#cover-img-main",
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8",
    )
    .to(
      "#cover-couple",
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6",
    )
    .to(
      "#cover-caption",
      { opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    )
    .to(
      "#cover-cta",
      { opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );

  const btn = document.getElementById("open-invitation-btn");
  const overlay = document.getElementById("cover-overlay");

  if (btn && overlay) {
    btn.addEventListener("click", () => {
      btn.disabled = true;

      // Play audio
      const musicToggle = document.getElementById("music_toggle");
      if (musicToggle && !musicToggle.classList.contains("playing")) {
        musicToggle.click();
      }

      const exitTl = gsap.timeline({
        onComplete: () => {
          overlay.style.display = "none";
          unlockScroll();
          if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
          }
          // Play the hero animation that was paused initially
          if (window.heroAnimationTl) {
            window.heroAnimationTl.play();
          }
        },
      });

      // Slide the dark panel UP to cover everything
      exitTl
        .to("#cover-exit-panel", {
          translateY: "0%",
          duration: 0.7,
          ease: "power4.in",
        })
        .to(overlay, {
          y: "-100%",
          duration: 0.7,
          ease: "power4.inOut",
        });
    });
  }
});
