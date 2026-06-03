'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Error al eliminar el producto');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs font-mono text-red-500/50 hover:text-red-400 transition-colors disabled:opacity-30"
    >
      {loading ? '...' : 'Borrar'}
    </button>
  );
}
