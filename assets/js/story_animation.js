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

    const storyRows = document.querySelectorAll(".story-row");
    const infoPin = document.getElementById("story-info-pin");
    const scrollWrapper = document.querySelector(".story-scroll-wrapper");

    // 2. GSAP Pinning for the central card
    if (infoPin && scrollWrapper && storyRows.length > 0) {
      ScrollTrigger.create({
        trigger: scrollWrapper,
        start: "top top",
        endTrigger: storyRows[storyRows.length - 1],
        end: "top 4%",
        pin: infoPin,
        pinSpacing: false,
      });
    }

    // 3. Smooth Scroll/Parallax for each row
    storyRows.forEach((row, index) => {
      const leftImg = row.querySelector(".parallax-img-left");
      const rightImg = row.querySelector(".parallax-img-right");

      if (leftImg) {
        gsap.to(leftImg, {
          yPercent: index % 2 === 0 ? 10 : -10,
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
          yPercent: index % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    const storySteps = document.querySelectorAll(".story-step");
    if (storySteps.length > 0 && scrollWrapper) {
      gsap.set(storySteps, { opacity: 0, y: 20 });

      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: "top top",
          endTrigger: storyRows[storyRows.length - 1],
          end: "top 4%",
          scrub: 1,
        },
      });

      stepTl.to(storySteps[0], { opacity: 1, y: 0, duration: 1 });

      for (let i = 1; i < storySteps.length; i++) {
        stepTl.to(
          storySteps[i - 1],
          { opacity: 0, y: -20, duration: 1 },
          "+=1",
        );
        stepTl.to(storySteps[i], { opacity: 1, y: 0, duration: 1 }, "-=0.5");
      }
      stepTl.to({}, { duration: 1 });
    }
  }
});
