const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Vérifiez cette ligne
const Etudiant = require('./Etudiant');
const Livre = require('./Livre');

const Emprunt = sequelize.define('Emprunt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateEmprunt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dateRetour: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'emprunts',
  timestamps: false,
});

// Définir les relations
Etudiant.hasMany(Emprunt, { foreignKey: 'etudiantId' });
Livre.hasMany(Emprunt, { foreignKey: 'livreId' });
Emprunt.belongsTo(Etudiant, { foreignKey: 'etudiantId' });
Emprunt.belongsTo(Livre, { foreignKey: 'livreId' });

module.exports = Emprunt;