import { useState, useCallback } from 'react';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import WhatsAppFormModal from './WhatsAppFormModal';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const questions = [
    {
      question: "Qual é a sua maior preocupação com a pele atualmente?",
      options: [
        "Manchas, melasma ou tom desigual",
        "Flacidez e perda de firmeza",
        "Rugas, linhas finas e sinais de envelhecimento",
        "Acne, cravos e poros dilatados"
      ]
    },
    {
      question: "Qual é a sua faixa etária?",
      options: [
        "20 a 30 anos",
        "31 a 40 anos",
        "41 a 50 anos",
        "Acima de 50 anos"
      ]
    },
    {
      question: "Você já fez algum procedimento estético antes?",
      options: [
        "Nunca fiz, seria minha primeira vez",
        "Sim, limpeza de pele e peeling",
        "Sim, procedimentos com tecnologia (laser, ultrassom, etc)",
        "Sim, já fiz procedimentos injetáveis"
      ]
    }
  ];

  const handleAnswer = useCallback((answer: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 150);
  }, [answers, currentQuestion, questions.length, isTransitioning]);

  const getResult = useCallback(() => {
    const answerText = answers.join(' ').toLowerCase();
    
    if (answerText.includes('manchas') || answerText.includes('melasma') || answerText.includes('tom desigual')) {
      return {
        title: "Peeling + Microagulhamento é ideal para você! ✨",
        description: "Suas respostas indicam que tratamentos para clareamento e uniformização da pele trarão os melhores resultados. Com peeling personalizado e microagulhamento com drug delivery, vamos devolver a luminosidade e uniformidade da sua pele."
      };
    } else if (answerText.includes('flacidez') || answerText.includes('firmeza')) {
      return {
        title: "Ultraformer III + Radiofrequência! 💎",
        description: "O combo perfeito para combater a flacidez! O Ultraformer III trabalha nas camadas profundas estimulando colágeno, enquanto a radiofrequência firma e redefine o contorno facial. Resultados visíveis e progressivos!"
      };
    } else if (answerText.includes('rugas') || answerText.includes('linhas finas') || answerText.includes('envelhecimento')) {
      return {
        title: "Skinbooster + Ultrassom Microfocado! 🌟",
        description: "A combinação ideal para rejuvenescimento! O skinbooster hidrata profundamente e devolve o viço, enquanto o ultrassom microfocado estimula a produção de colágeno. Sua pele vai ficar radiante e revitalizada!"
      };
    } else {
      return {
        title: "Limpeza de Pele + Peeling Personalizado! 💆‍♀️",
        description: "Começar com uma limpeza profunda e um peeling específico para o seu tipo de pele é o primeiro passo para uma pele saudável e bonita. Vamos tratar cravos, poros e deixar sua pele renovada!"
      };
    }
  }, [answers]);

  const resetQuiz = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
      setIsTransitioning(false);
    }, 100);
  }, [isTransitioning]);

  if (showResult) {
    const result = getResult();
    return (
      <>
      <section className="py-20 bg-gradient-to-br from-nude-soft to-chrome-light/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-chrome-light/30">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-chrome-gold mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-title-blue mb-4">
                {result.title}
              </h3>
              <p className="text-lg text-title-blue/80 leading-relaxed mb-8">
                {result.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all"
                aria-label="Agendar avaliação via WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                Agendar minha avaliação
              </button>
              
              <div>
                <button 
                  onClick={resetQuiz}
                  disabled={isTransitioning}
                  className="text-chrome-gold hover:text-chrome-dark transition-colors disabled:opacity-50 font-medium"
                  aria-label="Refazer quiz"
                >
                  Refazer o quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
      </>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-nude-soft to-chrome-light/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-title-blue mb-6">
            Descubra o tratamento ideal para você
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-title-blue/80">
            Responda 3 perguntas rápidas e descubra o procedimento perfeito para a sua pele
          </p>
        </div>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-chrome-light/30">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-title-blue/60 mb-2">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-chrome-light/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-chrome-gold to-chrome-dark h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-title-blue mb-8">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={`${currentQuestion}-${index}`}
                  onClick={() => handleAnswer(option)}
                  disabled={isTransitioning}
                  className="w-full text-left p-6 rounded-2xl border-2 border-chrome-light/50 hover:border-chrome-gold hover:bg-chrome-light/20 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Selecionar opção: ${option}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-title-blue">{option}</span>
                    <ArrowRight className="w-5 h-5 text-chrome-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
