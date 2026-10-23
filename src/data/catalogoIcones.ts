import { Droplets, Sparkles, ShieldCheck, Sun, Leaf, Heart, Zap, Layers, ScanFace, Waves, Wind, Smile, Fingerprint, Focus, MoveUp, Activity, Target, CircleDot, SlidersHorizontal, HandHeart, Flower2, type LucideIcon } from 'lucide-react';
import type { Categoria } from './catalogo';

export const categoriaIcones: Record<Categoria | 'Todos', LucideIcon> = {
  Todos: SlidersHorizontal, Facial: ScanFace, Corporal: Activity, 'Bem-estar': Flower2,
};
export const catalogoIcones: Record<string, { procedimento: LucideIcon; beneficios: LucideIcon[] }> = {
  'limpeza-de-pele': { procedimento: Droplets, beneficios: [CircleDot, Fingerprint, Sun] },
  microagulhamento: { procedimento: Layers, beneficios: [Fingerprint, Focus, ShieldCheck] },
  'laser-lavieen': { procedimento: Zap, beneficios: [Sun, CircleDot, Sparkles] },
  'ultraformer-mpt': { procedimento: ScanFace, beneficios: [MoveUp, ShieldCheck, Focus] },
  visage: { procedimento: Focus, beneficios: [Layers, ShieldCheck, HandHeart] },
  'peeling-clareador': { procedimento: Sun, beneficios: [Sun, Focus, Leaf] },
  rejuvenescimento: { procedimento: Sparkles, beneficios: [Fingerprint, Smile, SlidersHorizontal] },
  'estimulo-de-colageno': { procedimento: Layers, beneficios: [Activity, Fingerprint, ShieldCheck] },
  hipro: { procedimento: Target, beneficios: [Layers, MoveUp, Activity] },
  'drenagem-linfatica': { procedimento: Waves, beneficios: [Droplets, Wind, Flower2] },
  'drenagem-pos-operatoria': { procedimento: ShieldCheck, beneficios: [Droplets, Wind, HandHeart] },
  'estetica-corporal': { procedimento: Activity, beneficios: [Fingerprint, Target, ShieldCheck] },
  'massagem-relaxante': { procedimento: Flower2, beneficios: [Activity, Heart, Wind] },
};