import { ArrowUpRight, Clock, Repeat, Heart, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappCatalogo, type Procedimento } from '@/data/catalogo';
import { catalogoIcones, categoriaIcones } from '@/data/catalogoIcones';

export default function CatalogTreatment({ treatment: p, reverse = false }: { treatment: Procedimento; reverse?: boolean }) {
  const symbols = catalogoIcones[p.slug];
  const Icon = symbols?.procedimento ?? Heart;
  const featured = Boolean(p.destaque);
  return (
    <article id={p.slug} className={`catalog-web-card group rounded-[28px] border border-foreground/10 bg-card overflow-hidden flex flex-col transition-colors duration-300 hover:border-catalog-gold ${featured ? 'md:col-span-2 lg:grid lg:grid-cols-2' : ''}`}>
      <div className={`relative m-3 overflow-hidden rounded-[28px] ${featured ? `lg:min-h-[520px] ${reverse ? 'lg:order-2' : ''}` : ''}`}>
        <img src={p.imagem} srcSet={p.imagemMobile ? `${p.imagemMobile} 600w, ${p.imagem} 960w` : undefined} sizes={featured ? '(max-width: 767px) calc(100vw - 72px), 540px' : '(max-width: 767px) calc(100vw - 72px), 520px'} alt={p.imagemAlt} width={960} height={720} loading="lazy" decoding="async" className={`w-full aspect-[4/3] object-cover object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.03] ${featured ? 'lg:h-full lg:absolute lg:inset-0' : ''}`} />
        <div className="absolute top-4 left-4 right-16 flex flex-wrap gap-2">
          {p.categorias.map(c => { const CategoryIcon = categoriaIcones[c]; return <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs"><CategoryIcon size={15} className="text-catalog-gold-dark" />{c}</span>; })}
        </div>
        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-catalog-gold-dark"><Icon size={22} strokeWidth={1.5} /></span>
        {(p.duracao || p.sessoes) && <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">{p.duracao && <PhotoChip icon={Clock} text={p.duracao} />}{p.sessoes && <PhotoChip icon={Repeat} text={p.sessoes} />}</div>}
      </div>
      <div className={`p-6 pt-4 flex flex-col flex-1 ${featured ? 'lg:p-9 lg:justify-center' : ''}`}>
        <h2 className={`leading-tight mb-3 ${featured ? 'text-[34px] lg:text-[40px]' : 'text-[30px]'}`}>{p.nome}</h2>
        <p className="text-foreground/70 text-sm leading-relaxed mb-6">{p.explicacao}</p>
        <ul className="space-y-3 mb-6">
          {p.beneficios.map((benefit, i) => { const BenefitIcon = symbols?.beneficios[i] ?? Heart; return <li key={benefit} className="flex items-center gap-3 text-sm leading-relaxed"><span className="w-8 h-8 shrink-0 rounded-full bg-secondary text-foreground flex items-center justify-center"><BenefitIcon size={16} strokeWidth={1.5} /></span><span>{benefit}</span></li>; })}
        </ul>
        <div className="bg-secondary rounded-[20px] p-4 flex gap-3 mb-6"><Icon size={20} className="shrink-0 mt-1 text-foreground" strokeWidth={1.5} /><div><h3 className="text-xl leading-tight mb-1">O que esperar</h3><p className="text-sm leading-relaxed text-foreground/70">{p.resultado}</p></div></div>
        <Button asChild className="catalog-print-hide mt-auto h-auto min-h-12 rounded-full px-5 py-3 whitespace-normal text-left justify-between"><a href={whatsappCatalogo(p.nome)} target="_blank" rel="noopener noreferrer">Falar sobre este procedimento <ArrowUpRight size={18} /></a></Button>
      </div>
    </article>
  );
}
function PhotoChip({ icon: Icon, text }: { icon: LucideIcon; text: string }) { return <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs"><Icon size={14} />{text}</span>; }
