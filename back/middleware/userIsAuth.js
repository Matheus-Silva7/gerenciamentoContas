const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
 
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Cabeçalho de autorização ausente" });
    }

    const token = authHeader.split(" ")[1]; 

    
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }


    const decodedToken = jwt.verify(token, "MinhaChaveApiContas");

    if (!decodedToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.userId = decodedToken.userId;  
    
    next(); 
  } catch (error) {
    console.error("Erro de autenticação:", error.message || error);
    return res.status(500).json({ message: "Erro no servidor ao verificar token", error });
  }
};
