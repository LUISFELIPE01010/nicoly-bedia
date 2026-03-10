import { useState } from 'react';
import { MessageCircle, User, Target, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(2, 'Por favor, informe seu nome').max(100),
  goal: z.string().trim().min(1, 'Selecione um objetivo'),
  preference: z.string().trim().min(1, 'Selecione uma preferência'),
});

interface WhatsAppFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "5513981214037";

const goals = [
  "Saúde intestinal / Gastro",
  "Nutrição comportamental",
  "Intolerâncias alimentares",
  "Reeducação alimentar",
  "Outro"
];

const WhatsAppFormModal = ({ isOpen, onClose }: WhatsAppFormModalProps) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [preference, setPreference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({ name, goal, preference });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const message = "Olá! Meu nome é *" + result.data.name + "*.\n\n" +
      "Objetivo da consulta: " + result.data.goal + "\n" +
      "Preferência: " + result.data.preference + "\n\n" +
      "Gostaria de agendar uma consulta!";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Reset form
    setName('');
    setGoal('');
    setPreference('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-0 border-none shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-chrome-gold to-chrome-dark p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Agendar Consulta
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/90 text-sm mt-2">
            Preencha os dados abaixo e você será direcionada ao WhatsApp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nome */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-rose mb-2">
              <User className="w-4 h-4 text-chrome-gold" />
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você se chama?"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-chrome-light/40 bg-nude-soft/30 text-gray-rose placeholder:text-gray-rose/40 focus:outline-none focus:ring-2 focus:ring-chrome-gold/50 focus:border-chrome-gold transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Objetivo */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-rose mb-2">
              <Target className="w-4 h-4 text-chrome-gold" />
              Objetivo da consulta
            </label>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    goal === g
                      ? 'bg-chrome-gold text-white border-chrome-gold shadow-md'
                      : 'bg-white text-gray-rose/70 border-chrome-light/40 hover:border-chrome-gold/50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal}</p>}
          </div>

          {/* Preferência */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-rose mb-2">
              <MapPin className="w-4 h-4 text-chrome-gold" />
              Preferência de atendimento
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Presencial (Santos/SP)', 'Online'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreference(p)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                    preference === p
                      ? 'bg-chrome-gold text-white border-chrome-gold shadow-md'
                      : 'bg-white text-gray-rose/70 border-chrome-light/40 hover:border-chrome-gold/50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {errors.preference && <p className="text-red-500 text-xs mt-1">{errors.preference}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-3 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all"
          >
            <MessageCircle className="w-6 h-6" />
            Enviar pelo WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppFormModal;
