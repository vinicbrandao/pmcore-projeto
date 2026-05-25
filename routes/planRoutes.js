const express = require("express");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const planos = {
  basico: {
    tipo: "basico",
    nome: "Plano Básico",
    mensal: "R$ 49,90",
    anual: "R$ 508,98"
  },

  pro: {
    tipo: "pro",
    nome: "Plano Pro",
    mensal: "R$ 99,90",
    anual: "R$ 1.018,98"
  }
};

router.post("/purchase", authMiddleware, async (req, res) => {
  try {
    const { tipo, periodo } = req.body;

    if (!planos[tipo]) {
      return res.status(400).json({
        mensagem: "Plano inválido."
      });
    }

    if (periodo !== "mensal" && periodo !== "anual") {
      return res.status(400).json({
        mensagem: "Período inválido."
      });
    }

    const usuario = await User.findById(req.userId);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    const planoEscolhido = planos[tipo];

    usuario.plano = {
      tipo: planoEscolhido.tipo,
      nome: planoEscolhido.nome,
      periodo,
      preco: planoEscolhido[periodo],
      compradoEm: new Date()
    };

    await usuario.save();

    return res.json({
      mensagem: "Plano contratado com sucesso.",
      plano: usuario.plano
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao contratar plano."
    });
  }
});

module.exports = router;