// ============================================
// Loblich - Smeg Style Website
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Lazy loading images already handled by native loading="lazy"
    console.log('Loblich - Smeg Style Website loaded');

    // ============================================
    // Latest News Carousel
    // ============================================
    const track = document.querySelector('.news-carousel-track');
    const slides = document.querySelectorAll('.news-carousel-slide');
    const prevBtn = document.querySelector('.news-carousel-prev');
    const nextBtn = document.querySelector('.news-carousel-next');
    const dots = document.querySelectorAll('.news-carousel-dot');
    let currentIndex = 0;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.dataset.slide);
                goToSlide(slideIndex);
            });
        });

        // Auto play
        let autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Pause auto play on hover
        const carouselContainer = document.querySelector('.news-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            carouselContainer.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 5000);
            });
        }
    }
});
