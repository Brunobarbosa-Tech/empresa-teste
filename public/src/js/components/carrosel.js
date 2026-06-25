const items = document.querySelectorAll('.item');

let index = 0;

function showSlide(i) {
    items.forEach(item => item.classList.remove('active'));
    items[i].classList.add('active');
}

function nextSlide() {
    index++;
    if (index >= items.length) index = 0;
    showSlide(index);
}

showSlide(index);

setInterval(nextSlide, 5000);

// CARROSEL SESSÃO SOBRE NÓS

const slider = document.querySelector(".culture-slider");
const groups = document.querySelectorAll(".culture-group");
const dotsContainer = document.querySelector(".culture-dots");

groups.forEach((_, index) => {

    const dot = document.createElement("button");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

        const groupWidth =
            groups[index].offsetLeft;

        slider.scrollTo({
            left: groupWidth,
            behavior: "smooth"
        });

        document
            .querySelectorAll(".culture-dots button")
            .forEach(btn => btn.classList.remove("active"));

        dot.classList.add("active");
    });

    dotsContainer.appendChild(dot);

});

setInterval(() => {

    currentIndex++;

    if(currentIndex >= cards.length){
        currentIndex = 0;
    }

    updateSlider();

}, 5000);