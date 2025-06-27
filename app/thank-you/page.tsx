'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export default function ThankYouPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for upsell
  const [showUpsell, setShowUpsell] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show upsell after 30 seconds
    const upsellTimer = setTimeout(() => {
      setShowUpsell(true);
    }, 30000);

    // Scroll trigger for upsell
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasScrolled) {
        setHasScrolled(true);
        setShowUpsell(true);
      }
    };

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && showUpsell) {
        setShowExitPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(upsellTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasScrolled, showUpsell]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const trackDownload = (type: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'thank_you_page',
        event_label: type,
        value: 1
      });
    }
  };

  const handleUpsellAccept = () => {
    // Redirect to upsell checkout
    window.location.href = '/upsell-checkout';
  };

  const handleUpsellDecline = () => {
    setShowUpsell(false);
  };

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  return (
    <>
      <Head>
        <title>Thank You! Access Your Blueprint | ClickBank Marketing Secret</title>
        <meta name="description" content="Welcome to ClickBank Marketing Secret! Access your blueprint and discover our exclusive advanced training offer." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://clickbankmarketingsecret.club/thank-you" />
      </Head>

      {/* Success Header */}
      <section style={{
        background: 'linear-gradient(135deg, #059669, #047857)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '2.5rem'
          }}>
            🎉
          </div>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '16px',
            fontWeight: 900
          }}>
            Congratulations!
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95
          }}>
            Your order has been confirmed. You now have lifetime access to the 
            ClickBank Marketing Blueprint!
          </p>
        </div>
      </section>

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh'
      }}>
        {/* Access Section */}
        <section style={{
          background: 'white',
          margin: '-40px auto 40px',
          maxWidth: '800px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          padding: '40px',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1f2937',
            fontSize: '2rem',
            fontWeight: 700
          }}>
            🚀 Get Started Immediately
          </h2>
          
          <p style={{
            textAlign: 'center',
            marginBottom: '32px',
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            Your download links have been sent to your email. You can also access everything directly below:
          </p>
          
          <div style={{ textAlign: 'center' }}>
            <a 
              href="/downloads/clickbank-blueprint-course.zip" 
              onClick={() => trackDownload('main-course')}
              style={{
                display: 'inline-block',
                background: '#059669',
                color: 'white',
                padding: '16px 32px',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                margin: '16px 8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#047857';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📚 Download Main Course
            </a>
            <a 
              href="/downloads/niche-research-database.xlsx" 
              onClick={() => trackDownload('database')}
              style={{
                display: 'inline-block',
                background: '#059669',
                color: 'white',
                padding: '16px 32px',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                margin: '16px 8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#047857';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📊 Download Niche Database
            </a>
            <a 
              href="/downloads/content-templates.zip" 
              onClick={() => trackDownload('templates')}
              style={{
                display: 'inline-block',
                background: '#059669',
                color: 'white',
                padding: '16px 32px',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                margin: '16px 8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#047857';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📝 Download Templates
            </a>
          </div>
          
          <div style={{
            background: '#eff6ff',
            padding: '24px',
            borderRadius: '12px',
            marginTop: '32px'
          }}>
            <h4 style={{
              color: '#2563eb',
              marginBottom: '12px',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              💬 Join Our Private Community
            </h4>
            <p style={{
              marginBottom: '16px',
              color: '#374151'
            }}>
              Connect with 1,267+ successful ClickBank affiliates in our exclusive Facebook group.
            </p>
            <a 
              href="https://facebook.com/groups/clickbankmarketingsecret"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Join Facebook Group
            </a>
          </div>
        </section>

        {/* Advanced Upsell Section */}
        {showUpsell && (
          <section style={{
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            border: '2px solid #f59e0b',
            borderRadius: '16px',
            padding: '40px',
            margin: '40px auto',
            maxWidth: '900px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#dc2626',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '50px',
              fontWeight: 700,
              marginBottom: '24px',
              display: 'inline-block'
            }}>
              ⏰ Limited Time Offer: {formatTime(timeLeft)} remaining
            </div>
            
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              marginBottom: '16px',
              color: '#1f2937'
            }}>
              🚀 Advanced Training Upgrade
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '24px',
              color: '#374151'
            }}>
              Take your ClickBank success to the next level with our exclusive video training series
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              margin: '32px 0'
            }}>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                borderLeft: '4px solid #f59e0b',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ marginBottom: '12px', color: '#1f2937' }}>🎯 Advanced Strategies</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Learn the exact strategies that generate $10K+ monthly commissions
                </p>
              </div>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                borderLeft: '4px solid #f59e0b',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ marginBottom: '12px', color: '#1f2937' }}>📈 Traffic Mastery</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Master Facebook ads, SEO, and email marketing for maximum traffic
                </p>
              </div>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                borderLeft: '4px solid #f59e0b',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ marginBottom: '12px', color: '#1f2937' }}>💰 Scaling Secrets</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Scale from $1K to $50K+ monthly with proven automation techniques
                </p>
              </div>
            </div>
            
            <div style={{
              fontSize: '3rem',
              fontWeight: 900,
              color: '#dc2626',
              margin: '16px 0'
            }}>
              $97
              <span style={{
                fontSize: '1.5rem',
                textDecoration: 'line-through',
                color: '#6b7280',
                marginLeft: '16px'
              }}>
                $497
              </span>
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <button 
                onClick={handleUpsellAccept}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '20px 40px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  margin: '16px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#b91c1c';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#dc2626';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🚀 Get Advanced Training - $97
              </button>
              <button 
                onClick={handleUpsellDecline}
                style={{
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  margin: '8px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                No thanks, I'll pass
              </button>
            </div>
          </section>
        )}

        {/* Exit Intent Popup for Upsell */}
        {showExitPopup && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '16px',
              maxWidth: '500px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button
                onClick={closeExitPopup}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
              
              <div style={{
                background: '#dc2626',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '50px',
                fontWeight: 700,
                marginBottom: '24px',
                display: 'inline-block'
              }}>
                🚨 WAIT! Don't Miss This Upgrade
              </div>
              
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '16px',
                color: '#1f2937'
              }}>
                Your Advanced Training Offer Expires in {formatTime(timeLeft)}
              </h3>
              
              <p style={{
                color: '#6b7280',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Most successful ClickBank affiliates upgrade to our advanced training. 
                Don't miss out on strategies that could 10x your results!
              </p>
              
              <div style={{
                background: '#fef3c7',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                border: '1px solid #fde68a'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#dc2626',
                  marginBottom: '8px'
                }}>
                  $97
                </div>
                <div style={{
                  textDecoration: 'line-through',
                  color: '#6b7280'
                }}>
                  $497
                </div>
              </div>
              
              <button
                onClick={() => {
                  closeExitPopup();
                  handleUpsellAccept();
                }}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                🚀 Get Advanced Training - $97
              </button>
            </div>
          </div>
        )}

        {/* Next Steps Section */}
        <section style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          margin: '40px auto',
          maxWidth: '800px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1f2937'
          }}>
            🎯 Your Next Steps
          </h2>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h4 style={{ marginBottom: '4px', color: '#1f2937' }}>Download Your Materials</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Access your course, templates, and niche database immediately
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h4 style={{ marginBottom: '4px', color: '#1f2937' }}>Join Our Community</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Connect with other successful affiliates in our Facebook group
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h4 style={{ marginBottom: '4px', color: '#1f2937' }}>Start Implementing</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Follow the step-by-step blueprint to launch your first campaign
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                flexShrink: 0
              }}>
                4
              </div>
              <div>
                <h4 style={{ marginBottom: '4px', color: '#1f2937' }}>Track Your Progress</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  Monitor your results and optimize for maximum conversions
                </p>
              </div>
            </div>
          </div>
          
          <div style={{
            background: '#f0fdf4',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #bbf7d0',
            textAlign: 'center'
          }}>
            <h4 style={{
              color: '#059669',
              marginBottom: '12px',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              🎉 You're All Set!
            </h4>
            <p style={{
              color: '#374151',
              marginBottom: '16px'
            }}>
              Your ClickBank Marketing journey starts now. We're excited to see your success!
            </p>
            <a 
              href="/"
              style={{
                display: 'inline-block',
                background: '#059669',
                color: 'white',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
    </>
  );
} 