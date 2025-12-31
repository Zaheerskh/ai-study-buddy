import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const seedTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Check if test user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { username: 'test' },
        { email: 'test' }
      ]
    });

    if (existingUser) {
      console.log('Test user already exists. Skipping seed.');
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    // Create test user
    const testUser = await User.create({
      username: 'test',
      email: 'test',
      password: hashedPassword
    });

    console.log('Test user created successfully:');
    console.log(`Username: ${testUser.username}`);
    console.log(`Email: ${testUser.email}`);
    console.log('Password: admin');

    await mongoose.connection.close();
    console.log('Seed completed. Database connection closed.');
  } catch (error) {
    console.error('Error seeding test user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedTestUser();

