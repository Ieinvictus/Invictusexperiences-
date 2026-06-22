document.addEventListener("DOMContentLoaded", () => {

  const rmBarMenuBtn = document.getElementById("rmBarMenuBtn");
  const rmBarCurtainMenu = document.getElementById("rmBarCurtainMenu");

  if (!rmBarMenuBtn || !rmBarCurtainMenu) return;

  // Open / Close Menu
  rmBarMenuBtn.addEventListener("click", () => {
    rmBarMenuBtn.classList.toggle("active");
    rmBarCurtainMenu.classList.toggle("active");
    document.body.style.overflow =
      rmBarCurtainMenu.classList.contains("active")
        ? "hidden"
        : "";
  });

  // Close when menu link clicked
  document.querySelectorAll(".rm-bar-menu-links a").forEach((link) => {
    link.addEventListener("click", () => {
      rmBarMenuBtn.classList.remove("active");
      rmBarCurtainMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      rmBarMenuBtn.classList.remove("active");
      rmBarCurtainMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

});
