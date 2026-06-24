document.addEventListener("DOMContentLoaded", async () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const params = new URLSearchParams(window.location.search);
  let guestName = params.get("to");

  if (guestName) {
    guestName = decodeURIComponent(guestName);

    // Ambil data tamu dari Supabase
    try {
      if (window.supabaseAuthPromise) {
        await window.supabaseAuthPromise;
      }

      let query = window.supabaseClient
        .from("master_guest")
        .select("guest_id, guest_name, total_guests")
        .ilike("guest_name", `%${guestName.trim()}%`);

      const { data, error } = await query.limit(1);

      if (error) {
        console.error("Supabase Error:", error);
        alert(
          "Gagal terhubung ke database. Cek pengaturan RLS (Error: " +
            (error.message || error.code) +
            ")",
        );
      } else if (data && data.length > 0) {
        window.currentGuestData.id = data[0].guest_id;
        window.currentGuestData.name = data[0].guest_name;
        window.currentGuestData.total_guests = data[0].total_guests;

        const guestNameEl = document.getElementById("cover-guest-name");
        if (guestNameEl) {
          guestNameEl.textContent = data[0].guest_name;
        }
        
        const totalGuestsEl = document.getElementById("cover-total-guests");
        const totalGuestsValEl = document.getElementById("guest-count-val");
        if (totalGuestsEl && totalGuestsValEl && data[0].total_guests) {
          totalGuestsValEl.textContent = data[0].total_guests;
          totalGuestsEl.classList.remove("hidden");
        }
      } else {
        const identifier = `Nama '${guestName}'`;
        console.warn("Data tamu tidak terdaftar di database:", identifier);
        alert(identifier + " tidak ditemukan di database Supabase.");
      }
    } catch (e) {
      console.error("Gagal mengambil data tamu", e);
      alert("Terjadi kesalahan sistem saat menghubungi database: " + e.message);
    }
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
      window.lenisInstance.scrollTo(0, { immediate: true });
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
      "#cover-total-guests",
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6",
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
