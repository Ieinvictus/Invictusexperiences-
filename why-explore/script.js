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

    msg.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

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
          '<i class="fa-solid fa-campground"></i> You\'re in! Get ready for exciting treks and adventure updates.';
        input.value = "";
      } else {
        msg.innerHTML = "❌ Subscription failed. Try again.";
      }
    } catch (error) {
      msg.innerHTML = "❌ Server error. Try later.";
    }
  });
});
