import { Stethoscope, HeartPulse, Salad, Brain, Video, Leaf } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const services = [
    {
      icon: Stethoscope,
      title: "Saúde Gastrointestinal",
      description: "Tratamento de distensão abdominal, constipação, diarreia, refluxo e desequilíbrios intestinais.",
      modalContent: "Atendo pacientes com queixas gastrointestinais como distensão abdominal, constipação, diarreia, refluxo, intolerâncias alimentares e desequilíbrios intestinais. Através de uma avaliação detalhada, identificamos as causas dos sintomas e criamos um plano nutricional personalizado focado na melhora da saúde intestinal e da qualidade de vida."
    },
    {
      icon: HeartPulse,
      title: "Nutrição Clínica",
      description: "Acompanhamento nutricional individualizado com foco no trato gastrointestinal.",
      modalContent: "A nutrição clínica é a base do meu atendimento. Com formação em Nutrição Clínica e Hospitalar, ofereço um acompanhamento que vai além da prescrição de dietas. Avalio exames, histórico de saúde e sintomas para criar estratégias nutricionais que promovam a recuperação e o bem-estar do paciente."
    },
    {
      icon: Brain,
      title: "Nutrição Comportamental",
      description: "Mudanças sustentáveis sem dietas restritivas, terrorismo nutricional ou culpa alimentar.",
      modalContent: "A nutrição comportamental é um pilar fundamental da minha prática. Promovo mudanças sustentáveis, sem dietas restritivas, terrorismo nutricional ou culpa alimentar. Trabalhamos juntos para que você desenvolva uma relação saudável com a comida, respeitando os sinais do seu corpo e o prazer em comer."
    },
    {
      icon: Leaf,
      title: "Nutrição Integrativa",
      description: "Abordagem que conecta alimentação, saúde intestinal e bem-estar emocional.",
      modalContent: "Na nutrição integrativa, olhamos para o paciente como um todo. A alimentação é vista como uma aliada da saúde física e emocional, respeitando a individualidade de cada pessoa. Integro conhecimentos de saúde intestinal, comportamento alimentar e equilíbrio nutricional para resultados completos e duradouros."
    },
    {
      icon: Salad,
      title: "Intolerâncias Alimentares",
      description: "Investigação e manejo nutricional de intolerâncias e sensibilidades alimentares.",
      modalContent: "Se você sofre com sintomas após comer determinados alimentos, posso ajudar. Realizo uma investigação detalhada dos seus hábitos e sintomas para identificar possíveis intolerâncias e sensibilidades alimentares, criando um plano alimentar que respeite suas necessidades sem comprometer o prazer e a variedade na alimentação."
    },
    {
      icon: Video,
      title: "Consultas Online e Presenciais",
      description: "Flexibilidade total para caber na sua agenda e localização.",
      modalContent: "Ofereço atendimento presencial em Santos/SP e também consultas online para todo o Brasil. Através de uma plataforma completa, você terá acesso a consultas, materiais educativos e acompanhamento personalizado com a mesma qualidade e cuidado do atendimento presencial."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nude-soft to-white">
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
