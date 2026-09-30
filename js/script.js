document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del carrusel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Ocultar todos los slides y quitar active de los puntos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Mostrar el slide actual y activar el punto
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

    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Deslizar a la izquierda -> Siguiente slide
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Deslizar a la derecha -> Slide anterior
            let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevSlide);
        }
    }

    // Inicializar el primer slide
    showSlide(0);
});