// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('intro-about-reveal');
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.intro-about-objective, .intro-about-vision, .intro-about-training, .intro-about-education, .intro-about-skills, .intro-about-healthcare, .intro-about-partnership');
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add stagger animation to training items
    // const trainingItems = document.querySelectorAll('.intro-about-training-item');
    // trainingItems.forEach((item, index) => {
    //     item.style.animationDelay = `${index * 0.1}s`;
    // });

    // Add stagger animation to service list items
    const serviceItems = document.querySelectorAll('.intro-about-services-list li');
    serviceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.intro-about-hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
    });

    // Add random floating animation to images
    const images = document.querySelectorAll('.intro-about-image-container');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.5}s`;
        img.style.animationDuration = `${6 + (index % 3)}s`;
    });

    // Add typing effect to main title
    const mainTitle = document.querySelector('.intro-about-main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add hover effect to sections
    const allSections = document.querySelectorAll('[class*="intro-about-"]');
    allSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'scale(1.02)';
            section.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'scale(1)';
        });
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add random pulse animation to training items
    setInterval(() => {
        const randomItem = trainingItems[Math.floor(Math.random() * trainingItems.length)];
        if (randomItem) {
            randomItem.style.animation = 'intro-about-pulse 1s ease';
            setTimeout(() => {
                randomItem.style.animation = '';
            }, 1000);
        }
    }, 3000);

    // Add dynamic background color change
    let colorIndex = 0;
    const colors = ['#f8f9fa'];
    
    setInterval(() => {
        document.querySelector('.intro-about-container').style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 10000);

    // Add image lazy loading effect
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.filter = 'blur(0px)';
                img.style.transition = 'filter 0.5s ease';
            }
        });
    });

    document.querySelectorAll('.intro-about-image').forEach(img => {
        img.style.filter = 'blur(5px)';
        imageObserver.observe(img);
    });
});