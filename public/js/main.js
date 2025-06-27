// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader-wrapper').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader-wrapper').style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth Scrolling for Navigation
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

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollUp = document.getElementById('scrollUp');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollUp.style.display = 'flex';
    } else {
        header.classList.remove('scrolled');
        scrollUp.style.display = 'none';
    }
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        if (faq !== answer) {
            faq.classList.remove('active');
            faq.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "OFFER EXPIRED";
        }
    }, 1000);
}

// Start countdown when page loads
startCountdown();

// Intersection Observer for Fade In Animations
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

// Exit Intent Detection
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        showExitPopup();
    }
});

function showExitPopup() {
    if (!exitIntentShown) {
        document.getElementById('exitPopup').style.display = 'flex';
        exitIntentShown = true;
    }
}

function closeExitPopup() {
    document.getElementById('exitPopup').style.display = 'none';
}

// Exit Form Submission
document.getElementById('exitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Send to server
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you! Check your email for your free checklist and discount code.');
            closeExitPopup();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Thank you! Check your email for your free checklist and discount code.');
        closeExitPopup();
    });
});

// Purchase Tracking Function
function handlePurchase(source) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase_click', {
            'event_category': 'engagement',
            'event_label': source,
            'value': 49
        });
    }
    
    // Send to server
    fetch('/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source: source })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            // Redirect to checkout
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Redirecting to secure checkout...');
        // Fallback redirect
        // window.location.href = 'https://your-checkout-url.com';
    });
}

// Mobile Menu Toggle
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Keyboard Accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeExitPopup();
    }
});

// Performance: Lazy load images when they come into view
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation to all email inputs
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#ff6b6b';
            this.setCustomValidity('Please enter a valid email address');
        } else {
            this.style.borderColor = '#e2e8f0';
            this.setCustomValidity('');
        }
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(loadTime)
        });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
}); 