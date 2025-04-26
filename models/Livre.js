const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livre = sequelize.define('Livre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  auteur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'livres',
  timestamps: false,
});

module.exports = Livre;