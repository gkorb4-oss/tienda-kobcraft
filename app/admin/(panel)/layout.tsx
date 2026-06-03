import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-kob-void flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-kob-border/30 bg-kob-dark flex flex-col">
        <div className="p-6 border-b border-kob-border/20">
          <Link href="/admin" className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
              <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill="#7c3aed" opacity="0.3"/>
              <circle cx="16" cy="16" r="3" fill="#a78bfa"/>
            </svg>
            <div>
              <div className="font-display font-bold text-sm tracking-widest">KOB<span className="text-kob-purple">CRAFT</span></div>
              <div className="font-mono text-xs text-kob-light/30 tracking-widest">ADMIN</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { href: '/admin/productos', label: 'Productos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/admin/productos/nuevo', label: 'Nuevo Producto', icon: 'M12 4v16m8-8H4' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-body font-semibold text-kob-light/60 hover:text-kob-glow hover:bg-kob-purple/10 transition-all group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 group-hover:stroke-kob-purple transition-colors">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-kob-border/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-sm bg-kob-purple/20 border border-kob-border flex items-center justify-center">
              <span className="text-kob-purple text-xs font-bold">{session.email[0].toUpperCase()}</span>
            </div>
            <div className="text-xs">
              <div className="text-kob-light/70 font-mono truncate max-w-[140px]">{session.email}</div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
