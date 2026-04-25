document.addEventListener("DOMContentLoaded", () => {
  const musicToggle = document.getElementById("music_toggle");
  const musicLabel = document.getElementById("music_label");
  const bgMusic = document.getElementById("bg-music");
  const wavePath = document.getElementById("wave-path");

  let isPlaying = false;
  let currentAmplitude = 0;
  let targetAmplitude = 0;
  let time = 0;

  function renderWave() {
    requestAnimationFrame(renderWave);
    currentAmplitude += (targetAmplitude - currentAmplitude) * 0.1;
    time += 0.015;

    if (currentAmplitude < 0.01 && targetAmplitude === 0) {
      wavePath.setAttribute("d", "M 0 10 L 60 10");
      return;
    }

    // Wave animation
    let d = `M 0 10`;
    for (let x = 1; x <= 60; x++) {
      let envelope = Math.sin((x / 60) * Math.PI);
      let wave = Math.sin(x * 0.12 - time * 4);
      let y = 10 + wave * 6 * envelope * currentAmplitude;

      d += ` L ${x} ${y}`;
    }
    wavePath.setAttribute("d", d);
  }

  renderWave();

  musicToggle.addEventListener("click", (e) => {
    e.preventDefault();

    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
      musicToggle.classList.add("paused");
      musicLabel.innerText = "SOUND OFF";
      targetAmplitude = 0;
      isPlaying = false;
    } else {
      bgMusic.play().catch((error) => {
        console.log("Autoplay dicegah oleh browser:", error);
      });
      musicToggle.classList.remove("paused");
      musicToggle.classList.add("playing");
      musicLabel.innerText = "SOUND ON";
      targetAmplitude = 1;
      isPlaying = true;
    }
  });
});
