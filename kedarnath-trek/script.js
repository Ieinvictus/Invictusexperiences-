document.addEventListener("DOMContentLoaded", () => {
  return;
});
  /* =========================
     ===== CURRENT YEAR ======
     ========================= */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = `Calendar - ${new Date().getFullYear()}`;

  /* =========================
     ===== SIDE MENU =========
     ========================= */
  const menuToggle = document.querySelector("#menu-toggle, .menu-toggle");
  const sideMenu = document.querySelector("#side-menu, #sideMenu");
  const closeBtn = document.querySelector("#close-btn, .close-btnx");

  if (menuToggle && sideMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sideMenu.classList.toggle("open");
    });

    closeBtn?.addEventListener("click", () =>
      sideMenu.classList.remove("open")
    );

    document.addEventListener("click", (e) => {
      if (
        sideMenu.classList.contains("open") &&
        !sideMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sideMenu.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") sideMenu.classList.remove("open");
    });
  }

  /* =========================
     ===== SLIDER + SWIPE ====
     ========================= */
  (() => {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    if (!slider || slides.length === 0) return;

    let index = 1;
    let auto;
    const interval = 4000;

    const first = slides[0].cloneNode(true);
    const last = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(first);
    slider.insertBefore(last, slides[0]);

    const all = slider.querySelectorAll(".slide");
    const total = all.length;

    slider.style.width = `${total * 100}%`;
    all.forEach((s) => (s.style.width = `${100 / total}%`));

    function go(i, animate = true) {
      slider.style.transition = animate ? "transform .6s ease" : "none";
      slider.style.transform = `translateX(-${i * (100 / total)}%)`;
      index = i;

      dots.forEach((d) => d.classList.remove("active"));
      dots[(i - 1 + dots.length) % dots.length]?.classList.add("active");
    }

    slider.addEventListener("transitionend", () => {
      if (all[index].classList.contains("clone")) {
        if (index === 0) go(total - 2, false);
        if (index === total - 1) go(1, false);
      }
    });

    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        clearInterval(auto);
        go(i + 1);
        auto = setInterval(() => go(index + 1), interval);
      })
    );

    let startX = 0;
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      clearInterval(auto);
    });

    slider.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) go(index - 1);
      else if (diff < -50) go(index + 1);
      auto = setInterval(() => go(index + 1), interval);
    });

    go(index, false);
    auto = setInterval(() => go(index + 1), interval);
  })();

  /* =========================
     ===== CALENDAR DATES ====
     ========================= */
  const daysContainer = document.getElementById("daysContainer");
  const specificDates = {
    0: [2, 10, 15, 20, 28],
    1: [5, 9, 14, 19, 27],
    2: [1, 7, 13, 18, 25],
    3: [3, 10, 16, 21, 29],
    4: [4, 11, 17, 22, 30],
    5: [6, 12, 19, 24, 26],
    6: [2, 9, 15, 20, 27],
    7: [3, 10, 18, 23, 29],
    8: [1, 7, 14, 19, 28],
    9: [5, 11, 17, 22, 31],
    10: [6, 12, 18, 24, 30],
    11: [2, 8, 13, 21, 28]
  };

  function showDates(month) {
    if (!daysContainer) return;
    daysContainer.innerHTML = "";

    const today = new Date();
    const cm = today.getMonth();
    const cd = today.getDate();

    (specificDates[month] || []).forEach((day) => {
      const div = document.createElement("div");
      div.className = "day";

      if (month < cm || (month === cm && day < cd)) {
        div.classList.add("past");
        div.textContent = day;
      } else {
        const a = document.createElement("a");
        a.href = `#=${month + 1}&day=${day}`;
        a.textContent = day;
        a.className = "book-btn";
        div.appendChild(a);
      }
      daysContainer.appendChild(div);
    });
  }

  document
    .querySelectorAll(".month")
    .forEach((m) =>
      m.addEventListener("click", () =>
        showDates(parseInt(m.dataset.month, 10))
      )
    );
  showDates(new Date().getMonth());

  /* =========================
     ===== ITINERARY IMAGE ===
     ========================= */
  const itineraryImages = document.querySelectorAll(".itinerary-photo img");
  if (itineraryImages.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    itineraryImages.forEach((img) => observer.observe(img));
  }

  /* =========================
     ===== ITINERARY POPUP ===
     ========================= */
  const itineraryPopups = document.querySelectorAll(".itinerary-popup");

  document.querySelectorAll("[data-popup-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementById(btn.dataset.popupTarget);
      if (popup) {
        popup.style.display = "flex";
        body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll(".itinerary-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = btn.closest(".itinerary-popup");
      popup.style.display = "none";
      body.style.overflow = "";
    });
  });

  /* 👉 OUTSIDE CLICK CLOSE (OLD JS LIKE) */
  itineraryPopups.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        body.style.overflow = "";
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      itineraryPopups.forEach((p) => (p.style.display = "none"));
      body.style.overflow = "";
    }
  });

  /* =========================
     ===== READ MORE =========
     ========================= */
  document.querySelectorAll(".readmore-inline").forEach((link) => {
    link.addEventListener("click", () => {
      const content = link
        .closest(".day-info")
        ?.querySelector(".readmore-content");
      if (!content) return;

      content.classList.toggle("show");
      link.textContent = content.classList.contains("show")
        ? "Show less"
        : "…Know More";
    });
  });

  /* =========================
     ===== TRAVEL POPUPS =====
     ========================= */
  document.querySelectorAll(".travel-popup-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementById(btn.dataset.popup);
      if (popup) {
        popup.style.display = "flex";
        body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll(".travel-close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".travel-popup-overlay").style.display = "none";
      body.style.overflow = "";
    });
  });

  document.querySelectorAll(".travel-popup-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
        body.style.overflow = "";
      }
    });
  });
});

