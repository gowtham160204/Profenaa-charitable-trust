// DOM Elements
const heroSecContainer = document.querySelector('.hero-sec-container');
const heroSecProgressBar = document.querySelector('.hero-sec-progress-bar');
const heroSecDonateBtn = document.querySelector('.hero-sec-donate-btn');
const heroSecLearnMore = document.querySelector('.hero-sec-learn-more');
const heroSecFloatIcons = document.querySelectorAll('.hero-sec-float-icon');

// Initialize hero section functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSection();
    initializeAnimations();
    initializeInteractions();
    initializeProgressBar();
    addLoadingEffects();
});

// Initialize hero section
function initializeHeroSection() {
    // Add entrance animation delay
    setTimeout(() => {
        heroSecContainer.style.opacity = '1';
    }, 300);
    
    // Initialize floating icons
    initializeFloatingIcons();
    
    // Add ripple effects to interactive elements
    addRippleEffects();
}

// Initialize animations
function initializeAnimations() {
    // Stagger animation for floating icons
    heroSecFloatIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 2000 + (index * 200));
    });
    
    // Typewriter effect for title
    initializeTypewriter();
}

// Initialize interactions
function initializeInteractions() {
    // Donate button interactions
    if (heroSecDonateBtn) {
        heroSecDonateBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        heroSecDonateBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        heroSecDonateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            createHeartExplosion(e);
            showDonationMessage();
        });
    }
    
    // Learn more link interactions
    if (heroSecLearnMore) {
        heroSecLearnMore.addEventListener('click', function(e) {
            e.preventDefault();
            createSparkleEffect(e);
        });
    }
    
    // Floating icons hover effects
    heroSecFloatIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(15deg)';
            this.style.background = 'rgba(116, 185, 255, 0.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'rgba(116, 185, 255, 0.1)';
        });
    });
}

// Initialize floating icons
function initializeFloatingIcons() {
    heroSecFloatIcons.forEach((icon, index) => {
        // Add random initial delay
        const delay = Math.random() * 2000;
        
        setTimeout(() => {
            icon.style.animationDelay = `${Math.random() * 2}s`;
        }, delay);
        
        // Add click interaction
        icon.addEventListener('click', function() {
            createIconBurst(this);
        });
    });
}

// Initialize progress bar
function initializeProgressBar() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                heroSecProgressBar.style.opacity = '0';
            }, 500);
        }
        heroSecProgressBar.style.width = progress + '%';
    }, 150);
}

// Add loading effects
function addLoadingEffects() {
    // Create loading particles
    createLoadingParticles();
    
    // Add shimmer effect to elements
    addShimmerEffect();
}

// Create loading particles
function createLoadingParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-sec-loading-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #74b9ff;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
            animation: hero-sec-particle-float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: 1;
        `;
        
        heroSecContainer.appendChild(particle);
        
        // Remove particles after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
}

// Add shimmer effect
function addShimmerEffect() {
    const shimmerElements = [
        document.querySelector('.hero-sec-message'),
        document.querySelector('.hero-sec-description'),
        document.querySelector('.hero-sec-update')
    ];
    
    shimmerElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                
                const shimmer = document.createElement('div');
                shimmer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    animation: hero-sec-shimmer 2s ease-in-out;
                    z-index: 1;
                `;
                
                element.appendChild(shimmer);
                
                setTimeout(() => {
                    if (shimmer.parentNode) {
                        shimmer.parentNode.removeChild(shimmer);
                    }
                }, 2000);
            }, 1000 + (index * 500));
        }
    });
}

// Initialize typewriter effect
function initializeTypewriter() {
    const title = document.querySelector('.hero-sec-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            // Add cursor blink effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'hero-sec-blink 1s infinite';
            title.appendChild(cursor);
            
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
            }, 3000);
        }
    }, 50);
}

// Create heart explosion effect
function createHeartExplosion(event) {
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: hero-sec-heart-explode 1.5s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        heart.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
        heart.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1500);
    }
}

