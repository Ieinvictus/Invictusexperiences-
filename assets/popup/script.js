document.addEventListener("DOMContentLoaded", function(){

  const overlay =
    document.getElementById("saleOverlay");

  const closeBtn =
    document.getElementById("closeBtn");


  /* ==========================
     OPEN POPUP
  =========================== */

  setTimeout(function(){

    overlay.classList.add("show");

  }, 500);


  /* ==========================
     CLOSE
  =========================== */

  closeBtn.addEventListener("click", function(){

    overlay.classList.remove("show");

  });


  /* ==========================
     CLICK OUTSIDE TO CLOSE
  =========================== */

  overlay.addEventListener("click", function(event){

    if(event.target === overlay){

      overlay.classList.remove("show");

    }

  });


  /* ==========================
     ESC KEY
  =========================== */

  document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

      overlay.classList.remove("show");

    }

  });

});
