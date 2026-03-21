import { Star, Award, Clock } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-chrome-light rounded-3xl transform -rotate-3 opacity-30"></div>
              <img alt="Elizabeth Gut em seu consultório de estética" className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover h-[400px] md:h-[500px]" loading="lazy" src="/lovable-uploads/7e5bb34e-8a17-42ff-b135-d77451a3aac2.jpg" width={400} height={500} decoding="async" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8 animate-on-scroll">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title-blue mb-4">
                Quem sou eu?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full"></div>
            </div>
            
            <p className="text-lg text-title-blue/80 leading-relaxed">
              Olá, eu sou a Elizabeth Gut! ✨ Apaixonada pela estética e pelo poder transformador que ela tem na vida das pessoas. Desde 2003 atuando como Técnica em Estética, me especializei em procedimentos que realçam a beleza natural de cada pessoa com segurança e carinho.
            </p>
            
            <p className="text-lg text-title-blue/80 leading-relaxed">
              Sou Esteticista e Cosmetóloga, Pós-graduada em Procedimentos Injetáveis, e atualmente cursando Biomedicina para aprimorar ainda mais meus conhecimentos. Acredito que cada pessoa é única e merece um tratamento personalizado, feito com dedicação e as melhores tecnologias do mercado. Meu objetivo é fazer você se sentir ainda mais bonita e confiante! 💎
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chrome-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-title-blue">+20 anos</div>
                <div className="text-sm text-title-blue/70">de experiência</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-title-blue">Dedicada</div>
                <div className="text-sm text-title-blue/70">De coração</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-nude-soft rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-title-blue">Pós-grad</div>
                <div className="text-sm text-title-blue/70">Injetáveis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default About;