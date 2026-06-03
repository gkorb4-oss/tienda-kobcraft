import type { Metadata } from 'next';
import { Cinzel, Rajdhani, Space_Mono } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'KobCraft — Impresión 3D Artesanal',
  description: 'Figuras, decoración y piezas funcionales impresas en 3D. Diseño propio, calidad premium.',
  openGraph: {
    title: 'KobCraft',
    description: 'Impresión 3D artesanal de alta calidad',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${rajdhani.variable} ${spaceMono.variable}`}>
      <body className="bg-kob-void text-kob-light font-body antialiased">
        {children}
      </body>
    </html>
  );
}
