const Sequelize = require("sequelize");

const sequelize = new Sequelize('gerenciamentoContas', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
