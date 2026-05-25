const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token não enviado."
    });
  }

  const partes = authHeader.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      mensagem: "Token inválido."
    });
  }

  const token = partes[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = dados.id;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem: "Token expirado ou inválido."
    });
  }
}

module.exports = authMiddleware;