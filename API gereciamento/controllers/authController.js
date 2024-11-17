const User = require("../models/User"); 
const bcrypt = require("bcryptjs"); // Para comparar a senha criptografada
const jwt = require("jsonwebtoken"); // Serve para gerar o token JWT

// Objeto para as mensagens deixando mais facil para manutenção
const MESSAGES = {
  USER_NOT_FOUND: "Usuário não encontrado!",
  INCORRECT_PASSWORD: "Senha incorreta!",
  LOGIN_SUCCESS: "Login bem-sucedido!",
  REGISTER_SUCCESS: "Usuário registrado com sucesso!",
  SERVER_ERROR: "Erro, tente novamente mais tarde e verifique as informações.",
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificação do usuário
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }

    // Compara as senhas
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: MESSAGES.INCORRECT_PASSWORD });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: MESSAGES.LOGIN_SUCCESS, token });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificação de duplicidade
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe!" });
    }

    // Registro do usuário
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: MESSAGES.REGISTER_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};
