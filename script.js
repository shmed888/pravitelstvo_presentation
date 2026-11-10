const slides = document.querySelectorAll(".slide");

const counter = document.getElementById("counter");
const progress = document.getElementById("progress-fill");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const fullscreen = document.getElementById("fullscreen");

let currentSlide = 0;

function showSlide(index) {
    currentSlide = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / 08`;

    progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;

    prev.disabled = currentSlide === 0;
    next.disabled = currentSlide === slides.length - 1;
}

prev.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

next.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

fullscreen.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
    } else {
        await document.exitFullscreen();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        showSlide(currentSlide + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
        showSlide(currentSlide - 1);
    }

    if (event.key === "Home") {
        showSlide(0);
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }
});

showSlide(0);
