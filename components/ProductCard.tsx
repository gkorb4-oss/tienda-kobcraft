import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/db';

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0];

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="kob-card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-kob-deep overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center hex-pattern">
              <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 opacity-20">
                <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                <circle cx="40" cy="40" r="12" fill="#7c3aed" opacity="0.4"/>
              </svg>
            </div>
          )}

          {product.featured && (
            <div className="absolute top-3 left-3 bg-kob-purple/90 text-white text-xs font-mono tracking-widest px-2 py-1">
              DESTACADO
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-kob-void/70 flex items-center justify-center">
              <span className="text-kob-light/50 font-mono text-sm tracking-widest">SIN STOCK</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-kob-purple/0 group-hover:bg-kob-purple/10 transition-all duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          {product.category_name && (
            <p className="text-xs font-mono tracking-widest text-kob-purple/70 uppercase mb-1">
              {product.category_name}
            </p>
          )}
          <h3 className="font-display text-base font-bold text-kob-light group-hover:text-kob-glow transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-kob-light/50 line-clamp-2 mb-3 font-body leading-relaxed">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-kob-violet">
              ${Number(product.price).toLocaleString('es-AR')}
            </span>
            <span className="text-xs font-mono text-kob-light/30">
              {product.stock > 0 ? `${product.stock} disp.` : '—'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
