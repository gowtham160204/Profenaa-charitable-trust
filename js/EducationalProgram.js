// Smooth scroll animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to all images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.2}s`;
        
        // Add refresh animation
        img.addEventListener('load', function() {
            this.style.animation = 'education-imageLoad 1s ease-out forwards';
        });
    });
    
    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.education-stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('education-animated');
                
                // Animate statistics when they come into view
                if (entry.target.classList.contains('education-impact')) {
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, index * 200);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add scroll animation classes and observe elements
    const animatedElements = document.querySelectorAll('.education-objective-card, .education-initiative-card, .education-mission-text, .education-impact');
    animatedElements.forEach(el => {
        el.classList.add('education-animate-on-scroll');
        observer.observe(el);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const hero = document.querySelector('.education-hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.education-objective-card, .education-initiative-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Image refresh animation
    function refreshImageAnimations() {
        images.forEach((img, index) => {
            setTimeout(() => {
                img.style.animation = 'education-imageSlide 0.8s ease-out';
                
                setTimeout(() => {
                    img.style.animation = '';
                }, 800);
            }, index * 100);
        });
    }
    
    // Trigger refresh animations periodically
    setInterval(refreshImageAnimations, 10000);
    
    // Add ripple effect to cards
    function createRipple(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(22,79,28,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: education-ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes education-ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add ripple effect to clickable cards
    cards.forEach(card => {
        card.addEventListener('click', createRipple);
    });
    
    // Stagger animation for cards on load
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Update hero parallax
        const hero = document.querySelector('.education-hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Add window load event for final animations
window.addEventListener('load', () => {
    // Final animation sweep
    const allElements = document.querySelectorAll('.education-objective-card, .education-initiative-card');
    allElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'education-slideInUp 0.6s ease-out';
        }, index * 50);
    });
});

// Add resize event listener for responsive adjustments
window.addEventListener('resize', () => {
    // Recalculate animations on resize
    const cards = document.querySelectorAll('.education-initiative-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});