// Show donation message
function showDonationMessage() {
    const message = document.createElement('div');
    message.textContent = 'Thank you for your generous heart! 💝';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(116, 185, 255, 0.95);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 9999;
        opacity: 0;
        animation: hero-sec-message-popup 3s ease-in-out forwards;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Create sparkle effect
function createSparkleEffect(event) {
    const rect = event.target.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 9999;
            animation: hero-sec-sparkle 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Create icon burst effect
function createIconBurst(icon) {
    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 8px;
            height: 8px;
            background: #74b9ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: hero-sec-burst 0.8s ease-out forwards;
        `;
        
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50;
        burst.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
        burst.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 800);
    }
}

// Add ripple effects
function addRippleEffects() {
    const rippleElements = [heroSecDonateBtn, heroSecLearnMore];
    
    rippleElements.forEach(element => {
        if (element) {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: hero-sec-ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        }
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = ``;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cleanup function
window.addEventListener('beforeunload', function() {
    // Clean up any remaining particles or effects
    const particles = document.querySelectorAll('.hero-sec-loading-particle');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
});






//  //////allll seeeeeccccccctttttiiiiioooonnnnn//////////////
 document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    setupHoverEffects();
    setupScrollAnimations();
    addParticleEffect();
});

function initializeAnimations() {
    // Add staggered animation delays to cards
    const libraryCards = document.querySelectorAll('.home-sect-library-card');
    const serviceCards = document.querySelectorAll('.home-sect-service-card');
    
    libraryCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 * (index + 1)}s`;
    });
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${1 + 0.2 * (index + 1)}s`;
    });
}

function setupHoverEffects() {
    // Enhanced hover effects for library cards
    const libraryCards = document.querySelectorAll('.home-sect-library-card');
    
    libraryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            // Add subtle glow effect
            this.style.boxShadow = '0 25px 50px rgba(74, 144, 226, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.home-sect-service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function setupScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    const allCards = document.querySelectorAll('.home-sect-library-card, .home-sect-service-card');
    allCards.forEach(card => observer.observe(card));
    
    // Observe mission and impact sections
    const sections = document.querySelectorAll('.home-sect-mission, .home-sect-impact');
    sections.forEach(section => observer.observe(section));
    
    // Observe impact cards
    const impactCards = document.querySelectorAll('.home-sect-impact-card');
    impactCards.forEach(card => observer.observe(card));
}

function addParticleEffect() {
    // Create floating particles for enhanced visual appeal
    const particleContainer = document.createElement('div');
    particleContainer.className = 'home-sect-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'home-sect-particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 3 + 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(74, 144, 226, 0.6), rgba(80, 200, 120, 0.6));
        border-radius: 50%;
        left: ${x}px;
        top: 100vh;
        animation: home-sect-floatUp ${animationDuration}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container); // Create new particle
        }
    }, animationDuration * 1000);
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes home-sect-floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Add interactive click effects
document.addEventListener('click', function(e) {
    createClickRipple(e.pageX, e.pageY);
});

function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'home-sect-click-ripple';
    ripple.style.cssText = `
        position: absolute;
        left: ${x - 25}px;
        top: ${y - 25}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(74, 144, 226, 0.3), transparent);
        pointer-events: none;
        z-index: 1000;
        animation: home-sect-rippleEffect 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes home-sect-rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization - pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const allAnimatedElements = document.querySelectorAll('.home-sect-library-card, .home-sect-service-card');
    
    if (document.hidden) {
        allAnimatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        allAnimatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Add dynamic background gradient
function updateBackgroundGradient() {
    const time = Date.now() * 0.001;
    const hue1 = Math.sin(time * 0.3) * 30 + 210;
    const hue2 = Math.sin(time * 0.3 + 2) * 30 + 180;
    
    document.body.style.background = `linear-gradient(135deg, hsl(${hue1}, 30%, 95%) 0%, hsl(${hue2}, 25%, 85%) 100%)`;
    
    requestAnimationFrame(updateBackgroundGradient);
}

// Start dynamic background (subtle effect)
updateBackgroundGradient();

// Add counter animation for impact numbers
function animateCounters() {
    const counters = document.querySelectorAll('.home-sect-impact-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                counter.textContent = Math.floor(current) + '%';
            } else if (numericValue >= 1000) {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('home-sect-impact')) {
            animateCounters();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const impactSection = document.querySelector('.home-sect-impact');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('home-sect-loaded');
    
    // Trigger entrance animations with slight delay
    setTimeout(() => {
        const sections = document.querySelectorAll('.home-sect-libraries, .home-sect-services');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }, 100);
});



// ///////////////////////////////next line///////////////
 // Animation on Refresh: pop in images/sections randomly
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".home-secti-img").forEach((img, i) => {
    img.style.opacity = "0";
    setTimeout(() => {
      img.style.transition = "opacity 1.5s cubic-bezier(0.32,0.72,0.26,1.05), transform 1.5s";
      img.style.opacity = "1";
      img.style.transform = "scale(1.04) rotate(-2deg)";
      setTimeout(() => {
        img.style.transform = "scale(1) rotate(0)";
      }, 800);
    }, 200 + i * 350);
  });
});