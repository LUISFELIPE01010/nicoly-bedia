import { Star, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-chrome-light rounded-3xl transform -rotate-3 opacity-30"></div>
              <img alt="Nicoly Bédia em consulta nutricional" className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover h-[400px] md:h-[500px]" loading="lazy" src="/lovable-uploads/b9c4e608-76c4-43b3-9206-9db508b2369e.png" />
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
              Oi, eu sou a Nicoly! 💚 Nutricionista formada pelo Centro Universitário Saúde ABC e Mestra em Ciências da Saúde pela UNIFESP, com pesquisa voltada para obesidade e neurociência do comportamento alimentar.
            </p>
            
            <p className="text-lg text-gray-rose leading-relaxed">
              Mas o que me move de verdade vai além do currículo: eu sou apaixonada pelo que faço! Cada sorriso de paciente, cada conquista compartilhada, me lembra do motivo de ter escolhido essa profissão. Sou uma nutri dedicada, que escuta de verdade, que acredita que alimentação boa é alimentação sem medo  e que está sempre buscando aprender mais pra te ajudar melhor. ✨
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chrome-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-gray-rose">Mestra</div>
                <div className="text-sm text-gray-rose">UNIFESP</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-chrome-dark" />
                </div>
                <div className="text-2xl font-bold text-gray-rose">Dedicada</div>
                <div className="text-sm text-gray-rose">De coração</div>
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