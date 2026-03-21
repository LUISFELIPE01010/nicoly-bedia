import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "A Elizabeth é maravilhosa! Fiz o Ultraformer III e o resultado foi incrível. Minha pele ficou muito mais firme e rejuvenescida. Super recomendo!",
      name: "Claudia",
      detail: "Ultraformer III",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Faço limpeza de pele regularmente com a Elizabeth e a diferença é absurda. Ela é muito cuidadosa e profissional. Minha pele nunca esteve tão bonita!",
      name: "Renata",
      detail: "Limpeza de Pele",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "O tratamento para olheiras mudou minha vida! Eu sempre tive olheiras muito marcadas e depois do tratamento com a Beth, parece que rejuvenesci anos.",
      name: "Ana Paula",
      detail: "Tratamento Olheiras",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Fiz o skinbooster e minha pele ficou com um viço incrível! A Elizabeth explica tudo com muita paciência e o resultado é maravilhoso.",
      name: "Mariana",
      detail: "Skinbooster",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Profissional incrível! Fiz microagulhamento para cicatrizes de acne e os resultados foram surpreendentes. Minha autoestima voltou!",
      name: "Fernanda",
      detail: "Microagulhamento",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "A radiofrequência com a Elizabeth é sensacional. Minha pele ficou muito mais firme e o contorno do rosto mais definido. Amei!",
      name: "Luciana",
      detail: "Radiofrequência",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            O que minhas clientes dizem
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-title-blue/80 max-w-2xl mx-auto">
            Histórias reais de quem transformou a pele e a autoestima com nossos tratamentos
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
              
              <blockquote className="text-title-blue/80 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}, cliente satisfeita`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-chrome-light/50"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-title-blue">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-chrome-gold">
                    {testimonial.detail}
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
