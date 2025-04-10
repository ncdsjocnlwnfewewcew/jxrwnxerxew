// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle (to be implemented if needed)
    // const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    // const navLinks = document.querySelector('.nav-links');
    
    // if (mobileNavToggle) {
    //     mobileNavToggle.addEventListener('click', () => {
    //         navLinks.classList.toggle('active');
    //     });
    // }

    // Add a scroll event listener to change the header style on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation on scroll effect for elements
    const animateElements = document.querySelectorAll('.feature-card, .screenshot, .faq-item');
    
    // Simple function to check if an element is in view
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // Function to add animation class to elements in viewport
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check and add scroll listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Year in copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 
