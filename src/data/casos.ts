// Casos de clientes com autorização do dono (confirmada em 30/09/2026 para
// @resiliencia_humana e @mudeparaevoluir). Números do banco de produção em
// 30/09/2026, arredondados pra baixo; "30 dias" = 31/08 a 30/09.
// Fontes: AutomationExecution COMPLETED (respostas), TrackedLink (pessoas que
// receberam o link) e LinkClick (pessoas que clicaram), por conta.
export const casos = [
  {
    handle: "resiliencia_humana",
    nome: "Resiliência Humana",
    nicho: "Frases e desenvolvimento pessoal",
    seguidores: "12,8 mi",
    desde: "junho de 2026",
    destaque: { valor: "43%", rotulo: "de quem recebeu o link clicou" },
    numeros: [
      { valor: "+208 mil", rotulo: "respostas automáticas em 30 dias" },
      { valor: "+104 mil", rotulo: "pessoas receberam o link no direct" },
      { valor: "+44 mil", rotulo: "pessoas clicaram no link" },
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
