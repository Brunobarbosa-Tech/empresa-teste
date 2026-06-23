document.addEventListener("DOMContentLoaded", () => {

  const processoSection = document.querySelector(".processo");
  const title = document.querySelector(".processo .section-title");
  const cards = document.querySelectorAll(".processo-card");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        // TITULO
        if (title) {
          title.classList.add("show");
        }

        // CARDS COM DELAY (CASCADE)
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 150);
        });

        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.3
  });

  if (processoSection) {
    observer.observe(processoSection);
  }

});