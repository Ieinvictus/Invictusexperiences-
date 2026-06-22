document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  document.querySelectorAll(".travel-popup-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementById(btn.dataset.popup);

      if (popup) {
        popup.style.display = "flex";
        body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll(".travel-close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".travel-popup-overlay").style.display = "none";
      body.style.overflow = "";
    });
  });

  document.querySelectorAll(".travel-popup-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
        body.style.overflow = "";
      }
    });
  });

});
