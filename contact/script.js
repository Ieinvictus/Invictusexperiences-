document.addEventListener("DOMContentLoaded", function () {

  const btn = document.querySelector(".footer-subscribe button");
  const input = document.querySelector(".footer-subscribe input");

  btn.addEventListener("click", async function () {

    const email = input.value.trim();

    if (!email) {
      alert("Please enter email");
      return;
    }

    btn.innerText = "Submitting...";
    btn.disabled = true;

    try {

      const res = await fetch("https://invictus-api.rahulbpadaliya.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await res.json();

      console.log(data);

      if (data.data) {

        alert("✓ Thank you for subscribing!");

        input.value = "";

      } else {

        alert("Subscription failed");

      }

    } catch (error) {

      console.error(error);

      alert("Connection problem. Try again.");

    }

    btn.innerText = "Subscribe";
    btn.disabled = false;

  });

});