import { Instagram, MessageCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const tratamentos = [
  'Limpeza de Pele',
  'Ultraformer MPT',
  'Laser Lavieen',
  'Microagulhamento',
  'Peeling Clareador',
  'Drenagem Linfática',
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img alt="Logo Elizabeth Gut" className="h-8 w-8 object-contain" src="/lovable-uploads/logo-elizabeth-gut.png" width={32} height={32} />
              <span className="font-display text-xl">Elizabeth Gut</span>
            </div>
            <p className="leading-relaxed text-ivory/70">
              Esteticista e Cosmetóloga com mais de 20 anos de experiência. Cuidando da sua beleza com tecnologia, carinho e excelência.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-lg">Tratamentos</h4>
            <ul className="space-y-2">
              {tratamentos.map((t) => (
                <li key={t}>
                  <Link to="/catalogo" className="text-ivory/70 decoration-brand underline-offset-4 transition-colors hover:text-ivory hover:underline">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-lg">Contato</h4>
            <p className="text-ivory/70">R. Luiz Suplicy, 35 - Gonzaga, Santos - SP, 11055-330</p>
            <div className="space-y-3">
              <a
                href="https://wa.me/5513997846585"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
                aria-label="Contato via WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                (13) 99784-6585
              </a>
              <a
                href="https://www.instagram.com/elizabethgutesteticista/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
                aria-label="Seguir no Instagram"
              >
                <Instagram className="h-5 w-5" />
                @elizabethgutesteticista
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/15 pt-8 text-center">
          <p className="text-sm text-ivory/60">
            © {currentYear} Elizabeth Gut - Esteticista e Cosmetóloga. Todos os direitos reservados.
          </p>
          <a
            href="/admin/login"
            className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-ivory/30 transition-colors hover:text-ivory/70"
            aria-label="Acessar o painel administrativo"
            title="Área administrativa"
          >
            <Lock className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
