document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const submitBtn = form.querySelector("button[type='submit']");
  const termsCheck = document.getElementById("termsCheck");
  const popup = document.getElementById("successPopup");
  const closeBtn = document.getElementById("closePopup");

  /* ================= BACK BUTTON BEHAVIOR ================= */

  window.addEventListener("pageshow", function () {

    if (sessionStorage.getItem("inquirySuccess") === "true") {

      sessionStorage.removeItem("inquirySuccess");

      submitBtn.innerText = "✔ Submitted Successfully";
      submitBtn.disabled = true;
      submitBtn.classList.add("success");   // ✅ class use karo
      submitBtn.style.cursor = "default";
      submitBtn.style.opacity = "1";

      return;
    }

    submitBtn.innerText = "SUBMIT TRAVEL REQUEST";
    submitBtn.classList.remove("success"); // reset class
    submitBtn.disabled = !termsCheck.checked;
    submitBtn.style.opacity = termsCheck.checked ? "1" : "0.6";
    submitBtn.style.cursor = termsCheck.checked ? "pointer" : "not-allowed";

  });


  /* ================= INITIAL BUTTON STATE ================= */

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";


  /* ================= ENABLE WHEN TERMS CHECKED ================= */

  termsCheck.addEventListener("change", () => {
    submitBtn.disabled = !termsCheck.checked;
    submitBtn.style.opacity = termsCheck.checked ? "1" : "0.6";
    submitBtn.style.cursor = termsCheck.checked ? "pointer" : "not-allowed";
  });


  /* ================= FORM SUBMIT ================= */

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!termsCheck.checked) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const payload = {
      full_name: form.full_name?.value.trim(),
      mobile: form.mobile_number?.value.trim(),
      email: form.email_address?.value.trim(),
      destination: form.destination_tour_name?.value.trim(),
      travel_date: form.travel_date?.value,
      travel_type: form.travel_type?.value,
      travelers: Number(form.number_of_travelers?.value),
      message: form.message_special_request?.value.trim()
    };

    for (const key in payload) {
      if (!payload[key]) {
        alert("Please fill all required fields");
        return;
      }
    }

    /* Loading State */
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;
    submitBtn.style.cursor = "wait";

    try {

      const response = await fetch(
        "https://invictus-contact-api.rahulbpadaliya.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {

        sessionStorage.setItem("inquirySuccess", "true");

        if (popup) {
          popup.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        form.reset();

       submitBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Request Sent';
        submitBtn.classList.add("success");   // ✅ clean styling
        submitBtn.style.cursor = "default";

      } else {
        alert("Submission failed. Please try again.");
        resetButton();
      }

    } catch (error) {
      console.error("API Error:", error);
      alert("Server error. Please try again later.");
      resetButton();
    }

  });


  /* ================= CLOSE POPUP ================= */

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }


  function resetButton() {
    submitBtn.innerText = "SUBMIT TRAVEL REQUEST";
    submitBtn.disabled = false;
    submitBtn.classList.remove("success");
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }

});


/* ================= SCROLL REVEAL ================= */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});


//toagfal
document.querySelectorAll(".review-text-wrap").forEach(function(wrap){

  const text = wrap.querySelector(".review-text");
  const toggle = wrap.querySelector(".toggle");

  // Check if text actually overflowing
  if(text.scrollHeight <= text.clientHeight){
    toggle.style.display = "none"; // Hide toggle if text short
  }

  toggle.addEventListener("click", function(){

    text.classList.toggle("expanded");

    if(text.classList.contains("expanded")){
      this.innerText = "Read less";
    } else {
      this.innerText = "Read more";
    }

  });

});

//subcribe footer//
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

// js load nv page
// nav bar//
const rmBarMenuBtn = document.getElementById("rmBarMenuBtn");
const rmBarCurtainMenu = document.getElementById("rmBarCurtainMenu");

rmBarMenuBtn.addEventListener("click", () => {
  rmBarMenuBtn.classList.toggle("active");
  rmBarCurtainMenu.classList.toggle("active");
});

document.querySelectorAll(".rm-bar-menu-links a").forEach((link) => {
  link.addEventListener("click", () => {
    rmBarMenuBtn.classList.remove("active");
    rmBarCurtainMenu.classList.remove("active");
  });
});
