require('dotenv').config();
const mongoose = require('mongoose');
const Design = require('./models/Design');

const sampleDesigns = [
  {
    title: "Royal Hindu Wedding Invitation",
    description: "Elegant traditional Hindu wedding card with golden borders, sacred symbols, and intricate patterns. Perfect for a grand celebration.",
    category: "hindu",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606800052052-2bdb6e18e4f9?w=600&h=800&fit=crop&q=80",
        type: "front"
      },
      {
        url: "https://images.unsplash.com/photo-1519657337289-077653f724ed?w=600&h=800&fit=crop&q=80",
        type: "inside"
      }
    ],
    basePrice: 2500,
    pricePerHundred: 2500,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 },
      { type: "luxury", priceMultiplier: 2 }
    ],
    colors: [
      { name: "Gold", code: "#FFD700" },
      { name: "Red", code: "#DC143C" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Times New Roman" },
      { name: "Georgia" },
      { name: "Calibri" }
    ],
    deliveryDays: 7,
    featured: true,
    tags: ["traditional", "golden", "elegant", "premium"]
  },
  {
    title: "Islamic Nikah Invitation Card",
    description: "Beautiful Islamic wedding card featuring Arabic calligraphy, mosque silhouettes, and elegant green patterns.",
    category: "muslim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2200,
    pricePerHundred: 2200,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 },
      { type: "luxury", priceMultiplier: 2 }
    ],
    colors: [
      { name: "Green", code: "#228B22" },
      { name: "Gold", code: "#FFD700" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Times New Roman" }
    ],
    deliveryDays: 7,
    featured: true,
    tags: ["islamic", "nikah", "calligraphy"]
  },
  {
    title: "Classic Church Wedding Invitation",
    description: "Traditional Christian wedding card with cross symbol, floral borders, and elegant typography.",
    category: "christian",
    images: [
      {
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2000,
    pricePerHundred: 2000,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Blue", code: "#4169E1" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Georgia" },
      { name: "Calibri" }
    ],
    deliveryDays: 7,
    featured: false,
    tags: ["church", "cross", "floral", "classic"]
  },
  {
    title: "Modern Minimalist Invitation",
    description: "Clean and contemporary wedding card with simple lines, modern typography, and elegant white space.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 1800,
    pricePerHundred: 1800,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Black", code: "#000000" },
      { name: "Rose Gold", code: "#B76E79" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Calibri" }
    ],
    deliveryDays: 5,
    featured: true,
    tags: ["modern", "minimal", "simple", "contemporary"]
  },
  {
    title: "Traditional Indian Wedding Card",
    description: "Rich traditional design with ethnic patterns, paisley motifs, and vibrant colors. Perfect for a grand Indian wedding.",
    category: "traditional",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 3000,
    pricePerHundred: 3000,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 },
      { type: "luxury", priceMultiplier: 2.5 }
    ],
    colors: [
      { name: "Red", code: "#DC143C" },
      { name: "Gold", code: "#FFD700" },
      { name: "Orange", code: "#FF8C00" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 10,
    featured: true,
    tags: ["traditional", "ethnic", "premium", "grand"]
  },
  {
    title: "Elegant Floral Wedding Card",
    description: "Beautiful floral design with delicate flowers, soft colors, and romantic appeal.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522673607211-8389d32d1ffd?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2300,
    pricePerHundred: 2300,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Pink", code: "#FFB6C1" },
      { name: "White", code: "#FFFFFF" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Georgia" }
    ],
    deliveryDays: 6,
    featured: false,
    tags: ["floral", "elegant", "romantic", "soft"]
  },
  {
    title: "Royal Rajasthani Wedding Invitation",
    description: "Grand Rajasthani style card with royal motifs, elephant designs, and rich embellishments.",
    category: "traditional",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 3500,
    pricePerHundred: 3500,
    paperOptions: [
      { type: "premium", priceMultiplier: 1 },
      { type: "luxury", priceMultiplier: 1.8 }
    ],
    colors: [
      { name: "Gold", code: "#FFD700" },
      { name: "Maroon", code: "#8B0000" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 12,
    featured: true,
    tags: ["rajasthani", "royal", "grand", "luxury"]
  },
  {
    title: "Contemporary Geometric Card",
    description: "Modern geometric patterns with bold lines and contemporary color palette.",
    category: "modern",
    images: [
      {
        url: "https://via.placeholder.com/600x800/20B2AA/FFFFFF?text=Geometric+Design",
        type: "front"
      }
    ],
    basePrice: 1900,
    pricePerHundred: 1900,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Teal", code: "#20B2AA" },
      { name: "White", code: "#FFFFFF" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Calibri" }
    ],
    deliveryDays: 5,
    featured: false,
    tags: ["geometric", "modern", "bold", "contemporary"]
  },
  {
    title: "Luxury Gold Foil Invitation",
    description: "Premium wedding card with gold foil stamping, embossed patterns, and silk texture finish.",
    category: "traditional",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 4500,
    pricePerHundred: 4500,
    paperOptions: [
      { type: "luxury", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 0.8 }
    ],
    colors: [
      { name: "Gold", code: "#FFD700" },
      { name: "Black", code: "#000000" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 15,
    featured: true,
    tags: ["luxury", "gold foil", "embossed", "premium"]
  },
  {
    title: "Bohemian Chic Wedding Card",
    description: "Trendy boho-style invitation with watercolor flowers, feathers, and earthy tones.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2100,
    pricePerHundred: 2100,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.4 }
    ],
    colors: [
      { name: "Terracotta", code: "#E2725B" },
      { name: "Sage", code: "#BCB88A" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Georgia" }
    ],
    deliveryDays: 6,
    featured: true,
    tags: ["boho", "watercolor", "trendy", "artistic"]
  },
  {
    title: "Vintage Art Deco Invitation",
    description: "1920s inspired art deco design with geometric patterns, gatsby style, and elegant typography.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2800,
    pricePerHundred: 2800,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Navy", code: "#000080" },
      { name: "Gold", code: "#FFD700" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 8,
    featured: true,
    tags: ["vintage", "art deco", "gatsby", "elegant"]
  },
  {
    title: "Rustic Kraft Paper Invitation",
    description: "Natural rustic design on kraft paper with twine accents, wildflowers, and handwritten fonts.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 1600,
    pricePerHundred: 1600,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 }
    ],
    colors: [
      { name: "Kraft", code: "#D2B48C" },
      { name: "Brown", code: "#8B4513" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Calibri" }
    ],
    deliveryDays: 5,
    featured: false,
    tags: ["rustic", "kraft paper", "natural", "handwritten"]
  },
  {
    title: "South Indian Temple Wedding Card",
    description: "Traditional South Indian design with temple gopuram, mangalsutra motifs, and Sanskrit shlokas.",
    category: "hindu",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2700,
    pricePerHundred: 2700,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Red", code: "#DC143C" },
      { name: "Gold", code: "#FFD700" },
      { name: "Yellow", code: "#FFFF00" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 8,
    featured: true,
    tags: ["south indian", "temple", "traditional", "sanskrit"]
  },
  {
    title: "Punjabi Sikh Wedding Invitation",
    description: "Vibrant Punjabi wedding card with Ek Onkar symbol, phulkari patterns, and Gurmukhi text.",
    category: "hindu",
    images: [
      {
        url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2400,
    pricePerHundred: 2400,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Orange", code: "#FF8C00" },
      { name: "Gold", code: "#FFD700" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Times New Roman" }
    ],
    deliveryDays: 7,
    featured: false,
    tags: ["punjabi", "sikh", "phulkari", "vibrant"]
  },
  {
    title: "Botanical Garden Wedding Card",
    description: "Fresh botanical design with green leaves, ferns, and natural elements for garden weddings.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2000,
    pricePerHundred: 2000,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.4 }
    ],
    colors: [
      { name: "Green", code: "#228B22" },
      { name: "White", code: "#FFFFFF" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Georgia" }
    ],
    deliveryDays: 6,
    featured: true,
    tags: ["botanical", "garden", "green", "natural"]
  },
  {
    title: "Elegant Pearl & Lace Card",
    description: "Sophisticated card with pearl embellishments, delicate lace patterns, and ivory finish.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 3200,
    pricePerHundred: 3200,
    paperOptions: [
      { type: "premium", priceMultiplier: 1 },
      { type: "luxury", priceMultiplier: 1.6 }
    ],
    colors: [
      { name: "Ivory", code: "#FFFFF0" },
      { name: "Pearl White", code: "#F8F8FF" }
    ],
    availableFonts: [
      { name: "Georgia" },
      { name: "Times New Roman" }
    ],
    deliveryDays: 10,
    featured: true,
    tags: ["pearl", "lace", "elegant", "sophisticated"]
  },
  {
    title: "Beach Destination Wedding Card",
    description: "Tropical beach theme with seashells, palm leaves, and ocean colors for destination weddings.",
    category: "modern",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 1950,
    pricePerHundred: 1950,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.3 }
    ],
    colors: [
      { name: "Turquoise", code: "#40E0D0" },
      { name: "Sand", code: "#F4A460" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Calibri" }
    ],
    deliveryDays: 5,
    featured: false,
    tags: ["beach", "destination", "tropical", "ocean"]
  },
  {
    title: "Mughal Era Scroll Invitation",
    description: "Royal Mughal-inspired scroll design with Persian motifs, miniature art, and calligraphy.",
    category: "muslim",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 4000,
    pricePerHundred: 4000,
    paperOptions: [
      { type: "premium", priceMultiplier: 1 },
      { type: "luxury", priceMultiplier: 1.7 }
    ],
    colors: [
      { name: "Royal Blue", code: "#4169E1" },
      { name: "Gold", code: "#FFD700" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 14,
    featured: true,
    tags: ["mughal", "scroll", "persian", "royal"]
  },
  {
    title: "Modern Catholic Wedding Invitation",
    description: "Contemporary Christian wedding card with elegant cross design and classic typography.",
    category: "christian",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606800052052-2bdb6e18e4f9?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2200,
    pricePerHundred: 2200,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Silver", code: "#C0C0C0" }
    ],
    availableFonts: [
      { name: "Arial" },
      { name: "Georgia" }
    ],
    deliveryDays: 7,
    featured: false,
    tags: ["catholic", "cross", "modern", "classic"]
  },
  {
    title: "Bengali Traditional Wedding Card",
    description: "Traditional Bengali card with alpana designs, shankha-pola motifs, and red-white theme.",
    category: "hindu",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=800&fit=crop&q=80",
        type: "front"
      }
    ],
    basePrice: 2600,
    pricePerHundred: 2600,
    paperOptions: [
      { type: "standard", priceMultiplier: 1 },
      { type: "premium", priceMultiplier: 1.5 }
    ],
    colors: [
      { name: "Red", code: "#DC143C" },
      { name: "White", code: "#FFFFFF" }
    ],
    availableFonts: [
      { name: "Times New Roman" },
      { name: "Georgia" }
    ],
    deliveryDays: 8,
    featured: true,
    tags: ["bengali", "traditional", "alpana", "red-white"]
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('\nClearing existing designs...');
    await Design.deleteMany({});
    console.log('✓ Existing designs cleared');

    console.log('\nInserting sample designs...');
    const result = await Design.insertMany(sampleDesigns);
    console.log(`✓ Successfully inserted ${result.length} designs`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample designs added:');
    result.forEach((design, index) => {
      console.log(`  ${index + 1}. ${design.title} (${design.category}) - ₹${design.basePrice}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
