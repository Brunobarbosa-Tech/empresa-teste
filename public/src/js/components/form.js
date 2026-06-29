emailjs.init("cJCqBtUEDxeUZX1EX");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    const serviceID = "service_g7356sn";
    const templateID = "template_22a1a0h";
    const submitButton = document.getElementById("submit-btn");
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    emailjs
      .send(serviceID, templateID, formData)
      .then(() => {
        Toastify({
          text: "Mensagem enviada com sucesso! 🚀",
          style: {
            background: "#42C2F5",
            color: "#010103",
          },
        }).showToast();

        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        Toastify({
          text: "⚠️ Ops! Não foi possível enviar o e-mail.",
          style: {
            background: "#dc3545",
            color: "#FFFFFF",
          },
        }).showToast();
        console.error("Erro no envio", error);
      })
      .finally(() => {
        submitButton.textContent = "Enviar mensagem";
         submitButton.disabled = false;
      });
  });
