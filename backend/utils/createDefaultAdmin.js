const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@shadicard.com';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('⚠️ Default admin already exists');
      return;
    }

    await Admin.create({
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password: 'admin@123',
      role: 'super_admin'
    });

    console.log('✅ Default admin created');

  } catch (error) {
    console.error('❌ Admin seed error:', error.message);
  }
};

module.exports = createDefaultAdmin;
