import { useState } from 'react';
import { MessageCircle, User, Target, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(2, 'Por favor, informe seu nome').max(100),
  procedure: z.string().trim().min(1, 'Selecione um procedimento'),
  clientType: z.string().trim().min(1, 'Selecione uma opção'),
});

interface WhatsAppFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "5513997846585";

const procedures = [
  "Peeling Facial",
  "Tratamento para Olheiras",
  "Limpeza de Pele",
  "Skinbooster",
  "Ultrassom Microfocado",
  "Microagulhamento",
  "Radiofrequência",
  "Ultraformer III",
  "Outro"
];

const WhatsAppFormModal = ({ isOpen, onClose }: WhatsAppFormModalProps) => {
  const [name, setName] = useState('');
  const [procedure, setProcedure] = useState('');
  const [clientType, setClientType] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({ name, procedure, clientType });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const message = "Olá! Meu nome é *" + result.data.name + "*.\n\n" +
      "Procedimento de interesse: " + result.data.procedure + "\n" +
      "Cliente: " + result.data.clientType + "\n\n" +
      "Gostaria de agendar uma avaliação!";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    setName('');
    setProcedure('');
    setClientType('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-0 border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-chrome-gold to-chrome-dark p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Agendar Avaliação
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/90 text-sm mt-2">
            Preencha os dados abaixo e você será direcionada ao WhatsApp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-title-blue mb-2">
              <User className="w-4 h-4 text-chrome-gold" />
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você se chama?"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-chrome-light/40 bg-nude-soft/30 text-title-blue placeholder:text-title-blue/40 focus:outline-none focus:ring-2 focus:ring-chrome-gold/50 focus:border-chrome-gold transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-title-blue mb-2">
              <Target className="w-4 h-4 text-chrome-gold" />
              Procedimento de interesse
            </label>
            <div className="flex flex-wrap gap-2">
              {procedures.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProcedure(p)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    procedure === p
                      ? 'bg-chrome-gold text-white border-chrome-gold shadow-md'
                      : 'bg-white text-title-blue/70 border-chrome-light/40 hover:border-chrome-gold/50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {errors.procedure && <p className="text-red-500 text-xs mt-1">{errors.procedure}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-title-blue mb-2">
              <Users className="w-4 h-4 text-chrome-gold" />
              Você é cliente novo ou já nos conhece?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Cliente novo(a)', 'Já sou cliente'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClientType(c)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                    clientType === c
                      ? 'bg-chrome-gold text-white border-chrome-gold shadow-md'
                      : 'bg-white text-title-blue/70 border-chrome-light/40 hover:border-chrome-gold/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.clientType && <p className="text-red-500 text-xs mt-1">{errors.clientType}</p>}
          </div>

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
