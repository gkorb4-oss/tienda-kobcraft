// scripts/migrate.js
// Run with: node scripts/migrate.js
const { sql } = require('@vercel/postgres');

async function migrate() {
  console.log('Running migrations...');

  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id        SERIAL PRIMARY KEY,
      email     TEXT UNIQUE NOT NULL,
      password  TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      slug       TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id            SERIAL PRIMARY KEY,
      name          TEXT NOT NULL,
      slug          TEXT UNIQUE NOT NULL,
      description   TEXT,
      price         NUMERIC(10,2) NOT NULL,
      stock         INTEGER DEFAULT 0,
      category_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      images        TEXT[] DEFAULT '{}',
      featured      BOOLEAN DEFAULT FALSE,
      active        BOOLEAN DEFAULT TRUE,
      material      TEXT,
      dimensions    TEXT,
      print_time    TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // Seed default categories
  await sql`
    INSERT INTO categories (name, slug) VALUES
      ('Figuras', 'figuras'),
      ('Decoración', 'decoracion'),
      ('Funcional', 'funcional'),
      ('Gaming', 'gaming'),
      ('Personalizado', 'personalizado')
    ON CONFLICT (slug) DO NOTHING;
  `;

  console.log('✅ Migrations complete');
  process.exit(0);
}

migrate().catch(console.error);
