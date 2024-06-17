document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const totalItems = carouselItems.length;
    let index = 0; // Start with the first item as the active item
    let startX, isDragging = false;
    let ctr = 0

    const updateCarousel = () => {
        let translateValue;
        if (window.innerWidth > 768) {
            if (index === 0) {
                translateValue = 0;
            } else if (index === totalItems - 1) {
                translateValue = (index - 2) * 33.333;
            } else {
                translateValue = (index - 1) * 33.333;
            }
        } else {
            if(index == 0){
                translateValue  = 0
            }
            else {
                translateValue = index * 95  + ctr
                ctr += 4
            }
        }
        carousel.style.transform = `translateX(-${translateValue}%)`;
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            index = parseInt(event.target.getAttribute('data-index'));
            updateCarousel();
        });
    });

    const handleTouchStart = (event) => {
        startX = event.touches[0].clientX;
        isDragging = true;
    };

    const handleTouchMove = (event) => {
        if (isDragging) {
            const touchX = event.touches[0].clientX;
            const diff = startX - touchX;
            if (diff > 50) {
                index = Math.min(index + 1, totalItems - 1);
                updateCarousel();
                isDragging = false;
            } else if (diff < -50) {
                index = Math.max(index - 1, 0);
                updateCarousel();
                isDragging = false;
            }
        }
    };

    const handleTouchEnd = () => {
        isDragging = false;
    };

    const handleMouseDown = (event) => {
        startX = event.clientX;
        isDragging = true;
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const mouseX = event.clientX;
            const diff = startX - mouseX;
            if (diff > 50) {
                index = Math.min(index + 1, totalItems - 1);
                updateCarousel();
                isDragging = false;
            } else if (diff < -50) {
                index = Math.max(index - 1, 0);
                updateCarousel();
                isDragging = false;
            }
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseUp);

    updateCarousel();
});
