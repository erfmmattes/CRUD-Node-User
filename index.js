const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.post('/api/auth/register', userController.register);
app.post('/api/auth/login', userController.login);

app.use(authMiddleware);
app.put('/api/users/:id', userController.update);
app.delete('/api/users/:id', userController.delete);
app.get('/api/users', userController.list);
app.get('/api/user/:id', userController.getUserById);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});