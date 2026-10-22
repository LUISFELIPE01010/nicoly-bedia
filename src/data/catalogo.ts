import facialImg from '@/assets/catalogo/facial.jpg';
import tecnologiaImg from '@/assets/catalogo/tecnologia.jpg';
import posOperatorioImg from '@/assets/catalogo/pos-operatorio.jpg';

export type Categoria = 'Facial' | 'Corporal' | 'Bem-estar';

export interface Procedimento {
  slug: string;
  nome: string;
  categorias: Categoria[];
  explicacao: string;
  beneficios: string[];
  resultado: string;
  imagem: string;
  imagemAlt: string;
  visivel: boolean;
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
    imagem: '/lovable-uploads/depois-1.jpg',
    imagemAlt: 'Resultado de microagulhamento na pele do rosto',
    visivel: true,
  },
  {
    slug: 'laser-lavieen',
    nome: 'Laser Lavieen',
    categorias: ['Facial'],
    explicacao: 'Tecnologia a laser que renova a textura e o viço da pele de forma superficial.',
    beneficios: ['Tom mais uniforme e manchas suavizadas', 'Poros mais refinados', 'Glow e viço'],
    resultado: 'Pele com aspecto mais luminoso e uniforme, com melhora progressiva ao longo das sessões.',
    imagem: tecnologiaImg,
    imagemAlt: 'Equipamento de laser estético em clínica',
    visivel: true,
  },
  {
    slug: 'ultraformer-mpt',
    nome: 'Ultraformer MPT',
    categorias: ['Facial'],
    explicacao: 'Tecnologia de ultrassom micro e macrofocado que age nas camadas profundas da pele para estimular o colágeno e promover efeito lifting sem cirurgia.',
    beneficios: ['Efeito lifting', 'Redução da flacidez', 'Definição de contornos'],
    resultado: 'Melhora gradual da firmeza, que evolui com o tempo enquanto o colágeno se reorganiza.',
    imagem: '/lovable-uploads/elizabeth-gut-1.png',
    imagemAlt: 'Elizabeth Gut em sua clínica com equipamentos de estética',
    visivel: true,
  },
  {
    slug: 'visage',
    nome: 'Visage',
    categorias: ['Facial'],
    explicacao: 'Versão mais leve da tecnologia de ultrassom focado do Ultraformer, indicada para a prevenção da flacidez e para peles maduras que precisam de mais firmeza e estrutura.',
    beneficios: ['Estímulo gradual do colágeno', 'Ação preventiva contra a flacidez', 'Auxilia a fortalecer a pele madura'],
    resultado: 'Pele mais firme e resistente, com melhora gradual ao longo das sessões.',
    imagem: tecnologiaImg,
    imagemAlt: 'Tecnologia de ultrassom focado para firmeza da pele',
    visivel: true,
  },
  {
    slug: 'peeling-clareador',
    nome: 'Peeling Clareador',
    categorias: ['Facial'],
    explicacao: 'Aplicação de ácidos que renova as camadas da pele e ajuda a clarear manchas.',
    beneficios: ['Clareamento de manchas', 'Tom mais uniforme', 'Textura renovada'],
    resultado: 'Pele com tom mais uniforme, seguindo o protocolo definido na avaliação e o uso diário de protetor solar.',
    imagem: '/lovable-uploads/depois-melasma.png',
    imagemAlt: 'Resultado de peeling clareador em pele com manchas',
    visivel: true,
  },
  {
    slug: 'rejuvenescimento',
    nome: 'Rejuvenescimento',
    categorias: ['Facial'],
    explicacao: 'Protocolos personalizados que combinam técnicas e tecnologias para tratar os sinais do tempo.',
    beneficios: ['Linhas finas suavizadas', 'Pele mais firme e viçosa', 'Plano feito para a sua pele'],
    resultado: 'Aparência mais descansada e renovada, de forma natural.',
    imagem: '/lovable-uploads/depois-lifting.png',
    imagemAlt: 'Resultado de protocolo de rejuvenescimento facial',
    visivel: true,
  },
  {
    slug: 'estimulo-de-colageno',
    nome: 'Estímulo de Colágeno',
    categorias: ['Facial'],
    explicacao: 'Tratamentos que estimulam a pele a produzir mais colágeno e elastina.',
    beneficios: ['Mais firmeza e elasticidade', 'Textura mais uniforme', 'Ação preventiva contra a flacidez'],
    resultado: 'Pele mais firme e resistente, com melhora progressiva.',
    imagem: '/lovable-uploads/d96c0b93-efa5-494a-a668-fb520d37c8b7.jpg',
    imagemAlt: 'Pele firme e saudável após estímulo de colágeno',
    visivel: true,
  },
  {
    slug: 'hipro',
    nome: 'Hipro',
    categorias: ['Facial', 'Corporal'],
    explicacao: 'Ultrassom microfocado que atua em diferentes profundidades da pele, no rosto e no corpo, para estimular o colágeno e promover efeito lifting sem cirurgia.',
    beneficios: ['Estímulo da produção de colágeno', 'Redução da flacidez facial e corporal', 'Mais firmeza e elasticidade'],
    resultado: 'Melhora gradual da firmeza e do contorno, que evolui nas semanas seguintes à sessão.',
    imagem: tecnologiaImg,
    imagemAlt: 'Equipamento de ultrassom microfocado Hipro',
    visivel: true,
  },
  {
    slug: 'drenagem-linfatica',
    nome: 'Drenagem Linfática Manual',
    categorias: ['Corporal'],
    explicacao: 'Técnica manual com movimentos suaves e ritmados que estimulam a circulação linfática.',
    beneficios: ['Redução da retenção de líquidos e do inchaço', 'Sensação de leveza', 'Relaxamento profundo'],
    resultado: 'Corpo mais leve e desinchado, com melhores resultados quando feita com regularidade.',
    imagem: '/lovable-uploads/hero-bg.png',
    imagemAlt: 'Sala de tratamento corporal da clínica Elizabeth Gut',
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
    imagemAlt: 'Cuidado pós-operatório com curativo em clínica de estética',
    visivel: true,
  },
  {
    slug: 'estetica-corporal',
    nome: 'Estética Corporal',
    categorias: ['Corporal'],
    explicacao: 'Tratamentos para celulite, gordura localizada, flacidez e estrias.',
    beneficios: ['Melhora do aspecto da celulite', 'Auxilia na redução de gordura localizada', 'Mais firmeza e estrias suavizadas'],
    resultado: 'Evolução gradual, com protocolo personalizado e orientações para manter o resultado.',
    imagem: '/lovable-uploads/hero-bg.png',
    imagemAlt: 'Ambiente da clínica para tratamentos corporais',
    visivel: true,
  },
  {
    slug: 'massagem-relaxante',
    nome: 'Massagem Relaxante',
    categorias: ['Bem-estar'],
    explicacao: 'Massagem para aliviar a tensão do corpo e proporcionar uma pausa na rotina.',
    beneficios: ['Alívio da tensão muscular', 'Relaxamento e redução do estresse', 'Sensação de leveza'],
    resultado: 'Corpo e mente mais leves já ao final da sessão.',
    imagem: '/lovable-uploads/7e5bb34e-8a17-42ff-b135-d77451a3aac2.jpg',
    imagemAlt: 'Elizabeth Gut, esteticista, em ambiente acolhedor de bem-estar',
    visivel: true,
  },
];

export const whatsappCatalogo = (nome: string) =>
  `https://wa.me/5513997846585?text=${encodeURIComponent(`Olá, Elizabeth! Vi o catálogo no site e gostaria de saber mais sobre ${nome}.`)}`;
