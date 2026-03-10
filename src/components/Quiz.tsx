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
      question: "Qual é o seu maior desafio hoje com a alimentação?",
      options: [
        "Não consigo manter uma alimentação equilibrada na rotina",
        "Sinto culpa ou ansiedade ao comer",
        "Quero emagrecer mas não sei por onde começar",
        "Já fiz várias dietas e nenhuma funcionou"
      ]
    },
    {
      question: "Como você se sente em relação à comida?",
      options: [
        "Tenho medo de engordar e restrinjo muitos alimentos",
        "Como bem, mas quero melhorar minha disposição e saúde",
        "Tenho compulsão alimentar e não consigo controlar",
        "Quero aprender a comer melhor sem neura"
      ]
    },
    {
      question: "O que você busca em um acompanhamento nutricional?",
      options: [
        "Um plano alimentar prático que caiba na minha rotina",
        "Ajuda para melhorar minha relação com a comida",
        "Emagrecimento saudável e sustentável",
        "Uma profissional que me escute e me entenda de verdade"
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
    const behavioralKeywords = ['culpa', 'ansiedade', 'compulsão', 'medo', 'restrinjo', 'relação'];
    const weightKeywords = ['emagrecer', 'dietas', 'engordar', 'emagrecimento'];
    
    const answerText = answers.join(' ').toLowerCase();
    
    if (behavioralKeywords.some(keyword => answerText.includes(keyword))) {
      return {
        title: "Nutrição Comportamental é o seu caminho! 💚",
        description: "Suas respostas mostram que trabalhar a relação com a comida é essencial pra você. Juntas, vamos construir uma alimentação sem culpa, sem restrições e com muito mais prazer e equilíbrio."
      };
    } else if (weightKeywords.some(keyword => answerText.includes(keyword))) {
      return {
        title: "Emagrecimento Saudável e Sustentável 🌿",
        description: "Você busca emagrecer de forma saudável e definitiva. Vou te ajudar com um plano personalizado, sem dietas malucas, respeitando seu corpo e seus gostos."
      };
    } else {
      return {
        title: "Reeducação Alimentar Personalizada ✨",
        description: "Você se beneficiaria de um acompanhamento completo para reorganizar sua alimentação de forma prática, leve e que funcione na sua rotina."
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-rose mb-4">
                {result.title}
              </h3>
              <p className="text-lg text-gray-rose/80 leading-relaxed mb-8">
                {result.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all"
                aria-label="Conversar sobre resultado do quiz via WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                Vamos conversar sobre isso?
              </button>
              
              <div>
                <button 
                  onClick={resetQuiz}
                  disabled={isTransitioning}
                  className="text-chrome-gold hover:text-chrome-dark transition-colors disabled:opacity-50 font-medium"
                  aria-label="Refazer quiz nutricional"
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-rose mb-6">
            Descubra como posso te ajudar
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-chrome-gold to-chrome-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-rose/80">
            Responda 3 perguntas rápidas e descubra o melhor caminho para você
          </p>
        </div>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-chrome-light/30">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-rose/60 mb-2">
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
            <h3 className="text-xl md:text-2xl font-semibold text-gray-rose mb-8">
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
                    <span className="text-gray-rose">{option}</span>
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
