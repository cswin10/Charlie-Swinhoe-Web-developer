document.addEventListener('DOMContentLoaded', function() {
    // GSAP Animations for Hero Section
    gsap.from('.hero-title2', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power4.out',
    });

    gsap.from('.hero-card p', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
        stagger: 0.2
    });

    // Scroll-triggered animations for Skills and Experience Sections
    const sections = document.querySelectorAll('.skills, .experience');
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

    // Skill click effect
    const skills = document.querySelectorAll('.skill');
    const skillCard = document.getElementById('skill-card');
    const skillCardDescription = document.getElementById('skill-card-description');
    const closeCardButton = document.getElementById('close-card');

    skills.forEach(skill => {
        skill.addEventListener('click', () => {
            const description = skill.getAttribute('data-description');
            skillCardDescription.textContent = description;
            skillCard.style.display = 'block';
        });
    });

    closeCardButton.addEventListener('click', () => {
        skillCard.style.display = 'none';
    });

    // Hide skill card when scrolling to another section
    const skillsSection = document.querySelector('.skills');
    const experienceSection = document.querySelector('.experience');

    const hideSkillCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                skillCard.style.display = 'none';
            }
        });
    }, { threshold: 0.9});

    hideSkillCardObserver.observe(skillsSection);
    hideSkillCardObserver.observe(experienceSection);
});