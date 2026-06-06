document.addEventListener("DOMContentLoaded", () => {
  function initCoupleAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initCoupleAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("couple-section");
    if (!section) return;

    // Header elements
    const eyebrow = section.querySelector(".couple-eyebrow");
    const title = section.querySelector(".couple-title");
    const subtitle = section.querySelector(".couple-subtitle");

    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 20 });
    if (title) gsap.set(title, { opacity: 0, y: 35 });
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: section.querySelector(".couple-header"),
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 }, 0);
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 1.0 }, 0.15);
        if (subtitle)
          tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
      },
    });

    //2. Bride side (slide from left)
    const personLeft = section.querySelector(".couple-person-left");
    const photoLeft = personLeft?.querySelector(".couple-photo");
    const infoLeft = personLeft?.querySelector(".couple-info");
    const issueTagLeft = personLeft?.querySelector(".couple-issue-tag");
    const cornersLeft = personLeft?.querySelectorAll(".corner");

    if (personLeft) {
      gsap.set(personLeft, { opacity: 0, x: -60 });
      ScrollTrigger.create({
        trigger: personLeft,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          // Container slides in
          tl.to(personLeft, { opacity: 1, x: 0, duration: 1.1 }, 0);

          // Photo reveals via clip-path
          if (photoLeft) {
            const innerLeft = photoLeft.querySelector(".couple-photo-inner");
            if (innerLeft) {
              tl.fromTo(
                innerLeft,
                { clipPath: "inset(100% 0 0 0)" },
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: 1.3,
                  ease: "power4.inOut",
                },
                0.15,
              );
            }
          }

          // Issue tag fades in
          if (issueTagLeft) {
            gsap.set(issueTagLeft, { opacity: 0, scaleX: 0.5 });
            tl.to(
              issueTagLeft,
              { opacity: 1, scaleX: 1, duration: 0.7, ease: "back.out(1.5)" },
              0.8,
            );
          }

          // Corners animate
          if (cornersLeft) {
            gsap.set(cornersLeft, { opacity: 0, scale: 0.5 });
            tl.to(
              cornersLeft,
              {
                opacity: 0.5,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "back.out(2)",
              },
              0.9,
            );
          }

          // Name info fades up
          if (infoLeft) {
            gsap.set(infoLeft, { opacity: 0, y: 30 });
            tl.to(
              infoLeft,
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              0.6,
            );
          }
        },
      });
    }

    // Groom side
    const personRight = section.querySelector(".couple-person-right");
    const photoRight = personRight?.querySelector(".couple-photo");
    const infoRight = personRight?.querySelector(".couple-info");
    const issueTagRight = personRight?.querySelector(".couple-issue-tag");
    const cornersRight = personRight?.querySelectorAll(".corner");

    if (personRight) {
      gsap.set(personRight, { opacity: 0, x: 60 });
      ScrollTrigger.create({
        trigger: personRight,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(personRight, { opacity: 1, x: 0, duration: 1.1 }, 0);

          if (photoRight) {
            const innerRight = photoRight.querySelector(".couple-photo-inner");
            if (innerRight) {
              tl.fromTo(
                innerRight,
                { clipPath: "inset(100% 0 0 0)" },
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: 1.3,
                  ease: "power4.inOut",
                },
                0.2,
              );
            }
          }

          if (issueTagRight) {
            gsap.set(issueTagRight, { opacity: 0, scaleX: 0.5 });
            tl.to(
              issueTagRight,
              { opacity: 1, scaleX: 1, duration: 0.7, ease: "back.out(1.5)" },
              0.8,
            );
          }

          if (cornersRight) {
            gsap.set(cornersRight, { opacity: 0, scale: 0.5 });
            tl.to(
              cornersRight,
              {
                opacity: 0.5,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "back.out(2)",
              },
              0.9,
            );
          }

          if (infoRight) {
            gsap.set(infoRight, { opacity: 0, y: 30 });
            tl.to(
              infoRight,
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              0.6,
            );
          }
        },
      });
    }

    // Center divider grow animation
    const centerEl = section.querySelector(".couple-center");
    const centerLines = section.querySelectorAll(".couple-center-line");
    const ampersandEl = section.querySelector(".couple-ampersand");
    const dateStamp = section.querySelector(".couple-date-stamp");

    if (centerEl) {
      gsap.set(centerLines, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(ampersandEl, { opacity: 0, scale: 0.6 });
      if (dateStamp) gsap.set(dateStamp, { opacity: 0 });

      ScrollTrigger.create({
        trigger: centerEl,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(centerLines, { scaleY: 1, duration: 1.2, stagger: 0.1 }, 0);
          tl.to(
            ampersandEl,
            { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.7)" },
            0.5,
          );
          if (dateStamp) tl.to(dateStamp, { opacity: 1, duration: 0.6 }, 1.0);
        },
      });
    }

    //Footer strip
    const footer = section.querySelector(".couple-footer");
    if (footer) {
      gsap.set(footer, { opacity: 0, y: 15 });
      ScrollTrigger.create({
        trigger: footer,
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }),
      });
    }

    // Background grid lines parallax
    const lineV = section.querySelector(".couple-line-v");
    const lineH = section.querySelector(".couple-line-h");
    if (lineV) {
      gsap.fromTo(
        lineV,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 90%", once: true },
        },
      );
    }
    if (lineH) {
      gsap.fromTo(
        lineH,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: { trigger: section, start: "top 90%", once: true },
        },
      );
    }

    // Audio button: stays dark over couple section
    if (window.initScrollAnimations) {
    }
  }

  // Hook into the same pattern: wait for lenis + hero animation to finish,
  // then register couple triggers after story-section is visible
  if (typeof gsap !== "undefined") {
    initCoupleAnimations();
  } else {
    window.addEventListener("load", initCoupleAnimations);
  }
});
