 // Page loading animation
        document.addEventListener('DOMContentLoaded', function() {
            // Scroll indicator
            const scrollIndicator = document.querySelector('.skill-program-scroll-indicator');
            
            function updateScrollIndicator() {
                const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                scrollIndicator.style.transform = `scaleX(${scrolled / 100})`;
            }

            window.addEventListener('scroll', updateScrollIndicator);

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('skill-program-visible');
                    }
                });
            }, observerOptions);

            // Observe all sections
            const sections = document.querySelectorAll('.skill-program-section');
            sections.forEach(section => {
                observer.observe(section);
            });

            // Dynamic background change on scroll
            const hero = document.querySelector('.skill-program-hero');
            let backgrounds = [
                'linear-gradient(rgba(34, 139, 34, 0.8), rgba(46, 125, 50, 0.8)), url("https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                'linear-gradient(rgba(34, 139, 34, 0.8), rgba(46, 125, 50, 0.8)), url("https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
                'linear-gradient(rgba(34, 139, 34, 0.8), rgba(46, 125, 50, 0.8)), url("https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
            ];
            let currentBg = 0;

            // Change background every 10 seconds
            setInterval(() => {
                currentBg = (currentBg + 1) % backgrounds.length;
                hero.style.backgroundImage = backgrounds[currentBg];
            }, 10000);

            // Smooth parallax scrolling for sections
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.skill-program-training-areas');
                
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.backgroundPosition = `center ${yPos}px`;
                });
            });

            // Add random animation delays to cards on refresh
            const cards = document.querySelectorAll('.skill-program-objective-card, .skill-program-training-card, .skill-program-impact-item');
            cards.forEach((card, index) => {
                const randomDelay = Math.random() * 0.5 + 0.2;
                card.style.animationDelay = `${randomDelay}s`;
            });

            // Enhanced hover effects for training cards
            const trainingCards = document.querySelectorAll('.skill-program-training-card');
            trainingCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-20px) rotateX(5deg)';
                    this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotateX(0deg)';
                    this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                });
            });

            // Page refresh animations
            function refreshAnimations() {
                const animatedElements = document.querySelectorAll('[class*="skill-program"]');
                animatedElements.forEach(element => {
                    element.style.animation = 'none';
                    element.offsetHeight; // Trigger reflow
                    element.style.animation = null;
                });
            }

            // Random floating animation for objective cards
            const objectiveCards = document.querySelectorAll('.skill-program-objective-card');
            objectiveCards.forEach((card, index) => {
                const floatAnimation = `skill-program-float-random-${index}`;
                const keyframes = `
                    @keyframes ${floatAnimation} {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        25% { transform: translateY(-${Math.random() * 10 + 5}px) rotate(${Math.random() * 2 - 1}deg); }
                        50% { transform: translateY(${Math.random() * 10 + 5}px) rotate(${Math.random() * 2 - 1}deg); }
                        75% { transform: translateY(-${Math.random() * 10 + 5}px) rotate(${Math.random() * 2 - 1}deg); }
                    }
                `;
                
                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);
                
                card.style.animation = `${floatAnimation} ${4 + Math.random() * 2}s ease-in-out infinite`;
            });
        });

        // Smooth scrolling for better user experience
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add stagger animation to lists
        const lists = document.querySelectorAll('.skill-program-training-list');
        lists.forEach(list => {
            const items = list.querySelectorAll('li');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.animation = 'skill-program-slide-in-right 0.6s ease forwards';
                item.style.opacity = '0';
                item.style.transform = 'translateX(30px)';
            });
        });