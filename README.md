# ClickBank Marketing Blueprint

A Next.js application for ClickBank affiliate marketing with advanced conversion optimization features.

## 🚀 Features

- **High-Converting Landing Page** - Optimized for ClickBank affiliate sales
- **Checkout Flow** - Secure payment processing with urgency timers
- **Upsell System** - Multi-step funnel with exit intent popups
- **Analytics Integration** - Google Analytics and Facebook Pixel tracking
- **Mobile Responsive** - Optimized for all devices
- **SEO Optimized** - Schema markup and meta tags
- **Security Headers** - Production-ready security configuration

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- ClickBank affiliate account
- Google Analytics account (optional)
- Facebook Pixel (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GinniNio/ClickBank.git
   cd ClickBank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   # ClickBank Configuration
   NEXT_PUBLIC_CLICKBANK_AFFILIATE_ID=your_actual_affiliate_id
   NEXT_PUBLIC_CLICKBANK_PRODUCT_ID=your_actual_product_id
   
   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=Your Site Name
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── checkout/          # Checkout page with payment form
│   ├── thank-you/         # Thank you page with upsells
│   ├── upsell-checkout/   # Upsell checkout page
│   ├── upsell-thank-you/  # Upsell thank you page
│   ├── tools/             # Tools page
│   ├── strategies/        # Strategies page
│   ├── success-stories/   # Success stories page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main landing page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── analytics.tsx      # Analytics integration
│   └── theme-provider.tsx # Theme management
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## ⚙️ Configuration

### ClickBank Setup

1. **Get your affiliate ID** from your ClickBank account
2. **Choose a product** to promote
3. **Update environment variables** with your IDs
4. **Test your links** in development

### Analytics Setup

1. **Google Analytics**
   - Create a GA4 property
   - Get your measurement ID
   - Add to `NEXT_PUBLIC_GA_ID`

2. **Facebook Pixel**
   - Create a Facebook Pixel
   - Get your pixel ID
   - Add to `NEXT_PUBLIC_FB_PIXEL_ID`

## 🚀 Production Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Other Platforms

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔒 Security Features

- **Content Security Policy** - Prevents XSS attacks
- **Security Headers** - HSTS, X-Frame-Options, etc.
- **Input Validation** - Form validation and sanitization
- **HTTPS Only** - Secure connections required

## 📊 Performance Optimization

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Font Optimization** - Google Fonts with display swap
- **CSS Optimization** - Tailwind CSS purging

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📝 Customization

### Styling
- Edit `tailwind.config.js` for theme customization
- Modify `app/globals.css` for custom styles
- Update color schemes in CSS variables

### Content
- Update testimonials in `app/page.tsx`
- Modify pricing in checkout pages
- Customize FAQ sections

### Tracking
- Add custom events in analytics components
- Modify conversion tracking
- Update pixel events

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript configuration
   - Verify environment variables

2. **Analytics Not Working**
   - Verify tracking IDs are correct
   - Check browser console for errors
   - Ensure CSP allows analytics domains

3. **ClickBank Links Not Working**
   - Verify affiliate and product IDs
   - Test links in incognito mode
   - Check ClickBank account status

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions:
- Email: support@allgoodthings.online
- GitHub Issues: [Create an issue](https://github.com/GinniNio/ClickBank/issues)

## ⚠️ Disclaimer

This application is for educational purposes. Ensure compliance with:
- FTC guidelines for affiliate marketing
- ClickBank terms of service
- Local advertising laws
- GDPR/privacy regulations

---

**Made with ❤️ for ClickBank affiliates** 