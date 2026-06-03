'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-xs font-mono tracking-widest text-kob-light/40 hover:text-red-400 transition-colors text-left py-1"
    >
      CERRAR SESIÓN
    </button>
  );
}
