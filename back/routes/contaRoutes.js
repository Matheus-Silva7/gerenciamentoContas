const express = require("express");
const router = express.Router();
const ContaController = require("../controller/ContaController");
const userIsAuth = require("../middleware/userIsAuth");


router.post("/novaConta", userIsAuth, ContaController.createConta);

router.get("/todasContas", userIsAuth, ContaController.getContas);

router.get("/:id", userIsAuth, ContaController.getContaById);

router.put("/:id", userIsAuth, ContaController.updateConta);

router.delete("/:id", userIsAuth, ContaController.deleteConta);

module.exports = router;
