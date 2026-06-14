document.addEventListener("DOMContentLoaded", () => {
  function initWishesAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initWishesAnimations, 100);
      return;
    }

    const wishesSection = document.getElementById("wishes-section");
    if (!wishesSection) return;

    // Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wishesSection,
        start: "top 70%",
      },
    });

    // Form animation
    const formContainer = wishesSection.querySelector(".wishes-form-w");
    if (formContainer) {
      tl.fromTo(
        formContainer,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      );
    }

    // Existing wishes animation
    const wishCards = wishesSection.querySelectorAll(".wish-card");
    if (wishCards.length) {
      tl.fromTo(
        wishCards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.5",
      );
    }

    // Form Submission Logic
    const form = document.getElementById("wishes-form");
    const wishesList = document.getElementById("wishes-list");

    if (form && wishesList) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("guest-name");
        const wishInput = document.getElementById("guest-wish");

        const name = nameInput.value.trim();
        const wish = wishInput.value.trim();

        if (name && wish) {
          // Create new wish card
          const newCard = document.createElement("div");
          newCard.className =
            "wish-card flex flex-col border-t border-[#f9f6f1]/20 pt-8";

          newCard.innerHTML = `
            <span class="font-serif text-6xl text-[#f9f6f1]/20 leading-none h-8">&ldquo;</span>
            <p class="font-serif text-xl md:text-2xl text-[#f9f6f1] leading-relaxed mb-6 mt-4">
              ${escapeHTML(wish)}
            </p>
            <div class="flex items-center gap-4">
              <div class="w-8 h-[1px] bg-[#f9f6f1]/40"></div>
              <span class="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f9f6f1]/70">${escapeHTML(name)}</span>
            </div>
          `;

          // Prepend to list
          wishesList.insertBefore(newCard, wishesList.firstChild);

          // Animate the new card
          gsap.fromTo(
            newCard,
            { opacity: 0, height: 0, y: -20 },
            {
              opacity: 1,
              height: "auto",
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
          );

          // Reset form
          form.reset();

          // Change button text temporarily
          const btn = form.querySelector("button[type='submit']");
          const originalText = btn.innerText;
          btn.innerText = "Letter Published!";
          btn.classList.add("bg-green-500", "text-white");

          setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove("bg-green-500", "text-white");
          }, 3000);
        }
      });
    }

    // Utility to prevent XSS
    function escapeHTML(str) {
      const div = document.createElement("div");
      div.innerText = str;
      return div.innerHTML;
    }
  }

  initWishesAnimations();
});
