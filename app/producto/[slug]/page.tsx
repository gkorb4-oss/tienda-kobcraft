import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export default async function ProductoPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug).catch(() => null);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-kob-light/40 mb-8">
            <Link href="/" className="hover:text-kob-glow transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/tienda" className="hover:text-kob-glow transition-colors">Tienda</Link>
            <span>/</span>
            <span className="text-kob-purple">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-kob-deep rounded-sm overflow-hidden border border-kob-border">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center hex-pattern">
                    <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 opacity-20">
                      <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                      <circle cx="50" cy="50" r="15" fill="#7c3aed" opacity="0.4"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail row */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-sm overflow-hidden border border-kob-border">
                      <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover"/>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.category_name && (
                <p className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-3">
                  {product.category_name}
                </p>
              )}

              <h1 className="font-display text-4xl font-black mb-2">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-3xl font-bold text-kob-violet">
                  ${Number(product.price).toLocaleString('es-AR')}
                </span>
                <span className={`font-mono text-xs tracking-widest px-3 py-1 rounded-sm ${
                  product.stock > 0
                    ? 'bg-green-900/30 text-green-400 border border-green-800'
                    : 'bg-red-900/30 text-red-400 border border-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                </span>
              </div>

              {product.description && (
                <p className="text-kob-light/70 leading-relaxed mb-8 text-base">
                  {product.description}
                </p>
              )}

              {/* Specs */}
              {(product.material || product.dimensions || product.print_time) && (
                <div className="border border-kob-border rounded-sm p-5 mb-8 space-y-3">
                  <h3 className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-4">Especificaciones</h3>
                  {product.material && (
                    <div className="flex justify-between text-sm">
                      <span className="text-kob-light/50 font-mono">Material</span>
                      <span className="text-kob-light font-semibold">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between text-sm">
                      <span className="text-kob-light/50 font-mono">Dimensiones</span>
                      <span className="text-kob-light font-semibold">{product.dimensions}</span>
                    </div>
                  )}
                  {product.print_time && (
                    <div className="flex justify-between text-sm">
                      <span className="text-kob-light/50 font-mono">Tiempo de impresión</span>
                      <span className="text-kob-light font-semibold">{product.print_time}</span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/?text=Hola! Me interesa el producto: ${product.name} ($${Number(product.price).toLocaleString('es-AR')})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`kob-btn-primary flex-1 justify-center ${product.stock === 0 ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
                <Link href="/contacto" className="kob-btn-outline flex-1 justify-center">
                  Más info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
