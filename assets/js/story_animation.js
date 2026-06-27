document.addEventListener("DOMContentLoaded", () => {
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
  window.lenisInstance = lenis;

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
      // 1. Initial State Setup
      gsap.set(storySteps, { opacity: 1 });

      storySteps.forEach((step) => {
        const title = step.querySelector("h3");
        const p = step.querySelector("p");

        if (title)
          gsap.set(title, { opacity: 0, filter: "blur(8px)", scale: 1.05 });
        if (p) gsap.set(p, { opacity: 0, filter: "blur(4px)", y: 15 });
      });

      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: "top top",
          endTrigger: storyRows[storyRows.length - 1],
          end: "top 4%",
          scrub: 1,
        },
      });

      // 2. Animate first step in
      const firstTitle = storySteps[0].querySelector("h3");
      const firstP = storySteps[0].querySelector("p");

      stepTl
        .to(firstTitle, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
        })
        .to(
          firstP,
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8 },
          "-=0.6",
        );

      // 3. Loop for remaining steps
      for (let i = 1; i < storySteps.length; i++) {
        const prevTitle = storySteps[i - 1].querySelector("h3");
        const prevP = storySteps[i - 1].querySelector("p");

        const currTitle = storySteps[i].querySelector("h3");
        const currP = storySteps[i].querySelector("p");

        // Exit previous step
        stepTl.to(
          [prevTitle, prevP],
          {
            opacity: 0,
            filter: "blur(6px)",
            y: -15,
            duration: 0.8,
            stagger: 0.1,
          },
          "+=1",
        );

        // Enter current step
        stepTl
          .to(
            currTitle,
            { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1 },
            "-=0.2",
          )
          .to(
            currP,
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8 },
            "-=0.6",
          );
      }

      stepTl.to({}, { duration: 1 });
    }
  }

  // Mobile Slideshow Animation per Group
  const mobileStoryGroups = document.querySelectorAll(".mobile-story-group");
  if (mobileStoryGroups.length > 0) {
    mobileStoryGroups.forEach((group) => {
      const images = group.querySelectorAll("img");
      if (images.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
          images[currentSlide].classList.remove("opacity-100");
          images[currentSlide].classList.add("opacity-0");

          currentSlide = (currentSlide + 1) % images.length;

          images[currentSlide].classList.remove("opacity-0");
          images[currentSlide].classList.add("opacity-100");
        }, 2000);
      }
    });
  }
});
