const rmBarMenuBtn = document.getElementById("rmBarMenuBtn");
const rmBarCurtainMenu = document.getElementById("rmBarCurtainMenu");

if (rmBarMenuBtn && rmBarCurtainMenu) {

  rmBarMenuBtn.addEventListener("click", () => {
    rmBarMenuBtn.classList.toggle("active");
    rmBarCurtainMenu.classList.toggle("active");
  });

  document.querySelectorAll(".rm-bar-menu-links a").forEach(link => {
    link.addEventListener("click", () => {
      rmBarMenuBtn.classList.remove("active");
      rmBarCurtainMenu.classList.remove("active");
    });
  });

}
