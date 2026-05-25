const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

function formatarUsuario(user) {
  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
    plano: user.plano
  };
}

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.userId);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    return res.json({
      usuario: formatarUsuario(usuario)
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar perfil."
    });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await User.findById(req.userId);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado."
      });
    }

    if (nome !== undefined) {
      usuario.nome = nome;
    }

    if (email !== undefined) {
      const emailEmUso = await User.findOne({
        email,
        _id: { $ne: usuario._id }
      });

      if (emailEmUso) {
        return res.status(400).json({
          mensagem: "Este e-mail já está em uso."
        });
      }

      usuario.email = email;
    }

    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.save();

    return res.json({
      mensagem: "Perfil atualizado com sucesso.",
      usuario: formatarUsuario(usuario)
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar perfil."
    });
  }
});

router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);

    return res.json({
      mensagem: "Conta excluída com sucesso."
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao excluir conta."
    });
  }
});

module.exports = router;