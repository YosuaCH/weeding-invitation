window.initScrollAnimations = function () {
  gsap.registerPlugin(ScrollTrigger);

  // --- Navbar Scroll Animation ---
  gsap.to("#hero-content", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "300vh top",
      scrub: true,
    },
    y: () => -(window.innerHeight / 2) + 50,
    scale: 0.25,
    ease: "power1.inOut",
  });

  const colorTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#events-section",
      start: "top 100px",
      end: "top 30px",
      scrub: true,
    },
  });

  colorTl
    .fromTo(
      "#name path",
      { fill: "rgba(255,255,255,1)", stroke: "rgba(255,255,255,1)" },
      {
        fill: "#1a1a1a",
        stroke: "#1a1a1a",
        ease: "none",
        immediateRender: false,
      },
      0,
    )
    .fromTo(
      ["#sub-title", "#date"],
      { color: "rgba(255,255,255,1)" },
      { color: "#1a1a1a", ease: "none", immediateRender: false },
      0,
    )
    .fromTo(
      "#line",
      { backgroundColor: "rgba(255,255,255,1)" },
      { backgroundColor: "#1a1a1a", ease: "none", immediateRender: false },
      0,
    );
  // --- Audio Button Color Animation ---
  const audioColorTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#events-section",
      start: "top 90%",
      end: "top 75%",
      scrub: true,
    },
  });

  audioColorTl
    .fromTo(
      ["#music_label", ".vinyl-icon"],
      { color: "rgba(255,255,255,1)" },
      { color: "#1a1a1a", ease: "none", immediateRender: false },
      0,
    )
    .fromTo(
      "#wave-path",
      { stroke: "rgba(255,255,255,1)" },
      { stroke: "#1a1a1a", ease: "none", immediateRender: false },
      0,
    )
    .fromTo(
      "#music_toggle > div.rounded-full",
      {
        backgroundColor: "rgba(0,0,0,0.4)",
        borderColor: "rgba(255,255,255,0.2)",
      },
      {
        backgroundColor: "rgba(255,255,255,0.4)",
        borderColor: "rgba(0,0,0,0.2)",
        ease: "none",
        immediateRender: false,
      },
      0,
    );

  // --- Audio Button Revert to White on Dark Images ---
  const darkSections = document.querySelectorAll(".dark-section-trigger");
  darkSections.forEach((section) => {
    const revertTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        end: "top 80%",
        scrub: true,
      },
    });

    revertTl
      .fromTo(
        ["#music_label", ".vinyl-icon"],
        { color: "#1a1a1a" },
        { color: "rgba(255,255,255,1)", ease: "none", immediateRender: false },
        0,
      )
      .fromTo(
        "#wave-path",
        { stroke: "#1a1a1a" },
        { stroke: "rgba(255,255,255,1)", ease: "none", immediateRender: false },
        0,
      )
      .fromTo(
        "#music_toggle > div.rounded-full",
        {
          backgroundColor: "rgba(255,255,255,0.4)",
          borderColor: "rgba(0,0,0,0.2)",
        },
        {
          backgroundColor: "rgba(0,0,0,0.4)",
          borderColor: "rgba(255,255,255,0.2)",
          ease: "none",
          immediateRender: false,
        },
        0,
      );

    const revertBackTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom 95%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    revertBackTl
      .fromTo(
        ["#music_label", ".vinyl-icon"],
        { color: "rgba(255,255,255,1)" },
        { color: "#1a1a1a", ease: "none", immediateRender: false },
        0,
      )
      .fromTo(
        "#wave-path",
        { stroke: "rgba(255,255,255,1)" },
        { stroke: "#1a1a1a", ease: "none", immediateRender: false },
        0,
      )
      .fromTo(
        "#music_toggle > div.rounded-full",
        {
          backgroundColor: "rgba(0,0,0,0.4)",
          borderColor: "rgba(255,255,255,0.2)",
        },
        {
          backgroundColor: "rgba(255,255,255,0.4)",
          borderColor: "rgba(0,0,0,0.2)",
          ease: "none",
          immediateRender: false,
        },
        0,
      );
  });
};
