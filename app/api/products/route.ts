import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { createProduct, getProducts } from '@/lib/db';
import { slugify } from '@/lib/auth';

export async function GET() {
  try {
    const products = await getProducts({ active: true });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, description, price, stock, category_id, images, featured, active, material, dimensions, print_time } = body;

    if (!name || price == null) {
      return NextResponse.json({ error: 'Nombre y precio son requeridos' }, { status: 400 });
    }

    const slug = slugify(name) + '-' + Date.now().toString(36);
    const product = await createProduct({
      name, slug, description, price: parseFloat(price),
      stock: parseInt(stock ?? 0), category_id, images, featured, active,
      material, dimensions, print_time,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error('Create product error:', err);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
