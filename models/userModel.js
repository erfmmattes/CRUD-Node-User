// models/userModel.js
const db = require('../config/db');

const UserModel = {
  // Listar todos os usuários
  list: async () => {
    try {
      return await db('users').select('id', 'name', 'email');
    } catch (error) {
      throw new Error(`Error listing users: ${error.message}`);
    }
  },

  // Criar um novo usuário
  create: async (name, email, hashedPassword) => {
    try {
      const [userId] = await db('users').insert({ name, email, password: hashedPassword });
      return userId;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  // Encontrar um usuário por email
  findByEmail: async (email) => {
    try {
      const [user] = await db('users').where({ email });
      return user;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  },

  // Encontrar um usuário por ID
  findById: async (id) => {
    try {
      const [user] = await db('users').where({ id });
      return user;
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  },

  // Atualizar um usuário
  update: async (id, updates) => {
    try {
      await db('users').where({ id }).update(updates);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  // Excluir um usuário
  delete: async (id) => {
    try {
      await db('users').where({ id }).del();
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },
};

module.exports = UserModel;