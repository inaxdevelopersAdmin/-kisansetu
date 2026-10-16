// Krishimitara starter website interactions.
// Before publishing, replace this with an official contact email address.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-role]").forEach(link => {
  link.addEventListener("click", () => {
    const roleSelect = document.getElementById("role");
    const requested = link.dataset.role;
    const match = [...roleSelect.options].find(option => option.text.toLowerCase().includes(requested.toLowerCase()));
    if (match) roleSelect.value = match.value;
  });
});

const form = document.getElementById("joinForm");
const formMessage = document.getElementById("formMessage");
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  if (CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
    formMessage.textContent = "Setup needed: open script.js and replace YOUR_EMAIL@example.com with your official contact email, then publish again. The form is not sending or saving data yet.";
    formMessage.classList.add("message-warning");
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Krishimitara website enquiry — ${data.get("role")}`);
  const body = encodeURIComponent(
`New Krishimitara website enquiry

Name: ${data.get("fullName")}
Role: ${data.get("role")}
Email: ${data.get("email") || "Not provided"}
Phone: ${data.get("phone") || "Not provided"}
Location: ${data.get("location") || "Not provided"}

Message:
${data.get("message")}

Consent: Yes`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  formMessage.textContent = "Your email app should open with the enquiry prepared. Please send it from your email app.";
  formMessage.classList.remove("message-warning");
});
