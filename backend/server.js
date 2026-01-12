// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // const connectDB = require('./config/db');
// // const errorHandler = require('./middleware/errorHandler');


// // const app = express();

// // // Connect to database
// // connectDB();

// // // Middleware
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
// //   credentials: true
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Public Routes
// // app.use('/api/designs', require('./routes/designs'));
// // app.use('/api/customizations', require('./routes/customizations'));
// // app.use('/api/orders', require('./routes/orders'));
// // app.use('/api/users', require('./routes/users'));

// // // Admin Routes
// // app.use('/api/admin/auth', require('./routes/admin/auth'));
// // app.use('/api/admin/dashboard', require('./routes/admin/dashboard'));
// // app.use('/api/admin/orders', require('./routes/admin/orders'));
// // app.use('/api/admin/designs', require('./routes/admin/designs'));
// // app.use('/api/admin/customers', require('./routes/admin/customers'));
// // app.use('/api/admin/payments', require('./routes/admin/payments'));
// // app.use('/api/admin/settings', require('./routes/admin/settings'));

// // // Health check
// // app.get('/api/health', (req, res) => {
// //   res.json({
// //     success: true,
// //     message: 'Server is running',
// //     timestamp: new Date()
// //   });
// // });

// // // Error handler (must be last)
// // app.use(errorHandler);

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// // });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { GoogleGenerativeAI } = require("@google/generative-ai"); // ✅ FIXED
// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();

