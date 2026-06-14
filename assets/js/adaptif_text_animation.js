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
      trigger: "#quote-section",
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

  const wishesColorTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#wishes-section",
      start: "top 100px",
      end: "top 30px",
      scrub: true,
    },
  });

  wishesColorTl
    .fromTo(
      "#name path",
      { fill: "#1a1a1a", stroke: "#1a1a1a" },
      {
        fill: "rgba(255,255,255,1)",
        stroke: "rgba(255,255,255,1)",
        ease: "none",
        immediateRender: false,
      },
      0,
    )
    .fromTo(
      ["#sub-title", "#date"],
      { color: "#1a1a1a" },
      { color: "rgba(255,255,255,1)", ease: "none", immediateRender: false },
      0,
    )
    .fromTo(
      "#line",
      { backgroundColor: "#1a1a1a" },
      { backgroundColor: "rgba(255,255,255,1)", ease: "none", immediateRender: false },
      0,
    );

  // --- Audio Button Color Animation ---
  function setAudioDark() {
    gsap.to(["#music_label", ".vinyl-icon"], {
      color: "#1a1a1a",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to("#wave-path", {
      stroke: "#1a1a1a",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to("#music_toggle > div.rounded-full", {
      backgroundColor: "rgba(255,255,255,0.4)",
      borderColor: "rgba(0,0,0,0.2)",
      duration: 0.3,
      overwrite: "auto",
    });
  }

  function setAudioLight() {
    gsap.to(["#music_label", ".vinyl-icon"], {
      color: "rgba(255,255,255,1)",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to("#wave-path", {
      stroke: "rgba(255,255,255,1)",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to("#music_toggle > div.rounded-full", {
      backgroundColor: "rgba(0,0,0,0.4)",
      borderColor: "rgba(255,255,255,0.2)",
      duration: 0.3,
      overwrite: "auto",
    });
  }

  // Berubah gelap saat masuk ke area konten putih
  ScrollTrigger.create({
    trigger: "#quote-section",
    start: "top 95%",
    onEnter: setAudioDark,
    onLeaveBack: setAudioLight,
  });

  // Berubah kembali terang HANYA saat menutupi gambar gelap
  const darkSections = document.querySelectorAll(".dark-section-trigger");
  
  let darkSectionsCount = 0;
  
  darkSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 95%",
      end: "bottom 80%",
      onEnter: () => {
        darkSectionsCount++;
        if (darkSectionsCount === 1) setAudioLight();
      },
      onLeave: () => {
        darkSectionsCount--;
        if (darkSectionsCount === 0) setAudioDark();
      },
      onEnterBack: () => {
        darkSectionsCount++;
        if (darkSectionsCount === 1) setAudioLight();
      },
      onLeaveBack: () => {
        darkSectionsCount--;
        if (darkSectionsCount === 0) setAudioDark();
      },
    });
  });

  const editorialText = document.querySelector(".editorial-text");
  const editorialImage = document.querySelector(".editorial-image");

  if (editorialText) gsap.set(editorialText, { y: 60, opacity: 0 });
  if (editorialImage) gsap.set(editorialImage, { scale: 1.15 });

  if (editorialText) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(editorialText, {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: "power3.out",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(editorialText);
  }

  if (editorialImage) {
    gsap.to(editorialImage, {
      scrollTrigger: {
        trigger: "#events-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      scale: 1,
      ease: "none",
    });
  }
};
