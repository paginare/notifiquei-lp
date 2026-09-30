// Novidades do produto (/novidades), tiradas do histórico do instaV2 (git log da
// main). Só entra o que o cliente percebe e que continua ligado hoje. Mais recente
// primeiro. tipo: novo | melhoria | correcao.
export interface Novidade { data: string; tipo: "novo" | "melhoria" | "correcao"; titulo: string; texto: string }
export interface Mes { mes: string; itens: Novidade[] }

export const novidades: Mes[] = [
  {
    mes: "Setembro de 2026",
    itens: [
      { data: "2026-09-25", tipo: "melhoria", titulo: "Nova identidade visual", texto: "Cores, ícone e imagens do Notifiquei renovados no painel, nos apps e no site." },
      { data: "2026-09-16", tipo: "melhoria", titulo: "Conta com acesso vencido para de travar a fila", texto: "Quando o acesso de uma conta cai, o sistema para de tentar à toa e avisa pra reconectar." },
      { data: "2026-09-14", tipo: "novo", titulo: "Link direto já na primeira mensagem", texto: "A primeira mensagem do direct no Instagram já pode levar o seu link." },
      { data: "2026-09-11", tipo: "novo", titulo: "Plano Duo", texto: "Duas contas e trabalho em equipe por R$ 198/mês." },
      { data: "2026-09-11", tipo: "melhoria", titulo: "Responder “quero” por texto também avança", texto: "Além do botão, a pessoa pode responder por escrito e o fluxo segue." },
      { data: "2026-09-05", tipo: "novo", titulo: "Aviso de post sem comentários chegando", texto: "O sistema percebe quando um post para de receber comentários da Meta e acelera a busca." },
      { data: "2026-09-05", tipo: "novo", titulo: "Aviso de instabilidade no painel", texto: "Se houver um problema geral, um aviso aparece no topo do painel na hora." },
      { data: "2026-09-04", tipo: "novo", titulo: "Detecção de post bloqueado pela Meta", texto: "Você fica sabendo antes que um post está com as respostas bloqueadas." },
    ],
  },
  {
    mes: "Agosto de 2026",
    itens: [
      { data: "2026-08-27", tipo: "melhoria", titulo: "Análise de sentimento opcional", texto: "A leitura de sentimento dos comentários por IA agora é uma escolha sua (vem desligada)." },
      { data: "2026-08-17", tipo: "novo", titulo: "Painel em português, inglês e espanhol", texto: "O painel e os e-mails falam a língua de cada cliente. “Duplicar” abre o assistente já preenchido." },
      { data: "2026-08-16", tipo: "novo", titulo: "Comentário em live e lembrete depois da entrega", texto: "Novo gatilho pra comentários em live e um lembrete automático pra quem não clicou." },
      { data: "2026-08-15", tipo: "novo", titulo: "Novo assistente de criação", texto: "Crie automação em passos simples, com resposta pública variada (até 3 versões) e a versão de story no mesmo fluxo. Também nos apps." },
      { data: "2026-08-12", tipo: "novo", titulo: "Vitrine de produtos no direct", texto: "Mande vários produtos de uma vez, em carrossel, e escolha em qual story a automação vale." },
      { data: "2026-08-12", tipo: "melhoria", titulo: "Limite da Meta não perde contato", texto: "Quando a Meta limita os envios, a mensagem é reagendada e enviada depois." },
      { data: "2026-08-11", tipo: "melhoria", titulo: "Espera em segundos e aviso do TikTok", texto: "A etapa de espera aceita segundos, e o painel avisa antes quando o TikTok precisa ser conta empresarial." },
      { data: "2026-08-10", tipo: "melhoria", titulo: "Cancelou? Usa até o fim do período", texto: "Ao cancelar, o acesso continua até o fim do período já pago." },
      { data: "2026-08-07", tipo: "novo", titulo: "Remover uma conta conectada", texto: "Dá pra tirar de vez uma conta que você não usa mais." },
      { data: "2026-08-06", tipo: "melhoria", titulo: "Áudio em qualquer formato", texto: "Áudios em mp3 ou ogg são convertidos sozinhos pro formato que o direct aceita." },
      { data: "2026-08-05", tipo: "novo", titulo: "Chaves de API no painel", texto: "Gere e revogue suas próprias chaves — base pra criar automações conversando com o Claude." },
    ],
  },
  {
    mes: "Julho de 2026",
    itens: [
      { data: "2026-07-28", tipo: "melhoria", titulo: "Apps com a cara da marca", texto: "Nova tela de entrada nos apps de iPhone e Android." },
      { data: "2026-07-24", tipo: "correcao", titulo: "Conta desconectada não ocupa vaga", texto: "Contas desconectadas deixam de contar no limite do seu plano." },
      { data: "2026-07-07", tipo: "novo", titulo: "Plano B quando a Meta falha", texto: "Se a Meta para de avisar sobre comentários novos, o Notifiquei vai buscá-los sozinho." },
      { data: "2026-07-07", tipo: "novo", titulo: "Aviso de acesso às mensagens desligado", texto: "O painel avisa quando o Instagram está bloqueando os directs automáticos e mostra como liberar." },
      { data: "2026-07-02", tipo: "melhoria", titulo: "Painel de cara nova", texto: "Barra de topo, destaques e cartões mais leves." },
    ],
  },
];
