// Central de ajuda (/ajuda) — categorias e seções. Os artigos ficam em
// src/content/ajuda/<categoria>/<slug>.md e apontam para estes ids.
export interface SecaoAjuda { id: string; titulo: string }
export interface CategoriaAjuda {
  id: string;
  titulo: string;
  descricao: string;
  icon: string; // nome do HomeIcon
  secoes: SecaoAjuda[];
}

export const categorias: CategoriaAjuda[] = [
  {
    id: "primeiros-passos",
    titulo: "Primeiros passos",
    descricao: "Conectar o Instagram, criar a primeira automação e conhecer o painel.",
    icon: "bolt",
    secoes: [
      { id: "conta-e-conexao", titulo: "Conta e conexão" },
      { id: "primeira-automacao", titulo: "Sua primeira automação" },
      { id: "celular-e-ia", titulo: "No celular e com IA" },
    ],
  },
  {
    id: "automacoes",
    titulo: "Automações",
    descricao: "Gatilhos, palavras-chave, o que a pessoa recebe e como turbinar.",
    icon: "spark",
    secoes: [
      { id: "gatilhos", titulo: "Quando a automação dispara" },
      { id: "entrega", titulo: "O que a pessoa recebe" },
      { id: "turbinar", titulo: "Turbinar" },
      { id: "sequencias", titulo: "Sequências" },
    ],
  },
  {
    id: "mensagem-nao-chegou",
    titulo: "A mensagem não chegou",
    descricao: "O que conferir quando o direct não chega ou a automação para.",
    icon: "send",
    secoes: [
      { id: "diagnostico", titulo: "Descubra o motivo" },
      { id: "regras-do-instagram", titulo: "Regras do Instagram" },
    ],
  },
  {
    id: "recursos",
    titulo: "Recursos",
    descricao: "Sorteios, links rastreados, TikTok, integrações e API.",
    icon: "chart",
    secoes: [
      { id: "engajamento", titulo: "Sorteios e engajamento" },
      { id: "links-e-resultados", titulo: "Links e resultados" },
      { id: "tiktok", titulo: "TikTok" },
      { id: "integracoes", titulo: "Integrações e API" },
    ],
  },
  {
    id: "conta-e-cobranca",
    titulo: "Conta e cobrança",
    descricao: "Planos, pagamento, equipe, cancelamento e seus dados.",
    icon: "cartao",
    secoes: [
      { id: "planos-e-pagamento", titulo: "Planos e pagamento" },
      { id: "equipe", titulo: "Equipe" },
      { id: "sua-conta", titulo: "Sua conta e seus dados" },
    ],
  },
];

export const categoriaPorId = (id: string) => categorias.find((c) => c.id === id);
