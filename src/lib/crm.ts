export const brl = (value: number | null | undefined) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value ?? 0));

export const shortDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '—';

export const dateTime = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—';

export const timeOnly = (value?: string | null) =>
  value ? new Date(value).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '—';

export const LEAD_STATUS = ['novo', 'contatado', 'qualificado', 'agendado', 'compareceu', 'cliente', 'perdido'] as const;
export type LeadStatus = (typeof LEAD_STATUS)[number];

export const LEAD_STATUS_LABEL: Record<string, string> = {
  novo: 'Novo',
  contatado: 'Contatado',
  qualificado: 'Qualificado',
  agendado: 'Agendado',
  compareceu: 'Compareceu',
  cliente: 'Cliente',
  perdido: 'Perdido',
};

export const TEMPERATURES = ['frio', 'morno', 'quente'] as const;
export const TEMPERATURE_LABEL: Record<string, string> = { frio: 'Frio', morno: 'Morno', quente: 'Quente' };

export const INTERACTION_TYPES = ['ligacao', 'mensagem', 'email', 'visita', 'nota'] as const;
export const INTERACTION_LABEL: Record<string, string> = {
  ligacao: 'Ligação',
  mensagem: 'Mensagem',
  email: 'E-mail',
  visita: 'Visita',
  nota: 'Nota',
};

export const APPOINTMENT_STATUS = ['agendado', 'confirmado', 'compareceu', 'faltou', 'cancelado'] as const;
export const APPOINTMENT_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  compareceu: 'Compareceu',
  faltou: 'Faltou',
  cancelado: 'Cancelado',
};

export const SALE_STATUS = ['pago', 'pendente', 'parcial', 'cancelado'] as const;
export const SALE_LABEL: Record<string, string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  parcial: 'Parcial',
  cancelado: 'Cancelado',
};

export const FOLLOWUP_STATUS = ['pendente', 'concluido', 'cancelado'] as const;
export const FOLLOWUP_LABEL: Record<string, string> = {
  pendente: 'Pendente',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

export const PAYMENT_METHODS = ['Pix', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Transferência', 'Boleto'];

export const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

export const rangeForPeriod = (days: number) => {
  const end = new Date();
  const start = startOfDay(addDays(end, -days + 1));
  return { start, end };
};

export const toLocalInput = (value?: string | null) => {
  const d = value ? new Date(value) : new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const csvDownload = (filename: string, rows: Record<string, unknown>[]) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [headers.join(';'), ...rows.map((r) => headers.map((h) => escape(r[h])).join(';'))].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
