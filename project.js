document.addEventListener('DOMContentLoaded', function() {
    // GSAP Animations for Hero Section
    gsap.from('.hero-title', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power4.out',
    });

    // Scroll-triggered animations for Projects Section
    const sections = document.querySelectorAll('.projects');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    hamburgerMenu.addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});