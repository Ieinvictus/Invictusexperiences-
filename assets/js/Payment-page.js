// ============================
// PAYMENT PAGE JS
// ============================

// Fetch Booking Data

const bookingData = JSON.parse(
localStorage.getItem("bookingData")
);

console.log(
"Fetched:",
bookingData
);

// Booking Data Check

if (!bookingData) {

alert(
"Booking information not found."
);

window.location.href =
"https://invictusexperiences.com/assets/js/customer-information.js";

throw new Error(
"No bookingData found"
);

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
// UPI PAYMENT
// ============================

const amount =
Number(bookingData.totalAmount || 0);

const upiId =
"rahulpadaliya16@ybl";

const upiLink =
`upi://pay?pa=${upiId}&pn=Invictus%20Experiences&am=${amount}&cu=INR&tn=${bookingData.bookingId}`;

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
.addEventListener("click", () => {

const selectedMethod =
document.querySelector(
'input[name="paymentMethod"]:checked'
).value;

if(selectedMethod === "upi"){

window.location.href = upiLink;

}

if(selectedMethod === "netbanking"){

alert(
`Transfer ₹${amount.toLocaleString("en-IN")} to the Bank of Baroda account and share the payment screenshot with Invictus Experiences.`
);

}

});
