document.querySelectorAll(".card-portfolio").forEach((card) => {
  let bounds;

  function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftX = mouseX - bounds.left;
    const topY = mouseY - bounds.top;

    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    const rotateX = (center.y / bounds.height) * -20; // inclinação vertical
    const rotateY = (center.x / bounds.width) * 20; // inclinação horizontal

    card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
  }

  card.addEventListener("mouseenter", () => {
    bounds = card.getBoundingClientRect();
  });

  card.addEventListener("mousemove", rotateToMouse);

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
  });
});
