import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppFormModal from './WhatsAppFormModal';

const navLinks = [
  { label: 'Tratamentos', href: '#services' },
  { label: 'Catálogo', href: '/catalogo', route: true },
  { label: 'Sobre', href: '#about' },
  { label: 'Resultados', href: '#results' },
  { label: 'Contato', href: '#contact' },
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="top" className="relative flex min-h-screen flex-col bg-background">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img alt="Logo Elizabeth Gut" className="h-10 w-10 object-contain" src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.png" width={40} height={40} />
            <span className="leading-tight">
              <span className="block font-display text-lg text-ink md:text-xl">Elizabeth Gut</span>
              <span className="block text-[11px] tracking-wide text-gold-dark">Esteticista</span>
            </span>
          </a>

          {/* Menu desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.route ? (
                <Link key={link.href} to={link.href} className="text-sm text-ink/80 decoration-brand underline-offset-4 transition-colors hover:text-gold-dark hover:underline">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="text-sm text-ink/80 decoration-brand underline-offset-4 transition-colors hover:text-gold-dark hover:underline">
                  {link.label}
                </a>
              )
            )}
            <button onClick={() => setFormOpen(true)} className="rounded-full bg-ink px-5 py-2.5 text-sm text-ivory transition-colors hover:bg-gold-dark">
              Agendar avaliação
            </button>
          </nav>

          {/* Botão do menu mobile */}
          <button onClick={() => setMenuOpen(true)} className="p-2 text-ink lg:hidden" aria-label="Abrir menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-ink">Elizabeth Gut</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-ink" aria-label="Fechar menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-7">
            {navLinks.map((link) =>
              link.route ? (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-ink">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-ink">
                  {link.label}
                </a>
              )
            )}
            <button onClick={() => { setFormOpen(true); setMenuOpen(false); }} className="mt-4 rounded-full bg-ink px-8 py-3.5 text-base text-ivory transition-colors hover:bg-gold-dark">
              Agendar avaliação
            </button>
          </nav>
        </div>
      )}

      {/* Foto no mobile (primeiro) */}
      <div className="lg:hidden">
        <img
          src="/lovable-uploads/beth-gut-800.webp"
          alt="Elizabeth Gut, esteticista, em seu consultório"
          className="h-[60vh] w-full object-cover object-[92%_18%]"
          loading="eager"
          decoding="async"
          width={800}
          height={450}
        />
      </div>

      {/* Conteúdo do hero */}
      <div className="relative flex-1">
        {/* Foto no desktop (lateral direita, canto reto) */}
        <div className="absolute inset-y-0 right-0 hidden min-h-[560px] w-[54%] lg:block" aria-hidden="true">
          <img
            src="/lovable-uploads/beth-gut.webp"
            alt=""
            className="hero-fade h-full w-full object-cover object-[90%_22%]"
            loading="eager"
            decoding="async"
            width={1600}
            height={900}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-8 lg:py-24">
          <div className="hero-enter max-w-xl space-y-6 text-center lg:text-left">
            <h1 className="h-display h1-display text-ink">
              Rejuvenescer sem
              <br />
              perder a sua expressão.
            </h1>
            <p className="mx-auto max-w-[36rem] text-lg leading-relaxed text-ink/70 lg:mx-0">
              Avaliação individual e tecnologia como Ultraformer MPT e Laser Lavieen, com mais de 20 anos de experiência em Santos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
              <button onClick={() => setFormOpen(true)} className="rounded-full bg-ink px-7 py-3.5 text-base text-ivory transition-colors hover:bg-gold-dark">
                Agendar avaliação
              </button>
              <a href="tel:+5513997846585" className="whitespace-nowrap text-base font-medium text-ink decoration-brand underline-offset-4 transition-colors hover:text-gold-dark hover:underline" aria-label="Ligar para Elizabeth Gut">
                (13) 99784-6585
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa de fatos */}
      <div className="relative z-10 border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-2 px-6 py-5 text-sm text-ink/70 md:px-8">
          <span>Técnica em Estética desde 2003</span>
          <span>Pós-graduada em Procedimentos Injetáveis</span>
          <span>Gonzaga, Santos/SP</span>
        </div>
      </div>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default Hero;
