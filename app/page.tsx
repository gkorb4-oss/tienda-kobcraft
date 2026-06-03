import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true, active: true, limit: 4 }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <div className="scanline" />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
        {/* Background layers */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-kob-purple/5 blur-3xl animate-pulse-slow pointer-events-none" />

        {/* Decorative hex */}
        <div className="absolute right-8 top-24 opacity-10 animate-spin-slow pointer-events-none hidden lg:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-72 h-72">
            <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="#7c3aed" strokeWidth="1"/>
            <polygon points="100,30 170,67 170,133 100,170 30,133 30,67" stroke="#7c3aed" strokeWidth="0.5"/>
            <polygon points="100,50 150,78 150,122 100,150 50,122 50,78" stroke="#a78bfa" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="15" fill="#7c3aed" opacity="0.4"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="h-px w-12 bg-kob-purple" />
              <span className="font-mono text-xs tracking-[0.4em] text-kob-purple uppercase">
                Impresión 3D Artesanal
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl leading-none mb-6 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              DONDE LA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kob-violet to-kob-cyan">
                TECNOLOGÍA
              </span><br />
              SE VUELVE<br />
              ARTE
            </h1>

            <p className="text-kob-light/60 text-lg max-w-xl leading-relaxed mb-10 font-body animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              Piezas únicas diseñadas y fabricadas en impresión 3D.
              Figuras, decoración y objetos funcionales con precisión milimétrica.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <Link href="/tienda" className="kob-btn-primary text-sm">
                <span>Explorar Tienda</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/sobre-nosotros" className="kob-btn-outline text-sm">
                Nuestro Proceso
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-10 animate-slide-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
              {[
                { value: '100%', label: 'Hecho a mano' },
                { value: 'PLA+', label: 'Material premium' },
                { value: '0.1mm', label: 'Precisión' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-kob-violet">{s.value}</div>
                  <div className="text-xs font-mono tracking-widest text-kob-light/40 uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="h-8 w-px bg-gradient-to-b from-kob-purple to-transparent" />
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-kob-border/30" />
            <h2 className="font-display text-sm tracking-[0.3em] text-kob-purple uppercase">Categorías</h2>
            <div className="h-px flex-1 bg-kob-border/30" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/tienda?categoria=${cat.slug}`}
                className="group kob-card p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-sm bg-kob-purple/10 border border-kob-border flex items-center justify-center group-hover:border-kob-purple transition-colors">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-kob-purple">
                    <polygon points="10,2 18,6.5 18,13.5 10,18 2,13.5 2,6.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <span className="font-body font-semibold text-sm text-kob-light/80 group-hover:text-kob-glow transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.4em] text-kob-purple uppercase mb-2">Selección</p>
              <h2 className="font-display text-3xl font-bold">Productos Destacados</h2>
            </div>
            <Link href="/tienda" className="kob-btn-outline text-xs hidden sm:flex">
              Ver Todo →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/tienda" className="kob-btn-outline text-sm">Ver todos los productos →</Link>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section className="border-t border-kob-border/20 bg-kob-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.4em] text-kob-purple uppercase mb-3">Cómo trabajamos</p>
            <h2 className="font-display text-3xl font-bold">Del diseño a tu puerta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Diseño', desc: 'Modelado 3D propio o adaptación de tu idea.' },
              { n: '02', title: 'Slicing', desc: 'Configuración de capas, rellenos y soportes.' },
              { n: '03', title: 'Impresión', desc: 'Impresoras FDM/resina de alta resolución.' },
              { n: '04', title: 'Post-proceso', desc: 'Lijado, pintado y control de calidad.' },
            ].map(step => (
              <div key={step.n} className="kob-card p-6 relative overflow-hidden group">
                <div className="absolute top-3 right-3 font-display text-4xl font-black text-kob-purple/10 group-hover:text-kob-purple/20 transition-colors">
                  {step.n}
                </div>
                <div className="w-8 h-1 bg-kob-purple mb-4" />
                <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-kob-light/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-purple-glow opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-black mb-4">
            ¿Tenés una idea?<br />
            <span className="text-kob-violet">La imprimimos.</span>
          </h2>
          <p className="text-kob-light/50 mb-8 text-lg">
            Pedidos personalizados, prototipos, regalos únicos.
          </p>
          <Link href="/contacto" className="kob-btn-primary">
            Contactar ahora
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
