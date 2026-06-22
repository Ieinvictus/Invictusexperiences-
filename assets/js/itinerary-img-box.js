  /* =========================
     ===== ITINERARY IMAGE ===
     ========================= */
  const itineraryImages = document.querySelectorAll(".itinerary-photo img");
  if (itineraryImages.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    itineraryImages.forEach((img) => observer.observe(img));
  }
