const contactForm = document.getElementById("contactForm");
const contactFile = document.getElementById("contactFile");
const fileName = document.getElementById("fileName");
const contactModal = document.getElementById("contactModal");

if (contactFile) {
  contactFile.addEventListener("change", () => {
    const file = contactFile.files[0];

    if (file) {
      fileName.textContent = file.name;
    } else {
      fileName.textContent = "";
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const assunto = document.getElementById("contactSubject").value.trim();
    const mensagem = document.getElementById("contactMessage").value.trim();
    const consentimento = document.getElementById("contactConsent");

    if (!nome || !email || !assunto || !mensagem) {
      alert("Preencha todos os campos antes de enviar.");
      return;
    }

    if (!consentimento.checked) {
      alert("Você precisa concordar com o uso dos dados para enviar o contato.");
      return;
    }

    contactModal.classList.add("active");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2500);
  });
}