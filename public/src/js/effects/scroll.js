// sessão navbar
const nav = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// sessão cta
const cta = document.querySelector(".cta");

window.addEventListener("scroll", () => {
  const top = cta.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (top < windowHeight - 150) {
    cta.classList.add("active");
  }
});
