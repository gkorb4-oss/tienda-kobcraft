import { getProductById, getCategories } from '@/lib/db';
import ProductForm from '../ProductForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    getProductById(parseInt(params.id)).catch(() => null),
    getCategories().catch(() => []),
  ]);

  if (!product) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/productos" className="text-xs font-mono text-kob-light/40 hover:text-kob-glow transition-colors mb-3 inline-block">
          ← Volver a productos
        </Link>
        <p className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-1">Editar</p>
        <h1 className="font-display text-3xl font-black">{product.name}</h1>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
