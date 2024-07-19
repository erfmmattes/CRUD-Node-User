const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

console.log('DB imported in userService'); // Confirme se esta mensagem aparece

const SECRET_KEY = 'your_jwt_secret_key';

exports.registerUser = async (name, email, password) => {
  console.log('Registering user...');
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Inserting into database...');
  const [userId] = await db('users').insert({ name, email, password: hashedPassword });
  console.log('User registered with ID:', userId);
  return userId;
};

// Similar para outras funções...


exports.authenticateUser = async (email, password) => {
  const [user] = await db('users').where({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }
  throw new Error('Invalid credentials');
};

exports.getUserById = async (id) => {
  const [user] = await db('users').where({ id });
  return user;
};

exports.updateUser = async (id, name, email, password) => {
  const updates = {};
  
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) updates.password = await bcrypt.hash(password, 10);
  
  await db('users').where({ id }).update(updates);
};

exports.deleteUser = async (id) => {
  await db('users').where({ id }).del();
};

exports.listUsers = async () => {
  return await db('users').select('*');
};