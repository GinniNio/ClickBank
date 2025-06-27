const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initTransporter();
    }

    initTransporter() {
        // Configure email transporter based on environment variables
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            this.transporter = nodemailer.createTransporter({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
        } else {
            console.log('Email service not configured. Please set SMTP environment variables.');
        }
    }

    async sendWelcomeEmail(email) {
        if (!this.transporter) {
            console.log('Email service not available');
            return { success: false, message: 'Email service not configured' };
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: '🎯 Your FREE ClickBank Quick-Start Checklist + Discount Code!',
            html: this.getWelcomeEmailTemplate(email)
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Welcome email sent successfully' };
        } catch (error) {
            console.error('Error sending welcome email:', error);
            return { success: false, message: 'Failed to send welcome email' };
        }
    }

    async sendContactNotification(name, email, message) {
        if (!this.transporter) {
            console.log('Email service not available');
            return { success: false, message: 'Email service not configured' };
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Contact notification sent successfully' };
        } catch (error) {
            console.error('Error sending contact notification:', error);
            return { success: false, message: 'Failed to send contact notification' };
        }
    }

    getWelcomeEmailTemplate(email) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your ClickBank Quick-Start Checklist</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8fafc; padding: 30px; }
                .checklist { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
                .checklist-item { margin: 10px 0; padding: 10px; background: #e8f4f8; border-left: 4px solid #667eea; }
                .discount-code { background: #ff6b6b; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
                .footer { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
                .cta-button { background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎯 Welcome to ClickBank Success!</h1>
                    <p>Thank you for joining thousands of successful ClickBank marketers</p>
                </div>
                
                <div class="content">
                    <h2>Your FREE ClickBank Quick-Start Checklist</h2>
                    <p>Hi there!</p>
                    <p>Welcome to the ClickBank Marketing Secret community! As promised, here's your FREE Quick-Start Checklist to help you get started on the right track:</p>
                    
                    <div class="checklist">
                        <h3>✅ 7-Step ClickBank Quick-Start Checklist</h3>
                        <div class="checklist-item">
                            <strong>Step 1:</strong> Set up your ClickBank affiliate account and get approved
                        </div>
                        <div class="checklist-item">
                            <strong>Step 2:</strong> Research profitable niches using our proven methodology
                        </div>
                        <div class="checklist-item">
                            <strong>Step 3:</strong> Select 3-5 high-converting products to promote
                        </div>
                        <div class="checklist-item">
                            <strong>Step 4:</strong> Create your content calendar and promotion strategy
                        </div>
                        <div class="checklist-item">
                            <strong>Step 5:</strong> Set up tracking and analytics to measure performance
                        </div>
                        <div class="checklist-item">
                            <strong>Step 6:</strong> Launch your first campaign and monitor results
                        </div>
                        <div class="checklist-item">
                            <strong>Step 7:</strong> Scale successful campaigns and optimize underperformers
                        </div>
                    </div>
                    
                    <div class="discount-code">
                        <h3>🎁 EXCLUSIVE 20% DISCOUNT CODE</h3>
                        <p>Use code: <strong>QUICKSTART20</strong></p>
                        <p>Valid for the next 48 hours only!</p>
                        <a href="${process.env.BASE_URL || 'http://localhost:3000'}#purchase" class="cta-button">Claim Your Discount Now</a>
                    </div>
                    
                    <h3>What's Next?</h3>
                    <p>This checklist is just the beginning. Our complete ClickBank Marketing Blueprint includes:</p>
                    <ul>
                        <li>🔥 Advanced niche research strategies</li>
                        <li>📈 High-converting content templates</li>
                        <li>💰 Proven traffic generation methods</li>
                        <li>🎯 Conversion optimization techniques</li>
                        <li>📊 Analytics and tracking setup guides</li>
                    </ul>
                    
                    <p>Ready to take your ClickBank success to the next level?</p>
                    <p style="text-align: center;">
                        <a href="${process.env.BASE_URL || 'http://localhost:3000'}#purchase" class="cta-button">Get The Complete Blueprint</a>
                    </p>
                </div>
                
                <div class="footer">
                    <p>Questions? Reply to this email or contact us at support@allgoodthings.online</p>
                    <p>&copy; 2023 ClickBank Marketing Secret. All rights reserved.</p>
                    <p><small>You received this email because you signed up for our free checklist. <a href="#" style="color: #94a3b8;">Unsubscribe</a></small></p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

module.exports = new EmailService(); 