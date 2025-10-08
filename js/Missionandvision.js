document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializePageAnimations();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add interactive features
    addInteractiveFeatures();
    
    // Add refresh animations
    addRefreshAnimations();
    
    // Add loading animation
    addLoadingAnimation();
});

function initializePageAnimations() {
    // Add staggered animations to header elements
    const headerElements = document.querySelectorAll('.skill-deve-header-content *');
    headerElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Add entrance animations to all sections
    const sections = document.querySelectorAll('.skill-deve-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
    });
}

function addScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate section content
                const sectionContent = entry.target.querySelector('.skill-deve-section-content');
                if (sectionContent) {
                    setTimeout(() => {
                        sectionContent.classList.add('skill-deve-animate');
                    }, 200);
                }
                
                // Animate points with stagger
                const points = entry.target.querySelectorAll('.skill-deve-point');
                points.forEach((point, index) => {
                    point.style.animationDelay = `${0.4 + (index * 0.2)}s`;
                });
                
                // Animate images
                const image = entry.target.querySelector('.skill-deve-section-image');
                if (image) {
                    setTimeout(() => {
                        image.style.animation = 'skill-deve-imageIn 1s ease-out forwards';
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.skill-deve-section');
    sections.forEach(section => observer.observe(section));
}

function addInteractiveFeatures() {
    // Add hover effects for images
    const images = document.querySelectorAll('.skill-deve-section-image');
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(-1deg)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            this.style.animation = 'skill-deve-glow 1s ease-in-out infinite alternate';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            this.style.animation = 'none';
        });
    });

    // Add click animations for sections
    const sections = document.querySelectorAll('.skill-deve-section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            const title = this.querySelector('.skill-deve-section-title');
            if (title) {
                title.style.animation = 'skill-deve-bounce 0.6s ease-in-out';
                setTimeout(() => {
                    title.style.animation = '';
                }, 600);
            }
        });
    });

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.skill-deve-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add floating animation to points
    const points = document.querySelectorAll('.skill-deve-point');
    points.forEach((point, index) => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.color = '#22a028ff';
            this.style.transition = 'all 0.3s ease';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.color = '#555';
        });
    });
}

function addRefreshAnimations() {
    // Animate images on page refresh
    const images = document.querySelectorAll('.skill-deve-section-image');
    images.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.5) rotate(10deg)';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Animate when image loads
        img.addEventListener('load', function() {
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'blur(0px)';
            }, index * 400 + 500);
        });
        
        // If image is already loaded
        if (img.complete) {
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1) rotate(0deg)';
                img.style.filter = 'blur(0px)';
            }, index * 400 + 500);
        }
    });

    // Add typewriter effect to main title
    const mainTitle = document.querySelector('.skill-deve-main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '3px solid white';
        mainTitle.style.animation = 'none';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                    mainTitle.style.animation = 'skill-deve-glow 2s ease-in-out infinite alternate';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Add wave animation to subtitle
    const subtitle = document.querySelector('.skill-deve-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.animation = `skill-deve-fadeInUp 0.5s ease-out ${2 + (index * 0.05)}s forwards`;
            subtitle.appendChild(span);
        });
    }
}

function addLoadingAnimation() {
    // Add loading animation to body
    document.body.classList.add('skill-deve-loading');
    
    // Create floating particles
    createFloatingParticles();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

function createFloatingParticles() {
    const header = document.querySelector('.skill-deve-header');
    if (!header) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: skill-deve-float ${8 + Math.random() * 12}s linear infinite;
            animation-delay: ${Math.random() * 8}s;
            pointer-events: none;
        `;
        header.appendChild(particle);
    }
}

// Add smooth scrolling for anchor links
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

// Add window resize handler for responsive animations
window.addEventListener('resize', function() {
    // Recalculate animations on resize
    const images = document.querySelectorAll('.skill-deve-section-image');
    images.forEach(img => {
        img.style.transition = 'all 0.3s ease';
    });
});

// Add page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Restart animations when page becomes visible
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(element => {
            const animation = element.style.animation;
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = animation;
            }, 10);
        });
    }
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '<span style="color: #999; font-size: 1rem;">Image Loading...</span>';
    });
});