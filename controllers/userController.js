const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { nmr, email, mdp, nom } = req.body;
  if (!nmr || !email || !mdp || !nom) {
    return res.status(400).send({ message: 'Tous les champs sont demandes.' });
  }
  try {
    const existingUser = await userModel.findUserByUsername(nmr);
    if (existingUser) {
      return res.status(409).send({ message: 'Cet utilisateur existe deja.' });
    }

    const newUser = await userModel.createUser(nmr, email, mdp, nom);
    res.redirect("/login").status(201)
  } catch (error) {
    res.status(500).send({ message: 'Erreur.', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { nmr, mdp } = req.body;
  if (!nmr || !mdp) {
    return res.status(400).send({ message: 'Le numero de telephone et mot de passe sont demandes.' });
  }
  try {
    const user = await userModel.findUserByUsername(nmr);
    if (!user) {
      return res.status(401).send({ message: 'Utilisateur ou mot de passe invalid.' });
    }
    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
      return res.status(401).send({ message: 'Utilisateur ou mot de passe invalid.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.nmr }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expires in 1 hour
    });

    res.send({ message: 'Connecte avec succes!', token });
  } catch (error) {
    res.status(500).send({ message: 'Connexion impossible.', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
