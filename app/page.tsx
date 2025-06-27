'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function ClickBankMarketingPage() {
  const [exitIntentShown, setExitIntentShown] = useState(false);

  useEffect(() => {
    // FAQ Toggle Function
    const toggleFAQ = (element: HTMLElement) => {
      const answer = element.nextElementSibling as HTMLElement;
      const icon = element.querySelector('span:last-child') as HTMLElement;
      
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
      
      // Close all FAQs first
      document.querySelectorAll('.faq-answer').forEach((a) => {
        (a as HTMLElement).style.maxHeight = '0';
        const prevIcon = a.previousElementSibling?.querySelector('span:last-child') as HTMLElement;
        if (prevIcon) prevIcon.textContent = '+';
      });
      
      // Open current FAQ if it wasn't already open
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
      }
    };

    // Add click handlers to FAQ questions
    document.querySelectorAll('.faq-question').forEach((question) => {
      question.addEventListener('click', () => toggleFAQ(question as HTMLElement));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
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

    // Exit intent popup
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && window.scrollY > 1000) {
        setExitIntentShown(true);
        if (confirm('Wait! Get 20% off with code SAVE20 - Continue to checkout?')) {
          window.location.href = 'https://1.clickbankmkt.pay.clickbank.net/?cbfid=your_affiliate_id&cbpid=your_product_id&cbdiscount=SAVE20';
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // A/B test setup
    const testVariant = Math.random() < 0.5 ? 'A' : 'B';
    if (testVariant === 'B') {
      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) {
        heroTitle.textContent = 'Generate $1,000+ Monthly Income with ClickBank—Step by Step Guide';
      }
    }

    // Track A/B test
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test', {
        'event_category': 'Experiment',
        'event_label': 'Headline Test',
        'custom_parameter': testVariant
      });
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentShown]);

  const trackConversion = (source: string) => {
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
  };

  return (
    <>
      <Head>
        <title>ClickBank Marketing Blueprint | From Zero to $1k in 30 Days</title>
        <meta name="description" content="Proven 7-module video course that shows beginners how to earn their first $1,000 ClickBank commission in 30 days—backed by a 30-day money-back guarantee." />
        <link rel="canonical" href="https://clickbankmarketingsecret.club/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Earn Your First $1,000 ClickBank Commission in 30 Days" />
        <meta property="og:description" content="Step-by-step blueprint used by 1,267+ students. No paid ads required." />
        <meta property="og:image" content="https://clickbankmarketingsecret.club/images/og-income-proof.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://clickbankmarketingsecret.club" />
        <meta property="og:type" content="website" />
        
        {/* Performance Optimizations */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" as="style" />
        <link rel="preload" href="./images/hero-income-proof.webp" as="image" />
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
            "name": "ClickBank Marketing Blueprint",
            "description": "Complete 7-module video course for ClickBank affiliate marketing success",
            "brand": {
              "@type": "Brand",
              "name": "ClickBank Marketing Secret"
            },
            "offers": {
              "@type": "Offer",
              "price": "49",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validThrough": "2025-12-31",
              "url": "https://clickbankmarketingsecret.club/#order"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1267",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long until I see results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most students land their first ClickBank sale within 7-14 days; typical earnings range from $50-$300 in the first month. Results vary based on effort and implementation."
                }
              },
              {
                "@type": "Question", 
                "name": "Do I need experience with affiliate marketing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No experience required. Our blueprint starts from absolute beginner level with step-by-step video training."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a money-back guarantee?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you get a full 30-day money-back guarantee. If you're not satisfied for any reason, we'll refund every cent."
                }
              }
            ]
          })
        }}
      />

      {/* Skip to Content Link */}
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Compliance Disclosure Bar */}
      <div className="compliance-bar" role="region" aria-label="Affiliate disclosure">
        <div className="container">
          <p><strong>AFFILIATE DISCLOSURE:</strong> As ClickBank affiliates, we earn commissions on qualifying purchases. This helps us provide free content to our audience.</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: '60px', zIndex: 99, padding: '12px 0'}}>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontWeight: 700, color: 'var(--primary)'}}>ClickBank Marketing Secret</div>
          <div style={{display: 'flex', gap: '24px'}}>
            <a href="#about" style={{textDecoration: 'none', color: 'var(--text)'}}>About</a>
            <a href="#how-it-works" style={{textDecoration: 'none', color: 'var(--text)'}}>How It Works</a>
            <a href="#testimonials" style={{textDecoration: 'none', color: 'var(--text)'}}>Reviews</a>
            <a href="#faq" style={{textDecoration: 'none', color: 'var(--text)'}}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>Earn Your First $1,000 ClickBank Commission in 30 Days—Without Paid Ads</h1>
            
            <p className="hero-subtitle">A step-by-step video blueprint used by 1,267 students, all backed by a 30-day "Results or Free" guarantee.*</p>
            
            {/* Social Proof with Real Results */}
            <div className="social-proof">
              <img 
                src="./images/income-proof-screenshot.webp" 
                alt="ClickBank commission screenshot showing $3,247 earned in 30 days" 
                width={400} 
                height={200} 
                style={{borderRadius: '8px', marginBottom: '12px'}}
              />
              <p><strong>Recent Student Result:</strong> Sarah M. earned $3,247 in her second month</p>
              <p style={{fontSize: '0.9rem', opacity: 0.8}}>*Results not typical. Individual results vary.</p>
            </div>
            
            {/* Primary Call-to-Action */}
            <a 
              href="#order" 
              className="cta-primary" 
              onClick={() => trackConversion('hero-cta')}
            >
              Get Instant Access – $49
            </a>
            
            {/* Trust Indicators */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span>✓</span> 30-Day Money-Back Guarantee
              </div>
              <div className="trust-badge">
                <span>✓</span> Instant Digital Access
              </div>
              <div className="trust-badge">
                <span>✓</span> 1,267+ Successful Students
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with Compliance */}
        <section style={{padding: '60px 0', background: 'var(--bg-light)'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px', color: 'var(--text)'}}>
              Why Students Choose Our Blueprint
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', margin: '40px 0', textAlign: 'center'}}>
              <div>
                <div style={{fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px'}}>$2.4M+<sup>†</sup></div>
                <div style={{color: 'var(--text-light)', fontWeight: 600}}>Generated by Our Students</div>
              </div>
              <div>
                <div style={{fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px'}}>1,267+<sup>†</sup></div>
                <div style={{color: 'var(--text-light)', fontWeight: 600}}>Successful Students</div>
              </div>
              <div>
                <div style={{fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px'}}>$47K<sup>†</sup></div>
                <div style={{color: 'var(--text-light)', fontWeight: 600}}>Highest Single Commission</div>
              </div>
              <div>
                <div style={{fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px'}}>2 Years</div>
                <div style={{color: 'var(--text-light)', fontWeight: 600}}>of Proven Results</div>
              </div>
            </div>
            
            <p className="footnote" style={{textAlign: 'center'}}>
              † Figures represent the total gross revenue reported by all Blueprint students as of May 2025. Individual results vary; typical students earn $0–$500 in their first 30 days.
            </p>
          </div>
        </section>

        {/* Why Most Affiliates Fail Section */}
        <section id="about" style={{padding: '60px 0', background: 'white'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px', color: 'var(--text)'}}>
              Why Most New Affiliates Fail—and How You Won't
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px'}}>
              <div style={{background: 'var(--bg-light)', padding: '30px', borderRadius: '16px', borderTop: '4px solid var(--accent)'}}>
                <h3 style={{color: 'var(--accent)', marginBottom: '16px'}}>❌ They Pick Saturated Niches</h3>
                <p style={{marginBottom: '16px'}}>95% of beginners go after the same "make money" and "weight loss" offers everyone else promotes.</p>
                <p><strong>✅ You'll Get:</strong> Our secret niche-picker spreadsheet scoring 500+ ClickBank offers by EPC, competition, and refund rates.</p>
              </div>
              
              <div style={{background: 'var(--bg-light)', padding: '30px', borderRadius: '16px', borderTop: '4px solid var(--accent)'}}>
                <h3 style={{color: 'var(--accent)', marginBottom: '16px'}}>❌ They Use Direct Links</h3>
                <p style={{marginBottom: '16px'}}>Sending cold traffic directly to ClickBank sales pages converts at less than 1%.</p>
                <p><strong>✅ You'll Get:</strong> 3 proven presell funnels for TikTok, YouTube, and email that convert at 5-8%.</p>
              </div>
              
              <div style={{background: 'var(--bg-light)', padding: '30px', borderRadius: '16px', borderTop: '4px solid var(--accent)'}}>
                <h3 style={{color: 'var(--accent)', marginBottom: '16px'}}>❌ They Rely on Paid Ads Only</h3>
                <p style={{marginBottom: '16px'}}>Ad costs have tripled since 2020. Most beginners burn through their budget in days.</p>
                <p><strong>✅ You'll Get:</strong> Free traffic methods generating 10,000+ visitors monthly without spending a dime on ads.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" style={{padding: '80px 0', background: 'var(--bg-light)'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px', color: 'var(--text)'}}>
              How It Works
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2rem', margin: '0 auto 24px'}}>1</div>
                <h3 style={{fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text)'}}>Choose Your Niche</h3>
                <p style={{color: 'var(--text-light)', lineHeight: 1.6}}>Use our research tools to find profitable ClickBank products in high-demand, low-competition niches.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2rem', margin: '0 auto 24px'}}>2</div>
                <h3 style={{fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text)'}}>Create Content</h3>
                <p style={{color: 'var(--text-light)', lineHeight: 1.6}}>Follow our proven content templates to create videos, posts, and landing pages that presell effectively.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2rem', margin: '0 auto 24px'}}>3</div>
                <h3 style={{fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text)'}}>Drive Traffic</h3>
                <p style={{color: 'var(--text-light)', lineHeight: 1.6}}>Use our free traffic methods to get thousands of targeted visitors without spending on ads.</p>
              </div>
              
              <div style={{textAlign: 'center'}}>
                <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2rem', margin: '0 auto 24px'}}>4</div>
                <h3 style={{fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text)'}}>Earn Commissions</h3>
                <p style={{color: 'var(--text-light)', lineHeight: 1.6}}>Watch your ClickBank account grow as our proven system generates consistent commissions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="testimonials" style={{padding: '80px 0', background: 'white'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px', color: 'var(--text)'}}>
              Student Success Stories
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px'}}>
              {/* Testimonial 1 with Proof */}
              <div style={{background: 'var(--bg-light)', padding: '32px', borderRadius: '16px', borderLeft: '4px solid var(--success)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                  <img src="./images/testimonial-sarah.webp" alt="Sarah M." width={60} height={60} style={{borderRadius: '50%', objectFit: 'cover'}} />
                  <div>
                    <h4 style={{margin: 0, color: 'var(--text)'}}>Sarah M.</h4>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.9rem'}}>Marketing Student</p>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.8rem'}}>Name & result on file</p>
                  </div>
                </div>
                <p style={{fontStyle: 'italic', marginBottom: '16px', color: 'var(--text)'}}>
                  "I was skeptical at first, but this blueprint actually works. I made my first $1,000 commission in just 18 days following the exact steps. The niche research tool alone is worth the price!"
                </p>
                <div style={{color: 'var(--success)', fontWeight: 600}}>✅ $3,247 earned in month 2*</div>
              </div>
              
              {/* Testimonial 2 with Proof */}
              <div style={{background: 'var(--bg-light)', padding: '32px', borderRadius: '16px', borderLeft: '4px solid var(--success)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                  <img src="./images/testimonial-mike.webp" alt="Mike R." width={60} height={60} style={{borderRadius: '50%', objectFit: 'cover'}} />
                  <div>
                    <h4 style={{margin: 0, color: 'var(--text)'}}>Mike R.</h4>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.9rem'}}>Former Construction Worker</p>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.8rem'}}>Video testimonial on file</p>
                  </div>
                </div>
                <p style={{fontStyle: 'italic', marginBottom: '16px', color: 'var(--text)'}}>
                  "I had zero online marketing experience. This course broke everything down step-by-step. The free traffic methods are incredible - I'm getting 500+ visitors daily without spending on ads."
                </p>
                <div style={{color: 'var(--success)', fontWeight: 600}}>✅ $1,847 first month*</div>
              </div>
              
              {/* Testimonial 3 with Proof */}
              <div style={{background: 'var(--bg-light)', padding: '32px', borderRadius: '16px', borderLeft: '4px solid var(--success)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                  <img src="./images/testimonial-lisa.webp" alt="Lisa K." width={60} height={60} style={{borderRadius: '50%', objectFit: 'cover'}} />
                  <div>
                    <h4 style={{margin: 0, color: 'var(--text)'}}>Lisa K.</h4>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.9rem'}}>Stay-at-Home Mom</p>
                    <p style={{margin: 0, color: 'var(--text-light)', fontSize: '0.8rem'}}>Screenshot verification on file</p>
                  </div>
                </div>
                <p style={{fontStyle: 'italic', marginBottom: '16px', color: 'var(--text)'}}>
                  "Finally, a course that delivers on its promises! I'm now earning more part-time with ClickBank than my previous full-time job. The community support is amazing too."
                </p>
                <div style={{color: 'var(--success)', fontWeight: 600}}>✅ $5,123 month 3*</div>
              </div>
            </div>
            
            <p className="footnote" style={{textAlign: 'center', marginTop: '40px'}}>
              *Individual results shown are not typical. Results vary based on effort, skill, and market conditions.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="order" style={{padding: '80px 0', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', textAlign: 'center'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', marginBottom: '24px'}}>
              Ready to Start Earning?
            </h2>
            <p style={{fontSize: '1.2rem', marginBottom: '40px', opacity: 0.95}}>
              Join 1,267+ students who are already earning with our proven system
            </p>
            
            {/* Pricing Card */}
            <div style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '40px', maxWidth: '500px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.2)'}}>
              <h3 style={{fontSize: '1.8rem', marginBottom: '20px'}}>ClickBank Marketing Blueprint</h3>
              
              {/* Price */}
              <div style={{margin: '24px 0'}}>
                <span style={{fontSize: '1.2rem', opacity: 0.8, textDecoration: 'line-through'}}>$99</span>
                <span style={{fontSize: '4rem', fontWeight: 900, margin: '0 16px'}}>$49</span>
                <span style={{fontSize: '1rem', opacity: 0.8}}>Limited Time</span>
              </div>
              
              {/* What's Included */}
              <div style={{textAlign: 'left', margin: '32px 0'}}>
                <div style={{marginBottom: '12px'}}>✅ 7 HD Video Modules (4+ hours)</div>
                <div style={{marginBottom: '12px'}}>✅ Niche Research Database (500+ products)</div>
                <div style={{marginBottom: '12px'}}>✅ Copy-Paste Content Templates</div>
                <div style={{marginBottom: '12px'}}>✅ Free Traffic Method Blueprints</div>
                <div style={{marginBottom: '12px'}}>✅ Private Discord Community</div>
                <div style={{marginBottom: '12px'}}>✅ 30-Day Money-Back Guarantee</div>
              </div>
              
              {/* CTA Button with Real ClickBank Link */}
              <a 
                href="https://1.clickbankmkt.pay.clickbank.net/?cbfid=your_affiliate_id&cbpid=your_product_id" 
                className="cta-primary" 
                onClick={() => trackConversion('main-cta')} 
                style={{display: 'inline-block', margin: '24px 0', background: 'var(--accent)', transform: 'scale(1.1)'}}
              >
                Get Instant Access – $49
              </a>
              
              {/* Guarantees */}
              <div style={{fontSize: '0.9rem', opacity: 0.9, marginTop: '20px'}}>
                <div>🔒 Secure Checkout • 💳 All Payment Methods</div>
                <div>📱 Works on All Devices • ⚡ Instant Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" style={{padding: '80px 0', background: 'var(--bg-light)'}}>
          <div className="container">
            <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px', color: 'var(--text)'}}>
              Frequently Asked Questions
            </h2>
            
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
              {/* FAQ Items */}
              <div className="faq-item" style={{background: 'white', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <h3 className="faq-question" style={{padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', margin: 0, fontSize: '1.1rem'}}>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>How long until I see results?</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.2rem'}}>+</span>
                </h3>
                <div className="faq-answer" style={{maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  <div style={{padding: '24px', color: 'var(--text-light)'}}>
                    Most students land their first ClickBank sale within 7-14 days; typical earnings range from $50-$300 in the first month. Results vary based on effort and implementation.*
                  </div>
                </div>
              </div>
              
              <div className="faq-item" style={{background: 'white', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <h3 className="faq-question" style={{padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', margin: 0, fontSize: '1.1rem'}}>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>Do I need experience with affiliate marketing?</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.2rem'}}>+</span>
                </h3>
                <div className="faq-answer" style={{maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  <div style={{padding: '24px', color: 'var(--text-light)'}}>
                    No experience required. Our blueprint starts from absolute beginner level with step-by-step video training that assumes no prior knowledge.
                  </div>
                </div>
              </div>
              
              <div className="faq-item" style={{background: 'white', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <h3 className="faq-question" style={{padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', margin: 0, fontSize: '1.1rem'}}>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>Is there a money-back guarantee?</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.2rem'}}>+</span>
                </h3>
                <div className="faq-answer" style={{maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  <div style={{padding: '24px', color: 'var(--text-light)'}}>
                    Yes, you get a full 30-day money-back guarantee. If you're not satisfied for any reason, we'll refund every cent—no questions asked.
                  </div>
                </div>
              </div>
              
              <div className="faq-item" style={{background: 'white', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <h3 className="faq-question" style={{padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', margin: 0, fontSize: '1.1rem'}}>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>What if I don't have time for this?</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.2rem'}}>+</span>
                </h3>
                <div className="faq-answer" style={{maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  <div style={{padding: '24px', color: 'var(--text-light)'}}>
                    The blueprint is designed for busy people. You can complete the setup in just 2-3 hours per week. Many students work on this part-time while keeping their day jobs.
                  </div>
                </div>
              </div>
              
              <div className="faq-item" style={{background: 'white', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <h3 className="faq-question" style={{padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', margin: 0, fontSize: '1.1rem'}}>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>Do I need to spend money on ads?</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.2rem'}}>+</span>
                </h3>
                <div className="faq-answer" style={{maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s ease'}}>
                  <div style={{padding: '24px', color: 'var(--text-light)'}}>
                    No! Our blueprint focuses on free traffic methods. You can start earning without spending a single dollar on advertisements.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{background: 'var(--text)', color: 'white', padding: '40px 0', textAlign: 'center'}}>
        <div className="container">
          <div style={{marginBottom: '24px'}}>
            <p style={{color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px'}}>
              <strong>EARNINGS DISCLAIMER:</strong> Results vary. Typical earnings range from $0-$500 in first 30 days. No income is guaranteed. Success requires effort and consistent implementation.
            </p>
            <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>
              For questions or support: <strong>support@allgoodthings.online</strong>
            </p>
          </div>
          
          <div style={{borderTop: '1px solid #374151', paddingTop: '24px'}}>
            <p>&copy; 2025 ClickBank Marketing Secret. All Rights Reserved.</p>
            <p style={{fontSize: '0.9rem', color: '#9ca3af', marginTop: '8px'}}>
              <a href="/privacy" style={{color: '#9ca3af', margin: '0 16px'}}>Privacy Policy</a>
              <a href="/terms" style={{color: '#9ca3af', margin: '0 16px'}}>Terms & Conditions</a>
              <a href="/refund" style={{color: '#9ca3af', margin: '0 16px'}}>Refund Policy</a>
            </p>
          </div>
        </div>
      </footer>

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

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
} 