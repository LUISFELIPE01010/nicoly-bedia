import { Sparkles, Eye, Droplets, Zap, Radio, Layers, ScanFace, Shield } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const services = [
    {
      icon: Layers,
      title: "Peeling Facial",
      description: "Renove sua pele com peelings personalizados que promovem clareamento, uniformização e rejuvenescimento.",
      modalContent: "O peeling facial é um procedimento que remove as camadas superficiais da pele, estimulando a renovação celular. Ideal para tratar manchas, acne, linhas finas e melhorar a textura da pele. Trabalho com diversos tipos de peeling, escolhendo o mais indicado para o seu tipo de pele e necessidade."
    },
    {
      icon: Eye,
      title: "Tratamento para Olheiras",
      description: "Reduza olheiras e bolsas com tratamentos específicos que devolvem luminosidade ao olhar.",
      modalContent: "As olheiras podem ter diversas causas: genética, cansaço, pigmentação ou perda de volume. Avalio cada caso individualmente para indicar o melhor tratamento, que pode incluir bioestimuladores, skinbooster, ácidos ou tecnologias como radiofrequência na região periorbital."
    },
    {
      icon: Sparkles,
      title: "Limpeza de Pele",
      description: "Limpeza profunda profissional que remove impurezas, cravos e prepara sua pele para tratamentos.",
      modalContent: "A limpeza de pele é essencial para manter a saúde cutânea. Realizo um protocolo completo com higienização, esfoliação, extração cuidadosa, máscara calmante e hidratação profunda. Sua pele sai renovada, limpa e pronta para absorver melhor os ativos dos seus cosméticos."
    },
    {
      icon: Droplets,
      title: "Skinbooster",
      description: "Hidratação profunda injetável que devolve viço, luminosidade e elasticidade à pele.",
      modalContent: "O Skinbooster é um tratamento injetável que leva ácido hialurônico diretamente nas camadas mais profundas da pele. Promove hidratação intensa, melhora a qualidade da pele, reduz linhas finas e devolve o aspecto saudável e luminoso. Resultados visíveis desde a primeira sessão!"
    },
    {
      icon: Zap,
      title: "Ultrassom Microfocado",
      description: "Tecnologia de ponta para lifting não cirúrgico, estimulando colágeno e firmando a pele.",
      modalContent: "O ultrassom microfocado é o tratamento mais avançado para flacidez facial e corporal sem cirurgia. A energia ultrassônica atinge camadas profundas da pele, estimulando a produção de novo colágeno. Ideal para lifting de sobrancelha, papada, contorno facial e rejuvenescimento geral."
    },
    {
      icon: ScanFace,
      title: "Microagulhamento",
      description: "Estimule a produção de colágeno e trate cicatrizes, rugas e poros dilatados.",
      modalContent: "O microagulhamento cria microcanais na pele que estimulam a produção natural de colágeno e elastina. Excelente para tratar cicatrizes de acne, rugas, linhas finas, poros dilatados e melasma. Pode ser associado a drug delivery para potencializar os resultados."
    },
    {
      icon: Radio,
      title: "Radiofrequência",
      description: "Combata a flacidez e estimule colágeno com calor controlado para uma pele mais firme.",
      modalContent: "A radiofrequência utiliza ondas eletromagnéticas que geram calor controlado nas camadas profundas da pele, estimulando a produção de colágeno e elastina. Trata flacidez facial e corporal, melhora o contorno facial e promove firmeza. Um tratamento confortável com resultados progressivos."
    },
    {
      icon: Shield,
      title: "Ultraformer III",
      description: "O mais avançado equipamento de ultrassom microfocado para lifting e rejuvenescimento.",
      modalContent: "O Ultraformer III é a referência mundial em ultrassom microfocado. Atinge a camada SMAS (a mesma trabalhada em cirurgias plásticas) de forma não invasiva. Promove lifting imediato, redução de papada, melhora do contorno facial e estimulação de colágeno profundo. Resultados que melhoram progressivamente por até 6 meses!"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-nude-soft to-white">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            Como posso te ajudar?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg hover-lift animate-on-scroll border border-chrome-light/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-chrome-light to-gold-accent rounded-2xl flex items-center justify-center mb-5">
                <service.icon className="w-7 h-7 text-chrome-dark" />
              </div>
              
              <h3 className="text-lg font-semibold text-title-blue mb-3">
                {service.title}
              </h3>
              
              <p className="text-title-blue/70 leading-relaxed mb-5 text-sm">
                {service.description}
              </p>
              
              <button 
                onClick={() => setSelectedService(index)}
                className="inline-flex items-center gap-2 text-chrome-gold font-semibold hover:text-chrome-dark transition-colors text-sm"
                aria-label={`Saber mais sobre ${service.title}`}
              >
                Quero saber mais
              </button>
            </div>
          ))}
        </div>

        {selectedService !== null && (
          <ServiceModal
            isOpen={selectedService !== null}
            onClose={() => setSelectedService(null)}
            title={services[selectedService].title}
            content={services[selectedService].modalContent}
          />
        )}
      </div>
    </section>
  );
};

export default Services;
