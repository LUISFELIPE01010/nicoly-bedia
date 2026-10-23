import { ArrowUpRight, Check, ChevronDown, Sparkles, Droplets, ScanFace, Zap, Flower2, Heart, Waves, ShieldCheck, Layers, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Procedimento } from '@/data/catalogo';

const symbols: Record<string, LucideIcon> = {
  'limpeza-de-pele': Droplets, microagulhamento: Layers, 'laser-lavieen': Zap,
  'ultraformer-mpt': ScanFace, visage: ScanFace, 'peeling-clareador': Droplets,
  rejuvenescimento: Sparkles, 'estimulo-de-colageno': Layers, hipro: Zap,
  'drenagem-linfatica': Waves, 'drenagem-pos-operatoria': ShieldCheck,
  'estetica-corporal': Heart, 'massagem-relaxante': Flower2,
};

export default function CatalogTreatment({ treatment: p, index, onSelect }: { treatment: Procedimento; index: number; onSelect: () => void }) {
  const Icon = symbols[p.slug] ?? Sparkles;
  return (
    <article className="catalog-treatment group overflow-hidden rounded-lg bg-card text-card-foreground border border-brand/20 flex flex-col print-sheet print:grid print:grid-cols-2 print:gap-10 print:items-center print:rounded-none print:border-0 print:shadow-none" id={p.slug}>
      <div className="relative overflow-hidden print:h-auto">
        <img src={p.imagem} srcSet={p.imagemMobile ? `${p.imagemMobile} 600w, ${p.imagem} 960w` : undefined} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1280px) 46vw, 560px" alt={p.imagemAlt} width={960} height={720} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 print:aspect-[4/3]" />
        <div className="absolute top-4 left-4 flex gap-2 print:hidden">
          {p.categorias.map(c => <span key={c} className="bg-background/95 text-foreground text-xs px-3 py-1.5 rounded-sm font-medium">{c}</span>)}
        </div>
        <span className="absolute bottom-4 right-4 bg-background text-brand w-12 h-12 rounded-full flex items-center justify-center border border-brand/30 print:hidden"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></span>
      </div>
      <div className="p-5 md:p-7 flex flex-col flex-1 print:p-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-catalog-rose-ink font-medium tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px flex-1 bg-brand/25" aria-hidden="true" />
          <Sparkles size={14} className="text-brand" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-3">{p.nome}</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">{p.explicacao}</p>
        <ul className="space-y-2 mb-5">
          {p.beneficios.map(b => <li key={b} className="flex gap-2.5 text-sm leading-relaxed"><Check size={16} className="shrink-0 text-catalog-rose-ink mt-0.5" aria-hidden="true" />{b}</li>)}
        </ul>
        <details className="border-t border-brand/20 mb-5 print:hidden">
          <summary className="flex items-center justify-between cursor-pointer py-3 text-sm font-medium list-none">O que esperar <ChevronDown size={16} className="text-brand" /></summary>
          <p className="text-sm text-muted-foreground pb-3 leading-relaxed">{p.resultado}</p>
        </details>
        <p className="hidden print:block text-sm mb-4"><strong>O que esperar: </strong>{p.resultado}</p>
        {(p.duracao || p.sessoes || p.investimento) && <p className="text-sm text-muted-foreground mb-4">{[p.duracao, p.sessoes, p.investimento].filter(Boolean).join(' · ')}</p>}
        <Button onClick={onSelect} className="mt-auto w-full h-12 justify-between rounded-md px-4 text-foreground bg-brand hover:bg-brand/80 print:hidden">Quero saber mais <ArrowUpRight size={18} /></Button>
      </div>
    </article>
  );
}