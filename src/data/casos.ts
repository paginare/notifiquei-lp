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
