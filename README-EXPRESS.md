# ClickBank Marketing Blueprint - Express.js Landing Page

A high-converting, production-ready landing page for ClickBank affiliate marketing products built with Node.js and Express.js.

## 🚀 Features

### Conversion Optimization
- **Countdown Timer** - Creates urgency with 24-hour countdown
- **Exit Intent Popup** - Captures leaving visitors with lead magnet
- **Multiple CTAs** - Strategic placement throughout the page
- **Trust Indicators** - Money-back guarantee, customer count, instant access
- **Social Proof** - Customer reviews and testimonials

### Technical Features
- **Server-Side Rendering** - Fast initial page loads with EJS templates
- **Security** - Helmet.js for security headers, rate limiting
- **Performance** - Compression, optimized assets, lazy loading
- **SEO Optimized** - Meta tags, schema markup, semantic HTML
- **Mobile Responsive** - Works perfectly on all devices
- **Analytics Ready** - Google Analytics integration

### User Experience
- **Smooth Animations** - Intersection Observer for scroll animations
- **Interactive FAQ** - Expandable FAQ section
- **Smooth Scrolling** - Navigation with smooth scroll behavior
- **Loading States** - Professional loading spinner
- **Form Validation** - Client and server-side validation

## 📁 Project Structure

```
clickbank-marketing-landing/
├── app.js                 # Main Express application
├── package.json           # Dependencies and scripts
├── views/
│   └── index.ejs         # Main landing page template
├── public/
│   ├── css/
│   │   └── main.css      # All styles and animations
│   ├── js/
│   │   └── main.js       # Client-side functionality
│   └── images/           # Static images and assets
├── README-EXPRESS.md     # This file
└── .env                  # Environment variables (create this)
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone or download the project**
   ```bash
   git clone https://github.com/yourusername/clickbank-marketing-landing.git
   cd clickbank-marketing-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   ```
   http://localhost:3000
   ```

### Production Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Environment Variables (.env)
```env
PORT=3000
NODE_ENV=production
GA_TRACKING_ID=your-google-analytics-id
CHECKOUT_URL=https://your-checkout-url.com
SUPPORT_EMAIL=support@yourdomain.com
```

### Customization Points

#### 1. Product Information
Edit `views/index.ejs` to update:
- Product name and description
- Pricing information
- Features and benefits
- Customer testimonials

#### 2. Styling
Modify `public/css/main.css` to customize:
- Color scheme (CSS variables in `:root`)
- Typography and spacing
- Animations and transitions
- Responsive breakpoints

#### 3. Functionality
Update `public/js/main.js` for:
- Countdown timer duration
- Exit popup behavior
- Form submission handling
- Analytics tracking

#### 4. Server Logic
Modify `app.js` for:
- API endpoints
- Form processing
- Email integration
- Database connections

## 🔧 API Endpoints

### POST /api/subscribe
Handles email subscription from exit popup.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing!"
}
```

### POST /api/purchase
Tracks purchase attempts and redirects to checkout.

**Request:**
```json
{
  "source": "hero_cta"
}
```

**Response:**
```json
{
  "success": true,
  "redirectUrl": "https://checkout.example.com",
  "message": "Redirecting to secure checkout..."
}
```

### POST /api/contact
Handles contact form submissions.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question..."
}
```

## 🎨 Customization Guide

### Changing Colors
Update CSS variables in `public/css/main.css`:
```css
:root {
    --primary-color: #667eea;    /* Main brand color */
    --secondary-color: #764ba2;  /* Secondary brand color */
    --accent-color: #ff6b6b;     /* Call-to-action color */
    --success-color: #51cf66;    /* Success states */
    --text-dark: #1e293b;        /* Main text color */
    --text-light: #64748b;       /* Secondary text color */
}
```

### Adding New Sections
1. Add HTML to `views/index.ejs`
2. Add corresponding CSS to `public/css/main.css`
3. Add any JavaScript functionality to `public/js/main.js`

### Integrating Payment Processors
1. Update the `handlePurchase` function in `public/js/main.js`
2. Modify the `/api/purchase` endpoint in `app.js`
3. Add your payment processor's SDK and configuration

## 📊 Analytics & Tracking

### Google Analytics
The page includes Google Analytics 4 tracking for:
- Page views
- Purchase clicks
- Form submissions
- User engagement

### Custom Events
Track these events in your analytics:
- `purchase_click` - When users click buy buttons
- `form_submit` - When forms are submitted
- `exit_intent` - When exit popup is shown

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - Prevents abuse
- **Input Validation** - Server-side validation
- **CSP Headers** - Content Security Policy
- **HTTPS Ready** - Secure by default

## 🚀 Performance Optimization

- **Gzip Compression** - Reduces file sizes
- **Static File Caching** - Faster subsequent loads
- **Lazy Loading** - Images load as needed
- **Minified Assets** - Smaller file sizes
- **CDN Ready** - Easy to deploy to CDN

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch-Friendly** - Optimized for mobile interaction
- **Fast Loading** - Optimized for mobile networks
- **Progressive Enhancement** - Works without JavaScript

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

## 📈 Conversion Optimization Tips

1. **A/B Test CTAs** - Test different button colors and text
2. **Optimize Headlines** - Test different value propositions
3. **Add Urgency** - Use countdown timers and limited offers
4. **Social Proof** - Add more testimonials and reviews
5. **Simplify Forms** - Reduce form fields to minimum
6. **Mobile First** - Ensure mobile experience is perfect

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in .env file
PORT=3001
```

**CSS not loading:**
- Check that `public/css/main.css` exists
- Verify static file middleware is configured

**JavaScript errors:**
- Check browser console for errors
- Verify all script tags are loading

**Form not submitting:**
- Check server logs for errors
- Verify API endpoints are working
- Test with Postman or similar tool

## 📞 Support

For support and questions:
- Email: support@yourdomain.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/clickbank-marketing-landing/issues)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Ready to launch your high-converting ClickBank landing page?** 🚀

This template provides everything you need to create a professional, conversion-optimized landing page that will help you maximize your ClickBank affiliate earnings. 