  /* =========================
     ===== READ MORE =========
     ========================= */
  document.querySelectorAll(".readmore-inline").forEach((link) => {
    link.addEventListener("click", () => {
      const content = link
        .closest(".day-info")
        ?.querySelector(".readmore-content");
      if (!content) return;

      content.classList.toggle("show");
      link.textContent = content.classList.contains("show")
        ? "Show less"
        : "…Know More";
    });
  });
