const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting ClickBank Landing Page Server...');
console.log('📁 Current directory:', __dirname);

// Check if views directory exists
const viewsPath = path.join(__dirname, 'views');
console.log('👀 Views directory path:', viewsPath);
console.log('📂 Views directory exists:', fs.existsSync(viewsPath));

// Check if index.ejs exists
const indexEjsPath = path.join(__dirname, 'views', 'index.ejs');
console.log('📄 Index.ejs path:', indexEjsPath);
console.log('📄 Index.ejs exists:', fs.existsSync(indexEjsPath));

// List files in views directory if it exists
if (fs.existsSync(viewsPath)) {
    try {
        const files = fs.readdirSync(viewsPath);
        console.log('📋 Files in views directory:', files);
    } catch (err) {
        console.log('❌ Error reading views directory:', err.message);
    }
}

// View engine setup
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route first
app.get('/test', (req, res) => {
    console.log('✅ Test route accessed');
    res.send(`
        <h1>Server is working!</h1>
        <p>Current time: ${new Date()}</p>
        <p>Views path: ${viewsPath}</p>
        <p>Views directory exists: ${fs.existsSync(viewsPath)}</p>
        <p>Index.ejs exists: ${fs.existsSync(indexEjsPath)}</p>
        <a href="/">Go to main page</a>
    `);
});

// Simple HTML route to test
app.get('/simple', (req, res) => {
    console.log('✅ Simple route accessed');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Simple Test</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .card { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <h1>🎯 ClickBank Landing Page - Simple Test</h1>
            <div class="card">
                <h2>Server Status: ✅ Working</h2>
                <p>If you can see this page, your Express server is running correctly.</p>
            </div>
            <div class="card">
                <h3>Next Steps:</h3>
                <ol>
                    <li>Create <code>views/index.ejs</code> file</li>
                    <li>Add the EJS template content</li>
                    <li>Create <code>public/css/main.css</code> file</li>
                    <li>Add the CSS content</li>
                    <li>Restart server</li>
                </ol>
            </div>
            <div class="card">
                <h3>Test Links:</h3>
                <ul>
                    <li><a href="/test">Basic test page</a></li>
                    <li><a href="/">Main page (will be blank if EJS not set up)</a></li>
                    <li><a href="/favicon.ico">Favicon test</a></li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// Main route with better error handling
app.get('/', (req, res) => {
    console.log('🏠 Main route accessed');
    console.log('📄 Attempting to render index.ejs...');
    
    try {
        res.render('index', {
            title: 'ClickBank Marketing Blueprint - Transform Your Earnings',
            description: 'Discover the proven strategies that successful ClickBank marketers use to generate consistent income. Get your free checklist and start your journey to financial freedom today.',
            keywords: 'ClickBank marketing, affiliate marketing, digital products, online income, marketing blueprint'
        });
        console.log('✅ Successfully rendered index.ejs');
    } catch (error) {
        console.log('❌ Error rendering index.ejs:', error.message);
        res.status(500).send(`
            <h1>Error Rendering Page</h1>
            <p><strong>Error:</strong> ${error.message}</p>
            <p><strong>Possible solutions:</strong></p>
            <ul>
                <li>Create the <code>views</code> directory</li>
                <li>Create <code>views/index.ejs</code> file</li>
                <li>Check file permissions</li>
                <li>Ensure EJS is installed: <code>npm install ejs</code></li>
            </ul>
            <p><a href="/test">Test basic functionality</a></p>
            <p><a href="/simple">View simple test page</a></p>
        `);
    }
});

// Favicon handler
app.get('/favicon.ico', (req, res) => {
    console.log('🎯 Favicon requested');
    const img = Buffer.from([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00,
        0xFF, 0xFF, 0xFF, 0x21, 0xF9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x04, 0x01, 0x00, 0x3B
    ]);
    res.writeHead(200, {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=86400'
    });
    res.end(img);
});

// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Page not found: ${req.url}`);
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page <code>${req.url}</code> was not found.</p>
        <p><a href="/test">Go to test page</a></p>
        <p><a href="/simple">Go to simple page</a></p>
    `);
});

// Error handler
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err);
    res.status(500).send(`
        <h1>Server Error</h1>
        <pre>${err.stack}</pre>
        <p><a href="/test">Go to test page</a></p>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🎉 Server running on http://localhost:${PORT}`);
    console.log(`📋 Debug info:`);
    console.log(`   - Views path: ${viewsPath}`);
    console.log(`   - Views exists: ${fs.existsSync(viewsPath)}`);
    console.log(`   - Index.ejs exists: ${fs.existsSync(indexEjsPath)}`);
    console.log(`\n🔗 Test URLs:`);
    console.log(`   - Main page: http://localhost:${PORT}/`);
    console.log(`   - Test page: http://localhost:${PORT}/test`);
    console.log(`   - Simple page: http://localhost:${PORT}/simple`);
    console.log(`\n💡 If main page is blank, visit /test first\n`);
});

module.exports = app; 