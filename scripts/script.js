// Modern JavaScript with enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    const initializeNavigation = () => {
        const navToggle = document.querySelector('.nav__toggle');
        const navLinks = document.querySelector('.nav__links');
        
        navToggle?.addEventListener('click', () => {
            navLinks?.classList.toggle('nav__links--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
    };

    const handleSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    };

    const handleScroll = () => {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
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

    const handleApplyNow = () => {
        const applyButtons = document.querySelectorAll('.nav__link--cta, .btn-primary');
        
        applyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.getAttribute('href')?.includes('apply.html')) {
                    e.preventDefault();
                    const formSection = document.querySelector('.typeform-section');
                    
                    if (formSection) {
                        formSection.style.display = 'block';
                        formSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.href = '/webpages/apply.html';
                    }
                }
            });
        });
    };

    const handleAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate--in');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        document.querySelectorAll('.feature-item, .hero__title, .hero__subtitle').forEach(element => {
            element.classList.add('animate--prepare');
            observer.observe(element);
        });
    };

    const handleFormValidation = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Example validation
                if (!data.email?.includes('@')) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Handle form submission
                submitForm(data);
            });
        });
    };

    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    const submitForm = async (data) => {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) throw new Error('Submission failed');
            
            showNotification('Form submitted successfully!');
        } catch (error) {
            showNotification('Failed to submit form. Please try again.', 'error');
            console.error('Form submission error:', error);
        }
    };

    // Initialize all functionality
    initializeNavigation();
    handleSmoothScroll();
    handleScroll();
    handleApplyNow();
    handleAnimations();
    handleFormValidation();
});
