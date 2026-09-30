// Central de ajuda (/ajuda). Cada resposta foi conferida no código do produto
// (instaV2) em 30/09/2026 — caminhos de menu, limites e prazos. HTML simples é
// permitido (<b>, <ol>, <li>, <a>). Mudou no produto? Mude aqui.
export interface Artigo { id: string; q: string; a: string }
export interface Secao { id: string; titulo: string; icon: string; artigos: Artigo[] }

export const secoes: Secao[] = [
  {
    id: "comecando", titulo: "Começando", icon: "bolt",
    artigos: [
      { id: "conectar-instagram", q: "Como conecto meu Instagram?", a: `<ol><li>No painel, abra <b>Contas</b> e clique em conectar o Instagram.</li><li>Faça login no próprio Instagram e autorize o Notifiquei.</li><li>Espere a sincronização terminar — seus posts e stories aparecem sozinhos.</li></ol><p>A conexão é pelo login oficial do Instagram: você <b>não</b> passa sua senha pra gente e não precisa de Página do Facebook. A conta precisa ser <b>Profissional ou de Criador</b> (é grátis trocar, nas configurações do Instagram).</p>` },
      { id: "primeira-automacao", q: "Como crio minha primeira automação de comentário?", a: `<ol><li>Clique em <b>Nova automação</b> e escolha <b>Comentário em publicação ou Reel</b>.</li><li>Escolha onde vale: um post específico, todos os posts ou o próximo que você publicar.</li><li>Defina as palavras-chave (até 20) — ou deixe valer qualquer comentário.</li><li>Escolha o que a pessoa recebe no direct: um link, um texto ou uma vitrine de produtos.</li><li>Se quiser, ative a resposta pública no comentário (com até 3 variações) e ligue.</li></ol><p>A mensagem do direct aceita até 1.000 caracteres e o botão, até 20.</p>` },
      { id: "modelos", q: "Tem modelo pronto pra começar?", a: `Tem. Veja os <a href="/modelos">modelos prontos</a> — link no direct, cupom, e-book, sorteio, agendamento e outros. No painel, escolha o modelo, troque a palavra e o link e ligue.` },
      { id: "claude", q: "Dá pra criar automação conversando com o Claude?", a: `Dá. No painel há uma página de <b>API</b> onde você gera sua chave e pega o kit pronto. Cole o kit num Projeto do Claude e peça em português: ele acha o post, monta a automação, mostra o resumo pra você confirmar e liga.` },
      { id: "story", q: "Como respondo quem responde meu story?", a: `Crie uma automação com o gatilho <b>Resposta ao story</b> e escolha se vale pra todos os stories ou um específico. Dá pra criar a versão de story junto da automação de comentário, no mesmo passo a passo.` },
    ],
  },
  {
    id: "dm-nao-chegou", titulo: "A mensagem não chegou", icon: "send",
    artigos: [
      { id: "acesso-mensagens", q: "O comentário foi respondido, mas o direct não chegou", a: `Quase sempre é o <b>acesso às mensagens</b> desligado no Instagram. Ative em: <b>Menu → Configurações e atividade → Mensagens e respostas a stories → Pedidos de contato → Ferramentas conectadas → Permitir acesso às mensagens</b>. Sem isso a Meta recusa todo direct automático. O painel mostra um aviso quando detecta o problema.` },
      { id: "limite-meta", q: "A Meta limitou os envios da minha conta. E agora?", a: `Quando o Instagram limita os envios de uma conta por um tempo, o Notifiquei <b>pausa e reenvia sozinho</b> depois — você não perde o contato. Em geral a pausa da Meta dura cerca de 2 horas. Pra evitar, use palavras-chave específicas e mensagens variadas em posts com muito volume.` },
      { id: "uma-por-comentario", q: "Por que a pessoa só recebeu uma mensagem?", a: `É regra da Meta: quem só comentou pode receber <b>uma</b> mensagem por comentário. Quando a pessoa toca no botão ou responde, a conversa fica livre e o fluxo continua. Se ela comentar a mesma palavra de novo, a automação só dispara outra vez depois de 24 horas.` },
      { id: "janela-24h", q: "Consigo mandar mensagem dias depois?", a: `Não. Pela regra da Meta, o direct automático só pode ser enviado até 24 horas depois da última mensagem da pessoa.` },
      { id: "limite-gratis", q: "Estou no plano grátis e parou de enviar", a: `O plano grátis tem <b>200 envios automáticos por mês</b>. Ao chegar no limite, os envios param até o mês virar — ou você assina um plano pago, que não tem limite de envios. Veja os <a href="/precos">planos</a>.` },
      { id: "reconectar", q: "Minha conta aparece como desconectada ou com erro", a: `O acesso do Instagram expirou ou foi removido. Abra <b>Contas</b> e conecte de novo com o mesmo perfil: suas automações continuam lá. O Notifiquei renova o acesso sozinho enquanto a conta está ativa; ele só cai se a senha do Instagram for trocada ou o acesso for revogado.` },
    ],
  },
  {
    id: "recursos", titulo: "Recursos", icon: "spark",
    artigos: [
      { id: "sorteio", q: "Como funciona o sorteio?", a: `No menu <b>Sorteios</b>, escolha a conta, o post, a palavra-chave (opcional) e quantos ganhadores. Cada pessoa conta uma vez, os comentários da sua própria conta ficam de fora e maiúsculas não fazem diferença. “Sortear de novo” troca os ganhadores.` },
      { id: "links", q: "Como vejo quantas pessoas clicaram no link?", a: `Os links das mensagens viram links rastreados. No <b>Relatório de cliques</b> você vê os cliques por automação. Com os <b>links dinâmicos</b>, você dá um apelido pro link e, quando o destino muda, troca num lugar só — todas as automações passam a mandar o novo.` },
      { id: "tiktok", q: "Como conecto o TikTok?", a: `O TikTok entra nos planos pagos e precisa ser uma <b>conta empresarial</b>. No app do TikTok: <b>Menu (☰) → Configurações e privacidade → Conta → Trocar para conta empresarial</b>. Depois conecte em <b>Contas</b> no painel.` },
      { id: "app", q: "Tem aplicativo?", a: `Tem, para iPhone e Android. Pelo app você cria, pausa e acompanha as automações.` },
    ],
  },
  {
    id: "conta", titulo: "Conta e cobrança", icon: "cartao",
    artigos: [
      { id: "planos", q: "Qual a diferença entre os planos?", a: `Grátis: 1 conta do Instagram, 200 envios por mês e marca d’água nas mensagens. Solo (R$ 99/mês): 1 conta, Instagram + TikTok, envios e contatos ilimitados. Duo (R$ 198/mês): 2 contas e trabalho em equipe. Há planos para 5 e 10 contas. No anual você paga 10 meses. <a href="/precos">Ver tabela completa</a>.` },
      { id: "cancelar", q: "Como cancelo?", a: `Sem fidelidade. Fale com a gente pelo WhatsApp ou pelo e-mail e cancelamos. Seu acesso continua até o fim do período já pago. Todo plano pago tem garantia de 7 dias: se pedir nesse prazo, devolvemos 100%.` },
      { id: "pagamento", q: "Quais as formas de pagamento?", a: `No Brasil, PIX ou cartão, em real, pela Cakto. Fora do Brasil, cartão em dólar ou euro, pela Stripe.` },
      { id: "excluir", q: "Como excluo minha conta e meus dados?", a: `Em <b>Configurações → Excluir minha conta</b> (no site ou no app). O acesso é bloqueado na hora e as automações param. Depois de 30 dias os dados são apagados de vez — nesse prazo ainda dá pra desistir falando com o suporte. Mais em <a href="/seguranca">Segurança e LGPD</a>.` },
    ],
  },
];
