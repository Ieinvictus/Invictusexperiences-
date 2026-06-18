document.addEventListener("DOMContentLoaded", () => {

/* ==================================================
PAGE SCALE SYSTEM
================================================== */

function adjustPageScale(){

const page = document.querySelector(".page-scale");
if(!page) return;

const w = window.innerWidth;

if(w >= 768 && w <= 1050){

page.style.zoom = "0.85";
page.style.width = "118%";

}else{

page.style.zoom = "1";
page.style.width = "100%";

}

}

window.addEventListener("resize", adjustPageScale);
adjustPageScale();


/* ==================================================
SLIDER ELEMENTS
================================================== */

const container = document.querySelector(".purple-slider-container");
const track = document.querySelector(".purple-track");
const secondaryBox = document.querySelector(".purple-secondary-text-box");
const titleEl = document.getElementById("rotating-title");

let slides = document.querySelectorAll(".purple-slide");

if(!container || !track || slides.length === 0) return;


/* ==================================================
INFINITE SLIDER CLONES
================================================== */

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll(".purple-slide");

let current = 1;
let slideTimer = null;
let floatTimer = null;

track.style.transform = "translateX(-100%)";


/* ==================================================
ROTATING HERO TITLE
================================================== */

const titles = [
"Born To Explore",
"Summit Your Story",
"Adventure Without Boundaries",
"Curated For The Fearless",
"Discover Your Edge",
"Adventure Is Calling"
];

let titleIndex = 0;

function rotateTitle(){

if(!titleEl) return;

titleEl.style.transition = "none";
titleEl.style.opacity = "0";
titleEl.style.transform = "translateX(-40px)";

setTimeout(()=>{

titleIndex = (titleIndex + 1) % titles.length;

titleEl.textContent = titles[titleIndex];

titleEl.style.transition = "all .7s cubic-bezier(.4,0,.2,1)";
titleEl.style.opacity = "1";
titleEl.style.transform = "translateX(0)";

},350);

}

setInterval(rotateTitle,4000);


/* ==================================================
FLOATING SECONDARY TEXT
================================================== */

function startFloating(){

stopFloating();

let up = true;

floatTimer = setInterval(()=>{

if(!secondaryBox) return;

secondaryBox.style.transform = up ? "translateY(-6px)" : "translateY(0)";

up = !up;

},1800);

}

function stopFloating(){

clearInterval(floatTimer);

if(secondaryBox){
secondaryBox.style.transform = "translateY(0)";
}

}

function showSecondaryText(isVideo){

if(!secondaryBox) return;

secondaryBox.style.opacity = "1";
secondaryBox.style.transition = "all .8s ease";

if(isVideo){
startFloating();
}else{
stopFloating();
}

}


/* ==================================================
VIDEO HANDLING
================================================== */

function stopAllVideos(){

slides.forEach(slide => {

const video = slide.querySelector("video");

if(video){

video.pause();
video.currentTime = 0;

}

});

}

function playVideo(slide){

const video = slide.querySelector("video");

if(!video) return;

video.muted = true;
video.currentTime = 0;

function startTimer(){

if(!video.duration || isNaN(video.duration)) return;

slideTimer = setTimeout(nextSlide, video.duration * 1000);

}

if(video.readyState >= 1){
startTimer();
}else{
video.onloadedmetadata = startTimer;
}

video.play().catch(()=>{});

}


/* ==================================================
SHOW SLIDE
================================================== */

function showSlide(index){

clearTimeout(slideTimer);
stopAllVideos();

track.style.transition = "transform 1s cubic-bezier(.4,0,.2,1)";
track.style.transform = `translateX(-${index * 100}%)`;

const slide = slides[index];
const video = slide.querySelector("video");

showSecondaryText(!!video);

if(video){

playVideo(slide);

}else{

const duration = slide.dataset.duration ? parseInt(slide.dataset.duration) : 3000;

slideTimer = setTimeout(nextSlide, duration);

}

current = index;

}

function nextSlide(){
showSlide(current + 1);
}

function prevSlide(){
showSlide(current - 1);
}


/* ==================================================
TRUE INFINITE LOOP
================================================== */

track.addEventListener("transitionend",()=>{

if(current === slides.length - 1){

track.style.transition = "none";
current = 1;
track.style.transform = "translateX(-100%)";

}

if(current === 0){

track.style.transition = "none";
current = slides.length - 2;
track.style.transform = `translateX(-${current * 100}%)`;

}

});


/* ==================================================
SWIPE SUPPORT
================================================== */

let startX = 0;

container.addEventListener("touchstart",e=>{
startX = e.touches[0].clientX;
});

container.addEventListener("touchend",e=>{

const diff = e.changedTouches[0].clientX - startX;

if(Math.abs(diff) > 60){

diff > 0 ? prevSlide() : nextSlide();

}

});


/* ==================================================
INIT SLIDER
================================================== */

showSlide(current);



/* ==================================================
SCROLL REVEAL
================================================== */

const revealElements = document.querySelectorAll(".tour-box-container, .rover-hero-grid");

function revealOnScroll(){

const trigger = window.innerHeight * 0.85;

revealElements.forEach(el=>{

if(el.getBoundingClientRect().top < trigger){
el.classList.add("show");
}

});

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ==================================================
NAVIGATION SYSTEM
================================================== */

const mobileMenu = document.getElementById("mobileMenu");
const navToggle = document.querySelector(".nav-toggle");
const dropdowns = document.querySelectorAll(".dropdown");

window.toggleMenu = function(){

if(!mobileMenu) return;

mobileMenu.classList.toggle("active");

document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";

};

document.addEventListener("click",e=>{

dropdowns.forEach(drop=>{

if(!drop.contains(e.target)){
drop.classList.remove("active");
}

});

});

document.addEventListener("keydown",e=>{

if(e.key === "Escape"){

dropdowns.forEach(drop=> drop.classList.remove("active"));

if(mobileMenu && mobileMenu.classList.contains("active")){
toggleMenu();
}

}

});

});
/* ===============================
DROPDOWN CLICK SYSTEM
================================ */

const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(toggle => {

toggle.addEventListener("click", function(e){

if(this.getAttribute("href") === "#"){
  e.preventDefault();
}

const parent = this.parentElement;

/* close other dropdowns */

document.querySelectorAll(".dropdown").forEach(d => {
if(d !== parent){
d.classList.remove("active");
}
});

/* toggle current */

parent.classList.toggle("active");

});

});

//subcribe//
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
//toagfal
document.querySelectorAll(".review-text-wrap").forEach(function(wrap){

  const text = wrap.querySelector(".review-text");
  const toggle = wrap.querySelector(".toggle");

  if(!text || !toggle) return; // 🔥 safety

  // Check if text actually overflowing
  if(text.scrollHeight <= text.clientHeight){
    toggle.style.display = "none";
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
