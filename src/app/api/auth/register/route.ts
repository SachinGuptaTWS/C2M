import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { email, password, full_name, phone_number, interest, college_name, grad_year } = await request.json();

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT * FROM profiles WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password (simplified for MVP)
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password; // Simplified for MVP

    // Create new user
    const userId = uuidv4();
    const result = await db.query(
      `INSERT INTO profiles (id, email, password, full_name, phone_number, interest, college_name, grad_year, role, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
       RETURNING id, email, full_name, phone_number, interest, college_name, grad_year, role`,
      [userId, email, hashedPassword, full_name, phone_number, interest, college_name, grad_year, 'student']
    );

    const user = result.rows[0];

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        interest: user.interest,
        college_name: user.college_name,
        grad_year: user.grad_year,
        role: user.role,
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
