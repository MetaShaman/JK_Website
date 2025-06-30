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
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
}

function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            background-color: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 6px;
            border: 1px solid #c3e6cb;
            margin-bottom: 1rem;
            text-align: center;
        ">
            <strong>Thank you!</strong> Your message has been sent successfully. I'll get back to you within 24 hours.
        </div>
    `;
    
    // Insert success message before the form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(successMessage.firstElementChild, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            const message = form.parentNode.querySelector('[style*="background-color: #d4edda"]');
            if (message) {
                message.remove();
            }
        }, 5000);
    }
}

function showFormError() {
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
        <div style="
            background-color: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 6px;
            border: 1px solid #f5c6cb;
            margin-bottom: 1rem;
            text-align: center;
        ">
            <strong>Oops!</strong> There was an error sending your message. Please try again or contact me directly.
        </div>
    `;
    
    // Insert error message before the form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(errorMessage.firstElementChild, form);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            const message = form.parentNode.querySelector('[style*="background-color: #f8d7da"]');
            if (message) {
                message.remove();
            }
        }, 5000);
    }
}

// Analytics Tracking for Page Views
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
    
    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    'event_category': 'Navigation',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'CTA',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
    
    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                const serviceName = this.querySelector('h3').textContent;
                gtag('event', 'service_card_click', {
                    'event_category': 'Services',
                    'event_label': serviceName
                });
            }
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .timeline-item, .add-on-item, .engagement-item, .benefit');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy Loading for Images (if any are added later)
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

// Call lazy loading function
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Scroll to Top Functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Enhanced Form Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add focus/blur effects to form inputs
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card, .feature, .add-on-item');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid var(--primary-color);
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
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Initialize preloader
// showPreloader(); // Uncomment if you want to use the preloader

