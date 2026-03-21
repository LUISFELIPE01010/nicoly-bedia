import { MessageCircle, Instagram, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import WhatsAppFormModal from './WhatsAppFormModal';

const Contact = () => {
  const instagramUrl = "https://www.instagram.com/elizabethgutesteticista/";
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-chrome-light/20 to-gold-accent/10">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            Vamos conversar?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-title-blue/80 max-w-2xl mx-auto">
            Estou aqui para cuidar da sua pele com carinho, tecnologia e experiência
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-on-scroll">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift">
              <h3 className="text-2xl font-semibold text-title-blue mb-6">
                Entre em contato
              </h3>
              
              <div className="space-y-6">
                <button onClick={() => setFormOpen(true)} className="flex items-center gap-4 p-4 rounded-2xl bg-chrome-gold/10 hover:bg-chrome-gold/20 transition-colors group w-full text-left" aria-label="Entrar em contato via WhatsApp">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform bg-chrome-gold">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-title-blue">WhatsApp</p>
                    <p className="text-title-blue/70">(13) 99784-6585</p>
                  </div>
                </button>
                
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-chrome-light/30 hover:bg-chrome-light/50 transition-colors group" aria-label="Seguir no Instagram">
                  <div className="w-12 h-12 bg-chrome-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-title-blue">Instagram</p>
                    <p className="text-title-blue/70">@elizabethgutesteticista</p>
                  </div>
                </a>
                
                <a href="tel:+5513997846585" className="flex items-center gap-4 p-4 rounded-2xl bg-nude-soft hover:bg-chrome-light/30 transition-colors group" aria-label="Ligar para Elizabeth Gut">
                  <div className="w-12 h-12 bg-chrome-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-title-blue">Telefone</p>
                    <p className="text-title-blue/70">(13) 99784-6585</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-title-blue mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-chrome-gold" />
                Informações de Atendimento
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chrome-gold rounded-full mt-2"></div>
                  <p className="text-title-blue">
                    <strong>Endereço:</strong> R. Luiz Suplicy, 35 - Gonzaga, Santos - SP, 11055-330
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-chrome-gold mt-0.5 shrink-0" />
                  <div className="text-title-blue text-sm space-y-1">
                    <p><strong>Horários:</strong></p>
                    <p>Segunda-feira: 11:00 – 20:00</p>
                    <p>Terça-feira: 11:00 – 20:00</p>
                    <p>Quarta-feira: 14:00 – 20:00</p>
                    <p>Quinta-feira: 10:30 – 20:00</p>
                    <p>Sexta-feira: 11:00 – 20:00</p>
                    <p>Sábado: 10:00 – 18:00</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll">
            <div className="bg-gradient-to-br from-chrome-gold to-chrome-dark rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Pronta para se cuidar?
                </h3>
                <p className="text-lg mb-8 leading-relaxed">
                  Não espere mais para cuidar da sua pele e da sua autoestima. Agende uma avaliação e descubra o tratamento perfeito para você!
                </p>
                
                <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-3 bg-white text-chrome-gold px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:shadow-xl transition-all" aria-label="Agendar avaliação estética">
                  <MessageCircle className="w-6 h-6" />
                  Agendar minha avaliação
                </button>
                
                <p className="text-sm mt-6 opacity-90">
                  Avaliação personalizada • Tratamentos com tecnologia de ponta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
};

export default Contact;
