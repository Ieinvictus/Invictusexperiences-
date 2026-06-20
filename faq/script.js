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
//faqs

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");

    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
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
