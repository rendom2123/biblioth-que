const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON
app.use(express.static('public')); // Servir les fichiers statiques depuis le dossier public

// Importer les routes
const etudiantsRouter = require('./routes/etudiants');
const livresRouter = require('./routes/livres');
const empruntsRouter = require('./routes/emprunts');

// Utiliser les routes
app.use('/api/etudiants', etudiantsRouter);
app.use('/api/livres', livresRouter);
app.use('/api/emprunts', empruntsRouter);

// Synchroniser la base de données et démarrer le serveur
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log('Base de données synchronisée');
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}).catch((error) => {
  console.error('Erreur lors de la synchronisation de la base de données:', error);
});