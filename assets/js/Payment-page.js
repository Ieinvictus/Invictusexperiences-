// ============================
// PAYMENT PAGE JS
// ============================

// FETCH BOOKING DATA

const bookingData = JSON.parse(
localStorage.getItem("bookingData")
);

console.log(
"Fetched Booking Data:",
bookingData
);

// CHECK BOOKING DATA

if (!bookingData) {

alert(
"Booking information not found."
);

throw new Error(
"No bookingData found"
);

}

// ============================
// INVOICE AUTO FILL
// ============================

document.getElementById(
"invoiceBookingId"
).textContent =
bookingData.bookingId || "-";

document.getElementById(
"invoiceBookingDate"
).textContent =
bookingData.bookingDate || "-";

document.getElementById(
"invoicePackage"
).textContent =
bookingData.destinationName || "-";

document.getElementById(
"invoiceTravelDate"
).textContent =
bookingData.travelDate || "-";

document.getElementById(
"invoiceName"
).textContent =
bookingData.fullName || "-";

document.getElementById(
"invoiceMobile"
).textContent =
bookingData.mobile || "-";

document.getElementById(
"invoiceEmail"
).textContent =
bookingData.email || "-";

document.getElementById(
"invoiceTravellers"
).textContent =
bookingData.travellers || "1";

document.getElementById(
"invoicePrice"
).textContent =
"₹" +
Number(
bookingData.packagePrice || 0
).toLocaleString("en-IN");

document.getElementById(
"invoiceTotal"
).textContent =
"₹" +
Number(
bookingData.totalAmount || 0
).toLocaleString("en-IN");

document.getElementById(
"payableAmount"
).textContent =
"₹" +
Number(
bookingData.totalAmount || 0
).toLocaleString("en-IN");

// ============================
// PAYMENT METHOD TOGGLE
// ============================

const upiSection =
document.getElementById(
"upiSection"
);

const bankSection =
document.getElementById(
"bankSection"
);

document
.querySelectorAll(
'input[name="paymentMethod"]'
)
.forEach(radio => {

radio.addEventListener(
"change",
() => {

if(
radio.value === "upi"
){

upiSection.style.display =
"block";

bankSection.style.display =
"none";

}

if(
radio.value === "netbanking"
){

upiSection.style.display =
"none";

bankSection.style.display =
"block";

}

}

);

});

// ============================
// UPI PAYMENT
// ============================

const amount =
Number(
bookingData.totalAmount || 0
);

const upiId =
"rahulpadaliya16@ybl";

const upiLink =
`upi://pay?pa=${upiId}&pn=Invictus%20Experiences&am=${amount}&cu=INR&tn=${bookingData.bookingId}`;

const phonepeBtn =
document.getElementById(
"phonepeBtn"
);

const gpayBtn =
document.getElementById(
"gpayBtn"
);

const bhimBtn =
document.getElementById(
"bhimBtn"
);

if(phonepeBtn){
phonepeBtn.href =
upiLink;
}

if(gpayBtn){
gpayBtn.href =
upiLink;
}

if(bhimBtn){
bhimBtn.href =
upiLink;
}

// ============================
// PAY NOW BUTTON
// ============================

const payBtn =
document.getElementById(
"payBtn"
);

if(payBtn){

payBtn.addEventListener(
"click",
() => {

const selectedMethod =
document.querySelector(
'input[name="paymentMethod"]:checked'
);

if(!selectedMethod){

alert(
"Please select payment method."
);

return;

}

if(
selectedMethod.value ===
"upi"
){

window.location.href =
upiLink;

return;

}

if(
selectedMethod.value ===
"netbanking"
){

alert(
`Transfer ₹${amount.toLocaleString("en-IN")} to Bank of Baroda Account and share payment screenshot with Invictus Experiences.`
);

}

}

);

}

// ============================
// DEBUG
// ============================

console.log(
"Invoice Loaded Successfully"
);

console.log(
"Booking ID:",
bookingData.bookingId
);

console.log(
"Total Amount:",
amount
);
