const { Sequelize, DataTypes } = require("sequelize");
const database = require("../dbConnect");

const Conta = database.define("Conta", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  dataVencimento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dataCadastro: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  status: {
    type: Sequelize.ENUM('paga', 'pendente'),
    allowNull: false,
    defaultValue: 'pendente',
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Usuarios", 
      key: "id",
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Conta;
