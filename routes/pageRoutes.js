const express = require("express");

const router = express.Router();

function renderPage(view, title, extraData = {}) {
  return (req, res) => {
    res.render(`pages/${view}`, {
      title,
      currentPage: view,
      ...extraData
    });
  };
}

router.get(["/", "/index", "/index.html"], renderPage("index", "PMCore | Início"));

router.get(
  ["/planos", "/planos.html"],
  renderPage("planos", "PMCore | Planos")
);

router.get(
  ["/detalhes-plano", "/detalhes-plano.html"],
  renderPage("detalhes-plano", "PMCore | Detalhes do Plano")
);

router.get(
  ["/pagamento", "/pagamento.html"],
  renderPage("pagamento", "PMCore | Pagamento")
);

router.get(
  ["/login", "/login.html"],
  renderPage("login", "PMCore | Login")
);

router.get(
  ["/cadastro", "/cadastro.html"],
  renderPage("cadastro", "PMCore | Cadastro")
);

router.get(
  ["/contato", "/contato.html"],
  renderPage("contato", "PMCore | Contato")
);

router.get(
  ["/perfil", "/perfil.html"],
  renderPage("perfil", "PMCore | Perfil")
);

router.get(
  ["/dashboard", "/dashboard.html"],
  renderPage("dashboard", "PMCore | Dashboard")
);

module.exports = router;