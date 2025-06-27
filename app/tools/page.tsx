import React from 'react';
import Head from 'next/head';

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>Marketing Tools & Resources</title>
        <meta name="description" content="Essential tools and resources for ClickBank affiliate success." />
      </Head>
      
      <main style={{
        minHeight: '100vh',
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '24px',
            fontWeight: 900
          }}>
            Marketing Tools & Resources
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.9
          }}>
            Essential tools and resources for ClickBank affiliate success.
          </p>
          
          <a 
            href="/"
            style={{
              display: 'inline-block',
              background: '#dc2626',
              color: 'white',
              padding: '16px 32px',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: 700
            }}
          >
            Back to Home
          </a>
        </div>
      </main>
    </>
  );
}