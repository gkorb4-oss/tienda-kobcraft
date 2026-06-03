import { getCategories } from '@/lib/db';
import ProductForm from '../ProductForm';
import Link from 'next/link';

export default async function NuevoProductoPage() {
  const categories = await getCategories().catch(() => []);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/productos" className="text-xs font-mono text-kob-light/40 hover:text-kob-glow transition-colors mb-3 inline-block">
          ← Volver
        </Link>
        <p className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-1">Nuevo</p>
        <h1 className="font-display text-3xl font-black">Crear Producto</h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
