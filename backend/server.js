// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const User = require('./src/User');

// Middleware pour JSON
app.use(express.json());

// Route test GET
app.get('/', (req, res) => {
  res.send('Backend CodeArena fonctionne !');
});

// Route POST pour créer un utilisateur
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé !', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Connexion MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connexion MongoDB réussie !');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Erreur de connexion MongoDB :', err);
});
