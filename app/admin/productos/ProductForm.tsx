'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, Category } from '@/lib/db';

type Props = {
  product?: Product;
  categories: Category[];
};

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    stock: product?.stock?.toString() ?? '0',
    category_id: product?.category_id?.toString() ?? '',
    material: product?.material ?? '',
    dimensions: product?.dimensions ?? '',
    print_time: product?.print_time ?? '',
    images: product?.images?.join('\n') ?? '',
    featured: product?.featured ?? false,
    active: product?.active ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const body = {
      name: form.name,
      description: form.description || undefined,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category_id: form.category_id ? parseInt(form.category_id) : undefined,
      material: form.material || undefined,
      dimensions: form.dimensions || undefined,
      print_time: form.print_time || undefined,
      images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
      featured: form.featured,
      active: form.active,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/products/${product.id}` : '/api/products',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Error desconocido');
        return;
      }

      router.push('/admin/productos');
      router.refresh();
    } catch {
      setError('Error de conexión');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-sm px-4 py-3 text-red-400 text-sm font-mono">
          {error}
        </div>
      )}

      {/* Basic info */}
      <div className="kob-card p-6">
        <h2 className="font-display font-bold text-lg mb-5 pb-3 border-b border-kob-border/20">
          Información básica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="kob-label">Nombre *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ej: Figura Dragon Ball - Goku SSJ"
              className="kob-input"
            />
          </div>

          <div>
            <label className="kob-label">Precio (ARS) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              placeholder="3500"
              className="kob-input"
            />
          </div>

          <div>
            <label className="kob-label">Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={e => set('stock', e.target.value)}
              placeholder="10"
              className="kob-input"
            />
          </div>

          <div>
            <label className="kob-label">Categoría</label>
            <select
              value={form.category_id}
              onChange={e => set('category_id', e.target.value)}
              className="kob-input"
            >
              <option value="">Sin categoría</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="kob-label">Descripción</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Descripción del producto..."
              rows={4}
              className="kob-input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="kob-card p-6">
        <h2 className="font-display font-bold text-lg mb-5 pb-3 border-b border-kob-border/20">
          Especificaciones técnicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="kob-label">Material</label>
            <input
              type="text"
              value={form.material}
              onChange={e => set('material', e.target.value)}
              placeholder="PLA+, PETG, Resina..."
              className="kob-input"
            />
          </div>
          <div>
            <label className="kob-label">Dimensiones</label>
            <input
              type="text"
              value={form.dimensions}
              onChange={e => set('dimensions', e.target.value)}
              placeholder="15 x 10 x 8 cm"
              className="kob-input"
            />
          </div>
          <div>
            <label className="kob-label">Tiempo de impresión</label>
            <input
              type="text"
              value={form.print_time}
              onChange={e => set('print_time', e.target.value)}
              placeholder="8 horas"
              className="kob-input"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="kob-card p-6">
        <h2 className="font-display font-bold text-lg mb-5 pb-3 border-b border-kob-border/20">
          Imágenes
        </h2>
        <label className="kob-label">URLs de imágenes (una por línea)</label>
        <textarea
          value={form.images}
          onChange={e => set('images', e.target.value)}
          placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"
          rows={5}
          className="kob-input resize-none font-mono text-xs"
        />
        <p className="text-xs text-kob-light/30 mt-2 font-mono">
          La primera imagen será la principal. Podés usar URLs de Imgur, Cloudinary, etc.
        </p>
      </div>

      {/* Options */}
      <div className="kob-card p-6">
        <h2 className="font-display font-bold text-lg mb-5 pb-3 border-b border-kob-border/20">
          Configuración
        </h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => set('active', !form.active)}
              className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? 'bg-kob-purple' : 'bg-kob-border'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm font-body text-kob-light/70 group-hover:text-kob-light">
              Producto activo (visible en tienda)
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => set('featured', !form.featured)}
              className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? 'bg-kob-violet' : 'bg-kob-border'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm font-body text-kob-light/70 group-hover:text-kob-light">
              Destacado (aparece en el inicio)
            </span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="kob-btn-primary disabled:opacity-40"
        >
          {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="kob-btn-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
