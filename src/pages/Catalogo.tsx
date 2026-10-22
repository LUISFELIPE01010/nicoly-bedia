import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, X, MessageCircle, Instagram, Printer } from 'lucide-react';
import Footer from '../components/Footer';
import { procedimentos, whatsappCatalogo, type Categoria } from '@/data/catalogo';

const filtros: Array<'Todos' | Categoria> = ['Todos', 'Facial', 'Corporal', 'Bem-estar'];

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Sobre Mim', href: '/#about' },
  { label: 'Tratamentos', href: '/#services' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Depoimentos', href: '/#testimonials' },
  { label: 'Contato', href: '/#contact' },
];

const passos = [
  { numero: '1', texto: 'Avaliação da pele e conversa sobre os seus objetivos.' },
  { numero: '2', texto: 'Plano personalizado com os procedimentos indicados para você.' },
  { numero: '3', texto: 'Sessões com acompanhamento e orientações para manter o resultado.' },
];

const Catalogo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState<'Todos' | Categoria>('Todos');
  const [searchParams] = useSearchParams();
  const exportMode = searchParams.get('export') === '1';

  useEffect(() => {
    document.title = 'Catálogo de Procedimentos | Elizabeth Gut Esteticista em Santos/SP';
    const setMeta = (selector: string, attr: string, value: string, content: string) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', 'name', 'description', 'Conheça os tratamentos faciais, corporais e de bem-estar da esteticista Elizabeth Gut em Santos/SP, com avaliação personalizada.');
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://elizabethgut.com.br/catalogo';
  }, []);

  // Ao imprimir, mostra todas as categorias independentemente do filtro
  useEffect(() => {
    const mostrarTudo = () => setFiltro('Todos');
    window.addEventListener('beforeprint', mostrarTudo);
    return () => window.removeEventListener('beforeprint', mostrarTudo);
  }, []);

  // Animações suaves de entrada ao rolar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [filtro]);

  const visiveis = procedimentos.filter(
    (p) => p.visivel && (filtro === 'Todos' || p.categorias.includes(filtro))
  );

  return (
    <div className="min-h-screen bg-nude-soft flex flex-col">
      {/* Capa (somente impressão) */}
      <div className="hidden print:flex print:order-1 print-sheet flex-col items-center justify-center text-center gap-6 bg-nude-soft">
        <img src="/lovable-uploads/logo-elizabeth-gut.png" alt="Logo Elizabeth Gut" className="w-24 h-24 object-contain" />
        <p className="text-sm tracking-[0.3em] uppercase text-brand">Elizabeth Gut | Esteticista</p>
        <h1 className="text-5xl font-serif text-ink">Catálogo de procedimentos</h1>
        <p className="text-title-blue/80">@elizabethgutesteticista</p>
        <p className="text-title-blue/80">elizabethgut.com.br</p>
      </div>

      {/* Header */}
      <header className="w-full py-4 px-6 md:px-4 sticky top-0 z-50 bg-nude-soft/95 backdrop-blur-md border-b border-brand/20 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img alt="Logo Elizabeth Gut" className="w-9 h-9 md:w-10 md:h-10 object-contain" src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.png" width={40} height={40} />
            <span className="leading-tight">
              <span className="block text-base md:text-lg font-bold tracking-wide text-ink">ELIZABETH GUT</span>
              <span className="block text-[10px] md:text-xs tracking-[0.3em] text-brand">ESTETICISTA</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href === '/catalogo' ? (
                <span key={link.href} className="text-sm font-medium text-ink border-b-2 border-brand pb-0.5" aria-current="page">
                  {link.label}
                </span>
              ) : (
                <a key={link.href} href={link.href} className="text-sm font-medium text-ink/70 hover:text-brand transition-colors">
                  {link.label}
                </a>
              )
            )}
            <a href={whatsappCatalogo('uma avaliação')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all">
              <MessageCircle className="w-4 h-4" />
              Fale comigo
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-ink p-2" aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-brand/20 pt-4">
            {navLinks.map((link) =>
              link.href === '/catalogo' ? (
                <span key={link.href} className="text-sm font-medium text-ink px-2 py-1 border-l-2 border-brand" aria-current="page">
                  {link.label}
                </span>
              ) : (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink/70 hover:text-brand transition-colors px-2 py-1">
                  {link.label}
                </a>
              )
            )}
            <a href={whatsappCatalogo('uma avaliação')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-chrome-dark transition-all mt-2">
              <MessageCircle className="w-4 h-4" />
              Fale comigo
            </a>
          </nav>
        )}
      </header>

      {/* Hero da página */}
      <section className="max-w-6xl mx-auto px-6 md:px-4 pt-12 md:pt-20 pb-10 text-center print:hidden">
        <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-brand mb-4">Elizabeth Gut | Esteticista</p>
        <h1 className="text-3xl md:text-5xl font-serif text-ink mb-5">Catálogo de procedimentos</h1>
        <p className="text-base md:text-lg text-title-blue/80 leading-relaxed max-w-2xl mx-auto">
          Conheça os cuidados que a Elizabeth oferece em Santos/SP, com avaliação personalizada para cada pele e cada objetivo.
        </p>
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border border-brand/30 rounded-full px-6 py-3 bg-white/60">
          <span className="text-sm font-medium text-ink">Mais de 20 anos de experiência</span>
          <span className="hidden sm:inline w-px h-4 bg-brand/40"></span>
          <a href="https://www.instagram.com/elizabethgutesteticista/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-chrome-dark transition-colors">
            <Instagram className="w-4 h-4" />
            @elizabethgutesteticista
          </a>
        </div>
      </section>

      {/* Filtro por categoria */}
      <div className="sticky top-[68px] md:top-[72px] z-40 bg-nude-soft/95 backdrop-blur-md border-y border-brand/20 py-3 print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-4 flex flex-wrap justify-center gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`min-h-[44px] px-5 rounded-full text-sm font-medium transition-all ${filtro === f ? 'bg-brand text-white shadow-md' : 'bg-white/70 text-ink/70 hover:text-brand border border-brand/20'}`}
              aria-pressed={filtro === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de procedimentos */}
      <section className="max-w-6xl mx-auto px-6 md:px-4 pb-16 space-y-14 md:space-y-20 print:order-3 print:p-0 print:m-0 print:max-w-none print:space-y-0">
        {visiveis.map((p, i) => (
          <article key={p.slug} className="animate-on-scroll grid md:grid-cols-2 print:grid-cols-2 gap-6 md:gap-12 print:gap-10 items-center print-sheet">
            <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-brand/10" aria-hidden="true"></div>
                <img
                  src={p.imagem}
                  alt={p.imagemAlt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-lg border border-brand/10"
                />
              </div>
            </div>
            <div className={`${i % 2 === 1 ? 'md:order-1' : ''} space-y-4`}>
              <div className="flex flex-wrap gap-2">
                {p.categorias.map((c) => (
                  <span key={c} className="text-xs font-medium tracking-wide uppercase text-brand border border-brand/40 rounded-full px-3 py-1">{c}</span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-ink">{p.nome}</h2>
              <p className="text-title-blue/80 leading-relaxed">{p.explicacao}</p>
              <ul className="space-y-2">
                {p.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-ink/80">
                    <span className="mt-2 w-2 h-2 rounded-full bg-brand flex-shrink-0" aria-hidden="true"></span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink/70 border-l-2 border-brand pl-4">
                <span className="font-semibold text-ink">O que esperar: </span>{p.resultado}
              </p>
              {(p.duracao || p.sessoes || p.investimento) && (
                <div className="flex flex-wrap gap-4 text-sm text-ink/70">
                  {p.duracao && <span><span className="font-semibold text-ink">Duração: </span>{p.duracao}</span>}
                  {p.sessoes && <span><span className="font-semibold text-ink">Sessões: </span>{p.sessoes}</span>}
                  {p.investimento && <span><span className="font-semibold text-ink">Investimento: </span>{p.investimento}</span>}
                </div>
              )}
              <a
                href={whatsappCatalogo(p.nome)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-chrome-dark transition-all print:hidden"
              >
                <MessageCircle className="w-5 h-5" />
                Quero saber mais
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Como funciona (página 2 na impressão) */}
      <section className="max-w-6xl mx-auto px-6 md:px-4 py-14 md:py-20 print:order-2 print-sheet print:flex print:flex-col print:justify-center">
        <h2 className="text-2xl md:text-3xl font-serif text-ink text-center mb-10">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {passos.map((passo) => (
            <div key={passo.numero} className="animate-on-scroll bg-white/70 rounded-3xl border border-brand/20 p-8 text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-brand text-brand font-serif text-xl mb-4">{passo.numero}</span>
              <p className="text-ink/80 leading-relaxed">{passo.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final (última página na impressão) */}
      <section className="bg-white/70 border-t border-brand/20 print:order-4 print:break-inside-avoid">
        <div className="max-w-3xl mx-auto px-6 md:px-4 py-14 md:py-20 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif text-ink">Não sabe por onde começar?</h2>
          <p className="text-title-blue/80 leading-relaxed">
            Faça uma avaliação e a Elizabeth indica o melhor caminho para a sua pele.
          </p>
          <a
            href={whatsappCatalogo('uma avaliação')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-brand text-white px-8 py-3.5 rounded-full font-semibold hover:bg-chrome-dark transition-all print:hidden"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar avaliação
          </a>
          <div className="hidden print:block text-ink/80 space-y-1">
            <p>WhatsApp: (13) 99784-6585</p>
            <p>@elizabethgutesteticista | elizabethgut.com.br</p>
          </div>
          <p className="text-xs text-ink/50 pt-4">
            Os resultados variam de pessoa para pessoa. Todos os procedimentos são indicados após avaliação.
          </p>
        </div>
      </section>

      {/* Botão de exportar PDF (oculto, só com ?export=1) */}
      {exportMode && (
        <button
          onClick={() => window.print()}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-full text-sm font-semibold shadow-xl hover:bg-brand transition-all print:hidden"
          aria-label="Exportar catálogo em PDF"
        >
          <Printer className="w-4 h-4" />
          Exportar em PDF
        </button>
      )}

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Catalogo;
