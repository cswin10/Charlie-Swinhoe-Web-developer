document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // GSAP Animations for Packages
    gsap.from('.package', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2,
        clearProps: 'all' // Ensure properties are cleared after animation
    });

    // Ensure all packages start at the same position
    gsap.set('.package', { y: 0 });

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