  /* =========================
     ===== CURRENT YEAR ======
     ========================= */

  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = `Calendar - ${new Date().getFullYear()}`;
  }

  

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
