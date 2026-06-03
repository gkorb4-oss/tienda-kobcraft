import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/db';
import Link from 'next/link';

export const revalidate = 60;

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts({ active: true, category: searchParams.categoria }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        {/* Header */}
        <div className="border-b border-kob-border/20 bg-kob-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <p className="font-mono text-xs tracking-[0.4em] text-kob-purple uppercase mb-2">KobCraft</p>
            <h1 className="font-display text-4xl font-black">Tienda</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/tienda"
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm border transition-all ${
                !searchParams.categoria
                  ? 'border-kob-purple bg-kob-purple/20 text-kob-glow'
                  : 'border-kob-border text-kob-light/50 hover:border-kob-purple/50'
              }`}
            >
              Todos
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/tienda?categoria=${cat.slug}`}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm border transition-all ${
                  searchParams.categoria === cat.slug
                    ? 'border-kob-purple bg-kob-purple/20 text-kob-glow'
                    : 'border-kob-border text-kob-light/50 hover:border-kob-purple/50'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Product count */}
          <p className="text-xs font-mono text-kob-light/30 tracking-widest mb-6">
            {products.length} PRODUCTO{products.length !== 1 ? 'S' : ''}
          </p>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 mx-auto mb-6 opacity-20">
                <svg viewBox="0 0 64 64" fill="none">
                  <polygon points="32,4 60,20 60,44 32,60 4,44 4,20" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                  <circle cx="32" cy="32" r="10" fill="#7c3aed" opacity="0.3"/>
                </svg>
              </div>
              <p className="font-display text-xl text-kob-light/40">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
