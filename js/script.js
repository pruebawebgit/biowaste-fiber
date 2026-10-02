document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del carrusel (si existen en la página)
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Si no hay carrusel en la página, detener la ejecución
    if (slides.length === 0) return;

    let currentSlide = 0;

    // Función para mostrar un slide específico
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Evento clic en los puntos de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // --- Soporte para deslizar (Swipe) en móviles ---
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevSlide);
        }
    }

    // Inicializar el primer slide
    showSlide(0);
});