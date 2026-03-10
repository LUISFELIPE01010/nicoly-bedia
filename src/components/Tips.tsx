import { Apple, Clock, Droplets, Smile } from 'lucide-react';

const Tips = () => {
  const tips = [
    {
      icon: Apple,
      title: "Nenhum alimento é vilão",
      description: "Não existe alimento proibido! O segredo está no equilíbrio e na frequência. Permita-se comer o que gosta com consciência e sem culpa.",
      accent: "bg-green-100 text-green-700",
      iconBg: "bg-chrome-gold",
      number: "01"
    },
    {
      icon: Smile,
      title: "Coma com prazer e presença",
      description: "Desligue o celular, sente-se à mesa e saboreie cada garfada. Comer com atenção plena ajuda na saciedade e transforma a experiência de se alimentar.",
      accent: "bg-amber-100 text-amber-700",
      iconBg: "bg-amber-500",
      number: "02"
    },
    {
      icon: Clock,
      title: "Não pule refeições",
      description: "Ficar muito tempo sem comer pode te levar a exagerar depois. Faça refeições regulares e respeite os sinais de fome e saciedade do seu corpo.",
      accent: "bg-rose-100 text-rose-700",
      iconBg: "bg-rose-400",
      number: "03"
    },
    {
      icon: Droplets,
      title: "Hidrate-se ao longo do dia",
      description: "A água é essencial para o metabolismo, disposição e até para controlar a fome. Tente beber pelo menos 35ml por kg de peso corporal diariamente.",
      accent: "bg-sky-100 text-sky-700",
      iconBg: "bg-sky-500",
      number: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-nude-soft via-white to-chrome-light/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-chrome-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-chrome-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 rounded-full bg-chrome-light/30 text-chrome-dark text-sm font-medium mb-4 tracking-wide uppercase">
            Saúde & Bem-estar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-rose mb-6">
            Dicas da Nutri
          </h2>
          <p className="text-lg text-gray-rose/70 max-w-2xl mx-auto">
            Pequenas mudanças que fazem toda a diferença na sua saúde e no seu dia a dia
          </p>
        </div>
        
        <div className="space-y-6">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`group animate-on-scroll flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-chrome-light/15 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number + Icon */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-5xl md:text-6xl font-bold text-chrome-light/40 select-none leading-none">
                  {tip.number}
                </span>
                <div className={`w-14 h-14 ${tip.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <tip.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-rose mb-2 group-hover:text-chrome-dark transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-rose/70 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              {/* Tag */}
              <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${tip.accent} hidden md:inline-block`}>
                Dica {tip.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;
