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
    const animateWishCards = () => {
      const wishCards = wishesSection.querySelectorAll(".wish-card");
      if (wishCards.length) {
        tl.fromTo(
          wishCards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.5",
        );
      }
    };

    const wishesLists = document.querySelectorAll(
      ".wishes-list-original, .wishes-list-duplicate",
    );

    // Fetch letters from Supabase
    async function loadLetters() {
      try {
        if (window.supabaseAuthPromise) {
          await window.supabaseAuthPromise;
        }

        const { data, error } = await window.supabaseClient
          .from("master_letter")
          .select("letter_name, message_letter")
          .order("letter_name", { ascending: true });

        if (error) {
          console.warn("Error RLS atau lainnya:", error);
          animateWishCards();
          return;
        }

        if (data && data.length > 0) {
          // Clear dummy wishes
          wishesLists.forEach((list) => (list.innerHTML = ""));

          data.forEach((letter) => {
            const cardHTML = createWishCardHTML(
              letter.letter_name,
              letter.message_letter,
            );
            wishesLists.forEach((list) => {
              const div = document.createElement("div");
              div.innerHTML = cardHTML;
              list.appendChild(div.firstElementChild);
            });
          });

          // trigger animation after loading
          animateWishCards();
        } else {
          animateWishCards(); // Animate dummy ones if no data
        }
      } catch (e) {
        console.error("Gagal mengambil ucapan:", e);
        animateWishCards();
      }
    }

    function createWishCardHTML(name, wish) {
      return `
        <div class="wish-card flex flex-col border-t border-[#f9f6f1]/20 pt-8">
          <span class="font-serif text-6xl text-[#f9f6f1]/20 leading-none h-8">&ldquo;</span>
          <p class="font-serif text-xl md:text-2xl text-[#f9f6f1] leading-relaxed mb-6 mt-4">
            ${escapeHTML(wish)}
          </p>
          <div class="flex items-center gap-4">
            <div class="w-8 h-[1px] bg-[#f9f6f1]/40"></div>
            <span class="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f9f6f1]/70">${escapeHTML(name)}</span>
          </div>
        </div>
      `;
    }

    // Hanya load letters jika supabase tersedia
    if (window.supabaseClient) {
      loadLetters();
    } else {
      animateWishCards();
    }

    // Form Submission Logic
    const form = document.getElementById("wishes-form");

    if (form && wishesLists.length > 0) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Checker apakah ada guest_id yang valid
        if (!window.currentGuestData || !window.currentGuestData.id) {
          alert(
            "Maaf, nama Anda tidak ditemukan di buku tamu. Anda tidak dapat mengirim ucapan.",
          );
          return;
        }

        const nameInput = document.getElementById("guest-name");
        const wishInput = document.getElementById("guest-wish");

        const name = nameInput.value.trim();
        const wish = wishInput.value.trim();
        const btn = form.querySelector("button[type='submit']");
        const originalText = btn.innerText;

        if (name && wish) {
          btn.innerText = "Publishing...";
          btn.disabled = true;

          // Insert ke Supabase
          try {
            const { error } = await window.supabaseClient
              .from("master_letter")
              .insert([
                {
                  letter_name: name,
                  message_letter: wish,
                  guest_id: window.currentGuestData.id,
                },
              ]);

            if (error) {
              console.error("Supabase insert error:", error);
              throw error;
            }

            // Optimistic UI update
            const cardHTML = createWishCardHTML(name, wish);
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = cardHTML;
            const newCard = tempDiv.firstElementChild;

            wishesLists.forEach((list) => {
              const cardClone = newCard.cloneNode(true);
              list.insertBefore(cardClone, list.firstChild);

              gsap.fromTo(
                cardClone,
                { opacity: 0, height: 0, y: -20 },
                {
                  opacity: 1,
                  height: "auto",
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                },
              );
            });

            form.reset();
            btn.innerText = "Letter Published!";
            btn.classList.add("bg-green-500", "text-white");

            setTimeout(() => {
              btn.innerText = originalText;
              btn.classList.remove("bg-green-500", "text-white");
              btn.disabled = false;
            }, 3000);
          } catch (e) {
            console.error("Gagal mengirim ucapan:", e);
            alert(
              "Terjadi kesalahan atau RLS menolak aksi ini (Peringatan Error 401/403).",
            );
            btn.innerText = originalText;
            btn.disabled = false;
          }
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
