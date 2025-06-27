'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function UpsellCheckoutPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(9 * 60); // 9 minutes
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [scrollUrgencyShown, setScrollUrgencyShown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const purchaseBtnRef = useRef<HTMLButtonElement>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          // Redirect to expired page
          router.push('/upsell-expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setExitIntentShown(true);
        
        const confirmMessage = 
          "⚠️ WAIT! Are you sure you want to leave?\n\n" +
          "• You'll lose the $200 discount forever\n" +
          "• This offer won't be available in your members area\n" +
          "• You'll pay $297 if you want this training later\n\n" +
          "Click CANCEL to stay and secure your advanced training for just $97!";
        
        if (!confirm(confirmMessage)) {
          // User chose to stay - scroll to purchase button
          purchaseBtnRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // Add urgent animation
          if (purchaseBtnRef.current) {
            purchaseBtnRef.current.style.animation = 'pulse 0.5s infinite';
            setTimeout(() => {
              if (purchaseBtnRef.current) {
                purchaseBtnRef.current.style.animation = '';
              }
            }, 3000);
          }
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown]);

  // Scroll-triggered urgency
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 70 && !scrollUrgencyShown) {
        setScrollUrgencyShown(true);
        
        // Show floating reminder
        const floatingBar = document.createElement('div');
        floatingBar.innerHTML = `
          <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #dc2626; color: white; padding: 16px; border-radius: 12px; text-align: center; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <strong>🔥 Don't scroll away from $200 in savings!</strong><br>
            <button onclick="document.getElementById('purchase-btn').scrollIntoView({behavior: 'smooth'}); this.parentElement.parentElement.remove();" style="background: white; color: #dc2626; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-top: 8px; cursor: pointer;">
              Secure My Advanced Training
            </button>
          </div>
        `;
        document.body.appendChild(floatingBar);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (floatingBar.parentElement) {
            floatingBar.remove();
          }
        }, 10000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollUrgencyShown]);

  // Auto-focus on purchase button after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      purchaseBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (purchaseBtnRef.current) {
        purchaseBtnRef.current.style.transform = 'scale(1.05)';
        setTimeout(() => {
          if (purchaseBtnRef.current) {
            purchaseBtnRef.current.style.transform = 'scale(1)';
          }
        }, 500);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Add urgency as time runs low
  useEffect(() => {
    const timer = setTimeout(() => {
      const card = document.querySelector('.checkout-card') as HTMLElement;
      if (card) {
        card.style.borderColor = '#dc2626';
        card.style.borderWidth = '4px';
        card.style.boxShadow = '0 20px 60px rgba(220, 38, 38, 0.2)';
      }
    }, 120000); // After 2 minutes

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyHeader = () => {
    if (timeLeft <= 60) {
      return `🚨 FINAL SECONDS: Only ${timeLeft} seconds left to save $200!`;
    } else if (timeLeft <= 300) {
      return `⏰ HURRY: Less than 5 minutes to save $200!`;
    }
    return `🔥 LAST CHANCE: This offer disappears when the timer hits zero!`;
  };

  const getUrgencyHeaderColor = () => {
    if (timeLeft <= 60) return '#dc2626';
    if (timeLeft <= 300) return '#ea580c';
    return '#dc2626';
  };

  const processUpsellOrder = async () => {
    setIsProcessing(true);
    
    // Track upsell conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        'transaction_id': 'CB-UPSELL-' + Date.now(),
        'value': 97,
        'currency': 'USD',
        'items': [{
          'item_id': 'advanced-training',
          'item_name': 'Advanced ClickBank Mastery',
          'category': 'Upsell',
          'quantity': 1,
          'price': 97
        }]
      });
    }
    
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 97,
        currency: 'USD',
        content_name: 'Advanced ClickBank Mastery'
      });
    }
    
    // Simulate processing
    setTimeout(() => {
      router.push('/upsell-thank-you');
    }, 2000);
  };

  const trackUpsellDecline = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'upsell_decline', {
        'event_category': 'Upsell',
        'event_label': 'Advanced Training Decline',
        'value': 97
      });
    }
  };

  return (
    <>
      <Head>
        <title>Advanced Training Checkout | ClickBank Marketing Secret</title>
        <meta name="description" content="Complete your order for the Advanced ClickBank Mastery Training. Limited time offer." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://clickbankmarketingsecret.club/upsell-checkout" />
        
        {/* Performance Optimizations */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" 
          as="style" 
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.rel = 'stylesheet';
          }}
        />
      </Head>

      <style jsx global>{`
        :root {
          --primary: #2563eb;
          --secondary: #1d4ed8;
          --accent: #dc2626;
          --success: #059669;
          --warning: #f59e0b;
          --text: #1f2937;
          --text-light: #6b7280;
          --bg: #ffffff;
          --bg-light: #f9fafb;
          --border: #e5e7eb;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: var(--text);
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          min-height: 100vh;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .urgency-header {
          background: var(--accent);
          color: white;
          text-align: center;
          padding: 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          font-weight: 700;
        }
        
        .checkout-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          overflow: hidden;
          margin: 40px auto;
          border: 3px solid var(--warning);
        }
        
        .header-section {
          background: linear-gradient(135deg, var(--warning), #f59e0b);
          color: white;
          padding: 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .countdown-display {
          background: var(--accent);
          color: white;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.5rem;
          font-weight: 900;
          margin: 20px 0;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .body-section {
          padding: 40px;
        }
        
        .value-comparison {
          background: var(--bg-light);
          padding: 24px;
          border-radius: 12px;
          margin: 24px 0;
        }
        
        .comparison-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        
        .comparison-item:last-child {
          border-bottom: none;
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--accent);
        }
        
        .features-list {
          margin: 32px 0;
        }
        
        .feature-highlight {
          background: #eff6ff;
          border-left: 4px solid var(--primary);
          padding: 16px 20px;
          margin: 12px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .one-click-btn {
          width: 100%;
          background: var(--accent);
          color: white;
          padding: 20px 32px;
          border: none;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 24px 0;
          position: relative;
          overflow: hidden;
        }
        
        .one-click-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .one-click-btn:hover::before {
          left: 100%;
        }
        
        .one-click-btn:hover {
          background: #b91c1c;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.4);
        }
        
        .decline-option {
          text-align: center;
          margin: 24px 0;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }
        
        .decline-link {
          color: var(--text-light);
          text-decoration: underline;
          font-size: 0.9rem;
        }
        
        .guarantee-badge {
          background: var(--success);
          color: white;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          margin: 24px 0;
        }
        
        .social-proof {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .testimonial-mini {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 12px 0;
          padding: 12px;
          background: white;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
          
          .checkout-card {
            margin: 20px auto;
          }
          
          .header-section,
          .body-section {
            padding: 24px;
          }
          
          .countdown-display {
            font-size: 1.2rem;
            padding: 12px 24px;
          }
        }
      `}</style>

      {/* Urgency Header */}
      <div 
        className="urgency-header" 
        style={{ backgroundColor: getUrgencyHeaderColor() }}
      >
        {getUrgencyHeader()}
      </div>

      <div className="container">
        <div className="checkout-card">
          {/* Header Section */}
          <div className="header-section">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
              🚀 Last Chance to Save $200!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
              Add the Advanced ClickBank Mastery Training to your order
            </p>
            
            <div className="countdown-display">
              {formatTime(timeLeft)}
            </div>
            
            <p style={{ position: 'relative', zIndex: 2, opacity: 0.9 }}>
              When this timer hits zero, you'll pay the full $297 price
            </p>
          </div>

          {/* Body Section */}
          <div className="body-section">
            {/* Value Comparison */}
            <div className="value-comparison">
              <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Today vs Later</h3>
              
              <div className="comparison-item">
                <div>Advanced ClickBank Mastery Training</div>
                <div style={{ textDecoration: 'line-through', color: 'var(--text-light)' }}>$297</div>
              </div>
              
              <div className="comparison-item">
                <div>Monthly Group Coaching (3 months)</div>
                <div style={{ textDecoration: 'line-through', color: 'var(--text-light)' }}>$297</div>
              </div>
              
              <div className="comparison-item">
                <div>Case Study Vault Access</div>
                <div style={{ textDecoration: 'line-through', color: 'var(--text-light)' }}>$97</div>
              </div>
              
              <div className="comparison-item">
                <div>High-Ticket Product Database</div>
                <div style={{ textDecoration: 'line-through', color: 'var(--text-light)' }}>$97</div>
              </div>
              
              <div className="comparison-item" style={{ background: '#fef2f2', margin: '16px -24px -24px', padding: '16px 24px' }}>
                <div><strong>Your Price Today (Save $691)</strong></div>
                <div style={{ fontSize: '2rem', color: 'var(--accent)' }}><strong>$97</strong></div>
              </div>
            </div>

            {/* Key Features */}
            <div className="features-list">
              <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>What You Get Instantly:</h3>
              
              <div className="feature-highlight">
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>🎯 Advanced Traffic Scaling System</h4>
                <p>Learn the exact methods our top students use to scale from $1K to $50K+ monthly. Step-by-step video walkthroughs.</p>
              </div>
              
              <div className="feature-highlight">
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>💰 High-Ticket Promotion Secrets</h4>
                <p>Access to products paying $500-2000+ commissions. Most affiliates never discover these goldmines.</p>
              </div>
              
              <div className="feature-highlight">
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>🤖 Done-For-You Automation</h4>
                <p>Copy our exact automation systems that generate commissions 24/7. Set it up once, profit forever.</p>
              </div>
              
              <div className="feature-highlight">
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>🎬 Million-Dollar Case Studies</h4>
                <p>10+ real case studies showing how students went from $0 to $100K+ with ClickBank. See exactly what works.</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="social-proof">
              <h4 style={{ color: 'var(--success)', marginBottom: '16px', textAlign: 'center' }}>Advanced Students Are Getting Incredible Results:</h4>
              
              <div className="testimonial-mini">
                <img src="/images/advanced-student-1.webp" alt="Student" width="40" height="40" style={{ borderRadius: '50%' }} />
                <div>
                  <strong>Mike Chen:</strong> "Hit $23,000 in one month using the high-ticket strategies!"
                </div>
              </div>
              
              <div className="testimonial-mini">
                <img src="/images/advanced-student-2.webp" alt="Student" width="40" height="40" style={{ borderRadius: '50%' }} />
                <div>
                  <strong>Sarah Williams:</strong> "The automation system doubled my income while I was on vacation."
                </div>
              </div>
              
              <div className="testimonial-mini">
                <img src="/images/advanced-student-3.webp" alt="Student" width="40" height="40" style={{ borderRadius: '50%' }} />
                <div>
                  <strong>James Rodriguez:</strong> "Went from $2K to $47K monthly in 90 days with these methods."
                </div>
              </div>
            </div>

            {/* One-Click Purchase */}
            <button 
              ref={purchaseBtnRef}
              className="one-click-btn" 
              onClick={processUpsellOrder}
              disabled={isProcessing}
              id="purchase-btn"
            >
              {isProcessing ? 'Processing...' : '🚀 YES! Add Advanced Training - Just $97'}
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '24px' }}>
              One-click purchase using your previous payment method
            </p>

            {/* Guarantee */}
            <div className="guarantee-badge">
              <h4 style={{ marginBottom: '8px' }}>🛡️ 60-Day Money-Back Guarantee</h4>
              <p style={{ margin: 0 }}>Double guarantee on the advanced training. If it doesn't help you scale your income, get a full refund within 60 days.</p>
            </div>

            {/* Scarcity Elements */}
            <div style={{ background: '#fef2f2', border: '2px solid var(--accent)', borderRadius: '12px', padding: '24px', margin: '24px 0', textAlign: 'center' }}>
              <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>⚠️ Important:</h4>
              <p style={{ margin: 0 }}>This is a one-time offer. If you leave this page, you'll lose access to the $97 price forever. The regular price is $297.</p>
            </div>

            {/* Decline Option */}
            <div className="decline-option">
              <p style={{ marginBottom: '8px', fontWeight: 600 }}>Not ready to scale to $10K+ monthly?</p>
              <a href="/members-area" className="decline-link" onClick={trackUpsellDecline}>
                No thanks, I'll stick with the basic course and potentially miss out on these advanced strategies
              </a>
            </div>

            {/* FAQ Section */}
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Quick Questions?</h3>
              
              <div style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: '12px', margin: '12px 0' }}>
                <h4 style={{ color: 'var(--text)', marginBottom: '8px' }}>Q: Is this really different from the basic course?</h4>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>A: Absolutely. The basic course gets you started. This shows you how to scale to $10K+ monthly with advanced strategies most affiliates never learn.</p>
              </div>
              
              <div style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: '12px', margin: '12px 0' }}>
                <h4 style={{ color: 'var(--text)', marginBottom: '8px' }}>Q: Will this work if I'm just starting?</h4>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>A: Yes! Many of our biggest success stories came from complete beginners who started with both courses. You'll implement the basics while learning advanced scaling.</p>
              </div>
              
              <div style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: '12px', margin: '12px 0' }}>
                <h4 style={{ color: 'var(--text)', marginBottom: '8px' }}>Q: Can I really get this price later?</h4>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>A: No. This $97 price is only available right now for new customers. If you come back later, you'll pay the full $297.</p>
              </div>
            </div>

            {/* Final CTA */}
            <div style={{ background: 'linear-gradient(135deg, var(--accent), #b91c1c)', color: 'white', padding: '32px', borderRadius: '16px', textAlign: 'center', margin: '32px 0' }}>
              <h3 style={{ marginBottom: '16px' }}>Don't Let This Opportunity Slip Away</h3>
              <p style={{ marginBottom: '24px', opacity: 0.9 }}>
                You're already committed to your ClickBank success. Why not give yourself every advantage to reach $10K+ monthly?
              </p>
              <button 
                className="one-click-btn" 
                onClick={processUpsellOrder}
                disabled={isProcessing}
                style={{ background: 'white', color: 'var(--accent)', margin: 0 }}
              >
                {isProcessing ? 'Processing...' : '💳 Add Advanced Training Now - $97'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--text)', color: 'white', padding: '40px 0', textAlign: 'center', marginTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px' }}>
            <strong>EARNINGS DISCLAIMER:</strong> Results vary. Advanced training results are not typical. Success requires effort and consistent implementation.
          </p>
          <p>&copy; 2025 ClickBank Marketing Secret. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
} 