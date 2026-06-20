//tour box//
document.querySelectorAll(".slider").forEach((slider) => {
  const imgs = slider.querySelectorAll("img");
  const dotsBox = slider.querySelector(".dots");
  let index = 0;

  imgs.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll("span");

  setInterval(() => {
    imgs[index].classList.remove("active");
    dots[index].classList.remove("active");
    index = (index + 1) % imgs.length;
    imgs[index].classList.add("active");
    dots[index].classList.add("active");
  }, 4000);
});

//nvbar//
/* ==================================================
   NAVIGATION SYSTEM
================================================== */

const mobileMenu = document.getElementById("mobileMenu");
const navToggle = document.querySelector(".nav-toggle");
const dropdowns = document.querySelectorAll(".dropdown");

/* ================= MOBILE MENU TOGGLE ================= */
window.toggleMenu = function () {
  if (!mobileMenu) return;

  mobileMenu.classList.toggle("active");

  // Body scroll lock
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

/* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
document.addEventListener("click", (e) => {
  dropdowns.forEach((drop) => {
    if (!drop.contains(e.target)) {
      drop.classList.remove("active");
    }
  });
});

/* ================= ESC KEY CLOSE ================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close dropdowns
    dropdowns.forEach((drop) => drop.classList.remove("active"));

    // Close mobile menu
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      window.toggleMenu();
    }
  }
});

/* ==================================================
   DROPDOWN CLICK SYSTEM
================================================== */

const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();

    const parent = this.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach((d) => {
      if (d !== parent) {
        d.classList.remove("active");
      }
    });

    // Toggle current dropdown
    parent.classList.toggle("active");
  });
});
/* ===============================
FOOTER SUBSCRIBE SYSTEM
================================ */

/* =========================================
FOOTER SUBSCRIBE
========================================= */

const API = "https://invictus-zoho-api.rahulbpadaliya.workers.dev";

const form = document.querySelector(".footer-subscribe");
const input = document.querySelector(".footer-subscribe input");
const btn = document.querySelector(".footer-subscribe button");
const msg = document.querySelector(".subscribe-message");

if(form && input && btn && msg){

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = input.value.trim();

    if(!email || !email.includes("@")){
      msg.innerHTML = "⚠️ Please enter a valid email address";
      msg.style.color = "#ffb74d";
      return;
    }

    btn.disabled = true;

    msg.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

    msg.style.color = "#ffeb3b";

    try{

      const res = await fetch(API,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ email })
      });

      if(res.ok){

        msg.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Successfully subscribed!';

        msg.style.color = "#25D366";

        input.value = "";

      }else{

        msg.innerHTML =
        '<i class="fa-solid fa-circle-xmark"></i> Subscription failed.';

        msg.style.color = "#ff6b6b";
      }

    }catch(error){

      msg.innerHTML =
      '<i class="fa-solid fa-circle-xmark"></i> Server error. Try again later.';

      msg.style.color = "#ff6b6b";
    }

    btn.disabled = false;

    setTimeout(()=>{
      msg.innerHTML = "";
    },6000);

  });

}
