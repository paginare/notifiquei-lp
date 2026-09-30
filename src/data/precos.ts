// Tabela completa da página /precos. Só entra o que o produto faz hoje (conferido
// no instaV2 em 30/09/2026). true = tem, false = não tem, texto = o limite.
// Colunas do Brasil: Grátis, Solo, Duo e os planos maiores (5 e 10 contas).
export const tabelaPlanos = {
  planos: ["Grátis", "Solo", "Duo", "5 ou 10 contas"],
  grupos: [
    {
      titulo: "Preço e contas",
      linhas: [
        { recurso: "Preço por mês", valores: ["R$ 0", "R$ 99", "R$ 198", "R$ 499 / R$ 799"] },
        { recurso: "Contas do Instagram", valores: ["1", "1", "2", "5 / 10"] },
        { recurso: "DMs do TikTok (mesma marca)", valores: [false, true, true, true] },
        { recurso: "Envios automáticos por mês", valores: ["200", "Ilimitados", "Ilimitados", "Ilimitados"] },
        { recurso: "Contatos e automações", valores: ["Ilimitados", "Ilimitados", "Ilimitados", "Ilimitados"] },
        { recurso: "Sem marca d’água nas mensagens", valores: [false, true, true, true] },
      ],
    },
    {
      titulo: "Automações",
      linhas: [
        { recurso: "Comentário → direct", valores: [true, true, true, true] },
        { recurso: "Resposta a story", valores: [true, true, true, true] },
        { recurso: "Palavra-chave no direct", valores: [true, true, true, true] },
        { recurso: "Quebra-gelo no direct", valores: [true, true, true, true] },
        { recurso: "Modelos prontos", valores: [true, true, true, true] },
        { recurso: "Criar automação conversando com o Claude", valores: [true, true, true, true] },
      ],
    },
    {
      titulo: "Ferramentas",
      linhas: [
        { recurso: "Sorteio pelos comentários", valores: [true, true, true, true] },
        { recurso: "Links rastreados e cliques", valores: [true, true, true, true] },
        { recurso: "Moderação de comentários por palavra", valores: [true, true, true, true] },
        { recurso: "App no iPhone e Android", valores: [true, true, true, true] },
      ],
    },
    {
      titulo: "Equipe e suporte",
      linhas: [
        { recurso: "Times e divisão por equipe", valores: [false, false, true, true] },
        { recurso: "Suporte em português", valores: ["Chat", "Chat", "Chat", "Chat / VIP"] },
        { recurso: "Garantia de 7 dias", valores: ["—", true, true, true] },
      ],
    },
  ],
};
