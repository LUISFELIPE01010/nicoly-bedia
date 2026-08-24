export const shortDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '—';

export const dateTime = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—';

/** Status usados na V1 do CRM (mapeados sobre o enum do banco). */
export const LEAD_STATUS = ['novo', 'contatado', 'agendado', 'cliente', 'perdido'] as const;
export type LeadStatus = (typeof LEAD_STATUS)[number];

export const LEAD_STATUS_LABEL: Record<string, string> = {
  novo: 'Novo',
  contatado: 'Em contato',
  agendado: 'Agendado',
  cliente: 'Concluído',
  perdido: 'Perdido',
  qualificado: 'Em contato',
  compareceu: 'Concluído',
};

export const LEAD_STATUS_CLASS: Record<string, string> = {
  novo: 'bg-primary/10 text-primary',
  contatado: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  agendado: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  cliente: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  perdido: 'bg-muted text-muted-foreground',
};

export const onlyDigits = (value?: string | null) => (value ?? '').replace(/\D/g, '');

export const whatsappLink = (phone?: string | null, text?: string) => {
  const digits = onlyDigits(phone);
  if (!digits) return null;
  const full = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${full}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};
