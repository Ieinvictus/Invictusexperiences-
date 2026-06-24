// ============================
// PAYMENT PAGE JS
// ============================

const bookingData = JSON.parse(
localStorage.getItem("bookingData")
);

// Booking data check
if (!bookingData) {

console.log("No booking data found");

alert("Booking information not found.");

throw new Error("No bookingData in localStorage");

}

// ============================
// INVOICE AUTO FILL
// ============================

document.getElementById("invoiceBookingId").textContent =
bookingData.bookingId || "-";

document.getElementById("invoiceBookingDate").textContent =
bookingData.bookingDate || "-";

document.getElementById("invoicePackage").textContent =
bookingData.destinationName || "-";

document.getElementById("invoiceTravelDate").textContent =
bookingData.travelDate || "-";

document.getElementById("invoiceName").textContent =
bookingData.fullName || "-";

document.getElementById("invoiceMobile").textContent =
bookingData.mobile || "-";

document.getElementById("invoiceEmail").textContent =
bookingData.email || "-";

document.getElementById("invoiceTravellers").textContent =
bookingData.travellers || "1";

document.getElementById("invoicePrice").textContent =
"₹" + Number(
bookingData.packagePrice || 0
).toLocaleString("en-IN");

document.getElementById("invoiceTotal").textContent =
"₹" + Number(
bookingData.totalAmount || 0
).toLocaleString("en-IN");

document.getElementById("payableAmount").textContent =
"₹" + Number(
bookingData.totalAmount || 0
).toLocaleString("en-IN");

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
radio.value === "upi"
) {

upiSection.style.display =
"block";

bankSection.style.display =
"none";

}

if (
radio.value === "netbanking"
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
bookingData.totalAmount || 0;

const upiId =
"rahulpadaliya16@ybl";

const upiLink =
`upi://pay?pa=${upiId}&pn=Invictus%20Experiences&am=${amount}&cu=INR`;

document.getElementById("phonepeBtn").href =
upiLink;

document.getElementById("gpayBtn").href =
upiLink;

document.getElementById("bhimBtn").href =
upiLink;

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

return;

}

if (
selectedMethod === "netbanking"
) {

alert(
"Transfer the amount to Bank of Baroda Account and share payment screenshot with Invictus Experiences."
);

}

});
