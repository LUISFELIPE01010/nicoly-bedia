import facialImgMobile from '@/assets/catalogo/facial-600.webp';
import microagulhamentoImgMobile from '@/assets/catalogo/microagulhamento-600.webp';
import laserImgMobile from '@/assets/catalogo/laser-lavieen-600.webp';
import ultraformerImgMobile from '@/assets/catalogo/ultraformer-mpt-600.webp';
import visageImgMobile from '@/assets/catalogo/visage-600.webp';
import peelingImgMobile from '@/assets/catalogo/peeling-clareador-600.webp';
import rejuvenescimentoImgMobile from '@/assets/catalogo/rejuvenescimento-600.webp';
import colagenoImgMobile from '@/assets/catalogo/estimulo-de-colageno-600.webp';
import hiproImgMobile from '@/assets/catalogo/hipro-600.webp';
import drenagemImgMobile from '@/assets/catalogo/drenagem-linfatica-600.webp';
import posOperatorioImgMobile from '@/assets/catalogo/drenagem-pos-operatoria-600.webp';
import corporalImgMobile from '@/assets/catalogo/estetica-corporal-600.webp';
import massagemImgMobile from '@/assets/catalogo/massagem-relaxante-600.webp';
import facialImg from '@/assets/catalogo/facial.webp';
import microagulhamentoImg from '@/assets/catalogo/microagulhamento.webp';
import laserImg from '@/assets/catalogo/laser-lavieen.webp';
import ultraformerImg from '@/assets/catalogo/ultraformer-mpt.webp';
import visageImg from '@/assets/catalogo/visage.webp';
import peelingImg from '@/assets/catalogo/peeling-clareador.webp';
import rejuvenescimentoImg from '@/assets/catalogo/rejuvenescimento.webp';
import colagenoImg from '@/assets/catalogo/estimulo-de-colageno.webp';
import hiproImg from '@/assets/catalogo/hipro.webp';
import drenagemImg from '@/assets/catalogo/drenagem-linfatica.webp';
import posOperatorioImg from '@/assets/catalogo/drenagem-pos-operatoria.webp';
import corporalImg from '@/assets/catalogo/estetica-corporal.webp';
import massagemImg from '@/assets/catalogo/massagem-relaxante.webp';

export type Categoria = 'Facial' | 'Corporal' | 'Bem-estar';

export interface Procedimento {
  slug: string;
  nome: string;
  categorias: Categoria[];
  explicacao: string;
  beneficios: string[];
  resultado: string;
  imagem: string;
  imagemMobile?: string;
  imagemAlt: string;
  visivel: boolean;
  destaque?: boolean;
  duracao?: string;
  sessoes?: string;
  investimento?: string;
}

