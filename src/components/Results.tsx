import { Star, Heart, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import WhatsAppFormModal from './WhatsAppFormModal';

const Results = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section id="results" className="py-20 bg-gradient-to-b from-white via-nude-soft/40 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold text-title-blue mb-5">Antes & Depois</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4" />
            <p className="text-lg text-title-blue/80 max-w-3xl mx-auto">
              Resultados reais de clientes reais. Cada transformação é única e personalizada para as necessidades de cada pele.
            </p>
          </div>

          {/* Before & After Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14 animate-on-scroll">
            {/* Card 1 */}
            <article className="bg-white rounded-3xl border border-chrome-light/20 shadow-lg overflow-hidden">
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="h-48 overflow-hidden">
                    <img src="/lovable-uploads/antes-1.png" alt="Antes - Rejuvenescimento Facial" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="bg-chrome-gold/10 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-chrome-gold fill-current mx-auto mb-2" />
                      <span className="text-sm font-medium text-chrome-dark">Depois</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-chrome-gold rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-title-blue mb-2">Rejuvenescimento Facial</h3>
                <p className="text-chrome-gold font-medium mb-3">Ultraformer III + Skinbooster</p>
                <blockquote className="text-title-blue/70 italic text-sm leading-relaxed">"Minha pele ficou completamente diferente! Mais firme, luminosa e rejuvenescida. A Elizabeth é incrível!"</blockquote>
                <p className="font-semibold text-title-blue text-sm mt-2">Marina, 42 anos</p>
              </div>
            </article>

            {/* Card 2 */}
            <article className="bg-white rounded-3xl border border-chrome-light/20 shadow-lg overflow-hidden">
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="bg-chrome-light/20 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-chrome-gold mx-auto mb-2" />
                      <span className="text-sm font-medium text-title-blue/60">Antes</span>
                    </div>
                  </div>
                  <div className="bg-chrome-gold/10 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-chrome-gold fill-current mx-auto mb-2" />
                      <span className="text-sm font-medium text-chrome-dark">Depois</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-chrome-gold rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-title-blue mb-2">Tratamento de Melasma</h3>
                <p className="text-chrome-gold font-medium mb-3">Peeling + Microagulhamento</p>
                <blockquote className="text-title-blue/70 italic text-sm leading-relaxed">"As manchas clarearam demais! Estou amando o resultado, minha autoestima voltou!"</blockquote>
                <p className="font-semibold text-title-blue text-sm mt-2">Carla, 38 anos</p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bg-white rounded-3xl border border-chrome-light/20 shadow-lg overflow-hidden">
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="bg-chrome-light/20 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-chrome-gold mx-auto mb-2" />
                      <span className="text-sm font-medium text-title-blue/60">Antes</span>
                    </div>
                  </div>
                  <div className="bg-chrome-gold/10 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-chrome-gold fill-current mx-auto mb-2" />
                      <span className="text-sm font-medium text-chrome-dark">Depois</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-chrome-gold rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-title-blue mb-2">Lifting Não Cirúrgico</h3>
                <p className="text-chrome-gold font-medium mb-3">Radiofrequência + Ultrassom</p>
                <blockquote className="text-title-blue/70 italic text-sm leading-relaxed">"Parece que tirei 10 anos do rosto! O contorno facial ficou muito mais definido."</blockquote>
                <p className="font-semibold text-title-blue text-sm mt-2">Patrícia, 50 anos</p>
              </div>
            </article>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="bg-gradient-to-br from-chrome-light/20 to-nude-soft/50 rounded-3xl p-8 border border-chrome-light/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-chrome-gold fill-current" />
                <span className="text-title-blue font-semibold text-lg">Clientes atendidas com carinho e tecnologia de ponta</span>
              </div>

              <p className="text-title-blue/80 mb-6 max-w-2xl mx-auto">
                Sua transformação pode ser a próxima! Agende uma avaliação gratuita e descubra o tratamento ideal para a sua pele.
              </p>

              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold hover-lift shadow-lg hover:bg-chrome-dark transition-all"
                aria-label="Agendar avaliação via WhatsApp"
              >
                Quero minha transformação
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default Results;
