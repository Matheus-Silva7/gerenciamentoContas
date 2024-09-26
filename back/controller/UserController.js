const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/* Criando novo usuário */
exports.createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe
    const findUser = await User.findOne({ where: { email } });
    
    if (findUser) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    // Criptografa a senha e cria um novo usuário
    const hashedSenha = await bcrypt.hash(senha, 12);
    const newUser = await User.create({
      nome,
      email,
      senha: hashedSenha,
    });

    return res.status(201).json({ message: "Usuário criado com sucesso!", newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor", error });
  }
};

/* Fazendo login do usuário e gerando token */
exports.signinUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se a senha é válida
    const senhaIsEqual = await bcrypt.compare(senha, user.senha);
    if (!senhaIsEqual) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Gera um token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        nome: user.nome,
        email: user.email,
      },
      "MinhaChaveApiContas",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Usuário logado com sucesso!",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor", error });
  }
};

/* Obtendo perfil do usuário */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Use o userId definido pelo middleware

    const userData = await User.findOne({ where: { id: userId } });

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao obter perfil", error });
  }
};
