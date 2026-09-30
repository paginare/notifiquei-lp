// Casos de clientes com autorização do dono (confirmada em 30/09/2026 para
// @resiliencia_humana e @mudeparaevoluir). Números do banco de produção em
// 30/09/2026, arredondados pra baixo; "30 dias" = 31/08 a 30/09.
// Fontes: AutomationExecution COMPLETED (respostas) e TrackedLink (pessoas que
// receberam o link), por conta. Sem taxa de clique: a Resiliência desligou o
// rastreamento de links em set/2026 (enquanto ligado, o banco mediu ~40%).
export const casos = [
  {
    handle: "resiliencia_humana",
    nome: "Resiliência Humana",
    nicho: "Frases e desenvolvimento pessoal",
    seguidores: "12,8 mi",
    desde: "junho de 2026",
    destaque: { valor: "+632 mil", rotulo: "respostas automáticas desde junho" },
    numeros: [
      { valor: "+208 mil", rotulo: "respostas automáticas em 30 dias" },
      { valor: "+104 mil", rotulo: "pessoas receberam o link no direct" },
      { valor: "24", rotulo: "automações ativas" },
    ],
  },
  {
    handle: "mudeparaevoluir",
    nome: "Mude para Evoluir",
    nicho: "Motivação e mentalidade",
    seguidores: "3,6 mi",
    desde: "junho de 2026",
    destaque: { valor: "+358 mil", rotulo: "respostas automáticas desde junho" },
    numeros: [
      { valor: "+111 mil", rotulo: "respostas automáticas em 30 dias" },
      { valor: "5 contas", rotulo: "tocadas pelo mesmo time" },
      { valor: "+200", rotulo: "automações ativas" },
    ],
  },
];

// Outros perfis grandes, SEM nome (não temos autorização de cada cliente):
// só nicho e tamanho. Números do banco em 30/09/2026, últimos 30 dias, contas
// com rastreamento de links ligado. taxa = pessoas que clicaram / pessoas que
// receberam o link (TrackedLink × LinkClick, por participante).
export const casosAnonimos = [
  { icon: "bolt", nicho: "Perfil de treino em casa", seguidores: "1,8 mi", taxa: "78%", respostas: "+34 mil", receberam: "+13 mil" },
  { icon: "heart", nicho: "Perfil de dieta e receitas", seguidores: "1,7 mi", taxa: "69%", respostas: "+19 mil", receberam: "+11 mil" },
  { icon: "chat", nicho: "Comunidade de mulheres 40+", seguidores: "2,3 mi", taxa: "60%", respostas: "+30 mil", receberam: "+23 mil" },
];
