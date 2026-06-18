function animateCounter(counter) {
  const target = +counter.dataset.target;
  const duration = 2000; // tempo total da animação (ms)
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

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

document.querySelectorAll(".counter").forEach(animateCounter);
