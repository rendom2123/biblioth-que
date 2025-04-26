const express = require('express');
const router = express.Router();
const Emprunt = require('../models/Emprunt');
const Etudiant = require('../models/Etudiant');
const Livre = require('../models/Livre');

// Créer un emprunt
router.post('/', async (req, res) => {
  try {
    const emprunt = await Emprunt.create(req.body);
    res.status(201).json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les emprunts
router.get('/', async (req, res) => {
  try {
    const emprunts = await Emprunt.findAll({
      include: [Etudiant, Livre],
    });
    res.json(emprunts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un emprunt par ID
router.get('/:id', async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id, {
      include: [Etudiant, Livre],
    });
    if (emprunt) {
      res.json(emprunt);
    } else {
      res.status(404).json({ error: 'Emprunt non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un emprunt (ex. marquer comme retourné)
router.put('/:id', async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id);
    if (emprunt) {
      await emprunt.update(req.body);
      res.json(emprunt);
    } else {
      res.status(404).json({ error: 'Emprunt non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un emprunt
router.delete('/:id', async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id);
    if (emprunt) {
      await emprunt.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Emprunt non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;