import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateProduct, deleteProduct, getProductById } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(parseInt(params.id));
    if (!product) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await req.json();
    const product = await updateProduct(parseInt(params.id), {
      name: body.name,
      description: body.description,
      price: body.price != null ? parseFloat(body.price) : undefined,
      stock: body.stock != null ? parseInt(body.stock) : undefined,
      category_id: body.category_id,
      images: body.images,
      featured: body.featured,
      active: body.active,
      material: body.material,
      dimensions: body.dimensions,
      print_time: body.print_time,
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error('Update product error:', err);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    await deleteProduct(parseInt(params.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}