//nv bar new//

//navbar//

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
// footer
document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
PAGE SCALE SYSTEM
================================================== */

  function adjustPageScale() {
    const page = document.querySelector(".page-scale");
    if (!page) return;

    const w = window.innerWidth;

    if (w >= 768 && w <= 1050) {
      page.style.zoom = "0.85";
      page.style.width = "118%";
    } else {
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

  if (!container || !track || slides.length === 0) return;

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

  function rotateTitle() {
    if (!titleEl) return;

    titleEl.style.transition = "none";
    titleEl.style.opacity = "0";
    titleEl.style.transform = "translateX(-40px)";

    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;

      titleEl.textContent = titles[titleIndex];

      titleEl.style.transition = "all .7s cubic-bezier(.4,0,.2,1)";
      titleEl.style.opacity = "1";
      titleEl.style.transform = "translateX(0)";
    }, 350);
  }

  setInterval(rotateTitle, 4000);

  /* ==================================================
FLOATING SECONDARY TEXT
================================================== */

  function startFloating() {
    stopFloating();

    let up = true;

    floatTimer = setInterval(() => {
      if (!secondaryBox) return;

      secondaryBox.style.transform = up ? "translateY(-6px)" : "translateY(0)";

      up = !up;
    }, 1800);
  }

  function stopFloating() {
    clearInterval(floatTimer);

    if (secondaryBox) {
      secondaryBox.style.transform = "translateY(0)";
    }
  }

  function showSecondaryText(isVideo) {
    if (!secondaryBox) return;

    secondaryBox.style.opacity = "1";
    secondaryBox.style.transition = "all .8s ease";

    if (isVideo) {
      startFloating();
    } else {
      stopFloating();
    }
  }

  /* ==================================================
VIDEO HANDLING
================================================== */

  function stopAllVideos() {
    slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function playVideo(slide) {
    const video = slide.querySelector("video");

    if (!video) return;

    video.muted = true;
    video.currentTime = 0;

    function startTimer() {
      if (!video.duration || isNaN(video.duration)) return;

      slideTimer = setTimeout(nextSlide, video.duration * 1000);
    }

    if (video.readyState >= 1) {
      startTimer();
    } else {
      video.onloadedmetadata = startTimer;
    }

    video.play().catch(() => {});
  }

  /* ==================================================
SHOW SLIDE
================================================== */

  function showSlide(index) {
    clearTimeout(slideTimer);
    stopAllVideos();

    track.style.transition = "transform 1s cubic-bezier(.4,0,.2,1)";
    track.style.transform = `translateX(-${index * 100}%)`;

    const slide = slides[index];
    const video = slide.querySelector("video");

    showSecondaryText(!!video);

    if (video) {
      playVideo(slide);
    } else {
      const duration = slide.dataset.duration
        ? parseInt(slide.dataset.duration)
        : 3000;

      slideTimer = setTimeout(nextSlide, duration);
    }

    current = index;
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  /* ==================================================
TRUE INFINITE LOOP
================================================== */

  track.addEventListener("transitionend", () => {
    if (current === slides.length - 1) {
      track.style.transition = "none";
      current = 1;
      track.style.transform = "translateX(-100%)";
    }

    if (current === 0) {
      track.style.transition = "none";
      current = slides.length - 2;
      track.style.transform = `translateX(-${current * 100}%)`;
    }
  });

  /* ==================================================
SWIPE SUPPORT
================================================== */

  let startX = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 60) {
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

  const revealElements = document.querySelectorAll(
    ".tour-box-container, .rover-hero-grid"
  );

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
      if (el.getBoundingClientRect().top < trigger) {
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

  window.toggleMenu = function () {
    if (!mobileMenu) return;

    mobileMenu.classList.toggle("active");

    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  };

  document.addEventListener("click", (e) => {
    dropdowns.forEach((drop) => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach((drop) => drop.classList.remove("active"));

      if (mobileMenu && mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    }
  });
});
/* ===============================
DROPDOWN CLICK SYSTEM
================================ */

const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") {
      e.preventDefault();
    }

    const parent = this.parentElement;

    /* close other dropdowns */

    document.querySelectorAll(".dropdown").forEach((d) => {
      if (d !== parent) {
        d.classList.remove("active");
      }
    });

    /* toggle current */

    parent.classList.toggle("active");
  });
});

//subcribe//
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
//toagfal
document.querySelectorAll(".review-text-wrap").forEach(function (wrap) {
  const text = wrap.querySelector(".review-text");
  const toggle = wrap.querySelector(".toggle");

  if (!text || !toggle) return; // 🔥 safety

  // Check if text actually overflowing
  if (text.scrollHeight <= text.clientHeight) {
    toggle.style.display = "none";
  }

  toggle.addEventListener("click", function () {
    text.classList.toggle("expanded");

    if (text.classList.contains("expanded")) {
      this.innerText = "Read less";
    } else {
      this.innerText = "Read more";
    }
  });
});

// js load nv page
document.querySelectorAll(".nav-menu a, .mobile-nav-list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // dropdown ne ignore
    if (this.classList.contains("dropdown-toggle")) return;

    // empty links ignore
    if (!href || href === "#") return;

    // 🔥 IMPORTANT: navigation allow karo
    // NO preventDefault here

    window.location.href = href;
  });
});
