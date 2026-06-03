import { sql } from '@vercel/postgres';

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category_id: number | null;
  category_name?: string;
  images: string[];
  featured: boolean;
  active: boolean;
  material: string | null;
  dimensions: string | null;
  print_time: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export async function getProducts(opts?: {
  featured?: boolean;
  category?: string;
  active?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const active = opts?.active ?? true;

  if (opts?.featured) {
    const { rows } = await sql<Product>`
      SELECT p.*, c.name as category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.active = ${active} AND p.featured = true
      ORDER BY p.created_at DESC LIMIT ${opts.limit ?? 8}
    `;
    return rows;
  }

  if (opts?.category) {
    const { rows } = await sql<Product>`
      SELECT p.*, c.name as category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.active = ${active} AND c.slug = ${opts.category}
      ORDER BY p.created_at DESC
    `;
    return rows;
  }

  const { rows } = await sql<Product>`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.active = ${active}
    ORDER BY p.created_at DESC
    LIMIT ${opts?.limit ?? 100}
  `;
  return rows;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { rows } = await sql<Product>`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug} AND p.active = true
  `;
  return rows[0] ?? null;
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  const { rows } = await sql<Product>`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `;
  return rows;
}

export async function getProductById(id: number): Promise<Product | null> {
  const { rows } = await sql<Product>`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}
  `;
  return rows[0] ?? null;
}

export async function createProduct(data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number;
  images?: string[];
  featured?: boolean;
  active?: boolean;
  material?: string;
  dimensions?: string;
  print_time?: string;
}): Promise<Product> {
  const { rows } = await sql<Product>`
    INSERT INTO products (name, slug, description, price, stock, category_id, images, featured, active, material, dimensions, print_time)
    VALUES (
      ${data.name}, ${data.slug}, ${data.description ?? null},
      ${data.price}, ${data.stock}, ${data.category_id ?? null},
      ${JSON.stringify(data.images ?? [])}, ${data.featured ?? false},
      ${data.active ?? true}, ${data.material ?? null},
      ${data.dimensions ?? null}, ${data.print_time ?? null}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateProduct(id: number, data: Partial<{
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  images: string[];
  featured: boolean;
  active: boolean;
  material: string;
  dimensions: string;
  print_time: string;
}>): Promise<Product> {
  const { rows } = await sql<Product>`
    UPDATE products SET
      name        = COALESCE(${data.name ?? null}, name),
      slug        = COALESCE(${data.slug ?? null}, slug),
      description = COALESCE(${data.description ?? null}, description),
      price       = COALESCE(${data.price ?? null}, price),
      stock       = COALESCE(${data.stock ?? null}, stock),
      category_id = COALESCE(${data.category_id ?? null}, category_id),
      images      = COALESCE(${data.images ? JSON.stringify(data.images) : null}::text[], images),
      featured    = COALESCE(${data.featured ?? null}, featured),
      active      = COALESCE(${data.active ?? null}, active),
      material    = COALESCE(${data.material ?? null}, material),
      dimensions  = COALESCE(${data.dimensions ?? null}, dimensions),
      print_time  = COALESCE(${data.print_time ?? null}, print_time),
      updated_at  = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteProduct(id: number): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
}

export async function getCategories(): Promise<Category[]> {
  const { rows } = await sql<Category>`SELECT * FROM categories ORDER BY name`;
  return rows;
}

export async function getAdminByEmail(email: string) {
  const { rows } = await sql`SELECT * FROM admins WHERE email = ${email}`;
  return rows[0] ?? null;
}
