import { Star, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-chrome-light rounded-3xl transform -rotate-3 opacity-30"></div>
              <img alt="Lethícia Nunes em consulta nutricional" className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover h-[400px] md:h-[500px]" loading="lazy" src="/lovable-uploads/787eb591-d3bc-4bfc-a62a-7585fac80851.jpg" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8 animate-on-scroll">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-rose mb-4">
                Quem sou eu?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full"></div>
            </div>
            
            <p className="text-lg text-gray-rose leading-relaxed">
              Olá! Sou Lethícia Nunes, nutricionista clínica com atuação voltada para a saúde gastrointestinal e a nutrição comportamental. Formada em Nutrição em 2018 e pós-graduada em Nutrição Clínica e Hospitalar, ajudo pessoas a desenvolverem uma relação mais equilibrada e consciente com a alimentação.
            </p>
            
            <p className="text-lg text-gray-rose leading-relaxed">
              Meu trabalho é baseado em uma abordagem individualizada, que considera não apenas os sintomas físicos, mas também os hábitos alimentares, o comportamento, a rotina e o contexto de vida de cada paciente. Acredito que a alimentação deve ser uma aliada da saúde física e emocional.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chrome-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-gray-rose">300+</div>
                <div className="text-sm text-gray-rose">Pacientes atendidos</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-gray-rose">+6 anos</div>
                <div className="text-sm text-gray-rose">De experiência</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-nude-soft rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-gray-rose">100%</div>
                <div className="text-sm text-gray-rose">Individualizado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default About;