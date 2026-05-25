const planos = {
  basico: {
    tag: "Plano Básico",
    title: "Plano Básico",
    name: "Básico",
    subtitle: "Controle financeiro simples para equipes pequenas.",
    image: "assets/images/plano-basico.jpg",
    imageAlt: "Equipe pequena analisando dados do projeto",
    price: "R$ 49,90/mês ou R$ 508,98/ano",
    billing: "Plano Básico com opção mensal ou anual com 15% de desconto.",
    description:
      "O Plano Básico é voltado para equipes pequenas que precisam sair das planilhas e começar a controlar receitas, despesas e informações principais dos projetos em um único lugar.",
    audience:
      "Indicado para pequenos times, projetos acadêmicos, startups iniciais e empresas que ainda estão começando a estruturar o controle financeiro dos seus projetos.",
    features: [
      "Cadastro e acompanhamento de até 3 projetos",
      "Registro de receitas e despesas",
      "Relatórios financeiros simples",
      "Visualização básica de indicadores",
      "Suporte por e-mail",
      "Teste gratuito de 1 mês"
    ],
    paymentUrl: "pagamento.html?plano=basico&periodo=mensal"
  },

  pro: {
    tag: "Plano Pro",
    title: "Plano Pro",
    name: "Pro",
    subtitle: "Mais controle para equipes com múltiplos projetos.",
    image: "assets/images/plano-pro.jpg",
    imageAlt: "Equipe acompanhando planejamento de projeto",
    price: "R$ 99,90/mês ou R$ 1.018,98/ano",
    billing: "Plano Pro com opção mensal ou anual com 15% de desconto.",
    description:
      "O Plano Pro é voltado para equipes que lidam com mais projetos, precisam acompanhar indicadores de forma mais completa e desejam reduzir falhas no controle financeiro.",
    audience:
      "Indicado para pequenas e médias empresas, equipes de PMC, gestores de projetos e times que precisam acompanhar vários projetos ao mesmo tempo.",
    features: [
      "Projetos ilimitados",
      "Indicadores financeiros avançados",
      "Relatórios mais completos",
      "Controle centralizado de receitas e despesas",
      "Suporte prioritário",
      "Melhor acompanhamento para tomada de decisão"
    ],
    paymentUrl: "pagamento.html?plano=pro&periodo=mensal"
  }
};

const params = new URLSearchParams(window.location.search);
const planoSelecionado = params.get("plano");

const plano = planos[planoSelecionado] || planos.basico;

document.title = `PMCore | ${plano.title}`;

document.getElementById("planTag").textContent = plano.tag;
document.getElementById("planTitle").textContent = plano.title;
document.getElementById("planSubtitle").textContent = plano.subtitle;
document.getElementById("planName").textContent = plano.name;
document.getElementById("planPrice").textContent = plano.price;
document.getElementById("planBilling").textContent = plano.billing;
document.getElementById("planDescription").textContent = plano.description;
document.getElementById("planAudience").textContent = plano.audience;

const planImage = document.getElementById("planImage");
planImage.src = plano.image;
planImage.alt = plano.imageAlt;

const choosePlanButton = document.getElementById("choosePlanButton");
choosePlanButton.href = plano.paymentUrl;

const featuresList = document.getElementById("planFeatures");
featuresList.innerHTML = "";

plano.features.forEach((feature) => {
  const li = document.createElement("li");
  li.textContent = feature;
  featuresList.appendChild(li);
});