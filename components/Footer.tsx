import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-kob-border/30 bg-kob-dark mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
                <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill="#7c3aed" opacity="0.3"/>
                <circle cx="16" cy="16" r="3" fill="#a78bfa"/>
              </svg>
              <span className="font-display font-bold tracking-[0.15em]">
                KOB<span className="text-kob-purple">CRAFT</span>
              </span>
            </div>
            <p className="text-kob-light/50 text-sm leading-relaxed font-body">
              Impresión 3D artesanal de alta calidad.<br/>
              Cada pieza, diseñada y fabricada con precisión.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-kob-light/60">
              {['Todos los productos', 'Figuras', 'Decoración', 'Funcional', 'Gaming'].map(l => (
                <li key={l}>
                  <Link href="/tienda" className="hover:text-kob-glow transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-kob-purple uppercase mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-kob-light/60">
              <li className="flex items-center gap-2">
                <span className="text-kob-purple">✦</span>
                <span>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kob-purple">✦</span>
                <a href="mailto:hola@kobcraft.com" className="hover:text-kob-glow transition-colors">
                  hola@kobcraft.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-kob-purple">✦</span>
                <a href="https://instagram.com/kobcraft" className="hover:text-kob-glow transition-colors">
                  @kobcraft
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-kob-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-kob-light/30 tracking-widest">
            © 2025 KOBCRAFT — TODOS LOS DERECHOS RESERVADOS
          </p>
          <p className="text-xs font-mono text-kob-purple/50 tracking-widest">
            IMPRESIÓN 3D · ARGENTINA
          </p>
        </div>
      </div>
    </footer>
  );
}
