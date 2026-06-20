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
//faqs 

document.querySelectorAll(".faq-question").forEach(button=>{
  button.addEventListener("click", ()=>{
    const item = button.parentElement;
    item.classList.toggle("active");

    const answer = item.querySelector(".faq-answer");

    if(item.classList.contains("active")){
      answer.style.maxHeight = answer.scrollHeight + "px";
    }else{
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
