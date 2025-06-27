const fs = require('fs');
const path = 'app/upsell-thank-you/page.tsx';

const cleanContent = `'use client';

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
`;

try {
  fs.writeFileSync(path, cleanContent, 'utf8');
  console.log('File recreated with clean UTF-8 encoding');
  
  // Verify the file
  const stats = fs.statSync(path);
  console.log(`File size: ${stats.size} bytes`);
  
  // Test reading the file
  const readContent = fs.readFileSync(path, 'utf8');
  console.log('File can be read successfully');
} catch (error) {
  console.error('Error:', error);
} 