const ZOHO_URL =
"https://invictus-zoho-api.rahulbpadaliya.workers.dev";

document
.getElementById("bookingForm")
.addEventListener("submit", async (e) => {

e.preventDefault();

const travellers =
parseInt(
document.getElementById("travellers").value
) || 1;

const packagePrice = 11999;

const bookingData = {

bookingId:
"INV" + Date.now(),

bookingDate:
new Date().toLocaleDateString("en-IN"),

destinationId:
"KDT001",

destinationName:
"Kedarnath Trek",

packagePrice:
packagePrice,

fullName:
document.getElementById("fullName").value,

mobile:
document.getElementById("mobile").value,

email:
document.getElementById("email").value,

state:
document.getElementById("state").value,

city:
document.getElementById("city").value,

travelDate:
document.getElementById("travelDate").value,

travellers:
travellers,

travelType:
document.getElementById("travelType").value,

emergencyName:
document.getElementById("emergencyName").value,

emergencyMobile:
document.getElementById("emergencyMobile").value,

relationship:
document.getElementById("relationship").value,

totalAmount:
packagePrice * travellers,

bookingStatus:
"Pending Payment",

paymentStatus:
"Pending",

createdAt:
new Date().toISOString()

};
try {

  const response = await fetch(ZOHO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
  });

  const result = await response.json();

  console.log("Zoho Response:", result);

  // Save booking
  localStorage.setItem(
    "bookingData",
    JSON.stringify(bookingData)
  );

  // Go to payment page
  window.location.href = "https://invictusexperiences.com/assets/payment/";

} catch (error) {

  console.error(error);

  alert("Unable to create booking. Please try again.");

}

// =======================
// BOOKING SUMMARY
// =======================

const packagePrices = {
"Kedarnath Trek": 11999
};

const destinationInput =
document.getElementById("destination");

const travellersInput =
document.getElementById("travellers");

const summaryDestination =
document.getElementById("summaryDestination");

const summaryPrice =
document.getElementById("summaryPrice");

const summaryTravellers =
document.getElementById("summaryTravellers");

const summaryTotal =
document.getElementById("summaryTotal");

function updateBookingSummary() {

const destination =
destinationInput.value;

const travellers =
parseInt(travellersInput.value) || 1;

const price =
packagePrices[destination] || 0;

const total =
price * travellers;

summaryDestination.textContent =
destination;

summaryPrice.textContent =
"₹" + price.toLocaleString("en-IN");

summaryTravellers.textContent =
travellers;

summaryTotal.textContent =
"₹" + total.toLocaleString("en-IN");

}

travellersInput.addEventListener(
"input",
updateBookingSummary
);

updateBookingSummary();
