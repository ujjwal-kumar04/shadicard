const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send OTP Email
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"Shadi Card" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Verify Your Email - Shadi Card',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 16px 16px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Shadi Card</h1>
                    <p style="margin: 10px 0 0; color: #fecaca; font-size: 14px;">Premium Wedding Invitation Cards</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px;">Verify Your Email</h2>
                    <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      Hi ${name || 'there'},
                    </p>
                    <p style="margin: 0 0 30px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      Thank you for registering with Shadi Card! Please use the following OTP to verify your email address:
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="text-align: center; margin: 30px 0;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 20px 40px; border-radius: 12px; border: 2px dashed #dc2626;">
                        <span style="font-size: 36px; font-weight: bold; color: #dc2626; letter-spacing: 8px;">${otp}</span>
                      </div>
                    </div>
                    
                    <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; text-align: center;">
                      ⏰ This OTP is valid for <strong>10 minutes</strong> only.
                    </p>
                    <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px; text-align: center;">
                      If you didn't request this, please ignore this email.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © 2024 Shadi Card. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                      Need help? Contact us at support@shadicard.com
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send Welcome Email
const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `"Shadi Card" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎉 Welcome to Shadi Card - Account Created Successfully!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 16px 16px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎊 Welcome to Shadi Card!</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 24px;">Hello ${name}! 👋</h2>
                    <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      Your account has been created successfully! We're thrilled to have you join our community.
                    </p>
                    
                    <div style="background: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0;">
                      <h3 style="margin: 0 0 15px; color: #1f2937; font-size: 18px;">What you can do now:</h3>
                      <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 2;">
                        <li>Browse our beautiful wedding card designs</li>
                        <li>Customize cards with your details</li>
                        <li>Save favorites to your watchlist</li>
                        <li>Place orders and track delivery</li>
                        <li>Get exclusive offers and discounts</li>
                      </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${process.env.FRONTEND_URL || 'https://shadicard-sand.vercel.app'}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 50px; font-weight: bold; font-size: 16px;">
                        Start Exploring →
                      </a>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                      Questions? We're here to help!
                    </p>
                    <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                      © 2024 Shadi Card. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail
};
