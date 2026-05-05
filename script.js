document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });

    // 3. Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 4. Review Carousel Logic
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = Array.from(track.children);
    
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    // Optional: Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }, 5000);

    // Pause on hover
    document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(autoSlide));
    document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }, 5000);
    });

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe Left
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe Right
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        }
    }

    // 5. Review Form Toggle
    const openReviewFormBtn = document.getElementById('openReviewForm');
    const reviewFormContainer = document.getElementById('reviewFormContainer');

    openReviewFormBtn.addEventListener('click', () => {
        reviewFormContainer.classList.toggle('hidden');
        if (reviewFormContainer.classList.contains('hidden')) {
            openReviewFormBtn.textContent = 'Leave a Review';
        } else {
            openReviewFormBtn.textContent = 'Cancel Review';
        }
    });

    // 6. Star Rating Interaction
    const starBtns = document.querySelectorAll('.star-btn');
    const reviewRatingInput = document.getElementById('reviewRating');

    starBtns.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-val'));
            reviewRatingInput.value = val;
            
            // Fill stars up to clicked
            starBtns.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-val'));
                if (sVal <= val) {
                    s.classList.replace('ph-star', 'ph-fill');
                    if(s.classList.contains('ph-star')) s.classList.remove('ph-star');
                    s.classList.add('ph-star'); // Need to map ph-star and ph-fill correctly
                    // simpler approach:
                    s.className = 'ph-fill ph-star star-btn text-warning'; // text-warning gives the gold color from CSS if needed, we'll manually set color
                    s.style.color = '#ffc107';
                } else {
                    s.className = 'ph ph-star star-btn';
                    s.style.color = '';
                }
            });
        });
    });

    // 7. Form Submissions (Mock)
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = reviewRatingInput.value;
        if (rating == 0) {
            alert('Please select a star rating.');
            return;
        }
        alert('Thank you for your review!');
        reviewForm.reset();
        reviewFormContainer.classList.add('hidden');
        openReviewFormBtn.textContent = 'Leave a Review';
        // Reset stars
        starBtns.forEach(s => {
            s.className = 'ph ph-star star-btn';
            s.style.color = '';
        });
        reviewRatingInput.value = '0';
    });

    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your appointment request has been sent! We will contact you shortly.');
        bookingForm.reset();
    });
});