// Error Handling for Missing Elements
function handleMissingElements() {
    // Check for critical elements and log warnings if missing
    const criticalElements = [
        { selector: '.navbar', name: 'Navigation bar' },
        { selector: '.hero', name: 'Hero section' },
        { selector: '.footer', name: 'Footer' }
    ];
    
    criticalElements.forEach(element => {
        if (!document.querySelector(element.selector)) {
            console.warn(`Warning: ${element.name} not found on this page.`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
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
    
    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Calendly Integration for Contact Form
function initializeCalendly() {
    // Load Calendly script if not already loaded
    if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
    }
    
    // Initialize Calendly widget when script is loaded
    const checkCalendly = setInterval(() => {
        if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
            clearInterval(checkCalendly);
            
            const calendlyWidget = document.getElementById('calendly-widget');
            if (calendlyWidget) {
                window.Calendly.initInlineWidget({
                    url: 'https://calendly.com/joonkim_schedule/land-stewardship-discovery-call',
                    parentElement: calendlyWidget,
                    prefill: {},
                    utm: {}
                });
                console.log('✅ Calendly widget initialized for main contact form');
            }
        }
    }, 100);
}

// Enhanced Calendly event detection
window.addEventListener('message', function(event) {
    // Only process messages from Calendly
    if (event.origin !== 'https://calendly.com') return;
    
    const data = event.data;
    
    // Method 1: Direct event detection
    if (data && data.event === 'calendly.event_scheduled') {
        console.log('🎉 Call scheduled with details:', data);
        handleCallScheduled(data);
    }
    
    // Method 2: Enhanced message parsing
    if (data && typeof data === 'object') {
        if (data.event === 'calendly.event_scheduled') {
            console.log('🎉 Call scheduled with details:', data);
            handleCallScheduled(data);
        }
    }
});

// Function to handle call scheduling
function handleCallScheduled(details) {
    console.log('🎉 Full details object:', details);
    
    // Extract booking details
    let bookingData = {
        booked: 'Yes',
        appointmentType: 'Land Stewardship Discovery Call',
        dateTime: 'Scheduled via Calendly',
        info: 'Booking details captured'
    };
    
    try {
        if (details.payload) {
            console.log('📅 Extracting booking details from details.payload:', details.payload);
            
            const payload = details.payload;
            console.log('📅 Processing payload:', payload);
            
            // Extract event ID
            if (payload.event && payload.event.uri) {
                const eventUri = payload.event.uri;
                const eventId = eventUri.split('/').pop();
                console.log('🎫 Event ID extracted:', eventId);
                bookingData.info = `Event ID: ${eventId}`;
            }
            
            // Extract invitee ID
            if (payload.invitee && payload.invitee.uri) {
                const inviteeUri = payload.invitee.uri;
                const inviteeId = inviteeUri.split('/').pop();
                console.log('👤 Invitee ID extracted:', inviteeId);
                bookingData.info += ` | Invitee ID: ${inviteeId}`;
            }
        }
    } catch (error) {
        console.error('❌ Error extracting booking details:', error);
        bookingData.info = 'Error extracting booking details';
    }
    
    // Store booking data in form fields
    const bookedField = document.getElementById('booked');
    const appointmentTypeField = document.getElementById('appointmentType');
    const dateTimeField = document.getElementById('dateTime');
    const infoField = document.getElementById('info');
    
    if (bookedField) bookedField.value = bookingData.booked;
    if (appointmentTypeField) appointmentTypeField.value = bookingData.appointmentType;
    if (dateTimeField) dateTimeField.value = bookingData.dateTime;
    if (infoField) infoField.value = bookingData.info;
    
    console.log('✅ Booking data stored in form fields:', bookingData);
    
    // Update call status
    updateCallStatus(true);
}

// Function to update call status
function updateCallStatus(callScheduled) {
    const callScheduledStatus = document.getElementById('call-scheduled-status');
    const callNotScheduledStatus = document.getElementById('call-not-scheduled-status');
    
    if (callScheduled) {
        console.log('🎉 Updating call status - call scheduled!');
        
        if (callScheduledStatus) {
            console.log('🔍 Call scheduled status element:', callScheduledStatus);
            callScheduledStatus.style.display = 'block';
            console.log('✅ Found call-scheduled-status element, showing message...');
        }
        
        if (callNotScheduledStatus) {
            callNotScheduledStatus.style.display = 'none';
        }
        
        // Add success message to the page
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #c3e6cb;">
                <strong>✅ Call Scheduled Successfully!</strong><br>
                Your 15-minute discovery call has been scheduled. You can now submit the form below.
            </div>
        `;
        
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(successMessage, form);
            console.log('✅ Success message added to DOM');
        }
        
        // Enable form submission
        window.callScheduled = true;
        console.log('✅ Enabling form submission');
    } else {
        if (callScheduledStatus) {
            callScheduledStatus.style.display = 'none';
        }
        
        if (callNotScheduledStatus) {
            callNotScheduledStatus.style.display = 'block';
        }
        
        window.callScheduled = false;
    }
}

// Test function to simulate call scheduling (for debugging)
function simulateCallScheduled() {
    console.log('🧪 Simulating call scheduled...');
    const mockDetails = {
        event: 'calendly.event_scheduled',
        payload: {
            event: {
                uri: 'https://api.calendly.com/scheduled_events/test-event-id'
            },
            invitee: {
                uri: 'https://api.calendly.com/scheduled_events/test-event-id/invitees/test-invitee-id'
            }
        }
    };
    handleCallScheduled(mockDetails);
}

// Initialize Calendly when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Calendly if we're on the contact page
    if (document.getElementById('calendly-container')) {
        initializeCalendly();
        
        // Set up radio button handling for consultation preference
        const consultationTypeRadios = document.querySelectorAll('input[name="consultation_type"]');
        const calendlyContainer = document.getElementById('calendly-container');
        
        function handleConsultationPreference() {
            const selectedValue = document.querySelector('input[name="consultation_type"]:checked')?.value;
            
            if (selectedValue === 'discovery_call') {
                calendlyContainer.style.display = 'block';
                // Reset call scheduled status when switching to call option
                window.callScheduled = false;
                const callScheduledStatus = document.getElementById('call-scheduled-status');
                if (callScheduledStatus) callScheduledStatus.style.display = 'none';
                // Smooth scroll to the Calendly widget
                calendlyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                calendlyContainer.style.display = 'none';
                window.callScheduled = false;
                const callScheduledStatus = document.getElementById('call-scheduled-status');
                if (callScheduledStatus) callScheduledStatus.style.display = 'none';
            }
        }
        
        // Add event listeners for radio buttons
        consultationTypeRadios.forEach(radio => {
            radio.addEventListener('change', handleConsultationPreference);
        });
        
        // Check initial state
        handleConsultationPreference();
    }
    
    // Form submission handler for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const discoveryCallSelected = document.querySelector('input[name="consultation_type"]:checked')?.value === 'discovery_call';
            const callScheduled = window.callScheduled || false;
            
            console.log('📝 Form submission attempt:');
            console.log('- Discovery call selected:', discoveryCallSelected);
            console.log('- Call scheduled:', callScheduled);
            
            // If discovery call is selected but not scheduled, block submission
            if (discoveryCallSelected && !callScheduled) {
                e.preventDefault();
                
                // Show gentle reminder
                const reminder = document.createElement('div');
                reminder.className = 'alert alert-warning';
                reminder.style.cssText = `
                    background: #fff3cd;
                    border: 1px solid #ffeaa7;
                    color: #856404;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 15px 0;
                    text-align: center;
                `;
                reminder.innerHTML = `
                    <strong>📅 Please Schedule Your Call First</strong><br>
                    To proceed, please schedule your 15-minute discovery call using the calendar above.
                `;
                
                const form = document.getElementById('contactForm');
                form.parentNode.insertBefore(reminder, form);
                
                // Remove reminder after 5 seconds
                setTimeout(() => {
                    if (reminder.parentNode) {
                        reminder.parentNode.removeChild(reminder);
                    }
                }, 5000);
                
                return false;
            }
            
            console.log('✅ Form submission allowed');
            
            // Allow normal form submission (will open Google Forms in new tab)
            return true;
        });
    }
});

