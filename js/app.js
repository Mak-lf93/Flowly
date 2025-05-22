document.addEventListener("DOMContentLoaded", () => {
  const zoomedImage = document.getElementById("zoomedImage");
  const zoomedAudio = document.getElementById("zoomedAudio");
  const zoomedTitle = document.getElementById("zoomedTitle");

  // === Page zoom.html ===
  if (zoomedImage && zoomedAudio) {
    const params = new URLSearchParams(window.location.search);
    const imageSrc = params.get("image");
    const audioSrc = params.get("audio");

    if (imageSrc && audioSrc) {
      zoomedImage.src = imageSrc;
      zoomedImage.onerror = () => {
        zoomedImage.style.display = "none";
        if (zoomedTitle) zoomedTitle.textContent += " (pas de pochette)";
      };

      zoomedAudio.src = audioSrc;
      zoomedAudio.load();
      setTimeout(() => {
        zoomedAudio.play().catch(() => {
          console.log("🔇 Lecture bloquée, interaction requise.");
        });
      }, 300);

      // Extraire le nom du son
      const fileName = audioSrc.split("/").pop().replace(".mp3", "");
      const cleanName = fileName.replace(/[-_]/g, " ");
      if (zoomedTitle) zoomedTitle.textContent = cleanName;
    }

    // Bouton de fermeture
    const closeBtn = document.getElementById("closeZoomBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        zoomedAudio.pause();
        zoomedAudio.currentTime = 0;
        window.history.back();
      });
    }

    // Fermer avec touche Échap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        zoomedAudio.pause();
        window.history.back();
      }
    });
  }

  // === Page index.html : une seule musique jouée à la fois ===
  const allAudio = document.querySelectorAll("audio");
  allAudio.forEach((player) => {
    player.addEventListener("play", () => {
      allAudio.forEach((other) => {
        if (other !== player) {
          other.pause();
          other.currentTime = 0;
        }
      });
    });
  });
});
