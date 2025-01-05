// Advanced JavaScript with Nexus-style animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Utility functions
    const lerp = (start, end, factor) => {
        return start * (1 - factor) + end * factor;
    };

    // Cursor effects
    const initializeCursorEffects = () => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update glow position immediately
            cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            cursorX = lerp(cursorX, mouseX, 0.1);
            cursorY = lerp(cursorY, mouseY, 0.1);
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        document.querySelectorAll('a, button, .feature-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor--hover');
                cursorGlow.classList.add('cursor-glow--hover');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor--hover');
                cursorGlow.classList.remove('cursor-glow--hover');
            });
        });
    };

    // Enhanced navigation
    const initializeNavigation = () => {
        const header = document.querySelector('.header');
        const navToggle = document.querySelector('.nav__toggle');
        const navLinks = document.querySelector('.nav__links');
        let lastScroll = 0;

        // Handle navigation toggle
        navToggle?.addEventListener('click', () => {
            navLinks?.classList.toggle('nav__links--active');
            navToggle.classList.toggle('nav__toggle--active');
            document.body.classList.toggle('nav-open');
        });

        // Scroll-based header
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add blur effect based on scroll
            const blur = Math.min(currentScroll / 100, 20);
            header?.style.setProperty('--header-blur', `blur(${blur}px)`);
            
            // Handle header hide/show
            if (currentScroll <= 0) {
                header?.classList.remove('header--scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header?.classList.contains('header--scroll-down')) {
                header?.classList.remove('header--scroll-up');
                header?.classList.add('header--scroll-down');
            } else if (currentScroll < lastScroll && header?.classList.contains('header--scroll-down')) {
                header?.classList.remove('header--scroll-down');
                header?.classList.add('header--scroll-up');
            }
            lastScroll = currentScroll;
        });
    };

    // Advanced animations
    const initializeAnimations = () => {
        // Parallax effect
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.2;
                const rect = element.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                
                const parallaxOffset = (rect.top + scrolled) * speed;
                element.style.transform = `translateY(${parallaxOffset}px)`;
            });
        });

        // Intersection Observer for element animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate--in');
                    
                    // Add stagger effect for child elements
                    const children = entry.target.querySelectorAll('[data-stagger]');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.classList.add('stagger--in');
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    };

    // Smooth scrolling
    const initializeSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Form handling with advanced validation and feedback
    const initializeFormHandling = () => {
        const forms = document.querySelectorAll('form');
        
        const showNotification = (message, type = 'success') => {
            const notification = document.createElement('div');
            notification.className = `notification notification--${type}`;
            
            const iconMap = {
                success: '✓',
                error: '✕',
                info: 'ℹ'
            };
            
            notification.innerHTML = `
                <span class="notification__icon">${iconMap[type]}</span>
                <span class="notification__message">${message}</span>
                <div class="notification__progress"></div>
            `;
            
            document.body.appendChild(notification);
            
            // Trigger entrance animation
            setTimeout(() => notification.classList.add('notification--visible'), 10);
            
            // Handle exit
            setTimeout(() => {
                notification.classList.remove('notification--visible');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        };

        const validateForm = (formData) => {
            const errors = [];
            
            if (!formData.email?.includes('@')) {
                errors.push('Please enter a valid email address');
            }
            
            if (formData.name?.length < 2) {
                errors.push('Name must be at least 2 characters long');
            }
            
            return errors;
        };

        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = Object.fromEntries(new FormData(form).entries());
                
                // Validate
                const errors = validateForm(formData);
                if (errors.length > 0) {
                    errors.forEach(error => showNotification(error, 'error'));
                    return;
                }
                
                try {
                    const response = await fetch('/api/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    
                    if (!response.ok) throw new Error('Submission failed');
                    
                    showNotification('Form submitted successfully!', 'success');
                    form.reset();
                } catch (error) {
                    showNotification('Failed to submit form. Please try again.', 'error');
                    console.error('Form submission error:', error);
                }
            });
        });
    };

    // Initialize all functionality
    const init = () => {
        initializeCursorEffects();
        initializeNavigation();
        initializeAnimations();
        initializeSmoothScroll();
        initializeFormHandling();
    };

    init();
});
