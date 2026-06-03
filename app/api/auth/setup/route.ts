import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// POST /api/auth/setup — run once to create the admin user
// Protected by SETUP_SECRET env variable
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-setup-secret');
  if (secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const email = process.env.ADMIN_EMAIL ?? 'admin@kobcraft.com';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme123';
  const hash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO admins (email, password)
    VALUES (${email}, ${hash})
    ON CONFLICT (email) DO UPDATE SET password = ${hash}
  `;

  return NextResponse.json({ ok: true, email });
}
