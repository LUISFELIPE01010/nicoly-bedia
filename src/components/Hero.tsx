import { Phone, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import WhatsAppFormModal from './WhatsAppFormModal';

const navLinks = [
{ label: 'Sobre', href: '#about' },
{ label: 'Serviços', href: '#services' },
{ label: 'Resultados', href: '#results' },
{ label: 'Depoimentos', href: '#testimonials' },
{ label: 'Contato', href: '#contact' }];


const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="min-h-screen flex flex-col relative" style={{ backgroundImage: "url('/lovable-uploads/hero-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="w-full py-4 px-4 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-chrome-light/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold text-title-blue flex items-center gap-2">
            <img alt="Logo Elizabeth Gut" className="w-8 h-8 md:w-9 md:h-9 object-contain" src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.png" width={36} height={36} />
            Elizabeth Gut
          </span>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
            <a key={link.href} href={link.href} className="text-sm font-medium text-title-blue/80 hover:text-chrome-gold transition-colors">
                {link.label}
              </a>
            )}
            <button onClick={() => setFormOpen(true)} className="bg-chrome-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all">
              Agendar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-title-blue p-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen &&
        <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-chrome-light/30 pt-4">
            {navLinks.map((link) =>
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-title-blue/80 hover:text-chrome-gold transition-colors px-2 py-1">
                {link.label}
              </a>
          )}
            <button onClick={() => {setFormOpen(true);setMenuOpen(false);}} className="bg-chrome-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all text-center mt-2">
              Agendar avaliação
            </button>
          </nav>
        }
      </header>

      {/* White overlay */}
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-4 py-6 md:py-12 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Image - appears first on mobile */}
          <div className="animate-slide-in-right lg:order-2 order-first">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-chrome-light to-gold-accent rounded-3xl transform rotate-6 opacity-20"></div>
              <img alt="Elizabeth Gut, esteticista profissional em seu consultório" className="relative rounded-3xl shadow-2xl w-full max-w-[220px] md:max-w-md mx-auto object-cover h-[240px] md:h-[500px]" loading="eager" src="/lovable-uploads/elizabeth-gut-2.png" width={448} height={500} fetchPriority="high" decoding="async" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 md:space-y-8 animate-slide-in-left text-center lg:text-left">
            <div className="flex items-center gap-2 text-chrome-gold justify-center lg:justify-start">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide uppercase">Esteticista Elizabeth Gut</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-gradient">Sua beleza,</span>
              <br />
              <span className="text-title-blue">nosso cuidado,</span>
              <br />
              <span className="text-gradient">seu brilho.</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-title-blue/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Tratamentos estéticos personalizados com tecnologia de ponta e o carinho que você merece. Mais de 20 anos de experiência cuidando da sua pele e autoestima.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-2 bg-chrome-gold text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all" aria-label="Agendar avaliação">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                Agendar avaliação
              </button>
              
              <a href="tel:+5513997846585" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-chrome-gold text-chrome-gold px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover-lift hover:bg-chrome-gold hover:text-white transition-all whitespace-nowrap" aria-label="Ligar para Elizabeth Gut">
                <Phone className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="whitespace-nowrap">(13) 99784-6585</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>);

};

export default Hero;