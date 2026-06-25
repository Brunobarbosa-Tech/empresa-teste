document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       COUNTERS KPI
    ========================= */
    function animateCounter(el, target) {
        let count = 0;

        const speed = target / 80; // mais suave

        const interval = setInterval(() => {
            count += speed;

            if (count >= target) {
                count = target;
                clearInterval(interval);
            }

            el.textContent = Math.round(count);

        }, 30);
    }

    /* =========================
       LEVEL UP EFFECT
    ========================= */
    function triggerLevelUp(section) {

        section.classList.add("level-up");

        // micro delay pra sensação de “ganho”
        setTimeout(() => {
            section.classList.remove("level-up");
        }, 900);
    }

    function animateXP(section) {

    const bar = section.querySelector(".xp-fill");
    const numberEl = section.querySelector(".xp-number");

    const value = Number(bar.dataset.value);

    bar.style.width = "0%";
    numberEl.textContent = "0%";

    let progress = 0;

    const animation = setInterval(() => {

        progress += 1;

        if (progress >= value) {

            progress = value;

            clearInterval(animation);

            triggerLevelUp(section);
        }

        bar.style.width = progress + "%";

        numberEl.textContent = progress + "%";

    }, 35);

}

    /* =========================
       KPI COUNTERS OBSERVER
    ========================= */
    const countersObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counters = entry.target.querySelectorAll(".counter");

            counters.forEach(counter => {
                animateCounter(counter, +counter.dataset.value);
            });

            countersObserver.unobserve(entry.target);
        });

    }, { threshold: 0.3 });

    document.querySelectorAll(".saas-reveal")
        .forEach(el => countersObserver.observe(el));

    /* =========================
       XP OBSERVER
    ========================= */
    const xpObserver = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateXP(entry.target);

            obs.unobserve(entry.target);
        });

    }, { threshold: 0.4 });

    document.querySelectorAll(".kpi-xp")
        .forEach(el => xpObserver.observe(el));

});