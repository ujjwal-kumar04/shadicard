require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const Admin = require('./models/Admin');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      console.log('\n⚠️  Admin already exists!');
      const overwrite = await question('Do you want to create another admin? (yes/no): ');
      if (overwrite.toLowerCase() !== 'yes') {
        console.log('Exiting...');
        process.exit(0);
      }
    }

    // Get admin details
    console.log('\n📝 Create Admin Account\n');
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');

    // Create admin
    const admin = new Admin({
      name,
      email,
      password,
      role: 'super_admin'
    });

    await admin.save();

    console.log('\n✅ Admin created successfully!');
    console.log('\nAdmin Details:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Role: super_admin');
    console.log('\n🔐 You can now login at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
