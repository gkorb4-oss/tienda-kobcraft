import { getAllProductsAdmin } from '@/lib/db';
import Link from 'next/link';
import DeleteProductButton from './DeleteButton';

export default async function AdminProductosPage() {
  const products = await getAllProductsAdmin().catch(() => []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-1">Gestión</p>
          <h1 className="font-display text-3xl font-black">Productos</h1>
        </div>
        <Link href="/admin/productos/nuevo" className="kob-btn-primary text-sm">
          + Nuevo
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="kob-card p-16 text-center">
          <p className="text-kob-light/40 font-mono text-sm mb-4">No hay productos cargados</p>
          <Link href="/admin/productos/nuevo" className="kob-btn-primary text-sm">
            Crear primer producto
          </Link>
        </div>
      ) : (
        <div className="kob-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kob-border/30">
                {['Nombre', 'Categoría', 'Precio', 'Stock', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono tracking-widest text-kob-light/40 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-kob-border/20">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-kob-purple/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.featured && (
                        <span className="text-kob-purple text-xs">★</span>
                      )}
                      <span className="text-kob-light font-semibold text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-kob-light/50">
                    {p.category_name ?? '—'}
                  </td>
                  <td className="px-4 py-3 font-display text-kob-violet font-bold text-sm">
                    ${Number(p.price).toLocaleString('es-AR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-sm ${
                      p.stock === 0
                        ? 'bg-red-900/30 text-red-400'
                        : p.stock < 5
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-green-900/30 text-green-400'
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-sm ${
                      p.active
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-kob-border/30 text-kob-light/30'
                    }`}>
                      {p.active ? 'Activo' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/productos/${p.id}`}
                        className="text-xs font-mono text-kob-purple hover:text-kob-glow transition-colors"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/producto/${p.slug}`}
                        target="_blank"
                        className="text-xs font-mono text-kob-light/30 hover:text-kob-light/60 transition-colors"
                      >
                        Ver
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
