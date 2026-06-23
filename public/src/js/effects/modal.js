document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".portfolio-box");

  const modal = document.getElementById("portfolioModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCliente = document.getElementById("modalCliente");
  const modalCategoria = document.getElementById("modalCategoria");
  const modalTech = document.getElementById("modalTech");
  const modalObjetivo = document.getElementById("modalObjetivo");
  const modalDesc = document.getElementById("modalDesc");
  const modalLink = document.getElementById("modalLink");

  const closeModal = document.getElementById("closeModal");
  const btnMore = document.getElementById("btnMore");

  if (!modal || !cards.length) return;

  // ABRIR MODAL
  cards.forEach(card => {

    card.addEventListener("click", (e) => {
      e.preventDefault();

      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalCliente.textContent = card.dataset.cliente;
      modalCategoria.textContent = card.dataset.categoria;
      modalTech.textContent = card.dataset.tech;
      modalObjetivo.textContent = card.dataset.objetivo;
      modalDesc.textContent = card.dataset.desc;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

  });

  // FECHAR
  const close = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  closeModal?.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // VER MAIS / MENOS
  const extras = Array.from(cards).slice(4);
  let expanded = false;

  extras.forEach(c => c.classList.add("hidden"));

  btnMore?.addEventListener("click", () => {

    expanded = !expanded;

    extras.forEach((card, i) => {
      setTimeout(() => {
        card.classList.toggle("hidden", !expanded);
      }, i * 80);
    });

    btnMore.textContent = expanded
      ? "Ver menos projetos"
      : "Ver mais projetos";
  });

});