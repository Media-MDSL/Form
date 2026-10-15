// ---------------------------------------------------------------
// STEP 1: after you deploy code.gs as a Web App, paste its URL here.
// It looks like: https://script.google.com/macros/s/XXXXXXXX/exec
// ---------------------------------------------------------------
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlbTL-29RJg7LU2wuugqzgflj8Iukul8nGJxLEGhYl9GuV8dGLDH2YMKjZBCO78sP7oQ/exec";

const NEXT_PAGE = "more.html";
const NAVY = "#0B3460";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  const idleLabel = submitBtn.textContent;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (SCRIPT_URL.includes("PASTE_YOUR")) {
      showError("The form is not connected yet. Add the Web App URL to SCRIPT_URL in index.js.");
      return;
    }

    setBusy(true);

    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      params.append(key, String(value).trim());
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const result = await response.text();

      if (result.toLowerCase().includes("success")) {
        Swal.fire({
          icon: "success",
          title: "Registration confirmed",
          text: "Thank you for registering. Redirecting...",
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
        });
        setTimeout(() => { window.location.href = NEXT_PAGE; }, 2200);
      } else {
        setBusy(false);
        showError("Your details were not saved: " + result + ". Please try again.");
      }
    } catch (error) {
      setBusy(false);
      showError("Could not send your registration. Check your connection and try again. (" + error.message + ")");
    }
  });

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.style.opacity = busy ? "0.6" : "";
    submitBtn.textContent = busy ? "Registering..." : idleLabel;
  }

  function showError(message) {
    if (window.Swal) {
      Swal.fire({ icon: "error", title: "Registration not sent", text: message, confirmButtonColor: NAVY });
    } else {
      alert(message);
    }
  }
});
