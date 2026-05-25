const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

function gerarToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function formatarUsuario(user) {
  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
    plano: user.plano
  };
}

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Nome, e-mail e senha são obrigatórios."
      });
    }

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Este e-mail já está cadastrado."
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    const token = gerarToken(novoUsuario._id);

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso.",
      token,
      usuario: formatarUsuario(novoUsuario)
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar usuário."
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "E-mail e senha são obrigatórios."
      });
    }

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    const token = gerarToken(usuario._id);

    return res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: formatarUsuario(usuario)
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao fazer login."
    });
  }
});

module.exports = router;