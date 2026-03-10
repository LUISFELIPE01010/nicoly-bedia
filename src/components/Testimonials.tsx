import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "A Lethícia mudou minha relação com a comida. Finalmente entendi que comer bem não precisa ser sofrido. Meus sintomas intestinais melhoraram muito!",
      name: "Camila",
      age: "28 anos",
      image: "/lovable-uploads/68e54351-155a-4d01-ae41-61d0c1c4b649.png"
    },
    {
      quote: "Depois do acompanhamento com a Lethícia, minha distensão abdominal praticamente sumiu. Ela realmente escuta e entende o que você está passando.",
      name: "Juliana", 
      age: "35 anos",
      image: "/lovable-uploads/juliana-testimonial.png"
    },
    {
      quote: "O cuidado da Lethícia vai além da nutrição. Ela me ajudou a entender meu corpo e a ter uma alimentação sem culpa. Recomendo de olhos fechados!",
      name: "Fernanda",
      age: "31 anos", 
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Sofria com refluxo e constipação há anos. Com o plano da Lethícia, em poucos meses já senti uma melhora enorme na qualidade de vida.",
      name: "Patrícia",
      age: "29 anos",
      image: "/lovable-uploads/patricia-testimonial.png"
    },
    {
      quote: "A consulta com a Lethícia foi transformadora. Ela realmente investiga a causa dos sintomas e cria um plano que funciona na vida real.",
      name: "Renata",
      age: "33 anos",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "A nutrição comportamental mudou minha vida. Hoje como sem medo, sem culpa e me sinto muito mais equilibrada e disposta!",
      name: "Luciana",
      age: "27 anos",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-rose mb-6">
            O que minhas pacientes dizem
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-rose/80 max-w-2xl mx-auto">
            Histórias reais de quem recuperou a saúde intestinal e a paz com a alimentação
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-nude-soft rounded-3xl p-8 shadow-lg hover-lift animate-on-scroll border border-chrome-light/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <Quote className="w-10 h-10 text-chrome-gold/30 mb-4" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-chrome-gold fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-rose leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}, paciente satisfeita`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-chrome-light/50"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-gray-rose">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-rose/70">
                    {testimonial.age}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
