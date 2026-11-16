const toggleTheme = document.getElementById("toggleTheme");
const themeIcon = document.getElementById("themeIcon");
const toggleMenu = document.getElementById("toggleMenu");
const submitBtn = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");
const contactForm = document.getElementById("contactForm");
const savedTheme = localStorage.getItem("portfolio-theme");
const toggleMenuImg = document.getElementById("toggleMenuImg");
const navLinks = document.querySelectorAll(".navlinks a");

if (savedTheme === "light-theme") {
  document.body.classList.add("light-theme");
  themeIcon.src = "images/night-mode.png";
} else {
  document.body.classList.remove("light-theme");
  themeIcon.src = "images/light-mode.png";
}

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLightMode = document.body.classList.contains("light-theme");
  if (isLightMode === true) {
    localStorage.setItem("portfolio-theme", "light-theme");

    themeIcon.src = "images/night-mode.png";
    toggleTheme.setAttribute("aria-label", "switch to darkmode");
  } else {
    localStorage.setItem("portfolio-theme", "dark");
    themeIcon.src = "images/light-mode.png";
    toggleTheme.setAttribute("aria-label", "switch to lightmode");
  }
});

toggleMenu.addEventListener("click", () => {
  document.body.classList.toggle("open");

  const isMenu = document.body.classList.contains("open");
  if (isMenu === true) {
    toggleMenuImg.src = "images/close.png";
  } else {
    toggleMenuImg.src = "images/menu.png";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("open");

    toggleMenuImg.src = "images/menu.png";
  });
});
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "SENDING...";
  formStatus.textContent = "";
  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      formStatus.textContent = "Message Delivered!, Thank you";
      formStatus.style.color = "green";

      contactForm.reset();
    } else {
      formStatus.textContent = "Message could not be sent.Please try again";
      formStatus.style.color = "red";
    }
  } catch (error) {
    formStatus.textContent =
      "Network error. Please check your internet connection";
    formStatus.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "SEND";
  }
});
