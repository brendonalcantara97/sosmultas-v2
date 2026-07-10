export type TestimonialItem = {
  name: string;
  time: string;
  initial: string;
  text: string;
  profilePhotoUrl?: string;
};

export const SERVICES = [
  {
    icon: "shield",
    title: "PROCESSO DE SUSPENSÃO E CASSAÇÃO DO DIREITO DE DIRIGIR",
    desc: "Defesas e recursos contra processos de suspensão e cassação do direito de dirigir.",
  },
  {
    icon: "wine",
    title: "LEI SECA - ARTIGO 165 / ARTIGO 165-A",
    desc: "Tanto a constatação de alcoolemia verificada através do etilômetro/bafômetro, como a recusa do teste, são infrações de trânsito passíveis de defesa. A análise caso a caso, e uma defesa especializada, visam assegurar o direito de dirigir do condutor, assim como a busca por nulidades dentro do processo administrativo.",
  },
  {
    icon: "file",
    title: "MULTAS DE TRÂNSITO",
    desc: "Elaboração e acompanhamento de defesas e recursos, nas instâncias previstas pelo Código de Trânsito Brasileiro contra infrações de trânsito. Toda a infração cabe defesa ou recurso.",
  },
  {
    icon: "idcard",
    title: "INFRAÇÃO NA CNH PROVISÓRIA",
    desc: "Defesas e recursos acompanhados de controle periódico buscando assegurar ao condutor o direito à CNH definitiva.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "1",
    icon: "check",
    title: "Triagem inicial",
    desc: "Você envia os documentos e informações do atendimento para triagem inicial.",
  },
  {
    n: "2",
    icon: "chat",
    title: "Análise técnica",
    desc: "A equipe avalia o cenário, os prazos e define o melhor caminho para seguir.",
  },
  {
    n: "3",
    icon: "search",
    title: "Plano de ação",
    desc: "Você recebe orientações claras do que fazer em cada etapa, sem complicação.",
  },
  {
    n: "4",
    icon: "doc",
    title: "Acompanhamento",
    desc: "Monitoramos o andamento e mantemos você atualizado até a finalização do atendimento.",
  },
] as const;

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    name: "Max C. Vaske",
    time: "2 anos atrás",
    initial: "M",
    text: "Excelente atendimento e comprometimento!",
  },
  {
    name: "Joni Saraiva",
    time: "2 anos atrás",
    initial: "J",
    text: "Parabenizo toda a equipe, em especial o Dr. Rodrigo, pela forma ética, profissional e cordial durante meu atendimento.",
  },
  {
    name: "Daniela Jaques",
    time: "um ano atrás",
    initial: "D",
    text: "Excelente profissional, deu todo o suporte e passou segurança no atendimento.",
  },
  {
    name: "Cliente Google",
    time: "há meses",
    initial: "C",
    text: "Atendimento rápido, transparente e resolveram meu caso com total clareza. Recomendo!",
  },
] as const;

export const reviewsByUnit = {
  combined: {
    rating: 4.9,
    userRatingsTotal: 150,
    reviews: TESTIMONIALS,
  },
  poa: {
    rating: 4.9,
    userRatingsTotal: 120,
    reviews: TESTIMONIALS.slice(0, 3),
  },
  capao: {
    rating: 4.9,
    userRatingsTotal: 11,
    reviews: TESTIMONIALS.slice(1),
  },
} as const;

export const PRIVACY_SECTIONS = [
  {
    n: "01",
    title: "Quem somos",
    body: "A SOS Multas é uma assessoria especializada em trânsito, com unidades em Porto Alegre e Capão da Canoa e atendimento online em todo o Brasil. Esta política descreve como tratamos os dados pessoais de quem entra em contato conosco ou utiliza nossos canais.",
  },
  {
    n: "02",
    title: "Dados que coletamos",
    body: "Coletamos apenas os dados necessários para o atendimento: nome, telefone ou WhatsApp, e-mail e informações que você nos envia voluntariamente sobre o seu caso, como número de CNH, infrações e documentos de trânsito. Também podemos coletar dados de navegação, cookies e métricas de acesso para melhorar a experiência no site.",
  },
  {
    n: "03",
    title: "Como usamos seus dados",
    body: "Utilizamos seus dados para responder solicitações, prestar a assessoria contratada, elaborar defesas e recursos, enviar atualizações sobre o seu atendimento e cumprir obrigações legais. Não vendemos nem alugamos seus dados pessoais a terceiros.",
  },
  {
    n: "04",
    title: "Base legal",
    body: "O tratamento é realizado com base no seu consentimento, na execução de contrato ou de procedimentos preliminares a seu pedido, no cumprimento de obrigação legal e no legítimo interesse, sempre nos limites da LGPD.",
  },
  {
    n: "05",
    title: "Compartilhamento",
    body: "Seus dados podem ser compartilhados com órgãos de trânsito e autoridades competentes quando necessário à prestação do serviço, e com prestadores que nos apoiam, como ferramentas de comunicação e hospedagem, sempre sob obrigação de confidencialidade.",
  },
  {
    n: "06",
    title: "Cookies e métricas",
    body: "Utilizamos cookies e ferramentas de análise para entender o uso do site e aprimorar nossos serviços. Você pode gerenciar ou desativar cookies nas configurações do seu navegador.",
  },
  {
    n: "07",
    title: "Segurança e retenção",
    body: "Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda ou alteração. Mantemos os dados apenas pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais.",
  },
  {
    n: "08",
    title: "Seus direitos",
    body: "Você pode solicitar, a qualquer momento, o acesso, a correção, a portabilidade ou a exclusão dos seus dados, bem como revogar o consentimento. Para exercer esses direitos, entre em contato pelos canais indicados abaixo.",
  },
] as const;
