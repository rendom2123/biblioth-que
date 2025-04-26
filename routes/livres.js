const express = require('express');
const router = express.Router();
const Livre = require('../models/Livre');

// Créer un livre (CREATE)
router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Le corps de la requête est vide.' });
    }
    const { titre, auteur, isbn } = req.body;
    if (!titre || !auteur || !isbn) {
      return res.status(400).json({ error: 'Les champs titre, auteur et isbn sont requis.' });
    }
    const livre = await Livre.create(req.body);
    res.status(201).json(livre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lire tous les livres (READ)
router.get('/', async (req, res) => {
  try {
    const livres = await Livre.findAll();
    res.status(200).json(livres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lire un livre par ID (READ)
router.get('/:id', async (req, res) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    if (!livre) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }
    res.status(200).json(livre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un livre (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    if (!livre) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }
    if (!req.body) {
      return res.status(400).json({ error: 'Le corps de la requête est vide.' });
    }
    const { titre, auteur, isbn } = req.body;
    if (!titre || !auteur || !isbn) {
      return res.status(400).json({ error: 'Les champs titre, auteur et isbn sont requis.' });
    }
    await livre.update(req.body);
    res.status(200).json(livre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un livre (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    if (!livre) {
      return res.status(404).json({ error: 'Livre non trouvé.' });
    }
    await livre.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;