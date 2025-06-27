'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function CheckoutPage() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    country: 'US'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Show floating timer after 30 seconds
    const floatingTimer = setTimeout(() => {
      setShowFloatingTimer(true);
    }, 30000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(floatingTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 2000);
  };

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  return (
    <>
      <Head>
        <title>Secure Checkout | ClickBank Marketing Blueprint</title>
        <meta name="description" content="Complete your order for the ClickBank Marketing Blueprint. Secure checkout with 30-day money-back guarantee." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://clickbankmarketingsecret.club/checkout" />
      </Head>
      
      {/* Checkout Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#2563eb'
          }}>
            ClickBank Marketing Secret
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: '#6b7280'
          }}>
            <span>🔒 Secure Checkout</span>
            <span>📱 Mobile Optimized</span>
            <span>💳 All Cards Accepted</span>
          </div>
        </div>
      </header>

      {/* Floating Urgency Timer */}
      {showFloatingTimer && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#dc2626',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)',
          zIndex: 1000,
          animation: 'pulse 2s infinite'
        }}>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            ⏰ Limited Time Offer
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>
            {formatTime(timeLeft)}
          </div>
        </div>
      )}

      {/* Exit Intent Popup */}
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
              ⚠️ WAIT! Don't Miss This Opportunity
            </div>
            
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '16px',
              color: '#1f2937'
            }}>
              Your Special Price Expires in {formatTime(timeLeft)}
            </h3>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              If you leave now, you'll lose access to this special pricing forever. 
              Don't let this opportunity slip away!
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
                $49
              </div>
              <div style={{
                textDecoration: 'line-through',
                color: '#6b7280'
              }}>
                $197
              </div>
            </div>
            
            <button
              onClick={() => {
                closeExitPopup();
                document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
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
              🚀 Complete My Order Now - $49
            </button>
          </div>
        </div>
      )}

      <main>
        <div style={{
          maxWidth: '800px',
          margin: '40px auto',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Checkout Header Section */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: 'white',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2rem',
              marginBottom: '12px'
            }}>
              Complete Your Order
            </h1>
            <p style={{
              opacity: 0.9
            }}>
              You're just one step away from accessing the ClickBank Marketing Blueprint
            </p>
            
            {/* Countdown Timer */}
            <div style={{
              background: '#dc2626',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              marginTop: '24px',
              fontWeight: 700
            }}>
              ⚡ Special Price Expires in: <span>14:59</span>
            </div>
          </div>

          {/* Checkout Body */}
          <div style={{
            padding: '40px'
          }}>
            {/* Order Summary */}
            <div style={{
              background: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                marginBottom: '16px',
                color: '#1f2937'
              }}>
                Order Summary
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div>
                  <strong>ClickBank Marketing Blueprint</strong>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>
                    Complete 7-module video course + bonuses
                  </div>
                </div>
                <div style={{
                  textDecoration: 'line-through',
                  color: '#6b7280'
                }}>
                  $99
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div>Limited Time Discount</div>
                <div style={{
                  color: '#059669'
                }}>
                  - $50
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                <div><strong>Total Today</strong></div>
                <div style={{
                  color: '#dc2626',
                  fontSize: '1.5rem'
                }}>
                  <strong>$49</strong>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div style={{
              background: '#eff6ff',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px'
            }}>
              <h4 style={{
                marginBottom: '16px',
                color: '#2563eb'
              }}>
                What You Get Instantly:
              </h4>
              <div style={{
                display: 'grid',
                gap: '12px'
              }}>
                <div>✅ 7 HD Video Modules (4+ hours of content)</div>
                <div>✅ Niche Research Database (500+ profitable products)</div>
                <div>✅ Copy-Paste Content Templates</div>
                <div>✅ Free Traffic Method Blueprints</div>
                <div>✅ Private Discord Community Access</div>
                <div>✅ Lifetime Updates & Support</div>
              </div>
            </div>

            {/* Payment Form */}
            <form id="checkout-form" onSubmit={handleSubmit} style={{
              marginTop: '32px'
            }}>
              <h3 style={{
                marginBottom: '24px'
              }}>
                Payment Information
              </h3>
              
              <div style={{
                marginBottom: '24px'
              }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1f2937'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{
                marginBottom: '24px'
              }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1f2937'
                }}>
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#1f2937'
                  }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#1f2937'
                  }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    maxLength={4}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <div style={{
                marginBottom: '24px'
              }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1f2937'
                }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{
                marginBottom: '24px'
              }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1f2937'
                }}>
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="NL">Netherlands</option>
                  <option value="SE">Sweden</option>
                  <option value="NO">Norway</option>
                  <option value="DK">Denmark</option>
                  <option value="FI">Finland</option>
                  <option value="CH">Switzerland</option>
                  <option value="AT">Austria</option>
                  <option value="BE">Belgium</option>
                  <option value="IE">Ireland</option>
                  <option value="NZ">New Zealand</option>
                  <option value="SG">Singapore</option>
                  <option value="JP">Japan</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: isSubmitting ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '24px'
                }}
              >
                {isSubmitting ? 'Processing...' : '🔒 Complete Order - $49'}
              </button>
              
              <p style={{
                textAlign: 'center',
                fontSize: '0.9rem',
                color: '#6b7280',
                marginTop: '16px'
              }}>
                Your payment is processed securely by ClickBank
              </p>
            </form>

            {/* Guarantee Section */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '24px',
              margin: '32px 0',
              textAlign: 'center'
            }}>
              <h4 style={{
                color: '#059669',
                marginBottom: '12px'
              }}>
                🛡️ 30-Day Money-Back Guarantee
              </h4>
              <p>
                If you're not completely satisfied with the ClickBank Marketing Blueprint for any reason, simply email us within 30 days for a full refund. No questions asked.
              </p>
            </div>

            {/* Trust Indicators */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '32px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '8px'
                }}>
                  🔒
                </div>
                <strong>256-bit SSL</strong><br />
                <span style={{
                  color: '#6b7280'
                }}>
                  Bank-level security
                </span>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '8px'
                }}>
                  ⚡
                </div>
                <strong>Instant Access</strong><br />
                <span style={{
                  color: '#6b7280'
                }}>
                  Download immediately
                </span>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '8px'
                }}>
                  📱
                </div>
                <strong>Mobile Ready</strong><br />
                <span style={{
                  color: '#6b7280'
                }}>
                  Works on all devices
                </span>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '8px'
                }}>
                  💳
                </div>
                <strong>All Cards</strong><br />
                <span style={{
                  color: '#6b7280'
                }}>
                  Visa, MC, Amex, PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1f2937',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.9rem',
            marginBottom: '16px'
          }}>
            <strong>EARNINGS DISCLAIMER:</strong> Results vary. No income is guaranteed. Success requires effort and consistent implementation.
          </p>
          <p>&copy; 2025 ClickBank Marketing Secret. All Rights Reserved.</p>
          <p style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            marginTop: '8px'
          }}>
            <a href="/privacy" style={{
              color: '#9ca3af',
              margin: '0 16px'
            }}>
              Privacy Policy
            </a>
            <a href="/terms" style={{
              color: '#9ca3af',
              margin: '0 16px'
            }}>
              Terms & Conditions
            </a>
            <a href="/refund" style={{
              color: '#9ca3af',
              margin: '0 16px'
            }}>
              Refund Policy
            </a>
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </>
  );
} 