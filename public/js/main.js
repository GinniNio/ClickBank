// Main JavaScript for ClickBank Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initScrollEffects();
    initCountdownTimer();
    initExitIntent();
    initMobileMenu();
    initScrollToTop();
    initAnalytics();
});

// Loading screen
function initLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = 'var(--shadow-sm)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Countdown timer
function initCountdownTimer() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;

    // Set countdown to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            timerDisplay.textContent = '00:00:00';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Exit intent popup
function initExitIntent() {
    const popup = document.getElementById('exit-popup');
    if (!popup) return;

    let hasShownPopup = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !hasShownPopup) {
            showPopup();
            hasShownPopup = true;
        }
    });

    // Also show popup after 30 seconds if user hasn't interacted
    setTimeout(() => {
        if (!hasShownPopup) {
            showPopup();
            hasShownPopup = true;
        }
    }, 30000);
}

function showPopup() {
    const popup = document.getElementById('exit-popup');
    if (popup) {
        popup.style.display = 'flex';
        trackEvent('popup_shown', { type: 'exit_intent' });
    }
}

function closePopup() {
    const popup = document.getElementById('exit-popup');
    if (popup) {
        popup.style.display = 'none';
        trackEvent('popup_closed', { type: 'exit_intent' });
    }
}

// Mobile menu
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-up');
    
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// FAQ functionality
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
        if (activeAnswer !== answer) {
            activeAnswer.classList.remove('active');
            activeAnswer.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    button.classList.toggle('active');
    
    // Track FAQ interaction
    const question = button.querySelector('span').textContent;
    trackFAQInteraction(question);
}

// Form handling
async function handleSubscribe(event, source = 'form') {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, source })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(data.message, 'success');
            form.reset();
            closePopup();
            trackEvent('email_subscribed', { source, email });
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Subscription error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    }
}

async function handlePurchase(source) {
    try {
        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source })
        });
        
        const data = await response.json();
        
        if (data.success) {
            trackEvent('purchase_attempt', { source });
            // Redirect to checkout
            window.location.href = data.redirectUrl;
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Purchase error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    }
}

// Message display
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background-color: var(--success-color);' : 
          type === 'error' ? 'background-color: var(--warning-color);' : 
          'background-color: var(--primary-color);'}
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 5000);
}

// Analytics tracking
function initAnalytics() {
    // Track page view
    trackPageView();
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackScrollDepth(maxScroll);
            }
        }
    });
}

function trackPageView() {
    fetch('/api/track/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).catch(console.error);
}

function trackEvent(eventName, data = {}) {
    console.log('Event tracked:', eventName, data);
    // In production, send to your analytics service
}

function trackFAQInteraction(question) {
    fetch('/api/track/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
    }).catch(console.error);
}

function trackScrollDepth(percentage) {
    fetch('/api/track/scroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ percentage })
    }).catch(console.error);
}

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

// Performance optimization
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 4rem;
            left: 0;
            right: 0;
            background: var(--white);
            border-top: 1px solid var(--gray-200);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-links li {
            margin: 0.5rem 0;
        }
        
        .mobile-menu-toggle.active span {
            transform: rotate(45deg);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet); 