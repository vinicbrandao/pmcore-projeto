const planosPagamento = {
  basico: {
    tipo: "basico",
    nome: "Plano Básico",
    descricao:
      "Ideal para profissionais autônomos e pequenas equipes. Inclui gestão de até 3 projetos, relatório simples e suporte por e-mail.",
    mensal: "R$ 49,90",
    anual: "R$ 508,98"
  },

  pro: {
    tipo: "pro",
    nome: "Plano Pro",
    descricao:
      "Ideal para equipes com múltiplos projetos. Inclui projetos ilimitados, indicadores avançados, relatórios completos e suporte prioritário.",
    mensal: "R$ 99,90",
    anual: "R$ 1.018,98"
  }
};

const params = new URLSearchParams(window.location.search);

const planoParametro = params.get("plano") || "basico";
const periodoParametro = params.get("periodo") || "mensal";

const planoSelecionado = planosPagamento[planoParametro]
  ? planoParametro
  : "basico";

const plano = planosPagamento[planoSelecionado];

const paymentPlanTitle = document.getElementById("paymentPlanTitle");
const paymentPlanDescription = document.getElementById("paymentPlanDescription");
const paymentPlanPrice = document.getElementById("paymentPlanPrice");
const billingPeriod = document.getElementById("billingPeriod");
const confirmPaymentButton = document.getElementById("confirmPaymentButton");
const paymentModal = document.getElementById("paymentModal");

function atualizarResumoDoPlano() {
  const periodo = billingPeriod.value;
  const preco = plano[periodo];

  const periodoTexto = periodo === "anual" ? "Anual" : "Mensal";

  paymentPlanTitle.textContent = `${plano.nome} (${periodoTexto})`;
  paymentPlanDescription.textContent = plano.descricao;
  paymentPlanPrice.textContent = preco;
}

async function contratarPlano() {
  const token = localStorage.getItem("pmcoreToken");

  if (!token) {
    alert("Você precisa estar logado para contratar um plano.");
    window.location.href = "login.html";
    return;
  }

  const periodo = billingPeriod.value;

  const resposta = await fetch("/api/plans/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      tipo: plano.tipo,
      periodo: periodo
    })
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.mensagem || "Erro ao contratar plano.");
  }

  const usuarioSalvo = JSON.parse(localStorage.getItem("pmcoreUsuario"));

  if (usuarioSalvo) {
    usuarioSalvo.plano = resultado.plano;
    localStorage.setItem("pmcoreUsuario", JSON.stringify(usuarioSalvo));
  }

  paymentModal.classList.add("active");
}

if (billingPeriod) {
  if (periodoParametro === "anual" || periodoParametro === "mensal") {
    billingPeriod.value = periodoParametro;
  } else {
    billingPeriod.value = "mensal";
  }

  atualizarResumoDoPlano();

  billingPeriod.addEventListener("change", atualizarResumoDoPlano);
}

if (confirmPaymentButton) {
  confirmPaymentButton.addEventListener("click", async () => {
    try {
      await contratarPlano();
    } catch (error) {
      alert(error.message);
    }
  });
}