// // Connect to database
// connectDB();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* =========================
//    🤖 CHATBOT (GEMINI) SETUP
// ========================= */
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post('/api/chatbot', async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required"
//       });
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(`
// You are a smart AI assistant for a wedding invitation & salon booking website.
// Reply in Hinglish.
// Help users with designs, orders, pricing, and booking.

// User: ${message}
//     `);

//     const reply = result.response.text();

//     res.json({
//       success: true,
//       reply
//     });

//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "AI response failed"
//     });
//   }
// });

// /* =========================
//    🌐 PUBLIC ROUTES
// ========================= */
// app.use('/api/designs', require('./routes/designs'));
// app.use('/api/customizations', require('./routes/customizations'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/users', require('./routes/users'));

// /* =========================
//    🔐 ADMIN ROUTES
// ========================= */
// app.use('/api/admin/auth', require('./routes/admin/auth'));
// app.use('/api/admin/dashboard', require('./routes/admin/dashboard'));
// app.use('/api/admin/orders', require('./routes/admin/orders'));
// app.use('/api/admin/designs', require('./routes/admin/designs'));
// app.use('/api/admin/customers', require('./routes/admin/customers'));
// app.use('/api/admin/payments', require('./routes/admin/payments'));
// app.use('/api/admin/settings', require('./routes/admin/settings'));

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date()
//   });
// });

// // Error handler (must be last)
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const chatRoute = require("./routes/chat");

const app = express();

/* =========================
   🔗 DATABASE
========================= */
connectDB();

/* =========================
   🧩 MIDDLEWARE
========================= */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://shadicard-sand.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/chat", chatRoute);

/* =========================
   🤖 GEMINI AI SETUP
========================= */
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY missing - chatbot will use fallback responses");
} else {
  console.log("✅ Gemini AI enabled with gemini-2.5-flash model");
}

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // Intelligent fallback responses
    if (!genAI) {
      const fallbackResponses = {
        'design': {
          keywords: ['design', 'designs', 'dikhao', 'dikha', 'option', 'types', 'category', 'categories'],
          reply: '🎨 Shadi Card ke 5 amazing design categories hain:\n\n1. 💐 Traditional Wedding Cards - ₹500-₹2000\n   (Classic, elegant, timeless)\n\n2. ✨ Modern Designer Cards - ₹800-₹3000\n   (Trendy, stylish, contemporary)\n\n3. 👑 Premium Luxury Cards - ₹2500-₹8000\n   (Royal, premium quality, exclusive)\n\n4. 📱 Digital E-Invites - ₹300-₹1000\n   (Eco-friendly, instant delivery)\n\n5. 🎯 Custom Designs - Starting ₹1500\n   (Personalized, unique, your style)\n\nKaunsa category aapko pasand aayega?'
        },
        'price': {
          keywords: ['price', 'pricing', 'kya hai', 'kitna', 'cost', 'rate', 'charges'],
          reply: '💰 Shadi Card Pricing Details:\n\n📌 Traditional Cards: ₹500-₹2000\n📌 Modern Designer: ₹800-₹3000\n📌 Premium Luxury: ₹2500-₹8000\n📌 Digital E-Invites: ₹300-₹1000\n📌 Custom Design: ₹1500+\n\n🎁 Special Offers:\n• 50+ cards: 10% discount\n• 100+ cards: 15% discount\n• 200+ cards: 20% discount\n\nBulk orders pe extra savings! 💝'
        },
        'order': {
          keywords: ['order', 'kaise', 'how', 'process', 'book', 'booking'],
          reply: '📝 Order Process (Super Easy!):\n\n1️⃣ Design Select karein\n   Browse karein aur pasand ka design choose karein\n\n2️⃣ Customize karein\n   • Apna text add karein\n   • Photos upload karein\n   • Colors change karein\n\n3️⃣ Preview Check karein\n   Final design ko dekhein\n\n4️⃣ Order Place karein\n   Cart mein add karein\n\n5️⃣ Payment Complete karein\n   Secure payment options\n\n6️⃣ Delivery milegi\n   2-7 days mein!\n\n✨ Ready to order? Design choose karein!'
        },
        'delivery': {
          keywords: ['delivery', 'time', 'kitne din', 'days', 'shipping', 'courier'],
          reply: '🚚 Delivery Options:\n\n⚡ Express Delivery: 2-3 days\n   • Extra charges applicable\n   • Premium packaging\n   • Track order online\n\n📦 Standard Delivery: 5-7 days\n   • FREE delivery\n   • Safe packaging\n   • Tracking available\n\n🌍 Pan India delivery available!\n📍 Location aur quantity pe timing depend karti hai.\n\nKya aap order karna chahte hain?'
        },
        'custom': {
          keywords: ['custom', 'customize', 'personalize', 'apna', 'unique', 'special'],
          reply: '✨ Custom Design Service:\n\n💫 Starting Price: ₹1500\n\n🎯 Included:\n• Free design consultation\n• Professional designers\n• Unlimited revisions\n• Your photos & graphics\n• Custom text in any language\n• Multiple design options\n• High-quality printing\n\n🎨 Process:\n1. Share your requirements\n2. Our designer creates design\n3. You review & suggest changes\n4. Final approval\n5. Print & deliver!\n\n📞 Interested? Contact us to start!'
        },
        'help': {
          keywords: ['help', 'hello', 'hi', 'hey', 'namaste', 'kya', 'madad'],
          reply: '🙏 Namaste! Main aapki Shadi Card assistant hoon!\n\n💬 Main aapki help kar sakti hoon:\n\n🎨 Design options dekhne ke liye\n💰 Pricing details janne ke liye\n📝 Order process samajhne ke liye\n🚚 Delivery information ke liye\n✨ Custom design ke baare mein\n📱 Contact details ke liye\n\nKya jaanna chahenge? 😊'
        },
        'contact': {
          keywords: ['contact', 'phone', 'email', 'call', 'whatsapp', 'number'],
          reply: '📞 Contact Us:\n\n📱 Phone: +91-XXXXXXXXXX\n📧 Email: info@shadicard.com\n💬 WhatsApp: +91-XXXXXXXXXX\n\n🕐 Working Hours:\n   Mon-Sat: 10 AM - 7 PM\n   Sunday: Closed\n\n📍 Address:\n   [Your Address Here]\n\nHum aapki help ke liye ready hain! 🎉'
        }
      };

      const lowerMsg = message.toLowerCase();
      let reply = '🙏 Namaste! Main aapki Shadi Card assistant hoon!\n\n💬 Aap mujhse ye pooch sakte hain:\n\n🎨 "Design options dikhao"\n💰 "Price kya hai?"\n📝 "Order kaise kare?"\n🚚 "Delivery time?"\n✨ "Custom design possible hai?"\n📞 "Contact details"\n\nKya jaanna chahenge? 😊';

      // Smart keyword matching
      for (const [key, data] of Object.entries(fallbackResponses)) {
        if (data.keywords.some(keyword => lowerMsg.includes(keyword))) {
          reply = data.reply;
          break;
        }
      }

      return res.json({
        success: true,
        reply
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an AI assistant for "Shadi Card" - A Premium Wedding Invitation & Salon Booking Platform.

IMPORTANT CONTEXT:
- We offer custom & pre-designed wedding invitation cards
- Digital + Physical printing services available
- Salon & beauty services booking
- Custom design creation with personalization
- Express delivery options

PRODUCT CATEGORIES:
1. Traditional Wedding Cards - ₹500-₹2000
2. Modern Designer Cards - ₹800-₹3000  
3. Premium Luxury Cards - ₹2500-₹8000
4. Digital E-Invites - ₹300-₹1000
5. Custom Designs - Starting ₹1500

SERVICES:
- Free design consultation
- Custom text & graphics
- Multiple language support (Hindi, English, Regional)
- Bulk order discounts (50+ cards)
- Express delivery (2-3 days)
- Standard delivery (5-7 days)

GUIDELINES:
- Reply in Hinglish (Hindi + English mix) for better connection
- Be friendly, helpful, and wedding-focused
- Provide specific pricing when asked
- Suggest designs based on user preferences
- Guide through order process step-by-step
- If unsure, offer to connect with support team

USER QUERY: ${message}

Reply in a helpful, conversational Hinglish tone:`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("\n========== GEMINI AI ERROR ==========");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    console.error("Full Error:", JSON.stringify(error, null, 2));
    console.error("======================================\n");
    
    res.status(500).json({
      success: false,
      message: "AI response failed",
      reply: "Sorry, main abhi available nahi hoon. Kuch technical issue hai. Thodi der baad try karein ya humse direct contact karein: +91-XXXXXXXXXX"
    });
  }
});

/* =========================
   🌐 PUBLIC ROUTES
========================= */
app.use('/api/designs', require('./routes/designs'));
app.use('/api/customizations', require('./routes/customizations'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/sellers', require('./routes/sellers'));
app.use('/api/products', require('./routes/public/products')); // Public product listing
app.use('/api/reviews', require('./routes/reviews')); // Product reviews

/* =========================
   🏪 SELLER ROUTES
========================= */
app.use('/api/seller/dashboard', require('./routes/seller/dashboard'));
app.use('/api/seller/products', require('./routes/seller/products'));
app.use('/api/seller/orders', require('./routes/seller/orders'));

/* =========================
   🔐 ADMIN ROUTES
========================= */
app.use('/api/admin/auth', require('./routes/admin/auth'));
app.use('/api/admin/dashboard', require('./routes/admin/dashboard'));
app.use('/api/admin/orders', require('./routes/admin/orders'));
app.use('/api/admin/designs', require('./routes/admin/designs'));
app.use('/api/admin/customers', require('./routes/admin/customers'));
app.use('/api/admin/payments', require('./routes/admin/payments'));
app.use('/api/admin/settings', require('./routes/admin/settings'));
app.use('/api/admin/sellers', require('./routes/admin/sellers'));
app.use('/api/admin/seller-products', require('./routes/admin/sellerProducts'));

/* =========================
   ❤️ HEALTH CHECK
========================= */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server running perfectly 🚀',
    time: new Date()
  });
});

/* =========================
   ❌ ERROR HANDLER
========================= */
app.use(errorHandler);

/* =========================
   🚀 SERVER START
========================= */

app.listen(() => {
  console.log('🔥 Server running');
});
