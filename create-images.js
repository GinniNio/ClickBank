// Placeholder Image Generator for ClickBank Landing Page
// Run this script to create all required placeholder images

const fs = require('fs');
const path = require('path');

// Ensure images directory exists
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Brand colors
const brandColors = {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    secondary: '#10B981',
    accent: '#F59E0B',
    warning: '#EF4444',
    white: '#FFFFFF',
    gray: '#6B7280',
    dark: '#111827'
};

// SVG Template function
function createSVG(width, height, content, backgroundColor = brandColors.primary) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${brandColors.primaryDark};stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    ${content}
</svg>`;
}

// Generate all placeholder images
const placeholders = {
    // Logo
    'logo.png': createSVG(200, 60, `
        <circle cx="30" cy="30" r="20" fill="${brandColors.white}" opacity="0.9"/>
        <text x="30" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${brandColors.primary}">CB</text>
        <text x="120" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${brandColors.white}">ClickBank</text>
        <text x="120" y="45" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.white}" opacity="0.9">Secrets</text>
    `),

    // Product Images
    'product-cover.jpg': createSVG(400, 500, `
        <rect x="50" y="50" width="300" height="400" fill="${brandColors.white}" rx="10"/>
        <rect x="70" y="70" width="260" height="50" fill="${brandColors.primary}" rx="5"/>
        <text x="200" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${brandColors.white}">ClickBank Marketing</text>
        <text x="200" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="${brandColors.dark}">BLUEPRINT</text>
        <text x="200" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.gray}">Complete Guide to Success</text>
        <circle cx="200" cy="250" r="60" fill="${brandColors.secondary}" opacity="0.2"/>
        <text x="200" y="255" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" fill="${brandColors.secondary}">$</text>
        <text x="200" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${brandColors.gray}">Step-by-Step System</text>
        <text x="200" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${brandColors.gray}">Proven Strategies</text>
        <text x="200" y="390" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${brandColors.gray}">Real Results</text>
    `),

    'product-mockup.png': createSVG(600, 400, `
        <rect x="100" y="50" width="400" height="300" fill="${brandColors.white}" rx="20" stroke="${brandColors.gray}" stroke-width="2"/>
        <rect x="120" y="70" width="360" height="60" fill="${brandColors.primary}" rx="10"/>
        <text x="300" y="105" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${brandColors.white}">ClickBank Mastery Course</text>
        <rect x="140" y="150" width="320" height="40" fill="${brandColors.secondary}" opacity="0.2" rx="5"/>
        <text x="300" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.dark}">✓ Complete Training Modules</text>
        <rect x="140" y="200" width="320" height="40" fill="${brandColors.accent}" opacity="0.2" rx="5"/>
        <text x="300" y="225" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.dark}">✓ Done-For-You Templates</text>
        <rect x="140" y="250" width="320" height="40" fill="${brandColors.warning}" opacity="0.2" rx="5"/>
        <text x="300" y="275" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.dark}">✓ Private Community Access</text>
    `),

    'pricing-product.jpg': createSVG(300, 350, `
        <rect x="30" y="30" width="240" height="290" fill="${brandColors.white}" rx="15" stroke="${brandColors.primary}" stroke-width="3"/>
        <rect x="50" y="50" width="200" height="40" fill="${brandColors.primary}" rx="5"/>
        <text x="150" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${brandColors.white}">PREMIUM PACKAGE</text>
        <circle cx="150" cy="150" r="40" fill="${brandColors.secondary}" opacity="0.3"/>
        <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="${brandColors.secondary}">💎</text>
        <text x="150" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${brandColors.dark}">Complete Blueprint</text>
        <text x="150" y="220" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="${brandColors.gray}">Everything You Need</text>
        <text x="150" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${brandColors.primary}">$97</text>
        <text x="150" y="270" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="${brandColors.gray}">One-time Payment</text>
    `),

    // Trust Badges
    'guarantee-badge.png': createSVG(120, 120, `
        <circle cx="60" cy="60" r="55" fill="${brandColors.secondary}" stroke="${brandColors.white}" stroke-width="4"/>
        <text x="60" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${brandColors.white}">30-DAY</text>
        <text x="60" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">MONEY BACK</text>
        <text x="60" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${brandColors.white}">GUARANTEE</text>
        <path d="M45 85 L55 90 L75 70" stroke="${brandColors.white}" stroke-width="3" fill="none"/>
    `),

    'secure-badge.png': createSVG(120, 120, `
        <circle cx="60" cy="60" r="55" fill="${brandColors.accent}" stroke="${brandColors.white}" stroke-width="4"/>
        <rect x="45" y="40" width="30" height="25" fill="none" stroke="${brandColors.white}" stroke-width="3" rx="5"/>
        <circle cx="60" cy="35" r="8" fill="none" stroke="${brandColors.white}" stroke-width="3"/>
        <text x="60" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">100% SECURE</text>
        <text x="60" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="${brandColors.white}">SSL ENCRYPTED</text>
    `),

    'instant-badge.png': createSVG(120, 120, `
        <circle cx="60" cy="60" r="55" fill="${brandColors.warning}" stroke="${brandColors.white}" stroke-width="4"/>
        <polygon points="45,45 45,75 75,60" fill="${brandColors.white}"/>
        <text x="60" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">INSTANT</text>
        <text x="60" y="105" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">ACCESS</text>
    `),

    // Feature Icons
    'results-icon.png': createSVG(100, 100, `
        <circle cx="50" cy="50" r="45" fill="${brandColors.secondary}" opacity="0.2"/>
        <path d="M20 70 L35 55 L50 65 L65 40 L80 50" stroke="${brandColors.secondary}" stroke-width="4" fill="none"/>
        <circle cx="35" cy="55" r="3" fill="${brandColors.secondary}"/>
        <circle cx="50" cy="65" r="3" fill="${brandColors.secondary}"/>
        <circle cx="65" cy="40" r="3" fill="${brandColors.secondary}"/>
        <text x="50" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${brandColors.secondary}">RESULTS</text>
    `),

    'guide-icon.png': createSVG(100, 100, `
        <circle cx="50" cy="50" r="45" fill="${brandColors.primary}" opacity="0.2"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="${brandColors.primary}" stroke-width="3"/>
        <circle cx="50" cy="30" r="3" fill="${brandColors.primary}"/>
        <circle cx="50" cy="40" r="3" fill="${brandColors.primary}"/>
        <circle cx="50" cy="50" r="3" fill="${brandColors.primary}"/>
        <circle cx="50" cy="60" r="3" fill="${brandColors.primary}"/>
        <circle cx="50" cy="70" r="3" fill="${brandColors.primary}"/>
        <text x="50" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${brandColors.primary}">GUIDE</text>
    `),

    'convert-icon.png': createSVG(100, 100, `
        <circle cx="50" cy="50" r="45" fill="${brandColors.accent}" opacity="0.2"/>
        <text x="50" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" fill="${brandColors.accent}">$</text>
        <circle cx="75" cy="25" r="8" fill="${brandColors.secondary}"/>
        <text x="75" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="${brandColors.white}">✓</text>
        <text x="50" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${brandColors.accent}">CONVERT</text>
    `),

    // Feature Images
    'feature-1.jpg': createSVG(600, 300, `
        <rect x="50" y="50" width="500" height="200" fill="${brandColors.primary}" opacity="0.1" rx="10"/>
        <circle cx="150" cy="150" r="60" fill="${brandColors.primary}" opacity="0.3"/>
        <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" fill="${brandColors.primary}">🎯</text>
        <text x="350" y="120" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${brandColors.dark}">Niche Research</text>
        <text x="350" y="150" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">Find profitable niches with</text>
        <text x="350" y="170" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">high demand & low competition</text>
        <text x="350" y="200" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.primary}">✓ Market Analysis Tools</text>
        <text x="350" y="220" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.primary}">✓ Competition Research</text>
    `),

    'feature-2.jpg': createSVG(600, 300, `
        <rect x="50" y="50" width="500" height="200" fill="${brandColors.secondary}" opacity="0.1" rx="10"/>
        <circle cx="150" cy="150" r="60" fill="${brandColors.secondary}" opacity="0.3"/>
        <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" fill="${brandColors.secondary}">📝</text>
        <text x="350" y="120" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${brandColors.dark}">Content Creation</text>
        <text x="350" y="150" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">High-converting copy & content</text>
        <text x="350" y="170" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">that drives sales consistently</text>
        <text x="350" y="200" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.secondary}">✓ Copy Templates</text>
        <text x="350" y="220" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.secondary}">✓ Email Sequences</text>
    `),

    'feature-3.jpg': createSVG(600, 300, `
        <rect x="50" y="50" width="500" height="200" fill="${brandColors.accent}" opacity="0.1" rx="10"/>
        <circle cx="150" cy="150" r="60" fill="${brandColors.accent}" opacity="0.3"/>
        <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" fill="${brandColors.accent}">🚀</text>
        <text x="350" y="120" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${brandColors.dark}">Traffic Generation</text>
        <text x="350" y="150" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">Drive targeted traffic that</text>
        <text x="350" y="170" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">converts into paying customers</text>
        <text x="350" y="200" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.accent}">✓ SEO Strategies</text>
        <text x="350" y="220" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.accent}">✓ Paid Advertising</text>
    `),

    'feature-4.jpg': createSVG(600, 300, `
        <rect x="50" y="50" width="500" height="200" fill="${brandColors.warning}" opacity="0.1" rx="10"/>
        <circle cx="150" cy="150" r="60" fill="${brandColors.warning}" opacity="0.3"/>
        <text x="150" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" fill="${brandColors.warning}">📊</text>
        <text x="350" y="120" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${brandColors.dark}">Analytics & Tracking</text>
        <text x="350" y="150" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">Track performance & optimize</text>
        <text x="350" y="170" font-family="Arial, sans-serif" font-size="16" fill="${brandColors.gray}">for maximum ROI</text>
        <text x="350" y="200" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.warning}">✓ Conversion Tracking</text>
        <text x="350" y="220" font-family="Arial, sans-serif" font-size="14" fill="${brandColors.warning}">✓ A/B Testing</text>
    `),

    // Payment Methods
    'payment-methods.png': createSVG(300, 60, `
        <rect x="10" y="15" width="60" height="30" fill="${brandColors.primary}" rx="5"/>
        <text x="40" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">VISA</text>
        <rect x="80" y="15" width="60" height="30" fill="${brandColors.accent}" rx="5"/>
        <text x="110" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${brandColors.white}">MASTERCARD</text>
        <rect x="150" y="15" width="60" height="30" fill="${brandColors.secondary}" rx="5"/>
        <text x="180" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.white}">PAYPAL</text>
        <rect x="220" y="15" width="60" height="30" fill="${brandColors.warning}" rx="5"/>
        <text x="250" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="${brandColors.white}">AMERICAN EXPRESS</text>
    `, brandColors.white),

    // Testimonial Photos
    'testimonial-1.jpg': createSVG(200, 200, `
        <circle cx="100" cy="100" r="90" fill="${brandColors.primary}" opacity="0.3"/>
        <circle cx="100" cy="80" r="30" fill="${brandColors.primary}" opacity="0.5"/>
        <path d="M70 130 Q100 110 130 130 L130 180 L70 180 Z" fill="${brandColors.primary}" opacity="0.5"/>
        <text x="100" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${brandColors.dark}">Sarah M.</text>
    `),

    'testimonial-2.jpg': createSVG(200, 200, `
        <circle cx="100" cy="100" r="90" fill="${brandColors.secondary}" opacity="0.3"/>
        <circle cx="100" cy="80" r="30" fill="${brandColors.secondary}" opacity="0.5"/>
        <path d="M70 130 Q100 110 130 130 L130 180 L70 180 Z" fill="${brandColors.secondary}" opacity="0.5"/>
        <text x="100" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${brandColors.dark}">Mike R.</text>
    `),

    'testimonial-3.jpg': createSVG(200, 200, `
        <circle cx="100" cy="100" r="90" fill="${brandColors.accent}" opacity="0.3"/>
        <circle cx="100" cy="80" r="30" fill="${brandColors.accent}" opacity="0.5"/>
        <path d="M70 130 Q100 110 130 130 L130 180 L70 180 Z" fill="${brandColors.accent}" opacity="0.5"/>
        <text x="100" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${brandColors.dark}">Jennifer L.</text>
    `),

    // Hero Background
    'hero-bg.jpg': createSVG(1920, 1080, `
        <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${brandColors.primary};stop-opacity:0.1" />
                <stop offset="50%" style="stop-color:${brandColors.secondary};stop-opacity:0.05" />
                <stop offset="100%" style="stop-color:${brandColors.accent};stop-opacity:0.1" />
            </linearGradient>
            <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="${brandColors.primary}" opacity="0.1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrad)"/>
        <rect width="100%" height="100%" fill="url(#dots)"/>
        <circle cx="300" cy="200" r="100" fill="${brandColors.primary}" opacity="0.05"/>
        <circle cx="1600" cy="400" r="150" fill="${brandColors.secondary}" opacity="0.05"/>
        <circle cx="800" cy="800" r="120" fill="${brandColors.accent}" opacity="0.05"/>
    `, brandColors.white)
};

// Create files
Object.entries(placeholders).forEach(([filename, svgContent]) => {
    const filepath = path.join(imagesDir, filename);
    fs.writeFileSync(filepath, svgContent);
    console.log(`✅ Created: ${filename}`);
});

console.log(`\n🎉 Successfully created ${Object.keys(placeholders).length} placeholder images!`);
console.log('\n📁 Images created in: public/images/');
console.log('\n🚀 Restart your server to see the new images:');
console.log('   npm run dev');
console.log('\n🌐 Test images at: http://localhost:3000/images/[filename]'); 