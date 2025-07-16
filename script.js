// Auto-set date/time
window.onload = function () {
  const now = new Date();
  document.getElementById("date").value = now.toISOString().split("T")[0];
  document.getElementById("time").value = now
    .toTimeString()
    .split(" ")[0]
    .slice(0, 5);
};

// Form submission to Google Sheet
document
  .getElementById("inboundForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const photo = formData.get("photo");
    const payload = {
      date: form.date.value,
      time: form.time.value,
      operationType: form.operationType.value,
      bayNumber: form.bayNumber.value,
      customerName: form.customerName.value,
      productDesc: form.productDesc.value,
      quantity: form.quantity.value,
      vehiclePlate: form.vehiclePlate.value,
      driverName: form.driverName.value,
      clerkName: form.clerkName.value,
      notes: form.notes.value,
      photoLink: photo.name ? photo.name : "",
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyKFkIrzGxRmpbFgcoJPsQS7bPYHNfLmbgI7XiSWRqMfG5pYtapkW1d-IarerBb_1hOqQ/exec",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
        form.reset();
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form.");
    }
  });
