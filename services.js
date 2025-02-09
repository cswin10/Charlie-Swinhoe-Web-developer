document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.scrollSnapAlign = 'start';
    });
  
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close i');
  
    hamburgerMenu.addEventListener('click', function() {
      mobileMenu.style.display = 'block';
    });
  
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    });
  });