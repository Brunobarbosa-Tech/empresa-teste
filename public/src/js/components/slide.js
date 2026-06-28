document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".slider-container");
    const items = document.querySelectorAll(".slide .item");

    if (!slider || items.length === 0) return;

    let activeIndex = 0;
    let interval = null;
    const DELAY = 4000;

    function updateSlider() {

        items.forEach((item, index) => {

            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);

            item.classList.toggle("is-active", offset === 0);

            // 🔥 movimento mais suave (menos agressivo)
            const translateX = offset * 45;

            // 🔥 escala mais natural (evita "zoom estranho")
            const scale = 1 - absOffset * 0.05;

            // 🔥 opacidade mais suave
            const opacity = 1 - absOffset * 0.25;

            // 🔥 blur leve (Apple style)
            const blur = absOffset * 1.5;

            item.style.transform =
                `translateX(${translateX}%) scale(${scale})`;

            item.style.opacity = Math.max(opacity, 0);

            item.style.filter = `blur(${blur}px)`;

            item.style.zIndex = 10 - absOffset;
        });
    }

    function next() {
        activeIndex = (activeIndex + 1) % items.length;
        updateSlider();
    }

    function start() {
        stop();
        interval = setInterval(next, DELAY);
    }

    function stop() {
        clearInterval(interval);
    }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    document.addEventListener("visibilitychange", () => {
        document.hidden ? stop() : start();
    });

    window.addEventListener("blur", stop);
    window.addEventListener("focus", start);

    updateSlider();
    start();
});