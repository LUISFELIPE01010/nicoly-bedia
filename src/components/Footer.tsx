import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-title-blue text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img alt="Logo Elizabeth Gut" className="w-7 h-7 object-contain brightness-0 invert" src="/lovable-uploads/logo-elizabeth-gut.webp" width={28} height={28} />
              <span className="text-xl font-semibold">Elizabeth Gut</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Esteticista e Cosmetóloga com mais de 20 anos de experiência. Cuidando da sua beleza com tecnologia, carinho e excelência.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Serviços</h4>
            <ul className="space-y-2 text-white/80">
              <li>Peeling Facial</li>
              <li>Limpeza de Pele</li>
              <li>Skinbooster</li>
              <li>Ultraformer III</li>
              <li>Microagulhamento</li>
              <li>Radiofrequência</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/5513997846585" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                aria-label="Contato via WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                (13) 99784-6585
              </a>
              
              <a 
                href="https://www.instagram.com/elizabethgutesteticista/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                aria-label="Seguir no Instagram"
              >
                <Instagram className="w-5 h-5" />
                @elizabethgutesteticista
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 mb-4">
            © {currentYear} Elizabeth Gut - Esteticista e Cosmetóloga. Todos os direitos reservados.
          </p>
          <p className="text-white/60 text-sm">
            R. Luiz Suplicy, 35 - Gonzaga, Santos - SP, 11055-330
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
