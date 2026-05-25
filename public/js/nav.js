const authLinks = document.querySelectorAll("[data-auth-link]");

function usuarioEstaLogado() {
  const token = localStorage.getItem("pmcoreToken");
  const usuario = localStorage.getItem("pmcoreUsuario");

  return Boolean(token && usuario);
}

authLinks.forEach((link) => {
  if (usuarioEstaLogado()) {
    link.textContent = "Perfil";
    link.href = "perfil.html";
  } else {
    link.textContent = "Entrar";
    link.href = "login.html";
  }
});