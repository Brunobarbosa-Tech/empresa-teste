const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {

        const elementTop = el.getBoundingClientRect().top;

        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);