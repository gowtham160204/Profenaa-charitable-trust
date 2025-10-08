// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initImageAnimations();
    initCounterAnimations();
});

// Enhanced image animations
function initImageAnimations() {
    const images = document.querySelectorAll('.what-we-image');
    
    images.forEach((img, index) => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });

        // Add hover effects with delay
        img.addEventListener('mouseenter', function() {
            this.style.animation = 'what-we-pulse 2s ease infinite';
        });

        img.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });

        // Add floating animation with different delays
        setTimeout(() => {
            img.style.animation += ', what-we-float 4s ease-in-out infinite';
        }, index * 500);
    });
}

// Animated counters (for future enhancement)
function initCounterAnimations() {
    const titleText = document.querySelector('.what-we-title-text');
    
    if (titleText) {
        // Add typing effect to main title
        const originalText = titleText.textContent;
        titleText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                titleText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after initial delay
        setTimeout(typeWriter, 1000);
    }
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add click animations to sections
document.querySelectorAll('.what-we-section').forEach(section => {
    section.addEventListener('click', function() {
        this.style.transform += ' scale(1.02)';
        setTimeout(() => {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        }, 200);
    });
});

// Preload images for smooth transitions
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/8500829/pexels-photo-8500829.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/4031821/pexels-photo-4031821.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/6647121/pexels-photo-6647121.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add resize handler for responsive animations
window.addEventListener('resize', function() {
    // Recalculate animations on window resize
    const sections = document.querySelectorAll('.what-we-section');
    sections.forEach(section => {
        section.style.transition = 'all 0.3s ease';
    });
});

// Easter egg: Add special effects on specific key combinations
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        document.body.style.animation = 'what-we-pulse 1s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }
});
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
// Wait for DOM to be fully loaded