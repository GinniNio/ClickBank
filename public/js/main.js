// Main JavaScript file for ClickBank Landing Page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ClickBank Landing Page loaded');
    
    // Initialize all functionality
    initMobileMenu();
    initFAQAccordion();
    initScrollToTop();
    initExitIntentPopup();
    initCountdownTimer();
    initScrollTracking();
    initFadeInAnimations();
    initPurchaseHandlers();
    initEmailSubscription();
    
    // Track page view
    trackPageView();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.classList.add('active');
                }
            });
        }
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollUpBtn = document.getElementById('scrollUp');
    
    if (scrollUpBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollUpBtn.style.display = 'block';
            } else {
                scrollUpBtn.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        scrollUpBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Exit intent popup
function initExitIntentPopup() {
    let popupShown = false;
    const popup = document.getElementById('exit-popup');
    
    if (popup) {
        // Show popup when user tries to leave
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY <= 0 && !popupShown) {
                popup.style.display = 'flex';
                popupShown = true;
                trackEvent('exit_intent_popup_shown');
            }
        });
        
        // Close popup
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });
        }
        
        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }
}

// Countdown timer
function initCountdownTimer() {
    const timerDisplay = document.getElementById('timer-display');
    
    if (timerDisplay) {
        // Set countdown to 24 hours from now
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        function updateTimer() {
            const now = new Date().getTime();
            const distance = endTime - now;
            
            if (distance > 0) {
                const hours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                timerDisplay.textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timerDisplay.textContent = '00:00:00';
            }
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }
}

// Scroll tracking
function initScrollTracking() {
    let scrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                trackedThresholds.add(threshold);
                trackEvent('scroll_depth', { percentage: threshold });
            }
        });
    });
}

// Fade in animations
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Purchase handlers
function initPurchaseHandlers() {
    const purchaseButtons = document.querySelectorAll('[data-purchase]');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.dataset.purchase;
            const source = this.dataset.source || 'button_click';
            
            handlePurchase(product, source);
        });
    });
}

// Email subscription
function initEmailSubscription() {
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const source = this.dataset.source || 'form_submit';
            
            handleEmailSubscription(email, source);
        });
    }
}

// Handle purchase
function handlePurchase(product, source) {
    console.log('💰 Purchase attempt:', { product, source });
    
    // Track the purchase attempt
    trackEvent('purchase_attempt', { product, source });
    
    // Simulate purchase processing
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Send to API
    fetch('/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, amount: 97, source })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to checkout or success page
            window.location.href = '/checkout';
        } else {
            alert('Purchase failed. Please try again.');
            button.textContent = originalText;
            button.disabled = false;
        }
    })
    .catch(error => {
        console.error('Purchase error:', error);
        alert('Purchase failed. Please try again.');
        button.textContent = originalText;
        button.disabled = false;
    });
}

// Handle email subscription
function handleEmailSubscription(email, source) {
    console.log('📧 Email subscription:', { email, source });
    
    // Track the subscription
    trackEvent('email_subscription', { email, source });
    
    // Send to API
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for subscribing!');
        } else {
            alert('Subscription failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Subscription error:', error);
        alert('Subscription failed. Please try again.');
    });
}

// Track page view
function trackPageView() {
    const data = {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent
    };
    
    fetch('/api/track/pageview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Page view tracked:', data))
    .catch(error => console.error('Tracking error:', error));
}

// Track events
function trackEvent(event, data = {}) {
    const eventData = {
        event,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    fetch('/api/track/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => console.log('Event tracked:', data))
    .catch(error => console.error('Event tracking error:', error));
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
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

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
} 