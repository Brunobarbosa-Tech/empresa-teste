document.addEventListener("DOMContentLoaded", () => {

    const base = document.getElementById("energyBase");

    function createParticle() {

        const p = document.createElement("span");
        p.classList.add("energy-particle");

        const colors = ["#42C2F5", "#6F42F5"];

        const color = colors[Math.floor(Math.random() * colors.length)];

        p.style.background = color;

        p.style.boxShadow = `
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 30px ${color}
        `;

        p.style.left = Math.random() * 200 + "px";
        p.style.bottom = "0px";

        const size = Math.random() * 6 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";

        // 🔥 movimento em “espiral leve”
        const drift = (Math.random() * 120 - 60) + "px";
        p.style.setProperty("--drift", drift);

        // tempo mais variado
        p.style.animationDuration = (Math.random() * 1.5 + 1.5) + "s";

        base.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 3000);
    }

    setInterval(createParticle, 60);
});