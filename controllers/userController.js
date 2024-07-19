// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const SECRET_KEY = 'your_jwt_secret_key';

exports.list = async (req, res) => {
  try {
    const users = await UserModel.list();
    res.json(users);
  } catch (error) {
    console.error('Error in list function:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in getUserById function:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserModel.create(name, email, hashedPassword);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error('Error in register function:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login function:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await UserModel.update(id, updates);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error in update function:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.delete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in delete function:', error);
    res.status(400).json({ error: error.message });
  }
};