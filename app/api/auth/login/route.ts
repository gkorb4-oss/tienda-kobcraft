import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail } from '@/lib/db';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const token = await signToken({ id: admin.id, email: admin.email });
    cookies().set('kob_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
