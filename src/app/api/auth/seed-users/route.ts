import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/crypto';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await dbConnect();

    // Check if users already exist
    const existingAdmin = await User.findOne({ email: 'admin@demo.com' });
    const existingUser = await User.findOne({ email: 'user@demo.com' });

    if (existingAdmin && existingUser) {
      return NextResponse.json({ message: 'Demo users already exist' });
    }

    const hashedPassword = hashPassword('password123');

    // Create admin user
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@demo.com',
        password: hashedPassword,
        role: 'admin',
        provider: 'credentials',
      });
    }

    // Create regular user
    if (!existingUser) {
      await User.create({
        name: 'Demo User',
        email: 'user@demo.com',
        password: hashedPassword,
        role: 'user',
        provider: 'credentials',
      });
    }

    return NextResponse.json({ 
      message: 'Demo users created successfully',
      users: [
        { email: 'admin@demo.com', password: 'password123', role: 'admin' },
        { email: 'user@demo.com', password: 'password123', role: 'user' }
      ]
    });
  } catch (error) {
    console.error('Seed users error:', error);
    return NextResponse.json(
      { error: 'Failed to create demo users' },
      { status: 500 }
    );
  }
}
