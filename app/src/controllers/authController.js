const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, phone, password, confirmPassword, firstName, lastName, dob, gender } = req.body;

    // Verifica se o usuário, email ou telefone já existem no banco
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phone }] });

    if (existingUser) {
      const errors = {};

      if (existingUser.username === username) {
        errors.username = 'Nome de usuário já em uso.';
      }

      if (existingUser.email === email) {
        errors.email = 'Endereço de email já em uso.';
      }

      if (existingUser.phone === phone) {
        errors.phone = 'Número de telefone já em uso.';
      }

      return res.status(400).json({ errors, message: 'Falha ao registrar usuário.' });
    }

    // Verifica se a senha e a confirmação de senha coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword, // Salva a senha criptografada
      email,
      phone,
      firstName,
      lastName,
      dob,
      gender,
    });

    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Tentativa de login para usuário:', username);

    console.log('Tentativa de login para usuário:', username);
    const normalizedUsername = username.trim().toLowerCase();
    const user = await User.findOne({ username: normalizedUsername });
    
    console.log('Nome de usuário normalizado:', normalizedUsername);

    console.log('Resultado da consulta ao banco de dados:', user);



    console.log('Resultado da consulta ao banco de dados:', user);

    if (!user) {
      console.log('Usuário não encontrado.');
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }
    console.log('Tentativa de login para usuário:', username);



    console.log('Comparando senha:', password, user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log('Senha válida. Prossiga com o login.');
      const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
      console.log('Login bem-sucedido. Token gerado:', token);
      res.json({ token });
    } else {
      console.log('Senha inválida.');
      res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
};


exports.checkFieldAvailability = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    // Verifica se já existe um usuário com o valor fornecido no campo específico
    const existingUser = await User.findOne({ [fieldName]: value });

    // Retorna se o campo está disponível ou não
    res.json({ available: !existingUser });
  } catch (error) {
    console.error(`Erro ao verificar a disponibilidade de ${fieldName}:`, error);
    res.status(500).json({ available: false }); // Em caso de erro, considerar como não disponível
  }
};
