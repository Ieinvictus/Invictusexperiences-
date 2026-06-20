document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     READ MORE TOGGLE
  ================================================== */

  const buttons = document.querySelectorAll(".read-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {

      const infoBox = this.closest(".hero-info");
      if (!infoBox) return;

      infoBox.classList.toggle("open");

      this.textContent = infoBox.classList.contains("open")
        ? "Read Less"
        : "Read More";
    });
  });

  /* ==================================================
     MOBILE SIDEMENU
  ================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.querySelector(".close-btnx");

  if (menuToggle && sideMenu) {

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sideMenu.classList.toggle("open");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sideMenu.classList.remove("open");
      });
    }

    sideMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        sideMenu.classList.contains("open") &&
        !sideMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sideMenu.classList.remove("open");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        sideMenu.classList.remove("open");
      }
    });
  }

  /* ==================================================
     NAVBAR DROPDOWN SYSTEM
  ================================================== */

  const mobileMenu = document.getElementById("mobileMenu");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");

  window.toggleMenu = function () {

    if (!mobileMenu) return;

    mobileMenu.classList.toggle("active");

    document.body.style.overflow =
      mobileMenu.classList.contains("active")
        ? "hidden"
        : "auto";
  };

  document.querySelectorAll(".dropdown-toggle").forEach(item => {

    item.addEventListener("click", function (e) {

      e.preventDefault();

      dropdowns.forEach(drop => {
        if (drop !== this.parentElement) {
          drop.classList.remove("active");
        }
      });

      this.parentElement.classList.toggle("active");
    });
  });

  document.addEventListener("click", function (e) {

    dropdowns.forEach(drop => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("active");
      }
    });

    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      mobileMenu.querySelector(".mobile-menu-box") &&
      !mobileMenu.querySelector(".mobile-menu-box").contains(e.target) &&
      navToggle &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

      dropdowns.forEach(drop => {
        drop.classList.remove("active");
      });

      if (
        mobileMenu &&
        mobileMenu.classList.contains("active")
      ) {
        toggleMenu();
      }
    }
  });

  /* ==================================================
     FOOTER SUBSCRIBE SYSTEM
  ================================================== */

  const API =
    "https://invictus-zoho-api.rahulbpadaliya.workers.dev";

  const form = document.querySelector(".footer-subscribe");
  const input = document.querySelector(".footer-subscribe input");
  const btn = document.querySelector(".footer-subscribe button");
  const msg = document.querySelector(".subscribe-message");

  if (form && input && btn && msg) {

    form.addEventListener("submit", async function (e) {

      e.preventDefault();

      const email = input.value.trim();

      if (!email || !email.includes("@")) {

        msg.innerHTML =
          "⚠️ Please enter a valid email address";

        msg.style.color = "#ffb74d";

        return;
      }

      btn.disabled = true;

      msg.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

      msg.style.color = "#ffeb3b";

      try {

        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        if (res.ok) {

          msg.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Successfully subscribed!';

          msg.style.color = "#25D366";

          input.value = "";

        } else {

          msg.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i> Subscription failed.';

          msg.style.color = "#ff6b6b";
        }

      } catch (error) {

        msg.innerHTML =
          '<i class="fa-solid fa-circle-xmark"></i> Server error. Try again later.';

        msg.style.color = "#ff6b6b";
      }

      btn.disabled = false;

      setTimeout(() => {
        msg.innerHTML = "";
      }, 6000);
    });
  }

});
