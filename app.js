const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://www.google-analytics.com"]
        }
    }
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'The Ultimate ClickBank Marketing Blueprint: Unleash Your Potential',
        description: 'Transform your ClickBank earnings with our proven step-by-step system. Learn insider strategies from successful marketers and dominate profitable niches today.',
        keywords: 'ClickBank marketing, affiliate marketing, digital products, online income, marketing blueprint, niche mastery'
    });
});

// API Routes
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Valid email address is required' 
        });
    }
    
    // Here you would typically save to database or send to email service
    console.log('New subscription:', email);
    
    res.json({ 
        success: true, 
        message: 'Thank you for subscribing! Check your email for your free checklist and discount code.' 
    });
});

app.post('/api/purchase', (req, res) => {
    const { source } = req.body;
    
    // Log the purchase attempt for analytics
    console.log('Purchase attempt from:', source);
    
    // Here you would redirect to your payment processor
    res.json({ 
        success: true, 
        redirectUrl: 'https://your-checkout-url.com',
        message: 'Redirecting to secure checkout...' 
    });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }
    
    if (!isValidEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Valid email address is required' 
        });
    }
    
    // Here you would send email or save to database
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message. We\'ll get back to you soon!' 
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
});

module.exports = app; 