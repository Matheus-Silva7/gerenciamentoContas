const ContaModel = require("../models/contasModel"); // Renomeado para evitar conflito

// Criar nova conta
exports.createConta = async (req, res) => {
  const { nome, valor, dataVencimento,status } = req.body;

  try {
    const newConta = await ContaModel.create({
      nome,
      valor,
      dataVencimento,
      status,
      usuarioId: req.userId, // Relaciona a conta ao usuário autenticado
    });

    return res.status(201).json({ message: "Conta criada com sucesso!", newConta });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor", error });
  }
};

// Listar todas as contas do usuário
exports.getContas = async (req, res) => {
  try {
    const contas = await ContaModel.findAll({
      where: { usuarioId: req.userId }, // Busca apenas as contas do usuário autenticado
    });

    return res.status(200).json({ contas });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao obter contas", error });
  }
};

// Obter detalhes de uma conta específica
exports.getContaById = async (req, res) => {
  const { id } = req.params;

  try {
    const conta = await ContaModel.findOne({
      where: { id, usuarioId: req.userId }, // Verifica se a conta pertence ao usuário
    });

    if (!conta) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    return res.status(200).json({ conta });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao obter conta", error });
  }
};

// Atualizar uma conta
exports.updateConta = async (req, res) => {
  const { id } = req.params;
  const { nome, valor, dataVencimento, status } = req.body;

  try {
    const conta = await ContaModel.findOne({
      where: { id, usuarioId: req.userId },
    });

    if (!conta) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    conta.nome = nome;
    conta.valor = valor;
    conta.dataVencimento = dataVencimento;
    conta.status = status

    await conta.save();

    return res.status(200).json({ message: "Conta atualizada com sucesso!", conta });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar conta", error });
  }
};

// Deletar uma conta
exports.deleteConta = async (req, res) => {
  const { id } = req.params;

  try {
    const conta = await ContaModel.findOne({
      where: { id, usuarioId: req.userId },
    });

    if (!conta) {
      return res.status(404).json({ message: "Conta não encontrada" });
    }

    await conta.destroy();

    return res.status(200).json({ message: "Conta deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar conta", error });
  }
};
