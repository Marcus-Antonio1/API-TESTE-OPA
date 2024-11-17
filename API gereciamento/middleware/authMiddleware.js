// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodifica o token e atribui ao req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Acesso negado. Token inválido." });
  }
};

module.exports = authMiddleware;