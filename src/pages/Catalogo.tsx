import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle, Printer, ArrowDown, ArrowUpRight, Sparkles, ScanFace, Heart, Flower2, ShieldCheck, MapPin, ClipboardCheck, Layers, Check } from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppFormModal from '@/components/WhatsAppFormModal';
import CatalogTreatment from '@/components/CatalogTreatment';
import { Button } from '@/components/ui/button';
import { procedimentos, type Categoria } from '@/data/catalogo';

const filtros: Array<'Todos' | Categoria> = ['Todos', 'Facial', 'Corporal', 'Bem-estar'];
const categoryIcons = { Todos: Sparkles, Facial: ScanFace, Corporal: Heart, 'Bem-estar': Flower2 };
const navLinks = [
  { label: 'Início', href: '/' }, { label: 'Sobre Mim', href: '/#about' },
  { label: 'Tratamentos', href: '/#services' }, { label: 'Catálogo', href: '/catalogo' }, { label: 'Contato', href: '/#contact' },
];
const passos = [
  { icon: ClipboardCheck, title: 'Escutar e avaliar', texto: 'Avaliação da pele e conversa sobre os seus objetivos.' },
  { icon: Layers, title: 'Personalizar o cuidado', texto: 'Plano personalizado com os procedimentos indicados para você.' },
  { icon: Heart, title: 'Acompanhar você', texto: 'Sessões com acompanhamento e orientações para manter o resultado.' },
];
const Catalogo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState<'Todos' | Categoria>('Todos');
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
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


  const visiveis = procedimentos.filter(p => p.visivel && (filtro === 'Todos' || p.categorias.includes(filtro)));
  const openForm = (procedure = 'Outro') => { setMenuOpen(false); setSelectedProcedure(procedure); };

  return (
    <div className="catalog min-h-screen bg-background flex flex-col">
      <div className="hidden print:flex print:order-1 print-sheet flex-col items-center justify-center text-center gap-6">
        <img src="/lovable-uploads/logo-elizabeth-gut.webp" alt="Logo Elizabeth Gut" width={96} height={96} className="w-24 h-24 object-contain" />
        <p className="text-sm uppercase text-brand">Elizabeth Gut | Esteticista</p>
        <h1 className="text-5xl font-serif">Catálogo de procedimentos</h1>
        <p>@elizabethgutesteticista · Santos/SP</p>
      </div>
      <header className="sticky top-0 z-50 bg-background border-b border-brand/20 print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-4 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.webp" alt="Logo Elizabeth Gut" width={40} height={40} className="w-9 h-9 object-contain" />
            <span className="leading-tight"><span className="block font-serif text-xl">Elizabeth Gut</span><span className="block text-[10px] text-catalog-rose-ink uppercase">Esteticista · Santos/SP</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6" aria-label="Menu principal">
            {navLinks.map(link => <Link key={link.href} to={link.href} aria-current={link.href === '/catalogo' ? 'page' : undefined} className={`text-sm py-2 ${link.href === '/catalogo' ? 'border-b border-brand text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{link.label}</Link>)}
            <Button onClick={() => openForm()}><MessageCircle />Agendar avaliação</Button>
          </nav>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden h-11 w-11" aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav aria-label="Menu celular" className="absolute left-0 right-0 top-full bg-background border-b border-brand/20 px-6 py-4 flex flex-col shadow-lg lg:hidden">
          {navLinks.map(link => <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="py-3 text-sm">{link.label}</Link>)}
          <Button onClick={() => openForm()} className="h-12 mt-2"><MessageCircle />Agendar avaliação</Button>
        </nav>}
      </header>

      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end md:items-center print:hidden">
        <img src={procedimentos[0]?.imagem} srcSet={`${procedimentos[0]?.imagemMobile} 600w, ${procedimentos[0]?.imagem} 960w`} sizes="100vw" alt="Cuidado facial em clínica de estética, imagem ilustrativa" width={960} height={720} loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 catalog-cover-scrim" aria-hidden="true" />
        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-4 py-10 md:py-14 text-background">
          <div className="flex items-center gap-2 text-sm mb-5"><Sparkles size={17} /><span>Beleza com cuidado e intenção</span></div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-xl">Catálogo de<br /><span className="italic">procedimentos</span></h1>
          <p className="text-sm md:text-base leading-relaxed max-w-md mt-5 text-background/90">Cuidados para o rosto, o corpo e o seu bem-estar. Descubra o que combina com o seu momento.</p>
          <Button asChild variant="outline" className="mt-6 h-12 border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"><a href="#tratamentos">Explorar tratamentos <ArrowDown /></a></Button>
          <div className="absolute right-4 bottom-8 hidden lg:flex items-center justify-center w-28 h-28 rounded-full border border-background/50 text-center flex-col"><span className="font-serif text-4xl">20+</span><span className="text-xs">anos de cuidado</span></div>
        </div>
      </section>

      <div className="bg-secondary text-secondary-foreground border-b border-brand/20 print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-4 py-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <span className="flex items-center gap-2"><ShieldCheck size={19} className="shrink-0" />Avaliação personalizada</span>
          <span className="flex items-center gap-2"><Sparkles size={19} className="shrink-0" />Mais de 20 anos de experiência</span>
          <span className="hidden md:flex items-center gap-2"><MapPin size={19} />Santos · São Paulo</span>
        </div>
      </div>

      <div id="tratamentos" className="scroll-mt-[72px] print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-4 pt-10 md:pt-14 pb-6 flex items-end justify-between gap-4">
          <div><p className="text-xs uppercase text-catalog-rose-ink mb-2 flex items-center gap-2"><Flower2 size={16} />Seu momento de cuidado</p><h2 className="font-serif text-3xl md:text-4xl">Encontre seu tratamento</h2></div>
          <p className="text-xs text-muted-foreground shrink-0 hidden sm:block">{visiveis.length} procedimentos</p>
        </div>
      </div>
      <div className="sticky top-[72px] z-30 bg-background border-y border-brand/20 print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-4 flex gap-1 md:gap-4 py-2">
          {filtros.map(f => { const Icon = categoryIcons[f]; return <Button key={f} onClick={() => setFiltro(f)} variant={filtro === f ? 'secondary' : 'ghost'} aria-pressed={filtro === f} className="h-12 flex-1 md:flex-none px-1.5 md:px-5 gap-1 md:gap-2 text-xs md:text-sm"><Icon className="hidden min-[375px]:block" />{f}</Button>; })}
        </div>
      </div>

      <section aria-label="Procedimentos" className="max-w-6xl w-full mx-auto px-6 md:px-4 py-8 md:py-10 grid md:grid-cols-2 gap-6 md:gap-8 print:block print:order-3 print:p-0 print:m-0 print:max-w-none">
        {visiveis.map(p => <CatalogTreatment key={p.slug} treatment={p} index={procedimentos.indexOf(p)} onSelect={() => openForm(p.nome)} />)}
      </section>

      <section className="bg-secondary text-secondary-foreground print:order-2 print-sheet print:flex print:flex-col print:justify-center">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-4 py-12 md:py-16 print:p-0">
          <p className="text-xs uppercase mb-3">Do primeiro encontro à sua evolução</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Um cuidado que começa em você.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {passos.map((passo,i) => <div key={passo.title} className="border-t border-brand/40 pt-5"><div className="flex items-center justify-between mb-4"><passo.icon size={30} strokeWidth={1.3} /><span className="font-serif text-3xl text-brand">0{i+1}</span></div><h3 className="text-lg font-medium mb-2">{passo.title}</h3><p className="text-sm leading-relaxed">{passo.texto}</p></div>)}
          </div>
        </div>
      </section>
      <section className="bg-background print:order-4 print:break-inside-avoid">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 text-center">
          <Flower2 className="mx-auto text-brand mb-4" size={36} strokeWidth={1.3} />
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Seu próximo cuidado começa aqui.</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-6">Uma conversa, uma avaliação e um plano pensado para você.</p>
          <Button size="lg" onClick={() => openForm()} className="h-12 print:hidden">Agendar avaliação <ArrowUpRight /></Button>
          <p className="hidden print:block">WhatsApp: (13) 99784-6585 · @elizabethgutesteticista</p>
          <p className="text-xs text-muted-foreground mt-8">Imagens ilustrativas. Os resultados variam de pessoa para pessoa. Todos os procedimentos são indicados após avaliação.</p>
        </div>
      </section>
      <Button onClick={() => window.print()} className="fixed bottom-6 right-6 z-50 shadow-xl print:hidden" aria-label="Exportar catálogo em PDF"><Printer />Exportar em PDF</Button>
      <div className="print:hidden"><Footer /></div>
      <WhatsAppFormModal isOpen={selectedProcedure !== null} onClose={() => setSelectedProcedure(null)} initialProcedure={selectedProcedure ?? undefined} />
    </div>
  );
};
export default Catalogo;
