const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Obtém o token do cabeçalho Authorization
    const token = req.get("Authorization").split(" ")[1];

    // Verifica se o token foi fornecido
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    // Verifica se o token é válido
    const decodedToken = jwt.verify(token, "MinhaChaveApiContas");

    if (!decodedToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Adiciona o ID do usuário à requisição
    req.userId = decodedToken.userId;  // 'userId' deve corresponder ao que você usou ao gerar o token

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor", error });
  }
};
