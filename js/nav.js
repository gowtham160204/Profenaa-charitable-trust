// DOM Elements
const navbarSecContainer = document.querySelector('.navbar-sec-container');
const navbarSecMobileToggle = document.querySelector('.navbar-sec-mobile-toggle');
const navbarSecMobileMenu = document.querySelector('.navbar-sec-mobile-menu');
const navbarSecDropdowns = document.querySelectorAll('.navbar-sec-dropdown');
const navbarSecMobileDropdowns = document.querySelectorAll('.navbar-sec-mobile-dropdown');

// Initialize navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeMobileMenu();
    initializeDropdowns();
    initializeScrollEffects();
    addLoadingAnimation();
});

// Initialize navbar
function initializeNavbar() {
    // Add gentle entrance animation
    setTimeout(() => {
        navbarSecContainer.style.opacity = '1';
        navbarSecContainer.style.transform = 'translateY(0)';
    }, 200);
    
    // Add ripple effect to clickable elements
    addRippleEffect();
}

// Mobile menu functionality
function initializeMobileMenu() {
    if (navbarSecMobileToggle && navbarSecMobileMenu) {
        navbarSecMobileToggle.addEventListener('click', function() {
            this.classList.toggle('navbar-sec-active');
            navbarSecMobileMenu.classList.toggle('navbar-sec-active');
            
            // Animate menu items
            if (navbarSecMobileMenu.classList.contains('navbar-sec-active')) {
                animateMobileMenuItems();
            }
        });
    }
}

// Animate mobile menu items
function animateMobileMenuItems() {
    const mobileLinks = document.querySelectorAll('.navbar-sec-mobile-link');
    mobileLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Initialize dropdown functionality
function initializeDropdowns() {
    // Desktop dropdowns
    navbarSecDropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.navbar-sec-dropdown-menu');
        const links = menu.querySelectorAll('.navbar-sec-dropdown-link');
        
        dropdown.addEventListener('mouseenter', () => {
            // Animate dropdown links
            links.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.2s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 50);
            });
        });
    });
    
    // Mobile dropdowns
    navbarSecMobileDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar-sec-mobile-dropdown-toggle');
        const content = dropdown.querySelector('.navbar-sec-mobile-dropdown-content');
        
        if (toggle && content) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('navbar-sec-active');
                
                // Animate dropdown icon
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('navbar-sec-active') 
                        ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            });
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbarSecContainer.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbarSecContainer.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background blur effect on scroll
        if (scrollTop > 50) {
            navbarSecContainer.style.background = 'rgba(255, 255, 255, 0.98)';
            navbarSecContainer.style.backdropFilter = 'blur(15px)';
        } else {
            navbarSecContainer.style.background = 'rgba(255, 255, 255, 0.95)';
            navbarSecContainer.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Add loading animation
function addLoadingAnimation() {
    // Create loading bar
    const loadingBar = document.createElement('div');
    loadingBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(loadingBar);
    
    // Animate loading bar
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loadingBar);
                }, 300);
            }, 200);
        }
        loadingBar.style.width = width + '%';
    }, 100);
}

// Add ripple effect to buttons
function addRippleEffect() {
    const rippleElements = document.querySelectorAll('.navbar-sec-menu-link, .navbar-sec-logo, .navbar-sec-search-icon');
    
    rippleElements.forEach(element => {
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
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: navbar-sec-ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes navbar-sec-ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
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

// Add hover sound effect (optional)
function addHoverSounds() {
    const hoverElements = document.querySelectorAll('.navbar-sec-menu-link, .navbar-sec-logo');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Create subtle hover feedback
            element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Initialize hover sounds
addHoverSounds();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        navbarSecMobileToggle.classList.remove('navbar-sec-active');
        navbarSecMobileMenu.classList.remove('navbar-sec-active');
        
        // Close dropdowns
        navbarSecMobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('navbar-sec-active');
        });
    }
});

// Add focus management for accessibility
const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #1b4f1c';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);