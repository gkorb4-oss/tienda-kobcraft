# KobCraft — Tienda Virtual 3D

Tienda online para productos impresos en 3D. Construida con **Next.js 14**, **TypeScript** y **Vercel Postgres**.

## Stack

- **Frontend/Backend**: Next.js 14 (App Router) + TypeScript
- **Base de datos**: Vercel Postgres (PostgreSQL)
- **Auth**: JWT con `jose` + cookies HTTP-only
- **Estilos**: Tailwind CSS con tema KobCraft (violeta/azul oscuro)
- **Deploy**: Vercel

---

## 🚀 Setup en Vercel (paso a paso)

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "init kobcraft"
git remote add origin https://github.com/TU_USER/kobcraft.git
git push -u origin main
```

### 2. Crear proyecto en Vercel

1. Ir a [vercel.com](https://vercel.com) → New Project → importar tu repo
2. En **Settings → Storage**, agregar **Vercel Postgres** (plan Hobby es gratis)
3. Las variables `POSTGRES_*` se configuran automáticamente

### 3. Configurar variables de entorno en Vercel

En **Settings → Environment Variables** agregar:

| Variable | Valor |
|---|---|
| `JWT_SECRET` | genera con `openssl rand -base64 32` |
| `ADMIN_EMAIL` | tu email de admin |
| `ADMIN_PASSWORD` | tu contraseña |
| `SETUP_SECRET` | cualquier string secreto |

### 4. Correr migraciones

Después del primer deploy, correr las migraciones de la DB. Desde tu máquina con las env vars de Vercel:

```bash
npx vercel env pull .env.local
node scripts/migrate.js
```

O usando Vercel CLI directamente:
```bash
vercel env pull
node scripts/migrate.js
```

### 5. Crear el usuario administrador

Hacer un POST al endpoint de setup:

```bash
curl -X POST https://TU-DOMINIO.vercel.app/api/auth/setup \
  -H "x-setup-secret: TU_SETUP_SECRET"
```

¡Listo! Ya podés ingresar en `/admin/login`.

---

## 🏃 Desarrollo local

```bash
# 1. Copiar env
cp .env.example .env.local
# Completar las variables (podés usar Vercel Postgres o una DB local)

# 2. Instalar dependencias
npm install

# 3. Correr migraciones
node scripts/migrate.js

# 4. Crear admin (solo la primera vez)
# Agregar SETUP_SECRET al .env.local, luego:
curl -X POST http://localhost:3000/api/auth/setup \
  -H "x-setup-secret: TU_SECRET"

# 5. Iniciar
npm run dev
```

---

## 📁 Estructura

```
kobcraft/
├── app/
│   ├── page.tsx              # Homepage
│   ├── tienda/               # Listado de productos
│   ├── producto/[slug]/      # Detalle de producto
│   ├── admin/                # Panel de administración
│   │   ├── login/            # Login admin
│   │   ├── productos/        # CRUD productos
│   │   └── layout.tsx        # Sidebar admin
│   └── api/
│       ├── auth/             # Login, logout, setup
│       └── products/         # REST API productos
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── db.ts                 # Queries a Vercel Postgres
│   └── auth.ts               # JWT + helpers
└── scripts/
    └── migrate.js            # Migraciones SQL
```

---

## 🎨 Imágenes de productos

En la versión actual, las imágenes se cargan por URL. Opciones recomendadas:

- **Cloudinary** (gratis hasta 25GB): ideal para producción
- **Imgur**: rápido para pruebas
- **Vercel Blob**: integración nativa con Vercel (agregar fácilmente)

Para agregar Vercel Blob Storage, ir a Settings → Storage → Add Blob.

---

## 🛒 Personalización

- **Colores**: `tailwind.config.js` → `colors.kob`
- **Tipografías**: `app/layout.tsx` → cambiar imports de Google Fonts
- **Categorías**: editar directamente en la DB o agregar un CRUD en el admin
- **WhatsApp**: en `/producto/[slug]/page.tsx` cambiar el número en el link
