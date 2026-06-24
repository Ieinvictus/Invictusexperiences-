// ============================
// PAYMENT PAGE JS
// ============================

// Fetch Booking Data

const bookingData =
JSON.parse(
localStorage.getItem("bookingData")
);

// Redirect if no booking data

// if (!bookingData) {
//   window.location.href =
//   "https://invictusexperiences.com/booking/";
}
// Invoice Auto Fill

document.getElementById("invoiceBookingId").textContent =
bookingData.bookingId;

document.getElementById("invoiceBookingDate").textContent =
bookingData.bookingDate;

document.getElementById("invoicePackage").textContent =
bookingData.destinationName;

document.getElementById("invoiceTravelDate").textContent =
bookingData.travelDate;

document.getElementById("invoiceName").textContent =
bookingData.fullName;

document.getElementById("invoiceMobile").textContent =
bookingData.mobile;

document.getElementById("invoiceEmail").textContent =
bookingData.email;

document.getElementById("invoiceTravellers").textContent =
bookingData.travellers;

document.getElementById("invoicePrice").textContent =
"₹" +
bookingData.packagePrice.toLocaleString("en-IN");

document.getElementById("invoiceTotal").textContent =
"₹" +
bookingData.totalAmount.toLocaleString("en-IN");

document.getElementById("payableAmount").textContent =
"₹" +
bookingData.totalAmount.toLocaleString("en-IN");


// ============================
// PAYMENT METHOD TOGGLE
// ============================

const upiSection =
document.getElementById("upiSection");

const bankSection =
document.getElementById("bankSection");

document
.querySelectorAll(
'input[name="paymentMethod"]'
)
.forEach(radio => {

radio.addEventListener(
"change",
() => {

if (
radio.value === "upi" &&
radio.checked
) {

upiSection.style.display =
"block";

bankSection.style.display =
"none";

}

if (
radio.value === "netbanking" &&
radio.checked
) {

upiSection.style.display =
"none";

bankSection.style.display =
"block";

}

});

});


// ============================
// UPI PAYMENT
// ============================

const amount =
bookingData.totalAmount;

const upiId =
"rahulpadaliya16@ybl";

const upiLink =
`upi://pay?pa=${upiId}&pn=Invictus%20Experiences&am=${amount}&cu=INR`;

document
.getElementById("phonepeBtn")
.setAttribute("href", upiLink);

document
.getElementById("gpayBtn")
.setAttribute("href", upiLink);

document
.getElementById("bhimBtn")
.setAttribute("href", upiLink);


// ============================
// PAY NOW BUTTON
// ============================

document
.getElementById("payBtn")
.addEventListener(
"click",
() => {

const selectedMethod =
document.querySelector(
'input[name="paymentMethod"]:checked'
).value;

if (
selectedMethod === "upi"
) {

window.location.href =
upiLink;

}

if (
selectedMethod ===
"netbanking"
) {

alert(
"Please transfer the amount to the Bank of Baroda account shown above and share the payment screenshot with Invictus Experiences."
);

}

});
