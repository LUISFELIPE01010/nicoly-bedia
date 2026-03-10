import { Apple, Clock, Droplets, Smile } from 'lucide-react';

const Tips = () => {
  const tips = [
    {
      icon: Apple,
      title: "Alimentos amigos do intestino",
      description: "Fibras, probióticos e prebióticos são essenciais. Inclua frutas, verduras, iogurte natural e grãos integrais na sua rotina.",
      accent: "bg-green-100 text-green-700",
      iconBg: "bg-green-500",
      number: "01"
    },
    {
      icon: Smile,
      title: "Coma sem culpa e sem medo",
      description: "A nutrição comportamental ensina que não existem alimentos proibidos. O equilíbrio e a consciência são mais importantes que a restrição.",
      accent: "bg-amber-100 text-amber-700",
      iconBg: "bg-amber-500",
      number: "02"
    },
    {
      icon: Clock,
      title: "Respeite os sinais do seu corpo",
      description: "Coma quando sentir fome, pare quando estiver satisfeita. Prestar atenção nos sinais do corpo é o primeiro passo para uma alimentação saudável.",
      accent: "bg-rose-100 text-rose-700",
      iconBg: "bg-rose-400",
      number: "03"
    },
    {
      icon: Droplets,
      title: "Hidratação e saúde intestinal",
      description: "A água é fundamental para o bom funcionamento do intestino. Beba pelo menos 35ml por kg de peso corporal ao longo do dia.",
      accent: "bg-sky-100 text-sky-700",
      iconBg: "bg-sky-500",
      number: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-nude-soft via-white to-chrome-light/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
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
            Pequenas mudanças que fazem toda a diferença na sua saúde intestinal
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
