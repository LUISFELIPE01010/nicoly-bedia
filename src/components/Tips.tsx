import { Sun, Droplets, Shield, Moon } from 'lucide-react';

const Tips = () => {
  const tips = [
    {
      icon: Sun,
      title: "Use protetor solar todos os dias",
      description: "O protetor solar é o melhor anti-idade que existe! Use diariamente, mesmo em dias nublados, e reaplique a cada 2-3 horas para proteger sua pele dos danos solares.",
      accent: "bg-amber-100 text-amber-700",
      iconBg: "bg-chrome-gold",
      number: "01"
    },
    {
      icon: Droplets,
      title: "Hidrate sua pele diariamente",
      description: "Uma pele bem hidratada envelhece mais devagar. Use hidratantes adequados ao seu tipo de pele e beba bastante água ao longo do dia para manter o viço e a luminosidade.",
      accent: "bg-sky-100 text-sky-700",
      iconBg: "bg-sky-500",
      number: "02"
    },
    {
      icon: Shield,
      title: "Invista em limpeza de pele regular",
      description: "A limpeza de pele profissional remove impurezas, desobstrui poros e prepara sua pele para absorver melhor os ativos dos seus tratamentos. Faça pelo menos a cada 30-45 dias.",
      accent: "bg-green-100 text-green-700",
      iconBg: "bg-chrome-dark",
      number: "03"
    },
    {
      icon: Moon,
      title: "Cuide da pele à noite",
      description: "Durante a noite, sua pele se regenera. Aproveite para aplicar ativos como retinol, vitamina C e ácidos que potencializam a renovação celular enquanto você dorme.",
      accent: "bg-purple-100 text-purple-700",
      iconBg: "bg-purple-500",
      number: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-nude-soft via-white to-chrome-light/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-chrome-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-chrome-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 rounded-full bg-chrome-light/30 text-chrome-dark text-sm font-medium mb-4 tracking-wide uppercase">
            Beleza & Cuidados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            Dicas da Esteticista
          </h2>
          <p className="text-lg text-title-blue/70 max-w-2xl mx-auto">
            Cuidados essenciais para manter sua pele saudável e bonita todos os dias
          </p>
        </div>
        
        <div className="space-y-6">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`group animate-on-scroll flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-chrome-light/15 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-5xl md:text-6xl font-bold text-chrome-light/40 select-none leading-none">
                  {tip.number}
                </span>
                <div className={`w-14 h-14 ${tip.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <tip.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-title-blue mb-2 group-hover:text-chrome-dark transition-colors">
                  {tip.title}
                </h3>
                <p className="text-title-blue/70 leading-relaxed">
                  {tip.description}
                </p>
              </div>

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
