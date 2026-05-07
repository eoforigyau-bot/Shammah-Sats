document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('ph-moon', 'ph-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 3. Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 4. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Mobile Menu (Simple Mock)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    mobileBtn.addEventListener('click', () => {
        alert('Mobile menu feature coming soon in the next update!');
    });

    // 6. Mock Admin CMS Logic (Setup for next phase)
    console.log('GYIC CMS Engine Initialized...');
});
