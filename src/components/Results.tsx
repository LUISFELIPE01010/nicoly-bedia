import { Star, Heart, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import WhatsAppFormModal from './WhatsAppFormModal';

const Results = () => {
  const [formOpen, setFormOpen] = useState(false);

  const resultItems = [
    {
      image: '/lovable-uploads/nicoly-comida.jpg',
      alt: 'Prato saudável e equilibrado',
      title: 'Alimentação Equilibrada',
      description: 'Pratos práticos e gostosos',
      name: 'Maria, 32 anos',
      feedback:
        'Aprendi a montar pratos equilibrados e saborosos. A Nicoly tornou tudo mais simples e sem neura!',
    },
    {
      image: '/lovable-uploads/nicoly-consulta.png',
      alt: 'Consulta nutricional personalizada',
      title: 'Acompanhamento Personalizado',
      description: 'Cuidado individual e acolhedor',
      name: 'Ana, 28 anos',
      feedback:
        'Cada consulta é especial. A Nicoly realmente escuta e cria um plano que funciona pra minha rotina.',
    },
    {
      image: '/lovable-uploads/d96c0b93-efa5-494a-a668-fb520d37c8b7.jpg',
      alt: 'Nutricionista Nicoly Bédia',
      title: 'Relação Saudável com a Comida',
      description: 'Sem culpa, sem restrição',
      name: 'Carla, 35 anos',
      feedback: 'Finalmente como sem medo e sem culpa. A nutrição comportamental mudou minha vida!',
    },
  ];

  return (
    <>
      <section id="results" className="py-20 bg-gradient-to-b from-white via-nude-soft/40 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-rose mb-5">Resultados que Inspiram</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-rose/80 max-w-3xl mx-auto">
              Cada transformação é única. Veja como a nutrição personalizada e o cuidado individualizado
              transformaram a vida dessas pacientes.
            </p>
          </div>

          <div className="mb-14 animate-on-scroll">
            <Carousel className="w-full max-w-5xl mx-auto px-10 md:px-0">
              <CarouselContent>
                {resultItems.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <article className="bg-white rounded-3xl border border-chrome-light/20 shadow-lg overflow-hidden h-full">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          width={400}
                          height={224}
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute top-4 right-4 w-10 h-10 bg-chrome-gold rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-semibold text-gray-rose mb-2 leading-tight">{item.title}</h3>
                        <p className="text-chrome-gold font-medium mb-4">{item.description}</p>

                        <div className="border-t border-chrome-light/30 pt-4">
                          <div className="flex items-center gap-1 mb-3" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-chrome-gold fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-gray-rose/80 italic text-sm leading-relaxed mb-2">"{item.feedback}"</blockquote>
                          <p className="font-semibold text-gray-rose text-sm">{item.name}</p>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12" />
              <CarouselNext className="right-0 md:-right-12" />
            </Carousel>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="bg-gradient-to-br from-chrome-light/20 to-nude-soft/50 rounded-3xl p-8 border border-chrome-light/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-chrome-gold fill-current" />
                <span className="text-gray-rose font-semibold text-lg">Pacientes atendidas com muito carinho e dedicação</span>
              </div>

              <p className="text-gray-rose/80 mb-6 max-w-2xl mx-auto">
                Sua transformação pode ser a próxima! Descubra como a nutrição personalizada pode melhorar sua relação com a comida e sua qualidade de vida.
              </p>

              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold hover-lift shadow-lg hover:bg-chrome-dark transition-all"
                aria-label="Agendar consulta via WhatsApp"
              >
                Quero cuidar de mim
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