export const procedimentos: Procedimento[] = [
  {
    slug: 'limpeza-de-pele',
    nome: 'Limpeza de Pele',
    categorias: ['Facial'],
    explicacao: 'Higienização profunda que remove impurezas, oleosidade e células mortas e prepara a pele para receber os outros cuidados.',
    beneficios: ['Poros desobstruídos', 'Textura mais uniforme', 'Pele mais luminosa e equilibrada'],
    resultado: 'Sensação de pele limpa e renovada logo após a sessão.',
    imagem: facialImg,
    imagemMobile: facialImgMobile,
    imagemAlt: 'Limpeza de pele profissional em clínica de estética',
    visivel: true,
  },
  {
    slug: 'microagulhamento',
    nome: 'Microagulhamento',
    categorias: ['Facial'],
    explicacao: 'Microestímulos controlados que ativam a renovação da pele e a produção natural de colágeno.',
    beneficios: ['Melhora de poros e textura', 'Suavização de cicatrizes de acne e linhas finas', 'Pele mais firme e uniforme'],
    resultado: 'Melhora gradual, conforme a resposta da pele e o número de sessões indicado na avaliação.',
    imagem: microagulhamentoImg,
    imagemMobile: microagulhamentoImgMobile,
    imagemAlt: 'Imagem ilustrativa de microagulhamento facial com caneta de tratamento',
    visivel: true,
  },
  {
    slug: 'laser-lavieen',
    destaque: true,
    nome: 'Laser Lavieen',
    categorias: ['Facial'],
    explicacao: 'Tecnologia a laser que renova a textura e o viço da pele de forma superficial.',
    beneficios: ['Tom mais uniforme e manchas suavizadas', 'Poros mais refinados', 'Glow e viço'],
    resultado: 'Pele com aspecto mais luminoso e uniforme, com melhora progressiva ao longo das sessões.',
    imagem: laserImg,
    imagemMobile: laserImgMobile,
    imagemAlt: 'Imagem ilustrativa de tratamento facial a laser com proteção ocular',
    visivel: true,
  },
  {
    slug: 'ultraformer-mpt',
    destaque: true,
    nome: 'Ultraformer MPT',
    categorias: ['Facial'],
    explicacao: 'Tecnologia de ultrassom micro e macrofocado que age nas camadas profundas da pele para estimular o colágeno e promover efeito lifting sem cirurgia.',
    beneficios: ['Efeito lifting', 'Redução da flacidez', 'Definição de contornos'],
    resultado: 'Melhora gradual da firmeza, que evolui com o tempo enquanto o colágeno se reorganiza.',
    imagem: ultraformerImg,
    imagemMobile: ultraformerImgMobile,
    imagemAlt: 'Imagem ilustrativa de ultrassom focado aplicado ao contorno facial',
    visivel: true,
  },
  {
    slug: 'visage',
    nome: 'Visage',
    categorias: ['Facial'],
    explicacao: 'Versão mais leve da tecnologia de ultrassom focado do Ultraformer, indicada para a prevenção da flacidez e para peles maduras que precisam de mais firmeza e estrutura.',
    beneficios: ['Estímulo gradual do colágeno', 'Ação preventiva contra a flacidez', 'Auxilia a fortalecer a pele madura'],
    resultado: 'Pele mais firme e resistente, com melhora gradual ao longo das sessões.',
    imagem: visageImg,
    imagemMobile: visageImgMobile,
    imagemAlt: 'Imagem ilustrativa de cuidado tecnológico para firmeza da pele madura',
    visivel: true,
  },
  {
    slug: 'peeling-clareador',
    nome: 'Peeling Clareador',
    categorias: ['Facial'],
    explicacao: 'Aplicação de ácidos que renova as camadas da pele e ajuda a clarear manchas.',
    beneficios: ['Clareamento de manchas', 'Tom mais uniforme', 'Textura renovada'],
    resultado: 'Pele com tom mais uniforme, seguindo o protocolo definido na avaliação e o uso diário de protetor solar.',
    imagem: peelingImg,
    imagemMobile: peelingImgMobile,
    imagemAlt: 'Imagem ilustrativa de aplicação de peeling facial com pincel',
    visivel: true,
  },
  {
    slug: 'rejuvenescimento',
    nome: 'Rejuvenescimento',
    categorias: ['Facial'],
    explicacao: 'Protocolos personalizados que combinam técnicas e tecnologias para tratar os sinais do tempo.',
    beneficios: ['Linhas finas suavizadas', 'Pele mais firme e viçosa', 'Plano feito para a sua pele'],
    resultado: 'Aparência mais descansada e renovada, de forma natural.',
    imagem: rejuvenescimentoImg,
    imagemMobile: rejuvenescimentoImgMobile,
    imagemAlt: 'Imagem ilustrativa de cuidado facial personalizado para pele madura',
    visivel: true,
  },
  {
    slug: 'estimulo-de-colageno',
    nome: 'Estímulo de Colágeno',
    categorias: ['Facial'],
    explicacao: 'Tratamentos que estimulam a pele a produzir mais colágeno e elastina.',
    beneficios: ['Mais firmeza e elasticidade', 'Textura mais uniforme', 'Ação preventiva contra a flacidez'],
    resultado: 'Pele mais firme e resistente, com melhora progressiva.',
    imagem: colagenoImg,
    imagemMobile: colagenoImgMobile,
    imagemAlt: 'Imagem ilustrativa de tecnologia facial para estímulo de colágeno',
    visivel: true,
  },
  {
    slug: 'hipro',
    nome: 'Hipro',
    categorias: ['Facial', 'Corporal'],
    explicacao: 'Ultrassom microfocado que atua em diferentes profundidades da pele, no rosto e no corpo, para estimular o colágeno e promover efeito lifting sem cirurgia.',
    beneficios: ['Estímulo da produção de colágeno', 'Redução da flacidez facial e corporal', 'Mais firmeza e elasticidade'],
    resultado: 'Melhora gradual da firmeza e do contorno, que evolui nas semanas seguintes à sessão.',
    imagem: hiproImg,
    imagemMobile: hiproImgMobile,
    imagemAlt: 'Imagem ilustrativa de ultrassom focado para firmeza corporal',
    visivel: true,
  },
  {
    slug: 'drenagem-linfatica',
    nome: 'Drenagem Linfática Manual',
    categorias: ['Corporal'],
    explicacao: 'Técnica manual com movimentos suaves e ritmados que estimulam a circulação linfática.',
    beneficios: ['Redução da retenção de líquidos e do inchaço', 'Sensação de leveza', 'Relaxamento profundo'],
    resultado: 'Corpo mais leve e desinchado, com melhores resultados quando feita com regularidade.',
    imagem: drenagemImg,
    imagemMobile: drenagemImgMobile,
    imagemAlt: 'Imagem ilustrativa de drenagem linfática manual nas pernas',
    visivel: true,
  },
  {
    slug: 'drenagem-pos-operatoria',
    nome: 'Drenagem Pós-operatória',
    categorias: ['Corporal'],
    explicacao: 'Cuidado específico para a recuperação depois de cirurgias, sempre com liberação do médico responsável.',
    beneficios: ['Auxilia na redução do edema e do inchaço', 'Ajuda a diminuir a sensação de peso e desconforto', 'Acompanhamento durante a recuperação'],
    resultado: 'Uma recuperação mais confortável, seguindo a orientação médica.',
    imagem: posOperatorioImg,
    imagemMobile: posOperatorioImgMobile,
    imagemAlt: 'Imagem ilustrativa de cuidado suave com membro usando malha de compressão',
    visivel: true,
  },
  {
    slug: 'estetica-corporal',
    nome: 'Estética Corporal',
    categorias: ['Corporal'],
    explicacao: 'Tratamentos para celulite, gordura localizada, flacidez e estrias.',
    beneficios: ['Melhora do aspecto da celulite', 'Auxilia na redução de gordura localizada', 'Mais firmeza e estrias suavizadas'],
    resultado: 'Evolução gradual, com protocolo personalizado e orientações para manter o resultado.',
    imagem: corporalImg,
    imagemMobile: corporalImgMobile,
    imagemAlt: 'Imagem ilustrativa de tratamento de estética corporal na região da coxa',
    visivel: true,
  },
  {
    slug: 'massagem-relaxante',
    nome: 'Massagem Relaxante',
    categorias: ['Bem-estar'],
    explicacao: 'Massagem para aliviar a tensão do corpo e proporcionar uma pausa na rotina.',
    beneficios: ['Alívio da tensão muscular', 'Relaxamento e redução do estresse', 'Sensação de leveza'],
    resultado: 'Corpo e mente mais leves já ao final da sessão.',
    imagem: massagemImg,
    imagemMobile: massagemImgMobile,
    imagemAlt: 'Imagem ilustrativa de massagem relaxante nos ombros',
    visivel: true,
  },
];

export const whatsappCatalogo = (nome: string) =>
  `https://wa.me/5513997846585?text=${encodeURIComponent(`Olá, Elizabeth! Vi o catálogo no site e gostaria de saber mais sobre ${nome}.`)}`;
