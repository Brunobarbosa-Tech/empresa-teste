document.addEventListener("DOMContentLoaded", () => {

    const base = document.getElementById("energyBase");

    function createParticle() {

        const p = document.createElement("span");

        p.classList.add("energy-particle");

        p.style.left =
            Math.random() * 180 + "px";

        p.style.bottom = "0px";

        p.style.width =
            Math.random() * 8 + 3 + "px";

        p.style.height =
            p.style.width;

        p.style.setProperty(
            "--drift",
            (Math.random() * 80 - 40) + "px"
        );

        p.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        base.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 4000);
    }

    setInterval(createParticle, 100);

});