// routes/etudiants.js
const express = require('express');
const router = express.Router();
const Etudiant = require('../models/Etudiant');

// Route POST pour créer un étudiant
router.post('/', async (req, res) => {
  try {
    const { nom, email } = req.body;

    // Validation simple
    if (!nom || !email) {
      return res.status(400).json({
        error: 'Les champs nom et email sont requis.',
      });
    }

    const etudiant = await Etudiant.create({ nom, email });
    res.status(201).json(etudiant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// (Optionnel) Route GET pour récupérer les étudiants
router.get('/', async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll();
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
