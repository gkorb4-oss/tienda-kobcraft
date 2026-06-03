'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Credenciales incorrectas');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-kob-void bg-grid flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="#7c3aed" strokeWidth="2" fill="none"/>
              <polygon points="32,14 52,25 52,39 32,50 12,39 12,25" fill="#7c3aed" opacity="0.2"/>
              <circle cx="32" cy="32" r="7" fill="#a78bfa"/>
            </svg>
          </div>
          <h1 className="font-display font-black text-2xl tracking-widest">
            KOB<span className="text-kob-purple">CRAFT</span>
          </h1>
          <p className="font-mono text-xs tracking-[0.4em] text-kob-light/30 uppercase mt-1">Panel Admin</p>
        </div>

        <div className="kob-card p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-sm px-4 py-3 text-red-400 text-sm font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="kob-label">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kobcraft.com"
                className="kob-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="kob-label">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="kob-input"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="kob-btn-primary w-full justify-center mt-2 disabled:opacity-40"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs font-mono text-kob-light/20 mt-6 tracking-widest">
          KOBCRAFT © 2025
        </p>
      </div>
    </div>
  );
}
