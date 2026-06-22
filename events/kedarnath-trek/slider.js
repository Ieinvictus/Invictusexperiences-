/* =========================
PERFECT FULL WIDTH SLIDER
========================= */

(() => {

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (!slider || slides.length === 0) return;

let current = 0;
let auto;

function showSlide(index){

if(index >= slides.length) index = 0;
if(index < 0) index = slides.length - 1;

current = index;

slider.style.transform =
  `translateX(-${current * 100}%)`;

dots.forEach(dot => dot.classList.remove("active"));
dots[current]?.classList.add("active");

}

function nextSlide(){
showSlide(current + 1);
}

function startAuto(){
clearInterval(auto);
auto = setInterval(nextSlide, 5000);
}

dots.forEach((dot,i)=>{
dot.addEventListener("click",()=>{
showSlide(i);
startAuto();
});
});

let startX = 0;

slider.addEventListener("touchstart",(e)=>{
startX = e.touches[0].clientX;
});

slider.addEventListener("touchend",(e)=>{

const diff =
  e.changedTouches[0].clientX - startX;

if(diff > 60){
  showSlide(current - 1);
}

if(diff < -60){
  showSlide(current + 1);
}

startAuto();

});

showSlide(0);
startAuto();

})();
