// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Form Handling with Google Forms Backend
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Track form submission in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (formObject[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(formObject[key])) {
                    formObject[key].push(value);
                } else {
                    formObject[key] = [formObject[key], value];
                }
            } else {
                formObject[key] = value;
            }
        }

        // Basic form validation
        const requiredFields = ['emailAddress', 'entry.641543091', 'entry.771214362']; // email, full name, challenges
        let isValid = true;
        let errorMessage = '';

        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!formObject[field] || formObject[field].trim() === '') {
                isValid = false;
                const fieldName = field === 'emailAddress' ? 'Email' : 
                                 field === 'entry.641543091' ? 'Full Name' : 'Current Challenges and Goals';
                errorMessage += `${fieldName} is required.\n`;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#e9ecef';
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formObject['emailAddress'] && !emailRegex.test(formObject['emailAddress'])) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
            contactForm.querySelector('[name="emailAddress"]').style.borderColor = '#e74c3c';
        }

        if (!isValid) {
            alert('Please correct the following errors:\n\n' + errorMessage);
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Submit to Google Forms
        const form = contactForm;
        const formAction = form.action;
        
        // Create a temporary form to submit to Google Forms
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = formAction;
        tempForm.target = 'hidden_iframe';
        tempForm.style.display = 'none';
        
        // Copy all form data to the temporary form
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && element.value) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = element.name;
                input.value = element.value;
                tempForm.appendChild(input);
            }
        }
        
        // Handle checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = checkbox.name;
            input.value = checkbox.value;
            tempForm.appendChild(input);
        });
        
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
        
        // Show success message after a short delay
        setTimeout(() => {
            showFormSuccess();
            contactForm.reset();
            
            // Track successful submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_success', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form Success'
                });
            }
        }, 1000);
    });
}

// Show form success message
function showFormSuccess() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. I'll get back to you within 24 hours.</p>
            <p class="success-note">If you scheduled a discovery call, you'll receive a confirmation email with the meeting details.</p>
        </div>
    `;
    
    // Replace form with success message
    contactForm.style.display = 'none';
    contactForm.parentNode.insertBefore(successMessage, contactForm);
    
    // Reset submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }
}

// Show form error message
function showFormError() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error-message';
    errorMessage.innerHTML = `
        <div class="error-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3>Oops! Something went wrong.</h3>
            <p>There was an error sending your message. Please try again or contact me directly at ivanjoonkim@gmail.com</p>
            <button onclick="location.reload()" class="btn btn-primary">Try Again</button>
        </div>
    `;
    
    // Replace form with error message
    contactForm.style.display = 'none';
    contactForm.parentNode.insertBefore(errorMessage, contactForm);
    
    // Reset submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }
}

// Performance Optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to Top Button
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top-btn';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2c5530;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Page Loader
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div class="loader" style="
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #2c5530;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 500);
    });
}

// Handle missing elements gracefully
function handleMissingElements() {
    // Check for required elements and provide fallbacks
    const requiredElements = ['contactForm', 'mobile-menu', 'nav-menu'];
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Element with id '${id}' not found on this page`);
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Preload critical resources
    const criticalResources = [
        'css/styles.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'font';
        document.head.appendChild(link);
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2c5530;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if not present
    const mainContent = document.querySelector('main') || document.querySelector('.contact-content') || document.querySelector('.page-header');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleMissingElements();
    optimizePerformance();
    enhanceAccessibility();
    lazyLoadImages();
    createScrollToTopButton();
    showPreloader();
});

