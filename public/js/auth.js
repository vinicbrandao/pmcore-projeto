const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

async function enviarRequisicao(url, metodo, dados) {
  const resposta = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.mensagem || "Erro na requisição.");
  }

  return resultado;
}

function salvarSessao(token, usuario) {
  localStorage.setItem("pmcoreToken", token);
  localStorage.setItem("pmcoreUsuario", JSON.stringify(usuario));
}

/* LOGIN */

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginPassword").value;

    if (!email || !senha) {
      alert("Preencha todos os campos para entrar.");
      return;
    }

    try {
      const resultado = await enviarRequisicao("/api/auth/login", "POST", {
        email,
        senha
      });

      salvarSessao(resultado.token, resultado.usuario);

      window.location.href = "perfil.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

/* CADASTRO */

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const senha = document.getElementById("registerPassword").value;
    const confirmarSenha = document.getElementById("confirmPassword").value;
    const termsCheckbox = document.getElementById("termsCheckbox");

    const registerModal = document.getElementById("registerModal");
    const welcomeUserName = document.getElementById("welcomeUserName");

    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos para criar sua conta.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!termsCheckbox.checked) {
      alert("Você precisa aceitar os termos de uso e política de privacidade.");
      return;
    }

    try {
      const resultado = await enviarRequisicao("/api/auth/register", "POST", {
        nome,
        email,
        senha
      });

      salvarSessao(resultado.token, resultado.usuario);

      welcomeUserName.textContent = `Bem-vindo, ${nome}!`;
      registerModal.classList.add("active");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2500);
    } catch (error) {
      alert(error.message);
    }
  });
}