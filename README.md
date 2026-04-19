# Notifiquei · Pacote de assets

Tudo que foi produzido: 3 landing pages, manual de identidade visual (HTML + PDF) e rascunhos anteriores.

## 📁 Estrutura

```
notifiquei-package/
├── landing-pages/
│   ├── index.html        ← Landing principal
│   ├── criadores.html    ← Landing segmentada pra criadores de conteúdo
│   ├── afiliados.html    ← Landing do programa de afiliados (40% recorrente)
│   └── assets/           ← ⚠️ Ver README dentro dessa pasta
│       └── README.md        (instruções pra adicionar servidores-turbo.png + abacatepay.svg)
│
├── brand-manual/
│   ├── manual.html       ← Manual de identidade visual (versão web, c/ navegação)
│   └── manual.pdf        ← Manual em PDF (15 páginas, pronto pra compartilhar)
│
└── drafts/
    ├── v1-clean.html     ← Versão inicial "clean" (descartada)
    └── v2-divertida.html ← Versão inicial "fun" (evoluiu pra index)
```

## ⚠️ Antes de usar em produção

As 3 landings referenciam 2 imagens no rodapé:
- `assets/servidores-turbo.png` — baixa de https://www.notifiquei.com.br/servidores-turbo.png
- `assets/abacatepay.svg` — logo oficial do Abacatepay (pedir ao time deles)

**Sem esses arquivos, as landings continuam funcionando** (tem fallback automático: a servidores-turbo tenta carregar direto do notifiquei.com.br, e a abacatepay mostra `🥑 Abacatepay` como texto estilizado). Mas é melhor ter localmente.

Ver instruções detalhadas em `landing-pages/assets/README.md`.

## 🚀 Como usar

### Abrir localmente
Clica 2x em qualquer `.html` dentro de `landing-pages/`. Abre no navegador. Os links entre as páginas funcionam normalmente via rodapé.

### Subir pra produção
Faz upload da pasta `landing-pages/` pro seu servidor. Ajusta as URLs pra absolutas se preferir (ex: `afiliados.html` → `/afiliados`) configurando o route no hosting.

### Exportar PDF do manual
Abre `brand-manual/manual.html` no Chrome → `Ctrl/Cmd + P` → "Salvar como PDF". Sai um PDF com renderização mais precisa que o `manual.pdf` incluso (Chrome renderiza fontes e SVG melhor que WeasyPrint).

## 🎨 Sistema de design

- **Cor principal:** `#FF1F6D` (rosa brand)
- **Tipografia display:** Bricolage Grotesque (carregada via Google Fonts)
- **Tipografia corpo:** Plus Jakarta Sans
- **Paleta completa + regras:** `brand-manual/manual.html` ou `manual.pdf`

Distribuição de cor segue regra **60/30/10**:
- **~50% cream (#FFF9F3)** em seções de conteúdo
- **~30% cream-2 + brand-light** em quebras secundárias
- **~20% ink (#1A1416)** em momentos de ênfase dramática (vs ManyChat, CTA final)

## ⚙️ Stack técnico

- HTML + CSS + JS vanilla (zero dependências build)
- SVGs inline pra logo e ilustrações
- Animações CSS + IntersectionObserver
- Google Fonts como única dependência externa
- Compatível com todos os navegadores modernos (Chrome, Safari, Firefox, Edge)
- Responsivo: breakpoints em 1100px e 900px

## 📝 Landing pages — o que tem em cada uma

### `index.html` (principal)
Público: qualquer pessoa que vende no Instagram.  
Foco: apresentar o produto, vs ManyChat, pricing.  
Seções: Hero → Como funciona → Dentro da plataforma → Features → vs ManyChat → Planos → FAQ → CTA final.

### `criadores.html`
Público: criadores de conteúdo (infoprodutores, mentoria, curso).  
Foco: monetização de audiência, lançamentos, escalar DMs.  
Seções: Hero → Como funciona → Dentro da plataforma → Features → Casos de uso (lançamento/mentoria/infoproduto) → Planos → FAQ específico → CTA final.

### `afiliados.html`
Público: quem quer ganhar comissão indicando o produto.  
Foco: 40% recorrente enquanto o cliente pagar. Aprovação manual.  
Seções: Hero com dashboard → Como funciona (4 passos) → Pra quem é (6 perfis) → Calculadora de ganhos interativa → Formulário de cadastro → FAQ específico → CTA final.  
Pagamento: via Kiwify ou Cakto (afiliado escolhe).

## 🔗 Navegação entre páginas

Todos os rodapés têm uma coluna **"Notifiquei"** com links cruzados:

| Página | Links cruzados |
|---|---|
| index.html | → Pra criadores · → Programa de afiliados |
| criadores.html | → Página principal · → Programa de afiliados |
| afiliados.html | → Página principal · → Pra criadores |

---

Feito com carinho pra Nutrin / Notifiquei · Abril 2026
