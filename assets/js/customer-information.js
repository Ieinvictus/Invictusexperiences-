window.alert = function () {};

const ZOHO_URL =
"https://wild-hall-eb25.rahulbpadaliya.workers.dev/";

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

if (travellersInput) {
travellersInput.addEventListener(
"input",
updateBookingSummary
);
}

updateBookingSummary();

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
"INV-" +
new Date().toISOString().slice(0,10).replace(/-/g,"") +
"-" +
Math.floor(1000 + Math.random() * 9000),

bookingDate:
new Date().toLocaleDateString("en-IN"),

destinationId:
"KDNT000IE",

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

travelerDetails:
document.getElementById("travelerDetails").value,

totalAmount:
packagePrice * travellers,

paymentStatus:
document.getElementById("paymentStatus").value,

bookingStatus:
document.getElementById("bookingStatus").value,

createdAt:
new Date().toISOString()

};

try {

localStorage.setItem(
"bookingData",
JSON.stringify(bookingData)
);

const response = await fetch(
ZOHO_URL,
{
method: "POST",
headers: {
"Content-Type":
"application/json"
},
body:
JSON.stringify(
bookingData
)
}
);

if (!response.ok) {
throw new Error(
"Failed to submit booking"
);
}

await response.json();
  } catch (error) {

console.error("Booking Error:", error);

alert(
"Booking failed. Please try again."
);

return;

}

// Payment Page Redirect
window.location.replace(
"https://invictusexperiences.com/assets/payment/"
);

});
