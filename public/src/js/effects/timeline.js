document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            } else {

                entry.target.classList.remove("active");

            }

        });

    }, {
        threshold: 0.5
    });

    items.forEach(item => {
        observer.observe(item);
    });

});