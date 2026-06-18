const menuBtn = document.querySelector(".mobile-menu-btn");
const navList = document.querySelector(".nav-list");
const icon = menuBtn.querySelector("i");

/* ABRIR E FECHAR MENU */

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  navList.classList.toggle("active");

  if (navList.classList.contains("active")) {
    icon.classList.remove("bi-grid-3x3-gap-fill");
    icon.classList.add("bi-x-square-fill");
  } else {
    icon.classList.remove("bi-x-square-fill");
    icon.classList.add("bi-grid-3x3-gap-fill");
  }
});

/* FECHAR AO CLICAR FORA */

document.addEventListener("click", (e) => {
  if (
    navList.classList.contains("active") &&
    !navList.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    navList.classList.remove("active");

    icon.classList.remove("bi-x-square-fill");
    icon.classList.add("bi-grid-3x3-gap-fill");
  }
});
