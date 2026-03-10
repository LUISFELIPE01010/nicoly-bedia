import { Apple, Salad, Brain, Video, Heart, Leaf, Dumbbell, Zap } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const services = [
    {
      icon: Brain,
      title: "Nutrição Comportamental",
      description: "Melhore sua relação com a comida sem dietas restritivas, sem culpa e com muito mais prazer em comer.",
      modalContent: "A nutrição comportamental é sobre entender seus hábitos, emoções e relação com a comida. Juntas, vamos construir uma alimentação que funcione pra você de verdade — sem proibições, sem terrorismo nutricional, só equilíbrio e autoconhecimento."
    },
    {
      icon: Salad,
      title: "Reeducação Alimentar",
      description: "Aprenda a montar pratos equilibrados e nutritivos que cabem na sua rotina e no seu gosto.",
      modalContent: "Reeducação alimentar não é dieta! É aprender a fazer escolhas mais conscientes e equilibradas, respeitando seus gostos, sua rotina e seu corpo. Vou te ajudar a entender o que comer, quando comer e como montar pratos práticos e gostosos."
    },
    {
      icon: Heart,
      title: "Emagrecimento Saudável",
      description: "Perca peso de forma sustentável, sem passar fome e sem efeito sanfona.",
      modalContent: "Emagrecimento de verdade não acontece com dieta da moda. É um processo que respeita seu corpo e sua individualidade. Vou criar um plano personalizado pra você alcançar seus objetivos com saúde, prazer e leveza."
    },
    {
      icon: Leaf,
      title: "Saúde e Bem-estar",
      description: "Cuide da sua saúde de forma integral com uma alimentação que nutre corpo e mente.",
      modalContent: "Alimentação vai muito além de estética — é sobre saúde, disposição, humor e qualidade de vida. Vou te ajudar a se sentir melhor no seu corpo através de uma nutrição personalizada e integrativa."
    },
    {
      icon: Apple,
      title: "Planejamento Alimentar",
      description: "Cardápios personalizados e práticos para facilitar sua rotina alimentar.",
      modalContent: "Sei que a correria do dia a dia dificulta manter uma alimentação equilibrada. Por isso, crio planos alimentares práticos e flexíveis, adaptados aos seus horários, preferências e necessidades."
    },
    {
      icon: Dumbbell,
      title: "Nutrição para Hipertrofia",
      description: "Ganhe massa muscular com um plano alimentar estratégico, alinhado ao seu treino e objetivos.",
      modalContent: "Se o seu objetivo é ganhar massa muscular, a alimentação é tão importante quanto o treino! Vou montar um plano nutricional personalizado com a quantidade ideal de proteínas, carboidratos e gorduras para potencializar seus resultados na academia, sem dietas genéricas."
    },
    {
      icon: Zap,
      title: "Nutrição Esportiva",
      description: "Maximize seu desempenho nos treinos e competições com uma alimentação pensada para alta performance.",
      modalContent: "A nutrição esportiva vai além de comer bem — é sobre periodizar sua alimentação de acordo com seus treinos, otimizar a recuperação muscular, melhorar a disposição e alcançar o melhor desempenho possível. Seja você atleta ou praticante de atividade física, vou te ajudar a performar melhor!"
    },
    {
      icon: Video,
      title: "Consultas Online e Presenciais",
      description: "Flexibilidade total para caber na sua agenda e localização.",
      modalContent: "Atendo presencialmente em Santos/SP na Av. Conselheiro Nébias, 754 - Boqueirão, e também online para todo o Brasil. Você escolhe o formato que for mais prático pra você, com a mesma qualidade e cuidado!"
    }
  ];

  return (
    <section id="services" className="py-20 pb-10 bg-gradient-to-b from-nude-soft to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-rose mb-6">
            Como posso te ajudar?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover-lift animate-on-scroll border border-chrome-light/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-chrome-light to-gold-accent rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-chrome-dark" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-rose mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-rose/80 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <button 
                onClick={() => setSelectedService(index)}
                className="inline-flex items-center gap-2 text-chrome-gold font-semibold hover:text-chrome-dark transition-colors"
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
