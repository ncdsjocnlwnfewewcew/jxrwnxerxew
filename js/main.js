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

    // Implement lazy loading for images to improve performance
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img:not(.logo img)');
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img:not(.logo img)');
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.classList.add('mobile-nav-toggle');
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        nav.insertBefore(mobileNavToggle, navLinks);
        
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileNavToggle.setAttribute('aria-expanded', !expanded);
        });
    }

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
    
    // Add schema.org rich snippets for FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
        };
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent;
            const answer = item.querySelector('p').textContent;
            
            faqSchema.mainEntity.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer
                }
            });
        });
        
        // Add the FAQ schema to the page
        const faqSchemaScript = document.createElement('script');
        faqSchemaScript.type = "application/ld+json";
        faqSchemaScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqSchemaScript);
    }

    // Register service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
    }
}); 