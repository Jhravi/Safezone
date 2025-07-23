document.addEventListener("DOMContentLoaded", function() {
    const testimonialGrid = document.querySelector(".testimonial-grid");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    const testimonials = document.querySelectorAll(".testimonial-item");
    const totalTestimonials = testimonials.length;
    const testimonialsPerPage = 3;

    function showTestimonials() {
        const offset = -currentIndex * 100;
        testimonialGrid.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < (totalTestimonials / testimonialsPerPage) - 1) {
            currentIndex++;
            showTestimonials();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showTestimonials();
        }
    });
});
