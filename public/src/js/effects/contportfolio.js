const section = document.querySelector(".numeros");
const counters = document.querySelectorAll(".count");

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const animateCount = (counter) => {
  const target = +counter.dataset.target;
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOut(progress);

    const value = Math.floor(eased * target);
    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;

      // 🔥 bounce final
      counter.parentElement.style.transform = "scale(1.2)";
      setTimeout(() => {
        counter.parentElement.style.transform = "scale(1)";
      }, 200);
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(animateCount);
      observer.unobserve(section);
    }
  });
}, { threshold: 0.4 });

if (section) observer.observe(section);

const cards = document.querySelectorAll(".numero-card");

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("show");
        }, i * 150); // efeito um por um
      });

      cardObserver.unobserve(section);
    }
  });
}, { threshold: 0.3 });

if (section) cardObserver.observe(section);