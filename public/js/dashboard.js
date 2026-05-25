const token = localStorage.getItem("pmcoreToken");

if (!token) {
  window.location.href = "login.html";
}

const projetos = [
  {
    nome: "Sistema Interno",
    cliente: "Empresa Alfa",
    progresso: 72,
    status: "Em andamento",
    receita: 18000,
    despesa: 7200
  },
  {
    nome: "Controle Financeiro",
    cliente: "Empresa Beta",
    progresso: 48,
    status: "Atenção",
    receita: 12500,
    despesa: 9100
  },
  {
    nome: "Portal de Relatórios",
    cliente: "Empresa Gama",
    progresso: 91,
    status: "Avançado",
    receita: 22000,
    despesa: 8300
  }
];

const movimentacoes = [
  {
    data: "05/05/2026",
    descricao: "Pagamento de cliente",
    tipo: "Receita",
    valor: 8500
  },
  {
    data: "07/05/2026",
    descricao: "Serviços de desenvolvimento",
    tipo: "Despesa",
    valor: 3200
  },
  {
    data: "12/05/2026",
    descricao: "Nova entrada de projeto",
    tipo: "Receita",
    valor: 12000
  },
  {
    data: "18/05/2026",
    descricao: "Ferramentas e licenças",
    tipo: "Despesa",
    valor: 2100
  }
];

const categorias = [
  {
    nome: "Desenvolvimento",
    valor: 46
  },
  {
    nome: "Operação",
    valor: 28
  },
  {
    nome: "Ferramentas",
    valor: 16
  },
  {
    nome: "Outros",
    valor: 10
  }
];

const dashboardWelcome = document.getElementById("dashboardWelcome");
const dashboardPlanTag = document.getElementById("dashboardPlanTag");
const totalReceitas = document.getElementById("totalReceitas");
const totalDespesas = document.getElementById("totalDespesas");
const saldoFinal = document.getElementById("saldoFinal");
const totalProjetos = document.getElementById("totalProjetos");
const projectsList = document.getElementById("projectsList");
const categoryBars = document.getElementById("categoryBars");
const transactionsTable = document.getElementById("transactionsTable");
const logoutButton = document.getElementById("logoutButton");

async function buscarPerfil() {
  const resposta = await fetch("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.mensagem || "Erro ao buscar perfil.");
  }

  return resultado.usuario;
}

function encerrarSessao() {
  localStorage.removeItem("pmcoreToken");
  localStorage.removeItem("pmcoreUsuario");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function carregarCabecalho(usuario) {
  const nomeUsuario = usuario.nome || "usuário";
  const nomePlano = usuario.plano?.nome || "Plano";

  dashboardWelcome.textContent = `Olá, ${nomeUsuario}. Acompanhe os principais dados financeiros dos seus projetos.`;
  dashboardPlanTag.textContent = nomePlano;
}

function carregarResumo() {
  const receitas = projetos.reduce((total, projeto) => total + projeto.receita, 0);
  const despesas = projetos.reduce((total, projeto) => total + projeto.despesa, 0);
  const saldo = receitas - despesas;

  totalReceitas.textContent = formatarMoeda(receitas);
  totalDespesas.textContent = formatarMoeda(despesas);
  saldoFinal.textContent = formatarMoeda(saldo);
  totalProjetos.textContent = projetos.length;
}

function carregarProjetos() {
  projectsList.innerHTML = "";

  projetos.forEach((projeto) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-card-header">
        <div>
          <h3>${projeto.nome}</h3>
          <p>${projeto.cliente}</p>
        </div>

        <span class="project-status">${projeto.status}</span>
      </div>

      <div class="project-progress-info">
        <span>Progresso</span>
        <strong>${projeto.progresso}%</strong>
      </div>

      <div class="project-progress-bar">
        <div style="width: ${projeto.progresso}%"></div>
      </div>

      <div class="project-financial-row">
        <span>Receita: ${formatarMoeda(projeto.receita)}</span>
        <span>Despesa: ${formatarMoeda(projeto.despesa)}</span>
      </div>
    `;

    projectsList.appendChild(card);
  });
}

function carregarCategorias() {
  categoryBars.innerHTML = "";

  categorias.forEach((categoria) => {
    const item = document.createElement("div");
    item.className = "category-bar-item";

    item.innerHTML = `
      <div class="category-bar-header">
        <span>${categoria.nome}</span>
        <strong>${categoria.valor}%</strong>
      </div>

      <div class="category-bar-track">
        <div style="width: ${categoria.valor}%"></div>
      </div>
    `;

    categoryBars.appendChild(item);
  });
}

function carregarMovimentacoes() {
  transactionsTable.innerHTML = "";

  movimentacoes.forEach((movimentacao) => {
    const row = document.createElement("tr");

    const tipoClasse =
      movimentacao.tipo === "Receita"
        ? "transaction-income"
        : "transaction-expense";

    row.innerHTML = `
      <td>${movimentacao.data}</td>
      <td>${movimentacao.descricao}</td>
      <td>
        <span class="${tipoClasse}">
          ${movimentacao.tipo}
        </span>
      </td>
      <td>${formatarMoeda(movimentacao.valor)}</td>
    `;

    transactionsTable.appendChild(row);
  });
}

async function iniciarDashboard() {
  try {
    const usuario = await buscarPerfil();

    if (!usuario.plano || !usuario.plano.tipo) {
      window.location.href = "perfil.html";
      return;
    }

    localStorage.setItem("pmcoreUsuario", JSON.stringify(usuario));

    carregarCabecalho(usuario);
    carregarResumo();
    carregarProjetos();
    carregarCategorias();
    carregarMovimentacoes();
  } catch (error) {
    alert(error.message);
    encerrarSessao();
    window.location.href = "login.html";
  }
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    encerrarSessao();
    window.location.href = "index.html";
  });
}

iniciarDashboard();