/* ==================================================
NAVIGATION SYSTEM
================================================== */
const mobileMenu = document.getElementById("mobileMenu");
const navToggle = document.querySelector(".nav-toggle");
const dropdowns = document.querySelectorAll(".dropdown");

window.toggleMenu = function () {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "auto";
};

document.querySelectorAll(".dropdown-toggle").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    dropdowns.forEach((drop) => {
      if (drop !== this.parentElement) drop.classList.remove("active");
    });
    this.parentElement.classList.toggle("active");
  });
});

document.addEventListener("click", function (e) {
  dropdowns.forEach((drop) => {
    if (!drop.contains(e.target)) drop.classList.remove("active");
  });

  if (
    mobileMenu &&
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    navToggle &&
    !navToggle.contains(e.target)
  ) {
    toggleMenu();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    dropdowns.forEach((drop) => drop.classList.remove("active"));
    if (mobileMenu && mobileMenu.classList.contains("active")) toggleMenu();
  }
});
/* ===============================
FOOTER SUBSCRIBE SYSTEM
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const API = "https://invictus-zoho-api.rahulbpadaliya.workers.dev/";

  const btn = document.querySelector(".footer-subscribe button");
  const input = document.querySelector(".footer-subscribe input");
  const msg = document.querySelector(".subscribe-message");

  if (!btn || !input || !msg) return;

  btn.addEventListener("click", async () => {

    const email = input.value.trim();

    // ✅ Email validation
    if (!email || !email.includes("@")) {
      msg.innerHTML = "⚠️ Please enter a valid email";
      return;
    }

    msg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        msg.innerHTML = '<i class="fa-solid fa-campground"></i> You\'re in! Get ready for exciting treks and adventure updates.';
        input.value = "";
      } else {
        msg.innerHTML = "❌ Subscription failed. Try again.";
      }

    } catch (error) {
      msg.innerHTML = "❌ Server error. Try later.";
    }

  });

});