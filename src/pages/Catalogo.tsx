import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Menu, X, ArrowDown, ArrowUpRight, ShieldCheck, MapPin, ClipboardCheck, Layers, Heart, Award, Instagram, Printer } from 'lucide-react';
import WhatsAppFormModal from '@/components/WhatsAppFormModal';
import CatalogTreatment from '@/components/CatalogTreatment';
import { Button } from '@/components/ui/button';
import { procedimentos, type Categoria } from '@/data/catalogo';
import { categoriaIcones } from '@/data/catalogoIcones';

const filtros: Array<'Todos' | Categoria> = ['Todos', 'Facial', 'Corporal', 'Bem-estar'];
const navLinks = [{ label: 'Início', href: '/' }, { label: 'Sobre Mim', href: '/#about' }, { label: 'Tratamentos', href: '/#services' }, { label: 'Catálogo', href: '/catalogo' }, { label: 'Contato', href: '/#contact' }];
const passos = [
  { icon: ClipboardCheck, title: 'Escutar e avaliar', texto: 'Avaliação da pele e conversa sobre os seus objetivos.' },
  { icon: Layers, title: 'Personalizar o cuidado', texto: 'Plano personalizado com os procedimentos indicados para você.' },
  { icon: Heart, title: 'Acompanhar você', texto: 'Sessões com acompanhamento e orientações para manter o resultado.' },
];
export default function Catalogo() {
  const [params] = useSearchParams();
  return <CatalogoWeb exportMode={params.get('export') === '1'} />;
}
async function imprimirCatalogo() {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.catalog-web img'));
  imgs.forEach(img => { img.loading = 'eager'; });
  await Promise.all(imgs.map(img => img.complete ? null : new Promise(resolve => { img.onload = img.onerror = resolve; })));
  window.print();
}
function CatalogoWeb({ exportMode = false }: { exportMode?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtro, setFiltro] = useState<'Todos' | Categoria>('Todos');
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    document.title = 'Catálogo de Procedimentos | Elizabeth Gut Esteticista em Santos/SP';
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', 'Conheça os tratamentos faciais, corporais e de bem-estar da esteticista Elizabeth Gut em Santos/SP, com avaliação personalizada.');
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://elizabethgut.com.br/catalogo';
    const id = 'catalog-brand-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id; link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Jost:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);
  const visiveis = procedimentos.filter(p => p.visivel && (exportMode || filtro === 'Todos' || p.categorias.includes(filtro)));
  const openForm = () => { setMenuOpen(false); setFormOpen(true); };
  return (
    <div className="catalog-web bg-background text-foreground min-h-screen">
      <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0"><img src="/lovable-uploads/e45973ed-86cf-4851-ad5d-cbd50de5eb11.webp" alt="Logo Elizabeth Gut" width={40} height={40} className="w-10 h-10 object-contain" /><span className="leading-tight"><span className="block catalog-display text-2xl">Elizabeth Gut</span><span className="block text-xs text-foreground/70">Esteticista · Santos/SP</span></span></Link>
          <nav className="hidden lg:flex items-center gap-6" aria-label="Menu principal">{navLinks.map(link => <Link key={link.href} to={link.href} aria-current={link.href === '/catalogo' ? 'page' : undefined} className={`text-sm py-2 transition-colors ${link.href === '/catalogo' ? 'text-catalog-gold-dark' : 'text-foreground/70 hover:text-foreground'}`}>{link.label}</Link>)}<Button onClick={openForm} className="rounded-full h-11 px-5">Agendar avaliação <ArrowUpRight /></Button></nav>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden h-11 w-11 rounded-full" aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav aria-label="Menu celular" className="absolute left-0 right-0 top-full bg-background border-b border-foreground/10 px-6 py-4 flex flex-col lg:hidden">{navLinks.map(link => <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="py-3 text-sm">{link.label}</Link>)}<Button onClick={openForm} className="h-12 mt-2 rounded-full">Agendar avaliação <ArrowUpRight /></Button></nav>}
      </header>
      <main>
        <section className="print-sheet max-w-6xl mx-auto px-6 py-6 md:py-12 lg:py-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-[44px] md:text-[60px] lg:text-[72px] leading-[1.02]">Catálogo de<br />procedimentos</h1>
            <p className="text-foreground/70 max-w-md mx-auto lg:mx-0 mt-6 text-base md:text-lg leading-relaxed">Cuidados para o rosto, o corpo e o seu bem-estar. Descubra o que combina com o seu momento.</p>
            <div className="catalog-print-hide flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8"><Button asChild className="h-12 px-6 rounded-full"><a href="#tratamentos">Ver procedimentos <ArrowDown /></a></Button><Button variant="link" onClick={openForm} className="h-12 text-catalog-gold-dark">Agendar avaliação <ArrowUpRight /></Button></div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8 text-xs"><span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2"><ShieldCheck size={16} />Avaliação personalizada</span><span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2"><Award size={16} />Mais de 20 anos de experiência</span><span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2"><MapPin size={16} />Santos/SP</span></div>
          </div>
          <picture className="block order-1 lg:order-2 overflow-hidden rounded-[36px] h-[55vh] min-h-[300px] max-h-[520px] lg:h-[560px] lg:min-h-[520px] lg:max-h-none"><source media="(min-width: 1024px)" srcSet="/lovable-uploads/beth-gut.webp" /><img src="/lovable-uploads/beth-gut-800.webp" alt="Elizabeth Gut, esteticista em Santos" width={1600} height={900} loading="eager" decoding="async" className="h-full w-full object-cover object-[70%_25%] lg:object-[67%_25%]" /></picture>
        </section>
        <div id="tratamentos" className="catalog-print-hide scroll-mt-[150px] max-w-6xl mx-auto px-6 pt-10 pb-6"><h2 className="text-[36px] md:text-[44px] leading-tight">Encontre seu tratamento</h2></div>
        <div className={`catalog-print-hide sticky top-[72px] ${exportMode ? 'hidden' : ''}`} z-30 bg-background border-y border-foreground/10">
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 py-3"><div className="catalog-filter-scroll flex items-center gap-2 overflow-x-auto min-w-0 flex-1">{filtros.map(f => { const Icon = categoriaIcones[f]; return <Button key={f} onClick={() => setFiltro(f)} variant={filtro === f ? 'default' : 'secondary'} aria-pressed={filtro === f} className="h-11 rounded-full px-5 shrink-0"><Icon />{f}</Button>; })}</div><span role="status" className="text-sm text-foreground/70 shrink-0 hidden md:block">{visiveis.length} procedimentos</span></div>
        </div>
        <section aria-label="Procedimentos" className="max-w-6xl mx-auto px-6 py-8 md:py-10 grid md:grid-cols-2 gap-6 md:gap-8 items-stretch min-h-[650px]">{visiveis.map(p => <CatalogTreatment key={p.slug} treatment={p} reverse={p.slug === 'ultraformer-mpt'} />)}</section>
        <section className="print-sheet print:flex print:flex-col print:justify-center bg-secondary py-14 md:py-20"><div className="max-w-6xl mx-auto px-6"><h2 className="text-[36px] md:text-[44px] leading-tight text-center mb-10">Um cuidado que começa em você.</h2><div className="catalog-steps relative grid md:grid-cols-3 gap-6">{passos.map((p, i) => <div key={p.title} className="relative bg-background rounded-[28px] p-7 border border-foreground/10"><div className="flex items-center justify-between mb-6"><span className="rounded-full bg-secondary border border-catalog-gold w-12 h-12 flex items-center justify-center catalog-display text-2xl">{i + 1}</span><p.icon size={28} className="text-catalog-gold-dark" strokeWidth={1.3} /></div><h3 className="text-[28px] leading-tight mb-3">{p.title}</h3><p className="text-sm text-foreground/70 leading-relaxed">{p.texto}</p></div>)}</div></div></section>
        <section className="print-sheet print:flex print:flex-col print:justify-center max-w-6xl mx-auto px-6 py-14 md:py-20"><div className="rounded-[36px] bg-primary text-primary-foreground px-6 py-12 md:p-16 text-center"><h2 className="text-[38px] md:text-[52px] leading-tight max-w-2xl mx-auto">Seu próximo cuidado começa aqui.</h2><p className="text-primary-foreground/80 mt-5 mb-7">Uma conversa, uma avaliação e um plano pensado para você.</p><Button onClick={openForm} className="catalog-print-hide rounded-full bg-catalog-gold text-foreground hover:bg-catalog-gold/90 h-12 px-6">Agendar avaliação <ArrowUpRight /></Button><p className="hidden print:block text-lg">WhatsApp: (13) 99784-6585</p><a href="https://www.instagram.com/elizabethgutesteticista/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-6 text-sm text-primary-foreground"><Instagram size={16} />@elizabethgutesteticista</a></div><p className="text-xs text-center text-foreground/70 mt-6 leading-relaxed">Imagens ilustrativas. Os resultados variam de pessoa para pessoa. Todos os procedimentos são indicados após avaliação.</p></section>
      </main>
      <footer className="border-t border-foreground/10"><div className="max-w-6xl mx-auto px-6 py-7 flex flex-wrap justify-between items-center gap-4"><Link to="/" className="catalog-display text-2xl">Elizabeth Gut</Link><p className="text-xs text-foreground/70">Esteticista · Santos/SP</p><Link to="/admin" className="text-xs text-foreground/70">Admin</Link></div></footer>
      {exportMode && <Button onClick={imprimirCatalogo} className="catalog-print-hide fixed bottom-6 right-6 z-50 rounded-full h-12 px-5 shadow-xl" aria-label="Exportar catálogo em PDF"><Printer />Exportar em PDF</Button>}
      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} initialProcedure="Outro" appearance="catalog" />
    </div>
  );
}
