document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbw7k2r3iH0iN5HK9NN9Xyi7FosFZTR90sLeueIiWnfT9k6SZvEAdBExN09-hhA_Q4RV/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const result = await response.text();

      if (result.toLowerCase().includes("success")) {
        window.location.href = "more.html"; // ✅ Redirect to your own HTML page in the same folder
      } else {
        showError("Form submitted, but something went wrong: " + result);
      }
    } catch (error) {
      showError("Failed to submit form: " + error.message);
    }
  });

  function showError(message) {
    alert(message);
  }
});

