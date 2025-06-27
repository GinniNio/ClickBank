'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

export default function ClickBankMarketingPage() {
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    // Countdown Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // FAQ Toggle Function
    const toggleFAQ = (element: HTMLElement) => {
      const answer = element.nextElementSibling as HTMLElement;
      const icon = element.querySelector('.faq-icon') as HTMLElement;
      
      // Close all other FAQs
      document.querySelectorAll('.faq-answer').forEach((faq) => {
        if (faq !== answer) {
          faq.classList.remove('active');
          const prevElement = faq.previousElementSibling as HTMLElement;
          if (prevElement) prevElement.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      answer.classList.toggle('active');
      element.classList.toggle('active');
    };

    // Add click handlers to FAQ questions
    document.querySelectorAll('.faq-question').forEach((question) => {
      question.addEventListener('click', () => toggleFAQ(question as HTMLElement));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Header scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header');
      const scrollUp = document.getElementById('scrollUp');
      
      if (window.scrollY > 100) {
        header?.classList.add('scrolled');
        if (scrollUp) scrollUp.style.display = 'flex';
      } else {
        header?.classList.remove('scrolled');
        if (scrollUp) scrollUp.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && window.scrollY > 1000) {
        setExitIntentShown(true);
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Intersection Observer for animations
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

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearInterval(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [exitIntentShown]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const trackPurchase = (source: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase_click', {
        'event_category': 'engagement',
        'event_label': source,
        'value': 49
      });
    }
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 49,
        currency: 'USD',
        content_name: 'ClickBank Marketing Blueprint'
      });
    }

    // Redirect to checkout
    window.location.href = '/checkout';
  };

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleExitFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.querySelector('input[type="email"]') as HTMLInputElement;
    
    // Here you would send the email to your server
    alert('Thank you! Check your email for your free checklist and discount code.');
    closeExitPopup();
  };

  return (
    <>
      <Head>
        <title>The Ultimate ClickBank Marketing Blueprint: Unleash Your Potential | ClickBank Marketing Secret</title>
        <meta name="description" content="Transform your ClickBank earnings with our proven step-by-step system. Learn insider strategies from successful marketers and dominate profitable niches today." />
        <meta name="keywords" content="ClickBank marketing, affiliate marketing, digital products, online income, marketing blueprint, niche mastery" />
        <link rel="canonical" href="https://clickbankmarketingsecret.club/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Ultimate ClickBank Marketing Blueprint" />
        <meta property="og:description" content="Discover the proven system that transforms struggling affiliates into ClickBank success stories" />
        <meta property="og:image" content="https://clickbankmarketingsecret.club/images/og-image.jpg" />
        <meta property="og:url" content="https://clickbankmarketingsecret.club" />
        <meta property="og:type" content="website" />
        
        {/* Performance Optimizations */}
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" as="style" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Schema Markup */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Ultimate ClickBank Marketing Blueprint",
            "description": "Complete guide to ClickBank affiliate marketing success with Niche Mastery system",
            "brand": "ClickBank Marketing Secret",
            "offers": {
              "@type": "Offer",
              "price": "49",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validThrough": "2025-12-31",
              "url": "https://clickbankmarketingsecret.club/#purchase"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "847",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* Loading Spinner */}
      <div id="loader-wrapper">
        <div className="loader"></div>
      </div>

      {/* Header */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="logo">
            <i className="fas fa-chart-line"></i> ClickBank Marketing Secret
          </a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About ClickBank</a></li>
            <li><a href="#features">What You Get</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
          <button className="mobile-menu-toggle" id="mobileMenuToggle">
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </header>

      <div id="page" className="page">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content fade-in">
              <h1>The Ultimate ClickBank Marketing Blueprint:<br />Unleash Your Potential</h1>
              <p className="hero-subtitle">
                Are you tired of struggling to make sales on ClickBank? Are you looking for a proven, 
                step-by-step system to take your earnings to the next level? Look no further than our 
                Ultimate ClickBank Marketing Blueprint.
              </p>
              
              <div className="countdown-timer">
                ⚡ Limited Time Offer: Save 50% - Act Fast! ⚡
                <div className="timer-display" id="countdown">{formatTime(timeLeft)}</div>
              </div>
              
              <a href="#purchase" className="cta-button" onClick={() => trackPurchase('hero_cta')}>
                <i className="fas fa-rocket"></i> Buy Now - $49
              </a>
              
              <div className="trust-indicators">
                <div className="trust-badge">
                  <i className="fas fa-shield-alt"></i>
                  30-Day Money-Back Guarantee
                </div>
                <div className="trust-badge">
                  <i className="fas fa-download"></i>
                  Instant Digital Access
                </div>
                <div className="trust-badge">
                  <i className="fas fa-users"></i>
                  10,000+ Happy Customers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About ClickBank Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <h2 className="section-title fade-in">About ClickBank</h2>
            <div className="about-grid">
              <div className="about-content fade-in">
                <h3>The World's Premier Digital Marketplace</h3>
                <p>
                  ClickBank is an online marketplace that connects digital product creators with affiliate 
                  marketers. As a product creator, you can list your product and allow others to promote it for 
                  a commission. As an affiliate marketer, you can promote products and earn a commission for each 
                  sale. ClickBank handles payment processing and tracking, and offers reporting tools to help you 
                  track your performance.
                </p>
                <ul className="features-list">
                  <li><i className="fas fa-check-circle text-primary"></i> Over 6 million products in 200+ categories</li>
                  <li><i className="fas fa-check-circle text-primary"></i> Commissions up to 75% per sale</li>
                  <li><i className="fas fa-check-circle text-primary"></i> Global reach in 190+ countries</li>
                  <li><i className="fas fa-check-circle text-primary"></i> Advanced analytics and tracking tools</li>
                </ul>
              </div>
              <div className="about-visual fade-in">
                <i className="fas fa-chart-line" style={{fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1rem', position: 'relative', zIndex: 2}}></i>
                <h4 style={{position: 'relative', zIndex: 2}}>Start Your Success Journey</h4>
                <p style={{position: 'relative', zIndex: 2}}>From beginner to expert in 30 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Pitch Section */}
        <section className="section product-pitch">
          <div className="container">
            <h2 className="section-title" style={{color: 'white'}}>Product Pitch</h2>
            <div className="product-card fade-in">
              <h3 style={{fontSize: '2rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2}}>
                "Niche Mastery" - Your Key to ClickBank Success
              </h3>
              <p style={{fontSize: '1.1rem', lineHeight: 1.7, position: 'relative', zIndex: 2}}>
                Struggling to find profitable niches for your ClickBank affiliate marketing business? 
                <strong>"Niche Mastery"</strong> has you covered. This ultimate guide reveals the secrets to choosing niches that 
                truly resonate with your audience and align with your goals on ClickBank. Learn how to conduct 
                market research, analyze niches, target audiences, and optimize your strategy for maximum 
                conversion rates and long-term success on the platform. Stop wasting time on ineffective niches and start seeing real, 
                sustainable results on ClickBank. Get <strong>"Niche Mastery"</strong> now and dominate the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Why You Need This Section */}
        <section className="section bg-white">
          <div className="container">
            <h2 className="section-title fade-in">Why you need this</h2>
            <div className="section-subtitle fade-in">
              Transform your ClickBank business with proven strategies that actually work
            </div>
            <div className="features-grid">
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-user-secret"></i>
                </div>
                <h3>Learn From The Pros</h3>
                <p>We'll take you behind the scenes of successful ClickBank marketers, so you can learn from the pros and apply their strategies to your own business.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-content"></i>
                </div>
                <h3>High-Quality Content Creation</h3>
                <p>We'll show you how to create high-quality content that delivers real value to your audience, setting you apart from the competition.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>Profitable Niche Selection</h3>
                <p>You'll learn how to choose profitable niches on ClickBank, with step-by-step guidance that makes the process easy and effective.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Complete Success System</h3>
                <p>Our comprehensive guide will give you everything you need to succeed in digital product affiliate marketing on ClickBank. Don't wait - get started today and start seeing real, sustainable results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section id="features" className="section features-section">
          <div className="container">
            <h2 className="section-title fade-in">What you get</h2>
            <div className="features-grid">
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Exclusive Insights & Strategies</h3>
                <p>Gain exclusive insights and strategies from successful ClickBank marketers who are generating 6-7 figure incomes.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>High-Converting Content Methods</h3>
                <p>Learn how to create high-quality content that sets you apart from the competition and drives sales on ClickBank.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>Niche Research Mastery</h3>
                <p>Get step-by-step guidance on choosing profitable niches with high demand and low competition.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-key"></i>
                </div>
                <h3>Digital Marketing Secrets</h3>
                <p>Unlock the secrets to digital product affiliate marketing success on ClickBank with proven methodologies.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h3>Success Community Access</h3>
                <p>Join the ranks of successful ClickBank marketers and start seeing real, sustainable results today.</p>
              </div>
              
              <div className="feature-card fade-in">
                <div className="feature-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h3>Done-For-You Resources</h3>
                <p>Get access to templates, swipe files, and tools that have generated millions in affiliate commissions.</p>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <a href="#purchase" className="cta-button" onClick={() => trackPurchase('features_cta')}>
                <i className="fas fa-shopping-cart"></i> Buy Now - $49
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="purchase" className="section pricing-section">
          <div className="container">
            <h2 className="section-title fade-in">Ready to dominate ClickBank affiliate marketing and start seeing real results?</h2>
            <div className="pricing-card fade-in">
              <h3 style={{fontSize: '2rem', marginBottom: '1rem', position: 'relative', zIndex: 2}}>
                Our comprehensive guide has everything you need:
              </h3>
              <ul style={{textAlign: 'left', margin: '2rem 0', position: 'relative', zIndex: 2, listStyle: 'none'}}>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check-circle" style={{color: '#51cf66', marginRight: '0.5rem'}}></i> Exclusive insights and strategies from successful ClickBank marketers</li>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check-circle" style={{color: '#51cf66', marginRight: '0.5rem'}}></i> Step-by-step guidance on choosing profitable niches with high demand and low competition</li>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check-circle" style={{color: '#51cf66', marginRight: '0.5rem'}}></i> Expert tips on creating high-quality content that drives sales and sets you apart from the competition</li>
              </ul>
              
              <div style={{position: 'relative', zIndex: 2}}>
                <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>And the best part? For a limited time, you can get instant access to our guide for just:</p>
                <div className="price">$49</div>
                <div className="price-note">Limited Time: Save $50 (Regular Price $99)</div>
              </div>
              
              <p style={{marginBottom: '2rem', position: 'relative', zIndex: 2}}>
                Don't waste any more time or money on ineffective strategies. Invest in your success today and start dominating ClickBank. 
                Click the "Buy Now" button below and get instant access to our guide for just $49.
              </p>
              
              <a href="#" className="cta-button" onClick={() => trackPurchase('main_cta')} style={{fontSize: '1.2rem', padding: '1.5rem 3rem', position: 'relative', zIndex: 2}}>
                <i className="fas fa-shopping-cart"></i> Buy Now - $49
              </a>
              
              <div className="guarantee-badges">
                <div className="guarantee-badge">
                  <i className="fas fa-shield-alt"></i>
                  30-Day Money-Back Guarantee
                </div>
                <div className="guarantee-badge">
                  <i className="fas fa-download"></i>
                  Instant Digital Download
                </div>
                <div className="guarantee-badge">
                  <i className="fas fa-lock"></i>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section faq-section">
          <div className="container">
            <h2 className="section-title fade-in">Frequently Asked Questions</h2>
            <div className="faq-container">
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>What is this guide about?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>This comprehensive guide shows you how to create a systematic approach to ClickBank affiliate marketing, generate high-quality content, and learn how to market products effectively on ClickBank to maximize your earnings and build a sustainable online business.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>Who is this guide for?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>This guide is for anyone who wants to create a system to make money from ClickBank, generate high-quality content, and learn how to market products effectively on ClickBank - whether you're a complete beginner or an experienced marketer looking to scale your results.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>How long until I see results?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>You can start seeing results within days or even hours of getting started. The more you make this a part of your daily routine and consistently implement the strategies, the better the results you'll get. Many students see their first commissions within 7-14 days.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>How do I get instant access?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>Click the "Buy Now" button to get instant access to a PDF version of the guide and download links for all the bonuses. Everything is delivered digitally within minutes of your purchase for immediate access.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>Do I need to buy anything else?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>No, everything you need to learn about dominating ClickBank is included in this step-by-step guide. This is a complete system with no hidden costs or required upsells.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>How much does it cost?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>The guide is currently available for just $49, a small investment compared to the hundreds of dollars you could spend on coaching or workshops. This limited-time price represents a 50% savings from the regular price of $99.</p>
                </div>
              </div>
              
              <div className="faq-item fade-in">
                <div className="faq-question">
                  <span>Is there a guarantee?</span>
                  <i className="fas fa-chevron-down faq-icon"></i>
                </div>
                <div className="faq-answer">
                  <p>Yes, you get a full 30 days to try the guide and if for any reason you're not satisfied, simply send an email to our support team and you'll receive a full refund with no questions asked. Your success is guaranteed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section id="reviews" className="section reviews-section">
          <div className="container">
            <h2 className="section-title fade-in">Customer Reviews</h2>
            <div className="reviews-grid">
              <div className="review-card fade-in">
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="review-text">
                  "This guide completely transformed my ClickBank business. The niche research strategies alone have increased my conversions by 300%. I went from struggling to make $100/month to consistently earning $3,000+ monthly!"
                </p>
                <div className="review-author">@p_paterson</div>
              </div>
              
              <div className="review-card fade-in">
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="review-text">
                  "Finally, a ClickBank guide that actually works! The step-by-step approach made it easy to implement, and I saw my first commission within 48 hours. The content creation templates are pure gold!"
                </p>
                <div className="review-author">@jthemes</div>
              </div>
              
              <div className="review-card fade-in">
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="review-text">
                  "I've tried many ClickBank courses before, but this one is different. The insider strategies and real-world examples helped me build a sustainable affiliate business that generates passive income daily."
                </p>
                <div className="review-author">@lesserpas</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>If you have any concerns or issues, please don't hesitate to reach out to us at:</p>
            <p><strong>support@allgoodthings.online</strong></p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Click Bank Marketing Secret. All Rights Reserved</p>
            <p><small>ClickBank is a registered trademark of Click Sales, Inc.</small></p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button id="scrollUp" onClick={scrollToTop}>
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div id="exitPopup" className="exit-popup">
          <div className="popup-content">
            <button className="popup-close" onClick={closeExitPopup}>&times;</button>
            <h3>🎯 Wait! Don't Miss This Limited Offer!</h3>
            <p>Get our <strong>FREE ClickBank Quick-Start Checklist</strong> + 20% discount code before you leave!</p>
            <form id="exitForm" onSubmit={handleExitFormSubmit} style={{marginTop: '1.5rem'}}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                style={{width: '100%', padding: '1rem', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '1rem', fontSize: '1rem'}}
              />
              <button type="submit" className="cta-button" style={{width: '100%'}}>
                <i className="fas fa-gift"></i> Get My Free Bonus Now!
              </button>
            </form>
            <p style={{fontSize: '0.9rem', marginTop: '1rem', color: '#64748b'}}>
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}

      {/* Analytics Scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_TRACKING_ID', {
            page_title: 'ClickBank Marketing Blueprint',
            page_location: window.location.href
          });
        `}
      </Script>

      {/* Font Awesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    </>
  );
} 