document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scholarship-schemes-animate-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.scholarship-schemes-objective-card, .scholarship-schemes-scope-item, .scholarship-schemes-beyond-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.scholarship-schemes-stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (counter.textContent.includes('%')) {
                        counter.textContent = Math.ceil(current) + '%';
                    } else if (counter.textContent.includes('+')) {
                        counter.textContent = Math.ceil(current) + '+';
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = counter.textContent.includes('%') 
                        ? target + '%' 
                        : counter.textContent.includes('+') 
                        ? target + '+' 
                        : target;
                }
            };
            
            updateCounter();
        });
    }

    // Observe stats section for counter animation
    const statsSection = document.querySelector('.scholarship-schemes-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Add floating animation to cards on hover
    const cards = document.querySelectorAll('.scholarship-schemes-objective-card, .scholarship-schemes-beyond-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'scholarship-schemes-card-hover 0.3s ease forwards';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.scholarship-schemes-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('scholarship-schemes-ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add button feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.scholarship-schemes-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Image lazy loading with fade in effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        if (img.complete) {
            img.onload();
        }
    });

    // Add stagger animation to grid items
    function addStaggerAnimation(selector, delay = 100) {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * delay}ms`;
        });
    }

    addStaggerAnimation('.scholarship-schemes-objective-card', 150);
    addStaggerAnimation('.scholarship-schemes-scope-item', 200);
    addStaggerAnimation('.scholarship-schemes-beyond-card', 100);

    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .scholarship-schemes-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        transform: scale(0);
        animation: scholarship-schemes-ripple-animation 0.6s linear;
    }
    
    @keyframes scholarship-schemes-ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .scholarship-schemes-animate-in {
        animation: scholarship-schemes-fade-in-up 0.8s ease forwards;
    }
    
    @keyframes scholarship-schemes-card-hover {
        to {
            transform: translateY(-15px) scale(1.02);
        }
    }
`;
document.head.appendChild(style);