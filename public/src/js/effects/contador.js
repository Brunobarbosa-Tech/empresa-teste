function animateCounter(counter) {
  const target = +counter.dataset.target;
  const duration = 1800;
  const startTime = performance.now();

  counter.textContent = "0 +";

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = easeOutCubic(Math.min(elapsed / duration, 1));
    const value = Math.floor(progress * target);

    counter.textContent = value + " +";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + " +";
    }
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    // entra na tela → anima
    if (entry.isIntersecting) {
      animateCounter(el);
      el.dataset.animated = "true";
    }

    // sai da tela → reseta (permite reanimar depois)
    else {
      el.textContent = "0 +";
      el.dataset.animated = "false";
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => observer.observe(counter));
