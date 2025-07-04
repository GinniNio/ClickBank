'use client';

import React from 'react';

export default function UpsellThankYouPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Thank You for Your Upgrade!</h1>
      <p>Your advanced training materials have been sent to your email.</p>
      <a href="/members-area" style={{
        display: 'inline-block',
        background: '#dc2626',
        color: 'white',
        padding: '16px 32px',
        textDecoration: 'none',
        borderRadius: '8px'
      }}>
        Access Members Area
      </a>
    </div>
  );
}
