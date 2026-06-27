document.addEventListener("DOMContentLoaded", () => {

    const slide = document.querySelector(".slide");
    const slider = document.querySelector(".slider-container");

    let interval = null;
    const delay = 3500;

    function nextSlide() {
        const items = document.querySelectorAll(".slide .item");

        if (items.length > 0) {

            const first = items[0];

            // adiciona classe de saída (efeito suave)
            first.style.transition = "transform .6s ease, opacity .6s ease";
            first.style.transform = "translateY(-20px) scale(0.9)";
            first.style.opacity = "0.5";

            setTimeout(() => {
                first.style.transition = "none";
                first.style.transform = "";
                first.style.opacity = "";
                slide.appendChild(first);
            }, 300);
        }
    }

    function startAuto() {
        stopAuto();
        interval = setInterval(nextSlide, delay);
    }

    function stopAuto() {
        clearInterval(interval);
    }

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    startAuto();
});