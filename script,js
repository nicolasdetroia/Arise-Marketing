 // Ensure the script runs after the DOM is fully loaded
 document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show Typeform on "Apply Now" button click
    const applyNowButton = document.getElementById('apply-now-button');
    const typeformSection = document.getElementById('typeform-section');
    
    if (applyNowButton && typeformSection) {
        applyNowButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link action
            typeformSection.style.display = 'block'; // Show the Typeform section
            typeformSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to it smoothly
        });
    }
});
