 // About Section JavaScript - Image Management & Interactions

class AboutSecImageManager {
    constructor() {
        this.profileImages = [

            './assets profenaaa/IMG_20221230_141038.jpg',
            // './assets profenaaa/IMG_20221230_141647.jpg',
            
            // './assets profenaaa/IMG_20221230_141038.jpg',
            './assets profenaaa/IMG_20221230_141647.jpg',
            // './assets profenaaa/IMG_20221230_141034.jpg',
            './assets profenaaa/d5465ad2fa264efb4f5d77340727516c3e8ffeab.png',
            './assets profenaaa/IMG_20221230_141034.jpg'

            
        ];
        
        this.currentImageIndex = 0;
        this.profileImageElement = document.getElementById('profileImage');
        this.refreshButton = document.getElementById('refreshBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.preloadImages();
        this.addImageErrorHandling();
        this.enhanceAccessibility();
    }
    
    bindEvents() {
        // Refresh button click event
        this.refreshButton.addEventListener('click', () => {
            this.refreshImage();
        });
        
        // Keyboard navigation
        this.refreshButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.refreshImage();
            }
        });
        
        // Auto-refresh on double click of image
        this.profileImageElement.addEventListener('dblclick', () => {
            this.refreshImage();
        });
        
        // Add touch events for mobile
        let touchStartTime;
        this.profileImageElement.addEventListener('touchstart', () => {
            touchStartTime = Date.now();
        });
        
        this.profileImageElement.addEventListener('touchend', () => {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 300) { // Quick tap
                this.refreshImage();
            }
        });
    }
    
    refreshImage() {
        // Add loading animation
        this.profileImageElement.classList.add('About-sec-loading');
        this.refreshButton.style.pointerEvents = 'none';
        
        // Get next image
        this.currentImageIndex = (this.currentImageIndex + 1) % this.profileImages.length;
        const newImageSrc = this.addCacheBuster(this.profileImages[this.currentImageIndex]);
        
        // Create new image element for smooth transition
        const tempImage = new Image();
        tempImage.onload = () => {
            setTimeout(() => {
                this.profileImageElement.src = newImageSrc;
                this.profileImageElement.classList.remove('About-sec-loading');
                this.refreshButton.style.pointerEvents = 'auto';
                
                // Add a subtle animation effect
                this.profileImageElement.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.profileImageElement.style.transform = 'scale(1)';
                }, 100);
            }, 300);
        };
        
        tempImage.onerror = () => {
            this.handleImageError();
        };
        
        tempImage.src = newImageSrc;
    }
    
    addCacheBuster(imageUrl) {
        const separator = imageUrl.includes('?') ? '&' : '?';
        return `${imageUrl}${separator}_t=${Date.now()}`;
    }
    
    preloadImages() {
        // Preload next few images for better performance
        const preloadCount = Math.min(3, this.profileImages.length);
        for (let i = 1; i <= preloadCount; i++) {
            const imageIndex = (this.currentImageIndex + i) % this.profileImages.length;
            const img = new Image();
            img.src = this.profileImages[imageIndex];
        }
    }
    
    handleImageError() {
        console.warn('Failed to load image, trying next one...');
        this.currentImageIndex = (this.currentImageIndex + 1) % this.profileImages.length;
        
        setTimeout(() => {
            this.refreshImage();
        }, 500);
    }
    
    addImageErrorHandling() {
        this.profileImageElement.addEventListener('error', () => {
            this.handleImageError();
        });
    }
    
    enhanceAccessibility() {
        // Add ARIA labels and descriptions
        this.refreshButton.setAttribute('aria-label', 'Refresh profile image');
        this.profileImageElement.setAttribute('role', 'img');
        
        // Add keyboard navigation hints
        this.refreshButton.title = 'Click to refresh image (Enter or Space key)';
        this.profileImageElement.title = 'Double-click or tap to refresh image';
    }
}

// Enhanced scroll animations
class AboutSecScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.About-sec-paragraph');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.triggerAllAnimations();
        }
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, this.observerOptions);
        
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    triggerAllAnimations() {
        this.animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
}

// Performance monitoring
class AboutSecPerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`About section loaded in ${loadTime.toFixed(2)}ms`);
        });
        
        // Monitor image loading performance
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', (e) => {
                const loadTime = performance.now() - this.startTime;
                console.log(`Image loaded: ${e.target.alt || 'Unnamed'} in ${loadTime.toFixed(2)}ms`);
            });
        });
    }
}

// Utility functions
const AboutSecUtils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    
    // Smooth scroll utility
    smoothScrollTo(element) {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Enhanced responsive behavior
class AboutSecResponsiveHandler {
    constructor() {
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024
        };
        
        this.init();
    }
    
    init() {
        this.handleResize();
        window.addEventListener('resize', AboutSecUtils.debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    handleResize() {
        const width = window.innerWidth;
        const body = document.body;
        
        // Remove existing classes
        body.classList.remove('About-sec-mobile', 'About-sec-tablet', 'About-sec-desktop');
        
        // Add appropriate class based on screen size
        if (width <= this.breakpoints.mobile) {
            body.classList.add('About-sec-mobile');
        } else if (width <= this.breakpoints.tablet) {
            body.classList.add('About-sec-tablet');
        } else {
            body.classList.add('About-sec-desktop');
        }
        
        // Update image aspect ratio for mobile
        const profileImage = document.getElementById('profileImage');
        if (width <= this.breakpoints.mobile && profileImage) {
            profileImage.style.aspectRatio = '3/4';
        }
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image manager
    const imageManager = new AboutSecImageManager();
    
    // Initialize scroll animations
    const scrollAnimations = new AboutSecScrollAnimations();
    
    // Initialize performance monitoring
    const performanceMonitor = new AboutSecPerformanceMonitor();
    
    // Initialize responsive handler
    const responsiveHandler = new AboutSecResponsiveHandler();
    
    // Add loading complete class to body
    setTimeout(() => {
        document.body.classList.add('About-sec-loaded');
    }, 100);
    
    console.log('About section initialized successfully');
});

// Handle page visibility changes for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Export for potential future extensions
window.AboutSecComponents = {
    ImageManager: AboutSecImageManager,
    ScrollAnimations: AboutSecScrollAnimations,
    PerformanceMonitor: AboutSecPerformanceMonitor,
    ResponsiveHandler: AboutSecResponsiveHandler,
    Utils: AboutSecUtils
};