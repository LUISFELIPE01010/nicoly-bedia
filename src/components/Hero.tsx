import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import WhatsAppFormModal from './WhatsAppFormModal';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Resultados', href: '#results' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Contato', href: '#contact' }
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-white to-nude-soft">
      {/* Header */}
      <header className="w-full py-4 px-4 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-chrome-light/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img alt="Lethícia Nunes Nutricionista" className="h-16 md:h-20 object-contain" src="/lovable-uploads/ff2c0f19-5964-48d0-9b6b-09dcd048a74c.png" />
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              <a key={link.href} href={link.href} className="text-sm font-medium text-gray-rose hover:text-chrome-gold transition-colors">
                {link.label}
              </a>
            )}
            <button onClick={() => setFormOpen(true)} className="bg-chrome-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all">
              Agendar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-rose p-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen &&
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-chrome-light/30 pt-4">
            {navLinks.map((link) =>
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-rose hover:text-chrome-gold transition-colors px-2 py-1">
                {link.label}
              </a>
            )}
            <button onClick={() => { setFormOpen(true); setMenuOpen(false); }} className="bg-chrome-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all text-center mt-2">
              Agendar consulta
            </button>
          </nav>
        }
      </header>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image - appears first on mobile */}
          <div className="animate-slide-in-right lg:order-2 order-first">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-chrome-light to-gold-accent rounded-3xl transform rotate-6 opacity-20"></div>
              <img alt="Lethícia Nunes, nutricionista sorrindo em ambiente profissional" className="relative rounded-3xl shadow-2xl w-full max-w-xs md:max-w-md mx-auto object-cover h-[320px] md:h-[500px]" loading="eager" src="/lovable-uploads/6a4e2531-0216-4050-9fd9-76fdbfa72be5.jpg" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 animate-slide-in-left">
            <div className="flex items-center gap-2 text-chrome-gold">
              <span className="text-sm font-medium tracking-wide uppercase">Nutricionista Lethícia Nunes</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-gradient">Saúde</span>
              <br />
              <span className="text-gray-rose">começa pelo</span>
              <br />
              <span className="text-gradient">intestino.</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-rose leading-relaxed max-w-2xl">
              Nutricionista clínica especializada em saúde gastrointestinal e nutrição comportamental. Ajudo você a desenvolver uma relação equilibrada e consciente com a alimentação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-3 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all" aria-label="Agendar consulta">
                <MessageCircle className="w-6 h-6" />
                Agendar consulta
              </button>
              
              <a href="tel:+5513981214037" className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-chrome-gold text-chrome-gold px-8 py-4 rounded-full font-semibold text-lg hover-lift hover:bg-chrome-gold hover:text-white transition-all whitespace-nowrap" aria-label="Ligar para Lethícia Nunes">
                <Phone className="w-6 h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">(13) 98121-4037</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default Hero;
