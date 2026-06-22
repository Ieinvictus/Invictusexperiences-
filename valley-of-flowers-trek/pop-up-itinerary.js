  /* =========================
     ===== ITINERARY POPUP ===
     ========================= */
  const itineraryPopups = document.querySelectorAll(".itinerary-popup");

  document.querySelectorAll("[data-popup-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementById(btn.dataset.popupTarget);
      if (popup) {
        popup.style.display = "flex";
        body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll(".itinerary-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = btn.closest(".itinerary-popup");
      popup.style.display = "none";
      body.style.overflow = "";
    });
  });

  /* 👉 OUTSIDE CLICK CLOSE (OLD JS LIKE) */
  itineraryPopups.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        body.style.overflow = "";
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      itineraryPopups.forEach((p) => (p.style.display = "none"));
      body.style.overflow = "";
    }
  });
