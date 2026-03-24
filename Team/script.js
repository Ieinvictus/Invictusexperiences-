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
  NAVBAR (MOBILE MENU)
  ================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.querySelector(".close-btnx");

  if (menuToggle && sideMenu) {

    // Open / Close
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sideMenu.classList.toggle("open");
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sideMenu.classList.remove("open");
      });
    }

    // Close on link click
    sideMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
      });
    });

    // Close outside click
    document.addEventListener("click", (e) => {
      if (
        sideMenu.classList.contains("open") &&
        !sideMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sideMenu.classList.remove("open");
      }
    });

    // Close on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        sideMenu.classList.remove("open");
      }
    });
  }


  /* ==================================================
  FOOTER SUBSCRIBE SYSTEM
  ================================================== */

  const API = "https://invictus-zoho-api.rahulbpadaliya.workers.dev/";

  const btn = document.querySelector(".footer-subscribe button");
  const input = document.querySelector(".footer-subscribe input");
  const msg = document.querySelector(".subscribe-message");

  if (btn && input && msg) {

    btn.addEventListener("click", async () => {

      const email = input.value.trim();

      // Email validation
      if (!email || !email.includes("@")) {
        msg.innerHTML = "⚠️ Please enter a valid email";
        return;
      }

      // Loading
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

    // ENTER KEY SUPPORT 🔥
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btn.click();
      }
    });

  }

});

// nv var droptdown//
/* ===============================
NAVBAR DROPDOWN (FULL SYSTEM)
================================ */
document.addEventListener("DOMContentLoaded", function(){

  const mobileMenu = document.getElementById("mobileMenu");
  const navToggle  = document.querySelector(".nav-toggle");
  const dropdowns  = document.querySelectorAll(".dropdown");

  /* ================= MOBILE MENU TOGGLE ================= */

  window.toggleMenu = function(){
    mobileMenu.classList.toggle("active");

    document.body.style.overflow =
      mobileMenu.classList.contains("active") ? "hidden" : "auto";
  };

  /* ================= DROPDOWN (DESKTOP + MOBILE SAME SYSTEM) ================= */

  document.querySelectorAll(".dropdown-toggle").forEach(item=>{
    item.addEventListener("click", function(e){
      e.preventDefault();

      dropdowns.forEach(drop=>{
        if(drop !== this.parentElement){
          drop.classList.remove("active");
        }
      });

      this.parentElement.classList.toggle("active");
    });
  });

  /* ================= CLICK OUTSIDE CLOSE ================= */

  document.addEventListener("click", function(e){

    // Close dropdown if clicked outside
    dropdowns.forEach(drop=>{
      if(!drop.contains(e.target)){
        drop.classList.remove("active");
      }
    });

    // Close mobile menu if clicked outside
    if(
      mobileMenu.classList.contains("active") &&
      !mobileMenu.querySelector(".mobile-menu-box").contains(e.target) &&
      !navToggle.contains(e.target)
    ){
      toggleMenu();
    }

  });

  /* ================= ESC KEY CLOSE ================= */

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){

      dropdowns.forEach(drop=> drop.classList.remove("active"));

      if(mobileMenu.classList.contains("active")){
        toggleMenu();
      }

    }
  });

});