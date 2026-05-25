const token = localStorage.getItem("pmcoreToken");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePassword = document.getElementById("profilePassword");
const profileForm = document.getElementById("profileForm");
const profilePlanArea = document.getElementById("profilePlanArea");
const deleteAccountButton = document.getElementById("deleteAccountButton");

if (!token) {
  window.location.href = "login.html";
}

async function requisicaoAutenticada(url, metodo = "GET", dados = null) {
  const config = {
    method: metodo,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  if (dados) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(dados);
  }

  const resposta = await fetch(url, config);
  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.mensagem || "Erro na requisição.");
  }

  return resultado;
}

function encerrarSessao() {
  localStorage.removeItem("pmcoreToken");
  localStorage.removeItem("pmcoreUsuario");
}

function renderizarPlano(plano) {
  if (!plano || !plano.tipo) {
    profilePlanArea.innerHTML = `
      <div class="profile-empty-plan-card">
        <p>Você não possui nenhum plano.</p>
      </div>
    `;

    return;
  }

  const tipoPlano = plano.tipo === "pro" ? "pro" : "basico";
  const nomePlano = tipoPlano === "pro" ? "Pro" : "Básico";

  const recursosBasico = `
    <li>Até 3 projetos</li>
    <li>Relatório simples</li>
    <li>Suporte por e-mail</li>
  `;

  const recursosPro = `
    <li>Projetos ilimitados</li>
    <li>Indicadores avançados</li>
    <li>Suporte prioritário</li>
  `;

  const recursos = tipoPlano === "pro" ? recursosPro : recursosBasico;

  profilePlanArea.innerHTML = `
    <div class="profile-plan-card">
      <h3>${nomePlano}</h3>

      <ul>
        ${recursos}
      </ul>

      <div class="profile-plan-actions">
        <a href="detalhes-plano.html?plano=${tipoPlano}" class="profile-details-button">
          🔍 Ver detalhes
        </a>

        <a href="dashboard.html" class="profile-access-button">
          Acessar Ambiente
        </a>
      </div>
    </div>
  `;
}

async function carregarPerfil() {
  try {
    const resultado = await requisicaoAutenticada("/api/user/profile");
    const usuario = resultado.usuario;

    localStorage.setItem("pmcoreUsuario", JSON.stringify(usuario));

    profileName.value = usuario.nome || "";
    profileEmail.value = usuario.email || "";
    profilePassword.value = "";

    profilePassword.placeholder = "Nova senha opcional";

    if (!usuario.nome) {
      profileName.disabled = false;
    }

    renderizarPlano(usuario.plano);
  } catch (error) {
    alert(error.message);
    encerrarSessao();
    window.location.href = "login.html";
  }
}

const editButtons = document.querySelectorAll(".edit-field-button");

editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputId = button.getAttribute("data-edit");
    const input = document.getElementById(inputId);

    input.disabled = !input.disabled;

    if (!input.disabled) {
      input.focus();
    }
  });
});

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dadosAtualizados = {
    nome: profileName.value.trim(),
    email: profileEmail.value.trim()
  };

  if (profilePassword.value.trim()) {
    dadosAtualizados.senha = profilePassword.value;
  }

  try {
    const resultado = await requisicaoAutenticada(
      "/api/user/profile",
      "PUT",
      dadosAtualizados
    );

    localStorage.setItem("pmcoreUsuario", JSON.stringify(resultado.usuario));

    profileName.disabled = true;
    profileEmail.disabled = true;
    profilePassword.disabled = true;
    profilePassword.value = "";

    alert("Alterações salvas com sucesso.");
  } catch (error) {
    alert(error.message);
  }
});

deleteAccountButton.addEventListener("click", async () => {
  const confirmar = confirm("Tem certeza que deseja excluir sua conta?");

  if (!confirmar) {
    return;
  }

  try {
    await requisicaoAutenticada("/api/user/profile", "DELETE");

    encerrarSessao();

    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});

carregarPerfil();