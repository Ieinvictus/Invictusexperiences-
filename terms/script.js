const cards = document.querySelectorAll(".term-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.querySelector(".side-menu");
  const closeBtn = document.querySelector(".close-btnx");
  const navLinks = document.querySelectorAll(".side-menu a");

  // Open menu
  menuToggle.addEventListener("click", function () {
    sideMenu.classList.add("open");
    document.body.style.overflow = "hidden"; // prevent background scroll
  });

  // Close menu button
  closeBtn.addEventListener("click", function () {
    closeMenu();
  });

  // Close when clicking nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  function closeMenu() {
    sideMenu.classList.remove("open");
    document.body.style.overflow = "auto";
  }
});

// nav bar//
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobileMenu");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");

  /* ================= MOBILE MENU TOGGLE ================= */

  window.toggleMenu = function () {
    mobileMenu.classList.toggle("active");

    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  };

  /* ================= DROPDOWN (DESKTOP + MOBILE SAME SYSTEM) ================= */

  document.querySelectorAll(".dropdown-toggle").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      dropdowns.forEach((drop) => {
        if (drop !== this.parentElement) {
          drop.classList.remove("active");
        }
      });

      this.parentElement.classList.toggle("active");
    });
  });

  /* ================= CLICK OUTSIDE CLOSE ================= */

  document.addEventListener("click", function (e) {
    // Close dropdown if clicked outside
    dropdowns.forEach((drop) => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("active");
      }
    });

    // Close mobile menu if clicked outside
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.querySelector(".mobile-menu-box").contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  /* ================= ESC KEY CLOSE ================= */

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dropdowns.forEach((drop) => drop.classList.remove("active"));

      if (mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    }
  });
});