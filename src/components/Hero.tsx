import { Calendar, MessageCircle, Menu, X, Phone, Instagram, Droplets, Zap, ShieldCheck, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppFormModal from './WhatsAppFormModal';

const navLinks = [
  { label: 'Início', href: '#top' },
  { label: 'Sobre Mim', href: '#about' },
  { label: 'Tratamentos', href: '#services' },
  { label: 'Catálogo', href: '/catalogo', route: true },
  { label: 'Contato', href: '#contact' },
];

const destaques = [
  { icon: Droplets, texto: 'Cuidados personalizados para rosto e corpo' },
  { icon: Zap, texto: 'Tecnologia e cuidado para valorizar sua beleza' },
  { icon: ShieldCheck, texto: 'Mais de 20 anos de experiência em estética' },
  { icon: Heart, texto: 'Sua autoestima em primeiro lugar' },
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="top" className="min-h-screen flex flex-col relative bg-nude-soft">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-4 sticky top-0 z-50 bg-nude-soft/95 backdrop-blur-md border-b border-brand/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <img alt="Logo Elizabeth Gut" className="w-9 h-9 md:w-10 md:h-10 object-contain" src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.webp" width={40} height={40} />
            <span className="leading-tight">
              <span className="block text-base md:text-lg font-bold tracking-wide text-ink">ELIZABETH GUT</span>
              <span className="block text-[10px] md:text-xs tracking-[0.3em] text-brand">ESTETICISTA</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.route ? (
                <Link key={link.href} to={link.href} className="text-sm font-medium text-ink/70 hover:text-brand transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${link.label === 'Início' ? 'text-ink border-b-2 border-brand pb-0.5' : 'text-ink/70 hover:text-brand'}`}>
                  {link.label}
                </a>
              )
            )}
            <button onClick={() => setFormOpen(true)} className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all">
              <MessageCircle className="w-4 h-4" />
              Fale comigo
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-ink p-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-brand/20 pt-4">
            {navLinks.map((link) =>
              link.route ? (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink/70 hover:text-brand transition-colors px-2 py-1">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink/70 hover:text-brand transition-colors px-2 py-1">
                  {link.label}
                </a>
              )
            )}
            <button onClick={() => { setFormOpen(true); setMenuOpen(false); }} className="inline-flex items-center justify-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all mt-2">
              <MessageCircle className="w-4 h-4" />
              Fale comigo
            </button>
          </nav>
        )}
      </header>

      {/* Hero Content */}
      <div className="flex-1 relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-4 py-6 md:py-16 lg:py-24">
          <div className="max-w-xl space-y-4 md:space-y-7 animate-slide-in-left text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-10 h-px bg-brand"></span>
              <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-title-blue/70">Esteticista Elizabeth Gut</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-ink">
              Sua beleza,
              <br />
              nosso cuidado,
              <br />
              <span className="italic text-brand">seu brilho.</span>
            </h1>

            <p className="text-base md:text-lg text-title-blue/80 leading-relaxed">
              Tratamentos estéticos personalizados com tecnologia de ponta e o carinho que você merece.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-1">
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 md:px-7 md:py-3.5 rounded-full font-semibold text-base hover-lift shadow-lg hover:bg-chrome-dark transition-all" aria-label="Agendar avaliação">
                <Calendar className="w-5 h-5" />
                Agendar avaliação
              </button>

              <div className="flex items-stretch gap-3.5">
                <span className="w-px bg-ink/15" aria-hidden="true"></span>
                <div className="flex flex-col justify-center gap-1.5">
                  <a href="tel:+5513997846585" className="inline-flex items-center gap-2.5 text-sm md:text-base font-medium text-ink hover:text-brand transition-colors whitespace-nowrap" aria-label="Ligar para Elizabeth Gut">
                    <Phone className="w-4 h-4 text-brand flex-shrink-0" />
                    (13) 99784-6585
                  </a>
                  <a href="https://www.instagram.com/elizabethgutesteticista/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm md:text-base font-medium text-ink hover:text-brand transition-colors whitespace-nowrap" aria-label="Instagram de Elizabeth Gut">
                    <Instagram className="w-4 h-4 text-brand flex-shrink-0" />
                    @elizabethgutesteticista
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 px-6 pb-6 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[54%] lg:p-0">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/lovable-uploads/beth-gut.webp" />
            <img src="/lovable-uploads/beth-gut-800.webp" alt="Elizabeth Gut, esteticista, em seu consultório" className="w-full max-w-sm mx-auto rounded-lg object-cover aspect-[4/3] object-[92%_18%] lg:max-w-none lg:h-full lg:rounded-none lg:aspect-auto lg:object-[90%_22%] lg:hero-portrait-mask" loading="eager" decoding="async" width={800} height={450} />
          </picture>
        </div>

      </div>

      {/* Faixa de destaques */}
      <div className="relative z-10 border-t border-brand/30 bg-nude-soft/80">
          <div className="max-w-6xl mx-auto px-6 md:px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {destaques.map(({ icon: Icon, texto }) => (
              <div key={texto} className="flex items-center gap-3">
                <Icon className="w-7 h-7 text-brand flex-shrink-0" strokeWidth={1.5} />
                <span className="text-xs md:text-sm font-medium text-ink/80 leading-snug">{texto}</span>
              </div>
            ))}
          </div>
        </div>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

    </section>
  );
};

export default Hero;
