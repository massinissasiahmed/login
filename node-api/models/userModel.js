const knex = require('../database/databasepg');
const bcrypt = require('bcrypt');

const createUser = async (nmr, email, mdp, nom) => {
  const hashedPassword = await bcrypt.hash(mdp, 10);
  const [newUser] = await knex('utilisateur').insert({
    nmr, 
    email, 
    mdp: hashedPassword, 
    nom
  }).returning('*');
  return newUser;
};

const findUserByUsername = async (nmr) => {
  const [user] = await knex('utilisateur').where({ nmr }).select();
  return user;
};

module.exports = {
  createUser,
  findUserByUsername
};
