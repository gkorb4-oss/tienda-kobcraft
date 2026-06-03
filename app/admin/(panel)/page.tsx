import { getAllProductsAdmin, getCategories } from '@/lib/db';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([
    getAllProductsAdmin().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const active = products.filter(p => p.active).length;
  const featured = products.filter(p => p.featured).length;
  const noStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-1">Panel</p>
        <h1 className="font-display text-3xl font-black">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total productos', value: products.length, color: 'text-kob-violet' },
          { label: 'Activos', value: active, color: 'text-green-400' },
          { label: 'Destacados', value: featured, color: 'text-kob-cyan' },
          { label: 'Sin stock', value: noStock, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="kob-card p-5">
            <div className={`font-display text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs font-mono text-kob-light/40 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="kob-card p-6">
          <h2 className="font-display font-bold text-lg mb-4">Acciones rápidas</h2>
          <div className="space-y-3">
            <Link href="/admin/productos/nuevo" className="kob-btn-primary w-full justify-center text-sm">
              + Nuevo Producto
            </Link>
            <Link href="/admin/productos" className="kob-btn-outline w-full justify-center text-sm">
              Ver todos los productos
            </Link>
            <Link href="/" target="_blank" className="kob-btn-outline w-full justify-center text-sm">
              Ver tienda ↗
            </Link>
          </div>
        </div>

        {/* Recent products */}
        <div className="kob-card p-6">
          <h2 className="font-display font-bold text-lg mb-4">Últimos productos</h2>
          {products.length === 0 ? (
            <p className="text-kob-light/40 text-sm font-mono">No hay productos aún</p>
          ) : (
            <ul className="space-y-3">
              {products.slice(0, 5).map(p => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${p.active ? 'bg-green-400' : 'bg-kob-light/20'}`} />
                    <span className="text-kob-light/80 truncate max-w-[200px]">{p.name}</span>
                  </div>
                  <Link href={`/admin/productos/${p.id}`} className="text-kob-purple hover:text-kob-glow font-mono text-xs">
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
