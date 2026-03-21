import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            O que minhas clientes dizem
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4" />
          <p className="text-lg text-title-blue/80 max-w-2xl mx-auto">
            Histórias reais de quem transformou a pele e a autoestima com nossos tratamentos
          </p>
        </div>

        <div className="relative animate-on-scroll">
          {/* Arrows - desktop only */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-chrome-light/30 items-center justify-center hover:bg-chrome-gold hover:text-white transition-colors"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-chrome-light/30 items-center justify-center hover:bg-chrome-gold hover:text-white transition-colors"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                >
                  <div className="bg-gradient-to-br from-white to-nude-soft rounded-3xl p-6 md:p-8 shadow-lg border border-chrome-light/20 h-full flex flex-col">
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-chrome-gold/30 mb-3" />
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-chrome-gold fill-current" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-title-blue/80 leading-relaxed mb-6 italic text-sm md:text-base flex-1">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={`Foto de ${testimonial.name}, cliente satisfeita`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-chrome-light/50"
                        loading="lazy"
                        width={40}
                        height={40}
                        decoding="async"
                      />
                      <div>
                        <p className="font-semibold text-title-blue text-sm">{testimonial.name}</p>
                        <p className="text-xs text-chrome-gold">{testimonial.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-chrome-gold w-6'
                    : 'bg-chrome-light/50 hover:bg-chrome-gold/50'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
