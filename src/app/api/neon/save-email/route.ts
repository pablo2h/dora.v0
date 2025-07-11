// f:\Webs\dora.v0\src\app\api\neon\save-email\route.ts
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const sql = neon(process.env.NEON_DATABASE_URL!);

    await sql`INSERT INTO emails (email) VALUES (${email})`;

    return NextResponse.json({ message: 'Email saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json({ message: 'Error saving email' }, { status: 500 });
  }
}