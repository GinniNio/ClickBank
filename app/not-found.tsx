export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '4rem', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Page Not Found</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '32px', opacity: 0.9 }}>
          The page you're looking for doesn't exist.
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '16px 32px',
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
} 