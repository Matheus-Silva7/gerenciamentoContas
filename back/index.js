const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000;
const database = require("./dbConnect");
const UserSchema = require("./models/userModel"); 
const ContaSchema = require("./models/contasModel"); 


app.use(cors({
  origin: '*', // Permite todas as origens
}));


app.use(express.json());


(async () => {
  try {
    await database.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

  
    await database.sync(); 
    console.log('Banco de dados sincronizado e tabelas criadas.');

    const userRoutes = require("./routes/userRoutes");
    const contaRoutes = require("./routes/contaRoutes");
    
    app.use("/user", userRoutes);
    app.use("/conta", contaRoutes);

    // Inicia o servidor
    app.listen(port, () => {
      console.log("Servidor online, porta: " + port);
    });
  } catch (err) {
    console.error('Erro ao sincronizar o banco de dados:', err);
  }
})();
 