const express = require("express");
const router = express.Router();
const ContaController = require("../controller/ContaController");
const userIsAuth = require("../middleware/userIsAuth");

// Rota para criar uma nova conta
router.post("/", userIsAuth, ContaController.createConta);

// Rota para listar todas as contas do usuário
router.get("/", userIsAuth, ContaController.getContas);

// Rota para obter uma conta específica
router.get("/:id", userIsAuth, ContaController.getContaById);

// Rota para atualizar uma conta
router.put("/:id", userIsAuth, ContaController.updateConta);

// Rota para deletar uma conta
router.delete("/:id", userIsAuth, ContaController.deleteConta);

module.exports = router;
