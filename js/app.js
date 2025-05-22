document.addEventListener("DOMContentLoaded", () => {
  const zoomedImage = document.getElementById("zoomedImage");
  const zoomedAudio = document.getElementById("zoomedAudio");

  // ZOOM.HTML uniquement
  if (zoomedImage && zoomedAudio) {
    const params = new URLSearchParams(window.location.search);
    const imageSrc = params.get("image");
    const audioSrc = params.get("audio");

    if (imageSrc && audioSrc) {
      zoomedImage.src = imageSrc;
      zoomedAudio.src = audioSrc;
      zoomedAudio.load();

      setTimeout(() => {
        zoomedAudio.play().catch(() => {
          console.warn("🔇 Lecture bloquée, interaction requise.");
        });
      }, 300);
    }

    // Fermer avec la touche Échap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        zoomedAudio.pause();
        window.history.back();
      }
    });

    // Bouton croix
    const closeBtn = document.getElementById("closeZoomBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        zoomedAudio.pause();
        zoomedAudio.currentTime = 0;
        window.history.back();
      });
    }
  }

  // INDEX.HTML : lecture unique si jamais y’a plusieurs <audio>
  const players = document.querySelectorAll("audio");
  players.forEach((player) => {
    player.addEventListener("play", () => {
      players.forEach((p) => {
        if (p !== player) {
          p.pause();
          p.currentTime = 0;
        }
      });
    });
  });
});
